"use client";

import { useCallback, useRef, useState } from "react";
import FieldError from "@/components/FieldError";
import Turnstile, { type TurnstileHandle } from "@/components/Turnstile";
import { CAPTCHA_FAILED, CAPTCHA_REQUIRED } from "@/lib/captcha";
import { submitLead } from "@/lib/leads";
import {
  emailAddress,
  enquiryMessage,
  personName,
  phoneNumber,
  validateAll,
  type Rule,
} from "@/lib/validation";
import { C, EMAIL } from "@/lib/site";

const FIELD: React.CSSProperties = {
  border: `1px solid ${C.borderInput}`,
  borderRadius: 8,
  padding: "13px 15px",
  fontSize: 15,
  color: C.navy,
  outlineColor: C.cyan,
  fontFamily: "inherit",
  width: "100%",
  background: "#FFFFFF",
};

type Key = "first" | "last" | "email" | "phone" | "message";

const RULES: Record<Key, Rule> = {
  first: personName("first name"),
  last: personName("last name"),
  email: emailAddress,
  phone: phoneNumber,
  message: enquiryMessage(),
};

const ORDER: Key[] = ["first", "last", "email", "phone", "message"];

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontFamily: "var(--font-lexend), Lexend, sans-serif",
        fontWeight: 600,
        color: C.navy,
        fontSize: 13.5,
        marginBottom: 7,
      }}
    >
      {children}
      <span style={{ color: C.orange }} aria-hidden>
        *
      </span>
      <span className="visually-hidden"> (required)</span>
    </label>
  );
}

/** The white "Speak with an Adviser" enquiry card. Fields are validated on
 *  blur and on submit; the enquiry is only filed (as a Lead in the Aleesa CRM,
 *  via /api/leads) once everything is valid and the Turnstile security check
 *  has been confirmed server-side. If the CRM can't be reached the form
 *  composes an email instead. */
export default function AdviserForm({ service }: { service: string }) {
  const [values, setValues] = useState<Record<Key, string>>({
    first: "",
    last: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [blocked, setBlocked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [captcha, setCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const turnstile = useRef<TurnstileHandle>(null);

  const change = (key: Key) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key]) {
      setErrors((e) => ({ ...e, [key]: RULES[key](value) ?? undefined }));
    }
  };

  const blur = (key: Key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: RULES[key](values[key]) ?? undefined }));
  };

  const invalid = (key: Key) => Boolean(errors[key]);
  const fieldClass = (key: Key) => (invalid(key) ? "field-invalid" : undefined);
  const describedBy = (key: Key) =>
    invalid(key) ? `af-${key}-error` : undefined;

  /** Track the widget's current token, clearing the error once it passes. */
  const gotToken = useCallback((token: string) => {
    setCaptcha(token);
    if (token) setCaptchaError(undefined);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    if (sending) return;
    e.preventDefault();
    const found = validateAll(RULES, values);
    setErrors(found);
    setTouched(
      ORDER.reduce((a, k) => ({ ...a, [k]: true }), {} as Record<Key, boolean>),
    );

    const firstBad = ORDER.find((k) => found[k]);
    if (firstBad) {
      setBlocked(true);
      formRef.current?.querySelector<HTMLElement>(`#af-${firstBad}`)?.focus();
      return;
    }

    setBlocked(false);
    if (!captcha) {
      setCaptchaError(CAPTCHA_REQUIRED);
      return;
    }

    setSending(true);
    const result = await submitLead({
      form: "adviser",
      token: captcha,
      firstName: values.first,
      lastName: values.last,
      email: values.email,
      phone: values.phone,
      service,
      message: values.message,
    });
    turnstile.current?.reset();
    setSending(false);
    if (result === "captcha") {
      setCaptchaError(CAPTCHA_FAILED);
      return;
    }
    if (result === "sent") {
      setSent(true);
      return;
    }

    // The CRM couldn't take it — compose an email so the enquiry isn't lost.
    window.location.href =
      `mailto:${EMAIL}?subject=` +
      encodeURIComponent(`Enquiry — ${service}`) +
      "&body=" +
      encodeURIComponent(
        `Name: ${values.first} ${values.last}\nEmail: ${values.email}\n` +
          `Phone: ${values.phone}\nService: ${service}\n\n${values.message}`,
      );
  }

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 18,
        padding: "34px 32px",
        boxShadow: "0 18px 44px rgba(10,18,36,0.10)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-lexend), Lexend, sans-serif",
          fontWeight: 700,
          color: C.navy,
          fontSize: 20,
          letterSpacing: "-0.01em",
          marginBottom: 24,
        }}
      >
        JCA-BNH<span style={{ color: C.orange }}>.</span>
      </div>

      {sent ? (
        <p
          role="status"
          style={{
            margin: 0,
            padding: "16px 18px",
            borderRadius: 10,
            background: "#F4F7FA",
            border: `1px solid ${C.borderInput}`,
            color: C.navy,
            fontSize: 15,
            lineHeight: 1.65,
          }}
        >
          <b>Thanks, {values.first.trim()} — your enquiry has been sent.</b>
          <br />
          One of our advisers will be in touch shortly.
        </p>
      ) : (
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: 18,
            }}
          >
            <div>
              <Label htmlFor="af-first">First Name</Label>
              <input
                id="af-first"
                autoComplete="given-name"
                style={FIELD}
                className={fieldClass("first")}
                aria-invalid={invalid("first")}
                aria-describedby={describedBy("first")}
                value={values.first}
                onChange={(e) => change("first")(e.target.value)}
                onBlur={blur("first")}
              />
              <FieldError id="af-first-error">{errors.first}</FieldError>
            </div>
            <div>
              <Label htmlFor="af-last">Last Name</Label>
              <input
                id="af-last"
                autoComplete="family-name"
                style={FIELD}
                className={fieldClass("last")}
                aria-invalid={invalid("last")}
                aria-describedby={describedBy("last")}
                value={values.last}
                onChange={(e) => change("last")(e.target.value)}
                onBlur={blur("last")}
              />
              <FieldError id="af-last-error">{errors.last}</FieldError>
            </div>
          </div>

          <div>
            <Label htmlFor="af-email">Email</Label>
            <input
              id="af-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              style={FIELD}
              className={fieldClass("email")}
              aria-invalid={invalid("email")}
              aria-describedby={describedBy("email")}
              value={values.email}
              onChange={(e) => change("email")(e.target.value)}
              onBlur={blur("email")}
            />
            <FieldError id="af-email-error">{errors.email}</FieldError>
          </div>

          <div>
            <Label htmlFor="af-phone">Phone Number</Label>
            <input
              id="af-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              style={FIELD}
              className={fieldClass("phone")}
              aria-invalid={invalid("phone")}
              aria-describedby={describedBy("phone")}
              value={values.phone}
              onChange={(e) => change("phone")(e.target.value)}
              onBlur={blur("phone")}
            />
            <FieldError id="af-phone-error">{errors.phone}</FieldError>
          </div>

          <div>
            <Label htmlFor="af-message">How can we help?</Label>
            <textarea
              id="af-message"
              rows={4}
              style={{ ...FIELD, resize: "vertical" }}
              className={fieldClass("message")}
              aria-invalid={invalid("message")}
              aria-describedby={describedBy("message")}
              value={values.message}
              onChange={(e) => change("message")(e.target.value)}
              onBlur={blur("message")}
            />
            <FieldError id="af-message-error">{errors.message}</FieldError>
          </div>

          <div>
            <Turnstile ref={turnstile} action="adviser" onToken={gotToken} />
            <FieldError id="af-captcha-error">{captchaError}</FieldError>
          </div>

          {blocked && Object.values(errors).some(Boolean) && (
            <p className="form-summary" role="alert">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.9" />
                <path d="M12 7.4v5.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                <circle cx="12" cy="16.3" r="1.15" fill="currentColor" />
              </svg>
              Please fix the highlighted{" "}
              {Object.values(errors).filter(Boolean).length === 1
                ? "field"
                : "fields"}{" "}
              above, then submit again.
            </p>
          )}

          <button
            type="submit"
            className="btn-orange"
            disabled={sending}
            aria-busy={sending}
            style={{
              background: C.orange,
              color: "#FFFFFF",
              padding: "14px 26px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15.5,
              textAlign: "center",
              border: 0,
              cursor: "pointer",
              fontFamily: "inherit",
              opacity: sending ? 0.7 : 1,
            }}
          >
            {sending ? "Sending…" : "Submit Enquiry"}
          </button>
          <div style={{ fontSize: 12.5, color: C.mute }}>
            Or email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      </form>
      )}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import FieldError from "@/components/FieldError";
import {
  emailAddress,
  enquiryMessage,
  personName,
  phoneNumber,
  requiredChoice,
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

const HEAR_OPTIONS = [
  "Google search",
  "Referred by a friend or client",
  "Social media",
  "Existing client",
  "Other",
];

type Key =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "hear"
  | "message"
  | "updates";

/** Every field on this card is marked required, so each one gets a rule. */
const RULES: Record<Key, Rule> = {
  firstName: personName("first name"),
  lastName: personName("last name"),
  email: emailAddress,
  phone: phoneNumber,
  hear: requiredChoice("Please let us know how you heard about us."),
  message: enquiryMessage(),
  updates: requiredChoice("Please choose Yes or No."),
};

/** Field order, used to focus the first problem after a blocked submit. */
const ORDER: Key[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "hear",
  "message",
  "updates",
];

const INPUT_ID: Record<Key, string> = {
  firstName: "cf-first",
  lastName: "cf-last",
  email: "cf-email",
  phone: "cf-phone",
  hear: "cf-hear",
  message: "cf-message",
  updates: "cf-updates-yes",
};

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontWeight: 700,
        color: C.navy,
        fontSize: 15,
        marginBottom: 8,
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

/**
 * "Get in touch" enquiry card. Fields are validated on blur and on submit —
 * the mailto is only opened once every value is valid, so malformed or empty
 * enquiries never reach the inbox.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Record<Key, string>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hear: "",
    message: "",
    updates: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [blocked, setBlocked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  /** Update a value, re-checking it live once the field has been touched. */
  const change = (key: Key) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key]) {
      setErrors((e) => ({ ...e, [key]: RULES[key](value) ?? undefined }));
    }
  };

  /** Check a single field when the visitor leaves it. */
  const blur = (key: Key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: RULES[key](values[key]) ?? undefined }));
  };

  const invalid = (key: Key) => Boolean(errors[key]);

  const fieldClass = (key: Key) => (invalid(key) ? "field-invalid" : undefined);
  const describedBy = (key: Key) =>
    invalid(key) ? `${INPUT_ID[key]}-error` : undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateAll(RULES, values);
    setErrors(found);
    setTouched(
      ORDER.reduce((acc, k) => ({ ...acc, [k]: true }), {} as Record<Key, boolean>),
    );

    const firstBad = ORDER.find((k) => found[k]);
    if (firstBad) {
      setBlocked(true);
      formRef.current
        ?.querySelector<HTMLElement>(`#${INPUT_ID[firstBad]}`)
        ?.focus();
      return;
    }

    setBlocked(false);
    window.location.href =
      `mailto:${EMAIL}?subject=` +
      encodeURIComponent("Website enquiry") +
      "&body=" +
      encodeURIComponent(
        `Name: ${values.firstName} ${values.lastName}\n` +
          `Email: ${values.email}\nPhone: ${values.phone}\n` +
          `How they heard about us: ${values.hear}\n` +
          `Wants insights & updates: ${values.updates}\n\n${values.message}`,
      );
  }

  return (
    <div
      style={{
        background: "#EAF1F8",
        borderRadius: 16,
        padding: "clamp(28px, 4vw, 48px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-lexend), Lexend, sans-serif",
          fontWeight: 700,
          color: C.navy,
          fontSize: 22,
          letterSpacing: "-0.01em",
          marginBottom: 26,
        }}
      >
        JCA-BNH.
      </div>
      <h2
        style={{
          fontFamily: "var(--font-lexend), Lexend, sans-serif",
          fontWeight: 600,
          color: C.navy,
          fontSize: "clamp(26px, 3vw, 34px)",
          letterSpacing: "-0.01em",
          margin: "0 0 14px",
        }}
      >
        Get in touch
      </h2>
      <p style={{ margin: "0 0 30px", fontSize: 16, lineHeight: 1.65 }}>
        Please fill out the form below to make an appointment or request more
        information.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(min(200px,100%),1fr))",
              gap: 22,
            }}
          >
            <div>
              <FieldLabel htmlFor="cf-first">First Name</FieldLabel>
              <input
                id="cf-first"
                autoComplete="given-name"
                style={FIELD}
                className={fieldClass("firstName")}
                aria-invalid={invalid("firstName")}
                aria-describedby={describedBy("firstName")}
                value={values.firstName}
                onChange={(e) => change("firstName")(e.target.value)}
                onBlur={blur("firstName")}
              />
              <FieldError id="cf-first-error">{errors.firstName}</FieldError>
            </div>
            <div>
              <FieldLabel htmlFor="cf-last">Last Name</FieldLabel>
              <input
                id="cf-last"
                autoComplete="family-name"
                style={FIELD}
                className={fieldClass("lastName")}
                aria-invalid={invalid("lastName")}
                aria-describedby={describedBy("lastName")}
                value={values.lastName}
                onChange={(e) => change("lastName")(e.target.value)}
                onBlur={blur("lastName")}
              />
              <FieldError id="cf-last-error">{errors.lastName}</FieldError>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="cf-email">Email</FieldLabel>
            <input
              id="cf-email"
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
            <FieldError id="cf-email-error">{errors.email}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="cf-phone">Phone Number</FieldLabel>
            <input
              id="cf-phone"
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
            <FieldError id="cf-phone-error">{errors.phone}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="cf-hear">How did you hear about us</FieldLabel>
            <select
              id="cf-hear"
              style={{ ...FIELD, cursor: "pointer" }}
              className={fieldClass("hear")}
              aria-invalid={invalid("hear")}
              aria-describedby={describedBy("hear")}
              value={values.hear}
              onChange={(e) => change("hear")(e.target.value)}
              onBlur={blur("hear")}
            >
              <option value="">Please choose…</option>
              {HEAR_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <FieldError id="cf-hear-error">{errors.hear}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="cf-message">How can we help you?</FieldLabel>
            <textarea
              id="cf-message"
              rows={5}
              style={{ ...FIELD, resize: "vertical" }}
              className={fieldClass("message")}
              aria-invalid={invalid("message")}
              aria-describedby={describedBy("message")}
              value={values.message}
              onChange={(e) => change("message")(e.target.value)}
              onBlur={blur("message")}
            />
            <FieldError id="cf-message-error">{errors.message}</FieldError>
          </div>

          <fieldset
            style={{ border: 0, padding: 0, margin: 0 }}
            aria-invalid={invalid("updates")}
            aria-describedby={describedBy("updates")}
          >
            <legend
              style={{
                display: "block",
                fontWeight: 700,
                color: C.navy,
                fontSize: 15,
                marginBottom: 8,
                padding: 0,
              }}
            >
              Would you like to receive JCA-BNH insights and updates?
              <span style={{ color: C.orange }} aria-hidden>
                *
              </span>
              <span className="visually-hidden"> (required)</span>
            </legend>
            <div style={{ display: "flex", gap: 26, fontSize: 15 }}>
              {["Yes", "No"].map((v) => (
                <label
                  key={v}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    cursor: "pointer",
                    color: C.navy,
                  }}
                >
                  <input
                    id={v === "Yes" ? "cf-updates-yes" : "cf-updates-no"}
                    type="radio"
                    name="cf-updates"
                    value={v}
                    checked={values.updates === v}
                    onChange={() => {
                      setTouched((t) => ({ ...t, updates: true }));
                      setValues((old) => ({ ...old, updates: v }));
                      setErrors((e) => ({ ...e, updates: undefined }));
                    }}
                    style={{ accentColor: C.orange, width: 17, height: 17 }}
                  />
                  {v}
                </label>
              ))}
            </div>
            <FieldError id="cf-updates-error">{errors.updates}</FieldError>
          </fieldset>

          {blocked && Object.values(errors).some(Boolean) && (
            <p className="form-summary" role="alert">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.9" />
                <path d="M12 7.4v5.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                <circle cx="12" cy="16.3" r="1.15" fill="currentColor" />
              </svg>
              Please fix the highlighted {Object.values(errors).filter(Boolean).length === 1 ? "field" : "fields"} above, then submit again.
            </p>
          )}

          <button
            type="submit"
            className="btn-orange"
            style={{
              background: C.orange,
              color: "#FFFFFF",
              padding: "15px 28px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              textAlign: "center",
              marginTop: 6,
              border: 0,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Submit Enquiry
          </button>
          <div style={{ fontSize: 13, color: C.mute }}>
            Or email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      </form>
    </div>
  );
}

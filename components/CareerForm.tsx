"use client";

import { useRef, useState } from "react";
import FieldError from "@/components/FieldError";
import {
  emailAddress,
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
};

type Key = "name" | "phone" | "email" | "resume";

const RULES: Record<Key, Rule> = {
  name: personName("full name"),
  phone: phoneNumber,
  email: emailAddress,
  resume: requiredChoice("Please attach your resume (PDF or DOCX)."),
};

const ORDER: Key[] = ["name", "phone", "email", "resume"];

/** Resume uploads are capped so an applicant is told before they email. */
const MAX_RESUME_MB = 10;
const ALLOWED = [".pdf", ".doc", ".docx"];

/**
 * Career expression-of-interest form. Fields are validated on blur and on
 * submit; the resume itself is attached by the applicant to the composed
 * email (a file cannot be sent from the browser without a backend).
 */
export default function CareerForm() {
  const [values, setValues] = useState<Record<Key, string>>({
    name: "",
    phone: "",
    email: "",
    resume: "",
  });
  const [workType, setWorkType] = useState("Work type — Full-Time");
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [blocked, setBlocked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
    invalid(key) ? `jf-${key}-error` : undefined;

  /** Checks the picked file's type and size before accepting its name. */
  function pickResume(file: File | undefined) {
    setTouched((t) => ({ ...t, resume: true }));
    if (!file) {
      setValues((v) => ({ ...v, resume: "" }));
      setErrors((e) => ({ ...e, resume: RULES.resume("") ?? undefined }));
      return;
    }
    const name = file.name;
    const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED.includes(ext)) {
      setValues((v) => ({ ...v, resume: "" }));
      setErrors((e) => ({
        ...e,
        resume: "Resumes must be a PDF, DOC or DOCX file.",
      }));
      return;
    }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setValues((v) => ({ ...v, resume: "" }));
      setErrors((e) => ({
        ...e,
        resume: `That file is over ${MAX_RESUME_MB}MB — please attach a smaller one.`,
      }));
      return;
    }
    setValues((v) => ({ ...v, resume: name }));
    setErrors((e) => ({ ...e, resume: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateAll(RULES, values);
    setErrors(found);
    setTouched(
      ORDER.reduce((a, k) => ({ ...a, [k]: true }), {} as Record<Key, boolean>),
    );

    const firstBad = ORDER.find((k) => found[k]);
    if (firstBad) {
      setBlocked(true);
      formRef.current?.querySelector<HTMLElement>(`#jf-${firstBad}`)?.focus();
      return;
    }

    setBlocked(false);
    window.location.href =
      `mailto:${EMAIL}?subject=` +
      encodeURIComponent("Career enquiry") +
      "&body=" +
      encodeURIComponent(
        `Name: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\n` +
          `${workType}\n\nResume: ${values.resume} — please attach this file to the email.`,
      );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: 560,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(180px,100%),1fr))",
          gap: 14,
        }}
      >
        <div>
          <input
            id="jf-name"
            placeholder="Full name"
            aria-label="Full name"
            autoComplete="name"
            style={FIELD}
            className={fieldClass("name")}
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            value={values.name}
            onChange={(e) => change("name")(e.target.value)}
            onBlur={blur("name")}
          />
          <FieldError id="jf-name-error">{errors.name}</FieldError>
        </div>
        <div>
          <input
            id="jf-phone"
            placeholder="Phone"
            aria-label="Phone"
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
          <FieldError id="jf-phone-error">{errors.phone}</FieldError>
        </div>
      </div>

      <div>
        <input
          id="jf-email"
          placeholder="Email address"
          aria-label="Email address"
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
        <FieldError id="jf-email-error">{errors.email}</FieldError>
      </div>

      <select
        aria-label="Work type"
        style={{ ...FIELD, background: "#FFFFFF" }}
        value={workType}
        onChange={(e) => setWorkType(e.target.value)}
      >
        <option>Work type &mdash; Full-Time</option>
        <option>Work type &mdash; Part-Time</option>
      </select>

      <div>
        <label
          style={{
            display: "block",
            border: `1.5px dashed ${invalid("resume") ? "#B3261E" : "#C4CEDC"}`,
            borderRadius: 8,
            padding: "20px 15px",
            fontSize: 14.5,
            color: values.resume ? C.navy : C.mute,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {values.resume || `Attach resume (PDF or DOCX, max ${MAX_RESUME_MB}MB)`}
          <input
            id="jf-resume"
            type="file"
            accept=".pdf,.doc,.docx"
            aria-invalid={invalid("resume")}
            aria-describedby={describedBy("resume")}
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              opacity: 0,
              pointerEvents: "none",
            }}
            onChange={(e) => pickResume(e.target.files?.[0])}
          />
        </label>
        <FieldError id="jf-resume-error">{errors.resume}</FieldError>
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
        style={{
          background: C.orange,
          color: "#FFFFFF",
          padding: "14px 26px",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 16,
          textAlign: "center",
          border: 0,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Submit
      </button>
      <div style={{ fontSize: 13, color: C.mute }}>
        Prefer email? Send your resume to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </form>
  );
}

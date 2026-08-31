"use client";

import { useState } from "react";
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
      <span style={{ color: C.orange }}>*</span>
    </label>
  );
}

/**
 * "Get in touch" enquiry card. Visual match for the design; the button
 * composes a mailto so the enquiry reaches the inbox without a backend.
 */
export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hear, setHear] = useState("");
  const [message, setMessage] = useState("");
  const [updates, setUpdates] = useState("");

  const href =
    `mailto:${EMAIL}?subject=` +
    encodeURIComponent("Website enquiry") +
    "&body=" +
    encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n` +
        `How they heard about us: ${hear}\n` +
        `Wants insights & updates: ${updates || "—"}\n\n${message}`,
    );

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

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(200px,100%),1fr))",
            gap: 22,
          }}
        >
          <div>
            <FieldLabel htmlFor="cf-first">First Name</FieldLabel>
            <input
              id="cf-first"
              autoComplete="given-name"
              style={FIELD}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="cf-last">Last Name</FieldLabel>
            <input
              id="cf-last"
              autoComplete="family-name"
              style={FIELD}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="cf-email">Email</FieldLabel>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            style={FIELD}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <FieldLabel htmlFor="cf-phone">Phone Number</FieldLabel>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            style={FIELD}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <FieldLabel htmlFor="cf-hear">How did you hear about us</FieldLabel>
          <select
            id="cf-hear"
            style={{ ...FIELD, cursor: "pointer" }}
            value={hear}
            onChange={(e) => setHear(e.target.value)}
          >
            <option value="" />
            {HEAR_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel htmlFor="cf-message">How can we help you?</FieldLabel>
          <textarea
            id="cf-message"
            rows={5}
            style={{ ...FIELD, resize: "vertical" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div>
          <FieldLabel>
            Would you like to receive JCA-BNH insights and updates?
          </FieldLabel>
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
                  type="radio"
                  name="cf-updates"
                  value={v}
                  checked={updates === v}
                  onChange={() => setUpdates(v)}
                  style={{ accentColor: C.orange, width: 17, height: 17 }}
                />
                {v}
              </label>
            ))}
          </div>
        </div>

        <a
          href={href}
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
          }}
        >
          Submit Enquiry
        </a>
        <div style={{ fontSize: 13, color: C.mute }}>
          Or email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </div>
  );
}

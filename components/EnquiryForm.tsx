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
};

/**
 * Contact enquiry form. Visually identical to the design; the button composes a
 * mailto so the enquiry actually reaches the inbox without a backend.
 */
export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const href =
    `mailto:${EMAIL}?subject=` +
    encodeURIComponent("Website enquiry") +
    "&body=" +
    encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`,
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
      >
        <input
          placeholder="Full name"
          style={FIELD}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Phone"
          style={FIELD}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <input
        placeholder="Email address"
        type="email"
        style={FIELD}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="How can we help?"
        rows={5}
        style={{ ...FIELD, resize: "vertical" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <a
        href={href}
        className="btn-orange"
        style={{
          background: C.orange,
          color: "#FFFFFF",
          padding: "14px 26px",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Send Enquiry
      </a>
      <div style={{ fontSize: 13, color: C.mute }}>
        Or email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </div>
  );
}

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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontFamily: "var(--font-archivo), Archivo, sans-serif",
        fontWeight: 700,
        color: C.navy,
        fontSize: 14.5,
        marginBottom: 7,
      }}
    >
      {children}
      <span style={{ color: C.orange }}>*</span>
    </label>
  );
}

/** The white "Speak with an Adviser" enquiry card from the reference design.
 *  Labelled fields; the button composes a mailto so enquiries reach the inbox
 *  without a backend. */
export default function AdviserForm({ service }: { service: string }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const href =
    `mailto:${EMAIL}?subject=` +
    encodeURIComponent(`Enquiry — ${service}`) +
    "&body=" +
    encodeURIComponent(
      `Name: ${first} ${last}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\n${message}`,
    );

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
          fontFamily: "var(--font-archivo), Archivo, sans-serif",
          fontWeight: 800,
          color: C.navy,
          fontSize: 22,
          marginBottom: 24,
        }}
      >
        JCA-BNH<span style={{ color: C.orange }}>.</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 18,
          }}
        >
          <div>
            <Label>First Name</Label>
            <input
              style={FIELD}
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
          <div>
            <Label>Last Name</Label>
            <input
              style={FIELD}
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label>Email</Label>
          <input
            type="email"
            style={FIELD}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Phone Number</Label>
          <input
            type="tel"
            style={FIELD}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <Label>How can we help?</Label>
          <textarea
            rows={4}
            style={{ ...FIELD, resize: "vertical" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
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
          Submit Enquiry
        </a>
        <div style={{ fontSize: 12.5, color: C.mute }}>
          Or email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </div>
  );
}

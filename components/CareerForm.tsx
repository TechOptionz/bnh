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
 * Career expression-of-interest form. Matches the design; the submit button
 * composes a mailto, and the resume is attached to that email by the applicant
 * (a file cannot be attached from the browser without a backend).
 */
export default function CareerForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [workType, setWorkType] = useState("Work type — Full-Time");
  const [fileName, setFileName] = useState("");

  const href =
    `mailto:${EMAIL}?subject=` +
    encodeURIComponent("Career enquiry") +
    "&body=" +
    encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n${workType}\n` +
        (fileName
          ? `\nResume: ${fileName} — please attach this file to the email.`
          : "\nPlease attach your resume to this email."),
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: 560,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(180px,100%),1fr))", gap: 14 }}>
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
      <select
        style={{ ...FIELD, background: "#FFFFFF" }}
        value={workType}
        onChange={(e) => setWorkType(e.target.value)}
      >
        <option>Work type &mdash; Full-Time</option>
        <option>Work type &mdash; Part-Time</option>
      </select>
      <label
        style={{
          border: "1.5px dashed #C4CEDC",
          borderRadius: 8,
          padding: "20px 15px",
          fontSize: 14.5,
          color: fileName ? C.navy : C.mute,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        {fileName || "Attach resume (PDF or DOCX)"}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </label>
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
        Submit
      </a>
      <div style={{ fontSize: 13, color: C.mute }}>
        Prefer email? Send your resume to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ACC, FA, SERVICES } from "@/lib/services";

type Msg = {
  role: "user" | "assistant";
  content: string;
  link?: { href: string; label: string };
};

const BOOKING_URL =
  "https://outlook.office365.com/owa/calendar/JCABNH@jcabrehmer.com.au/bookings/?skipRedirect=1";

/** Service topics offered as quick-question chips, answered from lib/services data. */
const SERVICE_TOPICS: { label: string; slug: keyof typeof SERVICES }[] = [
  { label: "Tax returns & advice", slug: "taxation-advisory" },
  { label: "Bookkeeping & payroll", slug: "bookkeeping-payroll" },
  { label: "Business advisory", slug: "business-advisory" },
  { label: "Virtual CFO", slug: "virtual-cfo" },
  { label: "Retirement planning", slug: "retirement-plan" },
  { label: "Super & SMSF", slug: "smsf-advice" },
  { label: "Insurance & protection", slug: "life-insurances" },
  { label: "Investment advice", slug: "managed-investments" },
  { label: "Estate planning", slug: "estate-planning" },
  { label: "Audit services", slug: "audit-services" },
  { label: "Xero, MYOB & QuickBooks", slug: "business-software" },
  { label: "Grants advice", slug: "grants-advice" },
];

const GREETING =
  "Hi! I'm the JCA-BNH assistant. I can help with questions about our tax, accounting and financial advice services — or help you book a free 30-minute consultation. Tap a question below or type your own.";

const FALLBACK =
  "I couldn't reach the assistant just now. Please call us on 1300 264 346 (Mon–Fri, 8am–5pm) or book a free consultation via the orange button above.";

const SERVICES_OVERVIEW =
  "We're better at money matters across two divisions:\n\n" +
  `1. ${ACC} — tax returns & advice, bookkeeping & payroll, audit, business advisory & planning, Virtual CFO, SMSF accounting and more.\n\n` +
  `2. ${FA} — retirement planning, super & SMSF advice, personal insurance, investments and estate planning.\n\n` +
  "Pick a topic below to see exactly how we can help:";

const BOOKING_ANSWER =
  "Easy — the consultation is free, takes 30 minutes and there's no obligation. Pick a time online with the link below, or call us on 1300 264 346 (Mon–Fri, 8am–5pm).";

const OFFICES_ANSWER =
  "We have offices across South East Queensland:\n\n" +
  "• Brisbane — Level 1/67 Springwood Rd, Springwood QLD 4127 — 1300 264 346\n" +
  "• Noosa — 1/31 Thomas St, Noosaville QLD 4566 — 07 5473 5444\n" +
  "• Maroochydore — 2/68 Kingsford Smith Parade QLD 4558 — 07 5473 5444\n\n" +
  "Open Monday–Friday, 8am–5pm.";

function serviceAnswer(slug: keyof typeof SERVICES): Msg {
  const s = SERVICES[slug];
  return {
    role: "assistant",
    content:
      `${s.title} — ${s.tagline}\n\nWe can help with:\n` +
      s.offer.map((o) => `• ${o}`).join("\n") +
      "\n\nWant to talk it through? The first 30-minute consultation is free.",
    link: { href: `/services/${slug}`, label: `More about ${s.title}` },
  };
}

/** Floating chat assistant, ported from the design's `jca-chatbot` web component. */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, busy]);

  function toggle() {
    setOpen((wasOpen) => {
      if (!wasOpen) {
        setMsgs((m) =>
          m.length ? m : [{ role: "assistant", content: GREETING }],
        );
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      return !wasOpen;
    });
  }

  /** Answer a chip instantly from local data, with a short typing pause. */
  function answerLocally(question: string, reply: Msg) {
    if (busy) return;
    setAsked((a) => [...a, question]);
    setMsgs((m) => [...m, { role: "user", content: question }]);
    setBusy(true);
    setTimeout(() => {
      setMsgs((m) => [...m, reply]);
      setBusy(false);
    }, 350);
  }

  async function submit(text?: string) {
    const q = (text ?? value).trim();
    if (!q || busy) return;
    setValue("");
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setBusy(true);
    let reply = FALLBACK;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(-12).map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });
      if (!res.ok) throw new Error("unavailable");
      const data = (await res.json()) as { reply?: string };
      if (data.reply) reply = data.reply;
    } catch {
      /* keep the fallback message */
    }
    setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    setBusy(false);
  }

  const baseChips = [
    {
      label: "What services do you offer?",
      run: () => {
        setTopicsOpen(true);
        answerLocally("What services do you offer?", {
          role: "assistant",
          content: SERVICES_OVERVIEW,
        });
      },
    },
    {
      label: "How do I book a free consultation?",
      run: () =>
        answerLocally("How do I book a free consultation?", {
          role: "assistant",
          content: BOOKING_ANSWER,
          link: { href: BOOKING_URL, label: "Book your free consultation" },
        }),
    },
    {
      label: "Where are your offices?",
      run: () =>
        answerLocally("Where are your offices?", {
          role: "assistant",
          content: OFFICES_ANSWER,
          link: { href: "/contact", label: "Contact details & map" },
        }),
    },
  ];

  const topicChips = SERVICE_TOPICS.map((t) => ({
    label: t.label,
    run: () => answerLocally(t.label, serviceAnswer(t.slug)),
  }));

  const chips = (topicsOpen ? [...topicChips, ...baseChips.slice(1)] : baseChips)
    .filter((c) => !asked.includes(c.label));

  return (
    <>
      <style>{CSS}</style>
      <button
        className="jb-fab"
        aria-label="Chat with JCA-BNH"
        onClick={toggle}
        type="button"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9l-4.2 3.4c-.5.4-1.3 0-1.3-.7V6z"
            fill="#12B7D6"
          />
          <circle cx="9" cy="9.5" r="1.2" fill="#0E1B33" />
          <circle cx="12.5" cy="9.5" r="1.2" fill="#0E1B33" />
          <circle cx="16" cy="9.5" r="1.2" fill="#0E1B33" />
        </svg>
      </button>

      {open && (
        <div className="jb-panel">
          <div className="jb-hd">
            <span className="jb-dot" />
            <div>
              <b>JCA-BNH Assistant</b>
              <small>Ask about our services or booking</small>
            </div>
          </div>
          <div className="jb-msgs" ref={listRef}>
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`jb-m ${m.role === "user" ? "jb-usr" : "jb-bot"}`}
              >
                {m.content}
                {m.link &&
                  (m.link.href.startsWith("/") ? (
                    <Link className="jb-link" href={m.link.href}>
                      {m.link.label} →
                    </Link>
                  ) : (
                    <a
                      className="jb-link"
                      href={m.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {m.link.label} →
                    </a>
                  ))}
              </div>
            ))}
            {busy && (
              <div className="jb-m jb-bot">
                <span className="jb-typing">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
          </div>
          {chips.length > 0 && (
            <div className="jb-chips">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  className="jb-chip"
                  onClick={c.run}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
          <div className="jb-in">
            <input
              ref={inputRef}
              placeholder="Type your question…"
              maxLength={500}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
            <button type="button" disabled={busy} onClick={() => submit()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const CSS = `
.jb-fab{position:fixed;right:22px;bottom:22px;z-index:9999;width:58px;height:58px;border-radius:999px;background:#1B2A4C;border:none;cursor:pointer;box-shadow:0 6px 24px rgba(14,27,51,.35);display:flex;align-items:center;justify-content:center;transition:transform .15s}
.jb-fab:hover{transform:scale(1.06)}
.jb-panel{position:fixed;right:22px;bottom:92px;z-index:9999;width:min(360px,calc(100vw - 44px));height:min(520px,calc(100vh - 130px));background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(14,27,51,.28);display:flex;flex-direction:column;overflow:hidden;font-family:var(--font-public-sans),'Public Sans',sans-serif}
.jb-hd{background:linear-gradient(120deg,#1B2A4C,#12203C);color:#fff;padding:16px 18px;display:flex;align-items:center;gap:12px}
.jb-dot{width:10px;height:10px;border-radius:99px;background:#2ECC8F;flex-shrink:0}
.jb-hd b{font-family:var(--font-archivo),Archivo,sans-serif;font-size:15px;display:block}
.jb-hd small{color:#C9D4E8;font-size:12px}
.jb-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#F4F7FA}
.jb-m{max-width:82%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
.jb-bot{background:#fff;color:#33415C;border:1px solid #E6EBF2;border-bottom-left-radius:4px;align-self:flex-start}
.jb-usr{background:#F25C0A;color:#fff;border-bottom-right-radius:4px;align-self:flex-end}
.jb-link{display:inline-block;margin-top:8px;color:#F25C0A;font-weight:700;font-size:13.5px;text-decoration:none}
.jb-link:hover{text-decoration:underline}
.jb-chips{display:flex;flex-wrap:wrap;gap:6px;padding:8px 16px;background:#F4F7FA;max-height:96px;overflow-y:auto;flex-shrink:0;border-top:1px solid #E6EBF2}
.jb-chip{border:1px solid #C4CEDC;background:#fff;color:#1B2A4C;border-radius:999px;padding:6px 12px;font-size:12.5px;cursor:pointer;font-family:inherit}
.jb-chip:hover{border-color:#F25C0A;color:#F25C0A}
.jb-in{display:flex;gap:8px;padding:12px;border-top:1px solid #E6EBF2;background:#fff}
.jb-in input{flex:1;border:1px solid #DCE4EE;border-radius:8px;padding:11px 13px;font-size:14px;font-family:inherit;color:#1B2A4C;outline-color:#12B7D6}
.jb-in button{background:#F25C0A;color:#fff;border:none;border-radius:8px;padding:0 16px;font-weight:700;cursor:pointer;font-family:inherit;font-size:14px}
.jb-in button:disabled{opacity:.5;cursor:default}
.jb-typing{display:inline-flex;gap:4px;align-items:center}
.jb-typing span{width:6px;height:6px;border-radius:99px;background:#8A97AF;animation:jb 1s infinite}
.jb-typing span:nth-child(2){animation-delay:.15s}
.jb-typing span:nth-child(3){animation-delay:.3s}
@keyframes jb{0%,60%,100%{opacity:.3}30%{opacity:1}}
`;

"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const CHIPS = [
  "What services do you offer?",
  "How do I book a free consultation?",
  "Where are your offices?",
];

const GREETING =
  "Hi! I'm the JCA-BNH assistant. I can help with questions about our tax, accounting and financial advice services — or help you book a free 30-minute consultation.";

const FALLBACK =
  "I couldn't reach the assistant just now. Please call us on 1300 264 346 (Mon–Fri, 8am–5pm) or book a free consultation via the orange button above.";

/** Floating chat assistant, ported from the design's `jca-chatbot` web component. */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [showChips, setShowChips] = useState(true);
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

  async function submit(text?: string) {
    const q = (text ?? value).trim();
    if (!q || busy) return;
    setValue("");
    setShowChips(false);
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setBusy(true);
    let reply = FALLBACK;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
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
          {showChips && (
            <div className="jb-chips">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="jb-chip"
                  onClick={() => submit(c)}
                >
                  {c}
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
.jb-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 8px;background:#F4F7FA}
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

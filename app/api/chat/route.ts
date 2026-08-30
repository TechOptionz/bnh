import { NextResponse } from "next/server";
import { ACC, FA, SERVICES } from "@/lib/services";

const serviceList = (division: string) =>
  Object.entries(SERVICES)
    .filter(([, s]) => s.division === division)
    .map(([slug, s]) => `${s.title} (${s.tagline} Page: /services/${slug})`)
    .join("; ");

const SYSTEM = `You are the friendly virtual assistant on the JCA-BNH website (jca-bnh.com.au). JCA-BNH Accountants & Financial Advisers is a Queensland firm — tagline "Better at Money Matters".
Facts you know:
- Two divisions: "${FA}" and "${ACC}".
- ${FA} services: ${serviceList(FA)}.
- ${ACC} services: ${serviceList(ACC)}.
- Offices: Brisbane (Level 1/67 Springwood Rd, Springwood QLD 4127, ph 1300 264 346), Noosa (1/31 Thomas St, Noosaville QLD 4566, ph 07 5473 5444), Maroochydore (2/68 Kingsford Smith Parade QLD 4558, ph 07 5473 5444). Also present in Ipswich. Hours Mon-Fri 8am-5pm. Email info@jca-bnh.com.au.
- Free 30-minute consultation, no obligation. Booking link: https://outlook.office365.com/owa/calendar/JCABNH@jcabrehmer.com.au/bookings/?skipRedirect=1
- Sister firm: BachRob (Bachmann Robinson), bachrob.com.au. Partners: CPA Australia, Xero, MYOB, QuickBooks, QuickFee, TaxDome.
Rules: Be concise (2-4 short sentences). Help visitors find the right service and encourage booking the free consultation or calling. When a specific service fits the visitor's need, name it and mention its page path (e.g. "see /services/taxation-advisory"). Never give personal financial or tax advice — say a qualified adviser needs to look at their situation and point them to the free consultation. Plain text only, no markdown.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — the widget shows its own fallback message.
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  let messages: Msg[];
  try {
    const body = (await request.json()) as { messages?: Msg[] };
    messages = (body.messages ?? []).filter(
      (m) => m && (m.role === "user" || m.role === "assistant") && m.content,
    );
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!messages.length) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5",
      max_tokens: 400,
      system: SYSTEM,
      messages: messages.slice(-12),
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  const data = (await res.json()) as {
    content?: { type: string; text?: string }[];
  };
  const reply = (data.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("")
    .trim();

  if (!reply) {
    return NextResponse.json({ error: "empty" }, { status: 502 });
  }
  return NextResponse.json({ reply });
}

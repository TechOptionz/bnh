import { NextResponse } from "next/server";

const PATH = "/webhooks/web-chat";

function endpoint(configured: string): string {
  const trimmed = configured.replace(/\/+$/, "");
  const base = trimmed.endsWith(PATH) ? trimmed.slice(0, -PATH.length) : trimmed;
  return `${base}${PATH}`;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) || undefined : undefined;

/**
 * Relays the visitor's latest message to the Aleesa Web Chat agent. Aleesa is
 * stateful — it keeps the transcript, knowledge base and persona itself, keyed
 * by sessionId — so no history or system prompt is sent, and every turn also
 * lands in the Aleesa inbox.
 */
export async function POST(request: Request) {
  const webhookUrl = process.env.ALEESA_WEBHOOK_URL;
  const apiKey = process.env.ALEESA_WEBCHAT_API_KEY;
  if (!webhookUrl || !apiKey) {
    // Not configured — the widget shows its own fallback message.
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const text = clean(body?.text, 2000);
  if (!text) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // Browser-supplied — restrict shape and length before it reaches Aleesa.
  const rawSession = clean(body?.sessionId, 64);
  const sessionId =
    rawSession && /^[A-Za-z0-9_-]+$/.test(rawSession)
      ? rawSession
      : `chat_${crypto.randomUUID()}`;

  try {
    const res = await fetch(endpoint(webhookUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey,
        sessionId,
        text,
        metadata: {
          source: "website-widget",
          site: "jca-bnh.com.au",
          page: clean(body?.page, 200),
        },
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) throw new Error(`Aleesa Web Chat responded ${res.status}`);
    // Aleesa can answer 200 with success:false (bad key, Web Chat disabled).
    const data = (await res.json()) as {
      success?: boolean;
      message?: unknown;
      reply?: unknown;
    };
    if (data.success === false) {
      throw new Error(`Aleesa rejected the request: ${String(data.message ?? "")}`);
    }

    const reply = typeof data.reply === "string" ? data.reply.trim() : "";
    if (!reply) throw new Error("Aleesa returned no reply");

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[chat] Aleesa failed", error);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}

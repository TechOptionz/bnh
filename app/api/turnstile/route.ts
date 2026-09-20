import { NextResponse } from "next/server";
import { OUTCOME_STATUS, verifyTurnstile } from "@/lib/turnstile";

/** Confirms a Cloudflare Turnstile token before a form is allowed to send. */
export async function POST(request: Request) {
  let token: unknown;
  let action: unknown;
  try {
    ({ token, action } = (await request.json()) as {
      token?: unknown;
      action?: unknown;
    });
  } catch {
    return NextResponse.json({ success: false, error: "bad request" }, { status: 400 });
  }

  const outcome = await verifyTurnstile(request, token, action);
  if (outcome === "ok") return NextResponse.json({ success: true });
  return NextResponse.json(
    { success: false, error: outcome },
    { status: OUTCOME_STATUS[outcome] },
  );
}

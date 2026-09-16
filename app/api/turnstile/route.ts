import { NextResponse } from "next/server";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Confirms a Cloudflare Turnstile token before a form is allowed to send. */
export async function POST(request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ success: false, error: "unconfigured" }, { status: 503 });
  }

  let token: unknown;
  try {
    ({ token } = (await request.json()) as { token?: unknown });
  } catch {
    return NextResponse.json({ success: false, error: "bad request" }, { status: 400 });
  }
  if (typeof token !== "string" || !token || token.length > 2048) {
    return NextResponse.json({ success: false, error: "bad request" }, { status: 400 });
  }

  const body = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const result = (await res.json()) as { success?: boolean };
    const success = result.success === true;
    return NextResponse.json({ success }, { status: success ? 200 : 403 });
  } catch {
    return NextResponse.json({ success: false, error: "unavailable" }, { status: 502 });
  }
}

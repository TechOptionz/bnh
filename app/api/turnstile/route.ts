import { NextResponse } from "next/server";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Actions the enquiry forms render their widgets with. */
const ACTIONS = new Set(["contact", "adviser", "career"]);

type SiteverifyResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

/**
 * Hostnames a token may have been solved on: TURNSTILE_ALLOWED_HOSTNAMES when
 * set, otherwise this request's own host plus local development hosts.
 */
function allowedHostnames(request: Request): Set<string> {
  const configured = process.env.TURNSTILE_ALLOWED_HOSTNAMES?.split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  if (configured?.length) return new Set(configured);
  return new Set([
    new URL(request.url).hostname.toLowerCase(),
    "localhost",
    "127.0.0.1",
  ]);
}

/** Confirms a Cloudflare Turnstile token before a form is allowed to send. */
export async function POST(request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ success: false, error: "unconfigured" }, { status: 503 });
  }

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
  if (
    typeof token !== "string" || !token || token.length > 2048 ||
    typeof action !== "string" || !ACTIONS.has(action)
  ) {
    return NextResponse.json({ success: false, error: "bad request" }, { status: 400 });
  }

  const body = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const result = (await res.json()) as SiteverifyResult;
    const success =
      result.success === true &&
      result.action === action &&
      typeof result.hostname === "string" &&
      allowedHostnames(request).has(result.hostname.toLowerCase());
    return NextResponse.json({ success }, { status: success ? 200 : 403 });
  } catch {
    return NextResponse.json({ success: false, error: "unavailable" }, { status: 502 });
  }
}

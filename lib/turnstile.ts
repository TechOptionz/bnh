const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Actions the enquiry forms render their widgets with. */
export const ACTIONS = new Set(["contact", "adviser", "career"]);

export type TurnstileOutcome =
  | "ok"
  | "rejected"
  | "bad-request"
  | "unconfigured"
  | "unavailable";

/** HTTP status each non-"ok" outcome is reported with. */
export const OUTCOME_STATUS: Record<Exclude<TurnstileOutcome, "ok">, number> = {
  rejected: 403,
  "bad-request": 400,
  unconfigured: 503,
  unavailable: 502,
};

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

/**
 * Confirms a Cloudflare Turnstile token server-side. Tokens are single-use,
 * so each submission must be verified exactly once.
 */
export async function verifyTurnstile(
  request: Request,
  token: unknown,
  action: unknown,
): Promise<TurnstileOutcome> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return "unconfigured";

  if (
    typeof token !== "string" || !token || token.length > 2048 ||
    typeof action !== "string" || !ACTIONS.has(action)
  ) {
    return "bad-request";
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
    return success ? "ok" : "rejected";
  } catch {
    return "unavailable";
  }
}

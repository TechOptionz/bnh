/** Message shown when a visitor submits before the security check passes. */
export const CAPTCHA_REQUIRED = "Please complete the security check below.";

/** Message shown when the server rejects the token or cannot be reached. */
export const CAPTCHA_FAILED =
  "We couldn't verify the security check. Please try it again.";

/**
 * Asks /api/turnstile to confirm a Turnstile token with Cloudflare. Tokens
 * are single-use, so the widget must be reset after every call. `action`
 * must match the one the widget was rendered with.
 */
export async function verifyCaptcha(
  token: string,
  action: string,
): Promise<boolean> {
  try {
    const res = await fetch("/api/turnstile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action }),
    });
    const data = (await res.json()) as { success?: boolean };
    return res.ok && data.success === true;
  } catch {
    return false;
  }
}

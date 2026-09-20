/**
 * Posts an enquiry to /api/leads, which verifies the Turnstile token and
 * files the lead in the Aleesa CRM. Tokens are single-use, so the widget must
 * be reset after every call.
 *
 * - "sent"    — the lead was filed.
 * - "captcha" — the security check was rejected; ask the visitor to retry.
 * - "failed"  — the CRM is unconfigured or unreachable; the form should fall
 *               back to composing an email so the enquiry isn't lost.
 */
export async function submitLead(
  payload: { form: "contact" | "adviser"; token: string } & Record<string, string>,
): Promise<"sent" | "captcha" | "failed"> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, page: window.location.pathname }),
    });
    if (res.ok) return "sent";
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    return data?.error === "captcha" ? "captcha" : "failed";
  } catch {
    return "failed";
  }
}

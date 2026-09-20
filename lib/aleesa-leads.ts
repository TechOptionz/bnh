const PATH = "/api/v1/integrations/website-form/submit";

function endpoint(): string {
  const configured = (process.env.ALEESA_API_URL ?? "").replace(/\/+$/, "");
  if (!configured) throw new Error("ALEESA_API_URL is not set");
  const base = configured.endsWith(PATH)
    ? configured.slice(0, -PATH.length)
    : configured;
  return `${base}${PATH}`;
}

/**
 * Files a Lead in the Aleesa CRM through the Website Form integration.
 * Server-side only — the key must never reach the browser. Resolves to
 * "skipped" when the integration isn't configured, and throws when Aleesa
 * rejects or can't be reached.
 */
export async function sendLeadToAleesa(input: {
  formId: string;
  originUrl: string;
  fields: Record<string, string | undefined>;
}): Promise<"sent" | "skipped"> {
  const apiKey = process.env.ALEESA_WEBSITE_FORM_API_KEY;
  if (!apiKey) return "skipped";

  // Aleesa wants flat, non-empty strings.
  const fields = Object.fromEntries(
    Object.entries(input.fields).filter(([, v]) => Boolean(v?.trim())),
  );

  const response = await fetch(endpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: JSON.stringify({
      formId: input.formId,
      originUrl: input.originUrl,
      fields,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  const body = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: unknown;
  } | null;
  if (!response.ok || body?.success === false) {
    const detail = typeof body?.message === "string" ? `: ${body.message}` : "";
    throw new Error(`Aleesa website form responded ${response.status}${detail}`);
  }
  return "sent";
}

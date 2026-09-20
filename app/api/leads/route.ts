import { NextResponse } from "next/server";
import { sendLeadToAleesa } from "@/lib/aleesa-leads";
import { OUTCOME_STATUS, verifyTurnstile } from "@/lib/turnstile";
import {
  emailAddress,
  enquiryMessage,
  personName,
  phoneNumber,
  type Rule,
} from "@/lib/validation";

/** Lead forms this route accepts; the name doubles as the Turnstile action. */
const FORM_IDS = {
  contact: "contact-form",
  adviser: "adviser-form",
} as const;

type Form = keyof typeof FORM_IDS;

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/**
 * Files a website enquiry as a Lead in the Aleesa CRM. The Turnstile token is
 * verified here (tokens are single-use, so the forms don't also call
 * /api/turnstile) and every value is re-validated before it is forwarded.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const form = body?.form;
  if (!body || typeof form !== "string" || !(form in FORM_IDS)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const captcha = await verifyTurnstile(request, body.token, form);
  if (captcha !== "ok") {
    return NextResponse.json(
      { error: "captcha" },
      { status: OUTCOME_STATUS[captcha] },
    );
  }

  const firstName = str(body.firstName, 60);
  const lastName = str(body.lastName, 60);
  const email = str(body.email, 254);
  const phone = str(body.phone, 40);
  const message = str(body.message, 3000);

  const checks: [Rule, string][] = [
    [personName("first name"), firstName],
    [personName("last name"), lastName],
    [emailAddress, email],
    [phoneNumber, phone],
    [enquiryMessage(), message],
  ];
  if (checks.some(([rule, value]) => rule(value))) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Only same-site paths are accepted for the page the visitor submitted from.
  const page = str(body.page, 200);
  const originUrl = new URL(
    page.startsWith("/") && !page.startsWith("//") ? page : "/",
    request.url,
  ).toString();

  try {
    const result = await sendLeadToAleesa({
      formId: FORM_IDS[form as Form],
      originUrl,
      fields: {
        full_name: `${firstName} ${lastName}`,
        email,
        phone,
        service: str(body.service, 120),
        heard_about_us: str(body.hear, 80),
        wants_updates: str(body.updates, 10),
        message,
      },
    });
    if (result === "skipped") {
      // Not configured — the form falls back to composing an email.
      return NextResponse.json({ error: "unconfigured" }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[leads] Aleesa delivery failed", error);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}

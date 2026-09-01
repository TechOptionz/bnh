/**
 * Shared client-side validation for the site's enquiry forms.
 *
 * Every rule returns `null` when the value is acceptable, or a plain-English
 * message to show under the field. The forms submit by composing a mailto,
 * so these checks are what stop an empty or malformed enquiry from ever
 * reaching the inbox.
 */

export type Rule = (value: string) => string | null;

/** Letters (any script), spaces, hyphens, apostrophes and full stops. */
const NAME_RE = /^\p{L}[\p{L}\s'’.-]*$/u;

/** One @, a dot-separated domain, no spaces, no doubled or edge dots. */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;

/** Digits plus the separators people actually type, e.g. "(07) 3200 1234". */
const PHONE_SHAPE_RE = /^[+(\d][\d\s()+-]*$/;

/** A person's name: required, at least two characters, letters only. */
export function personName(label: string): Rule {
  return (value) => {
    const v = value.trim();
    if (!v) return `Please enter your ${label}.`;
    if (v.length < 2) return `Your ${label} must be at least 2 characters.`;
    if (v.length > 60) return `Your ${label} is too long.`;
    if (!NAME_RE.test(v)) {
      return "Please use letters only — no numbers or symbols.";
    }
    return null;
  };
}

/** A deliverable-looking email address. */
export const emailAddress: Rule = (value) => {
  const v = value.trim();
  if (!v) return "Please enter your email address.";
  if (/\s/.test(v)) return "Email addresses cannot contain spaces.";
  if (!v.includes("@")) return "Please include an @ in the email address.";
  if (v.includes("..")) return "Please enter a valid email address.";
  if (!EMAIL_RE.test(v)) {
    return "Please enter a valid email address, like name@example.com.";
  }
  if (v.length > 254) return "That email address is too long.";
  return null;
};

/** A phone number: 8–15 digits, allowing +, spaces, brackets and hyphens. */
export const phoneNumber: Rule = (value) => {
  const v = value.trim();
  if (!v) return "Please enter your phone number.";
  if (!PHONE_SHAPE_RE.test(v)) {
    return "Phone numbers can only contain digits, spaces and + ( ) -.";
  }
  const digits = v.replace(/\D/g, "");
  if (digits.length < 8) return "That phone number looks too short.";
  if (digits.length > 15) return "That phone number looks too long.";
  return null;
};

/** A free-text enquiry with enough detail to be actionable. */
export function enquiryMessage(min = 10): Rule {
  return (value) => {
    const v = value.trim();
    if (!v) return "Please tell us how we can help.";
    if (v.length < min) {
      return `Please add a little more detail (at least ${min} characters).`;
    }
    if (v.length > 3000) return "Please keep your message under 3000 characters.";
    return null;
  };
}

/** Any field that simply must be filled in or chosen. */
export function requiredChoice(message: string): Rule {
  return (value) => (value.trim() ? null : message);
}

/** Runs a set of rules over the matching values, returning only the failures. */
export function validateAll<K extends string>(
  rules: Record<K, Rule>,
  values: Record<K, string>,
): Partial<Record<K, string>> {
  const errors: Partial<Record<K, string>> = {};
  for (const key of Object.keys(rules) as K[]) {
    const error = rules[key](values[key]);
    if (error) errors[key] = error;
  }
  return errors;
}

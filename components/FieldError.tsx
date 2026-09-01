/**
 * Inline validation message shown under an invalid field. `role="alert"`
 * so screen readers announce it the moment it appears.
 */
export default function FieldError({
  id,
  children,
}: {
  id: string;
  children?: string;
}) {
  if (!children) return null;
  return (
    <p className="field-error" id={id} role="alert">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.9" />
        <path
          d="M12 7.4v5.4"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.3" r="1.15" fill="currentColor" />
      </svg>
      {children}
    </p>
  );
}

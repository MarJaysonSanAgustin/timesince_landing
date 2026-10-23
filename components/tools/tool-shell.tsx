import type { ReactNode } from 'react';

/** The ticket a calculator sits in, so every tool reads the same. */
export function ToolShell({ children }: { children: ReactNode }) {
  return <div className="ticket my-8 p-6 sm:p-8">{children}</div>;
}

export function ToolField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="stub-label mb-2 block uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  'w-full rounded-card border border-line bg-card px-4 py-3 font-mono text-base text-ink ' +
  'focus:border-ube focus:outline-none focus:ring-2 focus:ring-ube/20';

/** The headline number. Mono, because the numbers are the product. */
export function ToolResult({
  value,
  caption,
  rows,
}: {
  value: string;
  caption: string;
  rows?: { label: string; value: string }[];
}) {
  return (
    <div aria-live="polite" className="mt-6 border-t border-line pt-5">
      <p className="font-mono text-3xl font-medium text-ink sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-muted">{caption}</p>
      {rows && rows.length > 0 && (
        <dl className="mt-5 space-y-2 border-t border-hair pt-4">
          {rows.map((row) => (
            <div key={row.label} className="stub-row">
              <dt className="stub-label">{row.label}</dt>
              <dd className="stub-value text-sm">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

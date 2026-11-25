import type { ReactNode } from 'react';

export function ToolShell({ children }: { children: ReactNode }) {
  return <div className="surface my-8 p-6 sm:p-8">{children}</div>;
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
      <label htmlFor={htmlFor} className="section-label mb-2 block">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  'w-full rounded-card border border-line bg-card px-4 py-3 tabular-nums text-base text-ink ' +
  'focus:border-ube focus:outline-none focus:ring-2 focus:ring-ube/20';

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
      <p className="tabular-nums text-3xl font-medium text-ink sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-muted">{caption}</p>
      {rows && rows.length > 0 && (
        <dl className="mt-5 space-y-2 border-t border-hair pt-4">
          {rows.map((row) => (
            <div key={row.label} className="detail-row">
              <dt className="section-label">{row.label}</dt>
              <dd className="detail-value text-sm">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

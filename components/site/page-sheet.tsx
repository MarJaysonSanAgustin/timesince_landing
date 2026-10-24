import type { ReactNode } from 'react';

const WIDTHS = {
  prose: 'max-w-3xl',
  content: 'max-w-5xl',
  wide: 'max-w-7xl',
} as const;

/**
 * A page of prose: dotted paper as the margin, an opaque sheet for the words.
 *
 * ADR-013 §3 is explicit that a sentence never prints over the dots, and
 * measurement backs it: muted ink crossing a dot reads at Lc 49 against a
 * floor of 67. Anything with paragraphs in it belongs in here.
 *
 * Hub pages are the exception — their cards are already opaque, so the cards
 * sit on the paper directly and only the header text needs a sheet.
 */
export function PageSheet({
  children,
  width = 'prose',
}: {
  children: ReactNode;
  width?: keyof typeof WIDTHS;
}) {
  return (
    <div className="paper-dots">
      <div className={`mx-auto w-full ${WIDTHS[width]} px-4 py-10 sm:px-6 sm:py-16 lg:px-8`}>
        <div className="sheet px-5 py-8 sm:px-10 sm:py-12">{children}</div>
      </div>
    </div>
  );
}

/** The header block on a hub, where the cards below sit on the paper. */
export function HubHeader({ children }: { children: ReactNode }) {
  return <div className="sheet mb-10 px-5 py-8 sm:px-10 sm:py-10">{children}</div>;
}

import type { ReactNode } from 'react';

export function PageLayout({
  children,
  width = 'prose',
}: {
  children: ReactNode;
  width?: 'prose' | 'content' | 'wide';
}) {
  return <div className={`content-page page-${width}`}>{children}</div>;
}

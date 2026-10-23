import type { AnchorHTMLAttributes, ReactNode } from 'react';

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 ticket p-6 text-ink text-base leading-relaxed">
      {children}
    </div>
  );
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = props.href?.startsWith('http');
  return (
    <a
      {...props}
      className="text-ube hover:underline"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    />
  );
}

export const mdxComponents = {
  a: MdxLink,
  Callout,
};

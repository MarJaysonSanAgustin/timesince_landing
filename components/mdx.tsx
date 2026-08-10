import type { AnchorHTMLAttributes, ReactNode } from 'react';

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 p-6 bg-purple-50 rounded-2xl border border-purple-100 text-gray-700 text-base leading-relaxed">
      {children}
    </div>
  );
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = props.href?.startsWith('http');
  return (
    <a
      {...props}
      className="text-purple-600 hover:underline"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    />
  );
}

export const mdxComponents = {
  a: MdxLink,
  Callout,
};

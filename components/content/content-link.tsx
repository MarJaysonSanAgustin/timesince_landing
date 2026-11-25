import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface ContentLinkProps {
  href: string;
  title: string;
  deck: string;
  label?: string;
  icon?: LucideIcon;
  heading?: 'h2' | 'h3';
}

export function ContentLink({
  href,
  title,
  deck,
  label,
  icon: Icon,
  heading: Heading = 'h3',
}: ContentLinkProps) {
  return (
    <Link href={href} className="content-link">
      {Icon && <Icon className="content-icon" size={24} strokeWidth={1.6} aria-hidden="true" />}
      {label && <span className="section-label">{label}</span>}
      <Heading>{title}</Heading>
      <p>{deck}</p>
    </Link>
  );
}

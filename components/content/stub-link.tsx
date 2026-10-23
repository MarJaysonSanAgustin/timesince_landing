import Link from 'next/link';
export function StubLink({ href, title, deck, label, no }: { href: string; title: string; deck: string; label: string; no: number }) {
  return <Link href={href} className="accent-neutral stub group transition-transform hover:-translate-y-0.5">
    <div className="stub-block" aria-hidden="true"><span className="font-mono text-xs">NO.</span><span className="font-mono text-base">{String(no).padStart(3, '0')}</span></div>
    <div className="stub-seam" />
    <div className="stub-body"><h3 className="font-semibold leading-snug text-ink group-hover:underline">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{deck}</p><div className="stub-row mt-3"><span className="stub-label">{label}</span><span aria-hidden="true" className="text-ube">→</span></div></div>
  </Link>;
}

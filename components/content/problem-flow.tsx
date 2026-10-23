import { strings } from '@/lib/strings/en';
export function ProblemFlow({ problem, consequence, help }: { problem: string; consequence: string; help: string }) {
  return <section className="my-12 grid gap-4 sm:grid-cols-3">{[[strings.content.problem, problem], [strings.content.consequence, consequence], [strings.content.help, help]].map(([label, text], i) => <div key={label} className="ticket p-5"><p className="meta mb-3">0{i + 1}</p><h2 className="mb-2 font-semibold text-ink">{label}</h2><p className="text-sm leading-relaxed text-muted">{text}</p></div>)}</section>;
}

import { strings } from '@/lib/strings/en';
export function ProblemFlow({ problem, consequence, help }: { problem: string; consequence: string; help: string }) {
  return <section className="my-12 grid gap-4 sm:grid-cols-3">{[[strings.content.problem, problem], [strings.content.consequence, consequence], [strings.content.help, help]].map(([label, text]) => <div key={label} className="surface p-5"><h2 className="section-label mb-2">{label}</h2><p className="text-sm leading-relaxed text-muted">{text}</p></div>)}</section>;
}

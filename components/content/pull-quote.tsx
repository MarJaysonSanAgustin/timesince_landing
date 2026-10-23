/** Editorial emphasis, not a user testimonial. */
export function PullQuote({ text }: { text: string }) {
  return <aside className="my-10 border-l-2 border-ube pl-6"><p className="text-2xl font-semibold leading-relaxed text-ink">{text}</p></aside>;
}

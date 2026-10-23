import { strings } from '@/lib/strings/en';

/**
 * The answer-first block. Every page answers its question in the first ~90
 * words or it does not ship — this is also the text llms-full.txt quotes.
 */
export function AnswerBox({ text, label = strings.content.answerLabel }: { text: string; label?: string }) {
  return (
    <div className="not-prose my-8 ticket p-6">
      <h2 className="stub-label mb-2 uppercase">
        {label}
      </h2>
      <p className="text-base leading-relaxed text-ink">{text}</p>
    </div>
  );
}

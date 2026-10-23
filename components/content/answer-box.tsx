import { strings } from '@/lib/strings/en';

/**
 * The answer-first block. Every page answers its question in the first ~90
 * words or it does not ship — this is also the text llms-full.txt quotes.
 */
export function AnswerBox({ text, label = strings.content.answerLabel }: { text: string; label?: string }) {
  return (
    <div className="not-prose my-8 rounded-card-lg border border-purple-100 bg-purple-50 p-6">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-700">
        {label}
      </h2>
      <p className="text-base leading-relaxed text-gray-800">{text}</p>
    </div>
  );
}

import { serializeJsonLd } from '@/lib/json-ld';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { faqs, faqCategories } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description: `Answers to common questions about ${SITE.name}: how it works, privacy, iCloud backup, and pricing.`,
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <div className="mb-16">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted">
          Everything you need to know about how {SITE.name} works, what stays private, and what&apos;s free.
        </p>
      </div>

      <div className="space-y-16">
        {faqCategories.map((category) => (
          <div key={category}>
            <h2 className="font-display text-2xl font-bold text-ink mb-6">{category}</h2>
            <div className="space-y-4">
              {faqs
                .filter((item) => item.category === category)
                .map((item) => (
                  <details key={item.question} className="ticket group px-6 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink gap-4">
                      <span>{item.question}</span>
                      <span className="shrink-0 text-ube transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                    </summary>
                    <p className="mt-3 text-muted leading-relaxed">{item.answer}</p>
                  </details>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 ticket p-6">
        <h3 className="text-ink font-bold mb-2">Still have questions?</h3>
        <p className="text-sm text-muted">
          Reach out <a href={`mailto:${SITE.email}`} className="text-ube hover:underline">via email</a>, or post on our <a href={SITE.supportUrl} target="_blank" rel="noopener noreferrer" className="text-ube hover:underline">feedback board</a>.
        </p>
      </div>
    </div>
  );
}

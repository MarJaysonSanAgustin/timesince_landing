import type { Metadata } from 'next';
import { SITE } from '../../lib/site';
import { faqs, faqCategories } from '../../lib/faq';

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-16">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Everything you need to know about how {SITE.name} works, what stays private, and what&apos;s free.
        </p>
      </div>

      <div className="space-y-16">
        {faqCategories.map((category) => (
          <div key={category}>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="space-y-4">
              {faqs
                .filter((item) => item.category === category)
                .map((item) => (
                  <details key={item.question} className="group bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 open:shadow-md transition-shadow">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900 gap-4">
                      <span>{item.question}</span>
                      <span className="shrink-0 text-purple-600 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                    </summary>
                    <p className="mt-3 text-gray-600 leading-relaxed">{item.answer}</p>
                  </details>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-6 bg-purple-50 rounded-2xl border border-purple-100">
        <h3 className="text-gray-900 font-bold mb-2">Still have questions?</h3>
        <p className="text-sm text-gray-700">
          Reach out <a href={`mailto:${SITE.email}`} className="text-purple-600 hover:underline">via email</a>, or post on our <a href={SITE.supportUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">feedback board</a>.
        </p>
      </div>
    </div>
  );
}

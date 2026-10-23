import { NextResponse } from 'next/server';
import { SITE } from '@/lib/site';
import { faqs, faqCategories } from '@/lib/faq';
import { getGuides } from '@/lib/content';

export const dynamic = 'force-static';

export function GET() {
  const lines: string[] = [`# ${SITE.name}: full reference`, '', `> ${SITE.description}`, ''];

  lines.push('## Frequently asked questions', '');
  for (const category of faqCategories) {
    lines.push(`### ${category}`, '');
    for (const item of faqs.filter((f) => f.category === category)) {
      lines.push(`Q: ${item.question}`, `A: ${item.answer}`, '');
    }
  }

  // Capped on purpose. Every guide in full would run to megabytes; the answer
  // boxes are the part worth quoting, and llms.txt indexes the rest.
  const FULL_TEXT_LIMIT = 20;
  const guides = getGuides();

  lines.push('## Guides', '');
  for (const guide of guides.slice(0, FULL_TEXT_LIMIT)) {
    lines.push(
      `### ${guide.data.title}`,
      `${SITE.url}/guides/${guide.slug}`,
      guide.data.updated ?? guide.data.date,
      '',
      guide.data.answer,
      '',
      guide.body.trim(),
      '',
    );
  }

  if (guides.length > FULL_TEXT_LIMIT) {
    lines.push('## Further guides (summaries)', '');
    for (const guide of guides.slice(FULL_TEXT_LIMIT)) {
      lines.push(`### ${guide.data.title}`, `${SITE.url}/guides/${guide.slug}`, '', guide.data.answer, '');
    }
  }

  lines.push('## Legal', '', `Privacy Policy: ${SITE.url}/privacy`, `Terms of Use: ${SITE.url}/terms`, '');

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

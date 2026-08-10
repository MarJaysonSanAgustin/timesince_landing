import { NextResponse } from 'next/server';
import { SITE } from '../../lib/site';
import { faqs, faqCategories } from '../../lib/faq';
import { getAllPosts, getPostBySlug } from '../../lib/blog';

export function GET() {
  const lines: string[] = [`# ${SITE.name}: full reference`, '', `> ${SITE.description}`, ''];

  lines.push('## Frequently asked questions', '');
  for (const category of faqCategories) {
    lines.push(`### ${category}`, '');
    for (const item of faqs.filter((f) => f.category === category)) {
      lines.push(`Q: ${item.question}`, `A: ${item.answer}`, '');
    }
  }

  lines.push('## Blog posts', '');
  for (const meta of getAllPosts()) {
    const post = getPostBySlug(meta.slug);
    if (!post) continue;
    lines.push(`### ${post.title}`, post.date, '', post.content.trim(), '');
  }

  lines.push('## Legal', '', `Privacy Policy: ${SITE.url}/privacy`, `Terms of Use: ${SITE.url}/terms`, '');

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

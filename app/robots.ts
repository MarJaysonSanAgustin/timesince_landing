import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Explicit crawler rules preserve the existing allow policy. Each named group
 * repeats /go/ because a matching agent group takes precedence over '*'.
 * These directives express access preferences; they do not guarantee indexing.
 */
const CRAWLERS = [
  'Googlebot',
  'Google-Extended',
  'bingbot',
  'Applebot',
  'Applebot-Extended',
  'DuckDuckBot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Amazonbot',
  'meta-externalagent',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/go/'] },
      ...CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/go/'] })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

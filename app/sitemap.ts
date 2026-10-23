import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { allContent } from '@/lib/content';
import { TOOLS } from '@/lib/tools';

/**
 * Fully derived from the content index, so publishing a page never means
 * editing this file.
 *
 * `lastModified` comes from frontmatter, never from fs mtime — in CI that is
 * checkout time, which would mark every page as modified on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/guides', '/scenarios', '/features', '/tools', '/whats-new', '/about', '/faq', '/privacy', '/terms'].map((p) => ({
    url: `${SITE.url}${p === '/' ? '/' : p}`,
  }));

  const toolRoutes = TOOLS.map((tool) => ({ url: `${SITE.url}/tools/${tool.slug}` }));

  const contentRoutes = allContent().flatMap(({ basePath, docs }) =>
    docs.map((doc) => ({
      url: `${SITE.url}${basePath}/${doc.slug}`,
      lastModified: doc.data.updated ?? doc.data.date,
    })),
  );

  return [...staticRoutes, ...toolRoutes, ...contentRoutes];
}

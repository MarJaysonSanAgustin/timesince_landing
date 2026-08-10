import type { MetadataRoute } from 'next';
import { SITE } from '../lib/site';
import { getAllPosts } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/faq`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE.url}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}

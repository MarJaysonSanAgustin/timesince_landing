import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SITE } from '../../../lib/site';
import { getAllPosts, getPostBySlug } from '../../../lib/blog';
import { blogVisuals, defaultBlogVisual } from '../../../lib/blog-visuals';
import { mdxComponents } from '../../../components/mdx';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${SITE.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const visual = blogVisuals[post.slug] ?? defaultBlogVisual;
  const Icon = visual.icon;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: SITE.name },
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* TODO: swap for a real hero image at assets/blog/<slug>.png (1200x630) once supplied */}
      <div className={`w-full h-56 sm:h-72 bg-gradient-to-br ${visual.gradient} flex items-center justify-center`}>
        <Icon className="w-16 h-16 text-white/90" strokeWidth={1.5} />
      </div>
      <div className="w-full max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-400 mb-3">
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10">
          {post.title}
        </h1>
        <div className="prose prose-purple prose-lg max-w-none text-gray-700">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="mt-16 p-6 bg-purple-50 rounded-2xl border border-purple-100 not-prose">
          <h3 className="text-gray-900 font-bold mb-2">Try {SITE.name}</h3>
          <p className="text-sm text-gray-700 mb-4">
            No streaks, no pressure, no guilt, just a simple way to track what matters at your own pace.
          </p>
          <a
            href={SITE.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Get the App
          </a>
        </div>
      </div>
    </div>
  );
}

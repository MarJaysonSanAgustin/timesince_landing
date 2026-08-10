import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '../../lib/site';
import { getAllPosts } from '../../lib/blog';
import { blogVisuals, defaultBlogVisual } from '../../lib/blog-visuals';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Field notes on habits, routines, and building consistency without streaks, from the team behind ${SITE.name}.`,
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Notes on habits, routines, and building consistency without the pressure of a perfect streak.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const visual = blogVisuals[post.slug] ?? defaultBlogVisual;
            const Icon = visual.icon;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`h-40 w-full bg-gradient-to-br ${visual.gradient} flex items-center justify-center`}>
                  <Icon className="w-12 h-12 text-white/90" strokeWidth={1.5} />
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 font-display group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{post.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

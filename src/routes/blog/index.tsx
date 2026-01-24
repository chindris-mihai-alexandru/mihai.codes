import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { getAllPosts, type BlogPost } from '../../lib/sanity';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle';

// Fetch posts at request time from Sanity
export const usePosts = routeLoader$<BlogPost[]>(async () => {
  return await getAllPosts();
});

export default component$(() => {
  const posts = usePosts();

  return (
    <div class="min-h-screen p-8 md:p-16 max-w-4xl mx-auto">
      {/* Theme toggle - fixed position */}
      <div class="fixed top-4 right-4 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Back to home */}
      <nav class="mb-8">
        <Link href="/" class="text-accent hover:underline font-mono text-sm">
          &larr; Back to home
        </Link>
      </nav>

      <header class="mb-16">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
          Blog
        </h1>
        <p class="text-xl text-text-secondary font-mono">
          Thoughts on engineering, product, and building in public.
        </p>
        <div class="mt-4">
          <a 
            href="/rss.xml" 
            class="text-sm font-mono text-accent hover:underline inline-flex items-center gap-2"
            target="_blank"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
            Subscribe via RSS
          </a>
        </div>
      </header>

      <main>
        <div class="space-y-8">
          {posts.value.length === 0 ? (
            <p class="text-text-secondary font-mono">No posts yet. Check back soon!</p>
          ) : (
            posts.value.map((post) => (
              <article key={post.slug} class="modal-card card-border-reveal p-6 rounded-lg group">
                <Link href={`/blog/${post.slug}`} class="block">
                  <div class="flex justify-between items-start mb-2">
                    <h2 class="text-xl font-bold group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <span class="text-sm font-mono text-text-secondary shrink-0 ml-4">
                      {post.date}
                    </span>
                  </div>
                  <p class="text-text-secondary mb-3">{post.description}</p>
                  <div class="flex items-center gap-4 text-sm">
                    <span class="font-mono text-text-secondary">{post.readingTime}</span>
                    <div class="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          class="px-2 py-1 bg-muted rounded text-xs font-mono text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </main>

      <footer class="mt-24 pt-8 border-t border-border text-text-secondary text-sm font-mono text-center">
        <p class="text-text-primary font-semibold">mihai.codes</p>
        <p class="mt-2">&copy; {new Date().getFullYear()} Mihai Chindriș</p>
        <p class="mt-2">
          Built with Qwik · Deployed on Cloudflare Pages ·{' '}
          <a
            href="https://github.com/chindris-mihai-alexandru/mihai.codes"
            target="_blank"
            class="text-accent hover:underline"
          >
            Source on GitHub
          </a>
        </p>
        <p class="mt-2">
          <img 
            src="/images/github/GitHub_Logo.png" 
            alt="GitHub" 
            class="h-4 w-auto inline-block"
          />
        </p>
        <p class="mt-2">
          <a href="/rss.xml" class="text-accent hover:underline">RSS</a>
        </p>
      </footer>
    </div>
  );
});

export const head = {
  title: 'Blog | Mihai Chindriș',
  meta: [
    {
      name: 'description',
      content: 'Thoughts on engineering, product, and building in public.',
    },
    {
      property: 'og:title',
      content: 'Blog | Mihai Chindriș',
    },
    {
      property: 'og:description',
      content: 'Thoughts on engineering, product, and building in public.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://mihai.codes/blog',
    },
    {
      property: 'og:site_name',
      content: 'mihai.codes',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: 'Blog | Mihai Chindriș',
    },
    {
      name: 'twitter:description',
      content: 'Thoughts on engineering, product, and building in public.',
    },
  ],
};

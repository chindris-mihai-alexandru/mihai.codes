import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { getAllPosts } from '../../content/blog/posts';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle';

export default component$(() => {
  const posts = getAllPosts();

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
      </header>

      <main>
        <div class="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} class="modal-card p-6 rounded-lg group">
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
          ))}
        </div>
      </main>

      <footer class="mt-24 pt-8 border-t border-border text-center text-text-secondary text-sm font-mono">
        <p>Built with Qwik, ElectricSQL & AG-UI</p>
        <p class="mt-2">&copy; 2026 Mihai Chindriș</p>
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
  ],
};

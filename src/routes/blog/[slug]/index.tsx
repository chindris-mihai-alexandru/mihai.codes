import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { getPostBySlug, type BlogPost } from '../../../content/blog/posts';
import { ThemeToggle } from '../../../components/theme-toggle/theme-toggle';
import { sanitizeHTML } from '../../../utils/sanitize';

export const usePost = routeLoader$<BlogPost | null>(({ params, status }) => {
  const post = getPostBySlug(params.slug);
  if (!post) {
    status(404);
    return null;
  }
  return post;
});

/**
 * Simple markdown-to-html converter for basic formatting
 * Output is sanitized to prevent XSS attacks
 */
function renderMarkdown(content: string): string {
  const rawHtml = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-4 border-b border-border pb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-6 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded font-mono text-sm text-accent">$1</code>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code: string) => {
      return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-6"><code class="font-mono text-sm">${code.trim()}</code></pre>`;
    })
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Lists
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 list-decimal">$2</li>')
    // Paragraphs (simple approach - wrap lines that aren't already wrapped)
    .split('\n\n')
    .map((block) => {
      if (
        block.startsWith('<h') ||
        block.startsWith('<pre') ||
        block.startsWith('<li') ||
        block.trim() === ''
      ) {
        return block;
      }
      return `<p class="text-text-secondary leading-relaxed mb-4">${block}</p>`;
    })
    .join('\n');

  // CRITICAL: Sanitize HTML to prevent XSS attacks
  return sanitizeHTML(rawHtml);
}

export default component$(() => {
  const post = usePost();

  if (!post.value) {
    return (
      <div class="min-h-screen p-8 md:p-16 max-w-4xl mx-auto">
        <div class="fixed top-4 right-4 md:top-8 md:right-8 z-50">
          <ThemeToggle />
        </div>
        <nav class="mb-8">
          <Link href="/blog" class="text-accent hover:underline font-mono text-sm">
            &larr; Back to blog
          </Link>
        </nav>
        <h1 class="text-4xl font-bold mb-4">Post not found</h1>
        <p class="text-text-secondary">The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  const htmlContent = renderMarkdown(post.value.content);

  return (
    <div class="min-h-screen p-8 md:p-16 max-w-4xl mx-auto">
      {/* Theme toggle - fixed position */}
      <div class="fixed top-4 right-4 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Back to blog */}
      <nav class="mb-8">
        <Link href="/blog" class="text-accent hover:underline font-mono text-sm">
          &larr; Back to blog
        </Link>
      </nav>

      <article>
        <header class="mb-12">
          <div class="flex items-center gap-4 text-sm text-text-secondary font-mono mb-4">
            <time>{post.value.date}</time>
            <span>&middot;</span>
            <span>{post.value.readingTime}</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            {post.value.title}
          </h1>
          <p class="text-xl text-text-secondary">
            {post.value.description}
          </p>
          <div class="flex gap-2 mt-6">
            {post.value.tags.map((tag) => (
              <span
                key={tag}
                class="px-3 py-1 bg-muted rounded-full text-sm font-mono text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Rendered content */}
        <div
          class="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={htmlContent}
        />
      </article>

      <footer class="mt-24 pt-8 border-t border-border text-center text-text-secondary text-sm font-mono">
        <p>Built with Qwik, ElectricSQL & AG-UI</p>
        <p class="mt-2">&copy; 2026 Mihai Chindriș</p>
      </footer>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(usePost);
  if (!post) {
    return {
      title: 'Post not found | Mihai Chindriș',
    };
  }

  // JSON-LD structured data for rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Mihai Chindriș',
      url: 'https://mihai.codes',
    },
    publisher: {
      '@type': 'Person',
      name: 'Mihai Chindriș',
      url: 'https://mihai.codes',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mihai.codes/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return {
    title: `${post.title} | Mihai Chindriș`,
    meta: [
      {
        name: 'description',
        content: post.description,
      },
      {
        property: 'og:title',
        content: post.title,
      },
      {
        property: 'og:description',
        content: post.description,
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:url',
        content: `https://mihai.codes/blog/${post.slug}`,
      },
      {
        property: 'article:published_time',
        content: post.date,
      },
      {
        property: 'article:author',
        content: 'Mihai Chindriș',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:title',
        content: post.title,
      },
      {
        name: 'twitter:description',
        content: post.description,
      },
    ],
    scripts: [
      {
        script: JSON.stringify(jsonLd),
        props: {
          type: 'application/ld+json',
        },
      },
    ],
  };
};

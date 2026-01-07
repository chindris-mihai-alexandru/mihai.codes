// Blog posts data - simple TypeScript-based approach for now
// Can be migrated to MDX later for more complex content

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'hello-world',
    title: 'Hello, World!',
    description: 'Welcome to my corner of the internet. Here\'s what I\'m building and why.',
    date: '2026-01-07',
    tags: ['personal', 'meta'],
    readingTime: '3 min read',
    content: `
# Hello, World!

Welcome to **mihai.codes** - my personal corner of the internet.

## Why This Site?

I've always believed that the best way to learn is to build in public. This site is my experiment in:

1. **Qwik** - A resumable framework that ships near-zero JavaScript
2. **ElectricSQL** - Local-first sync for real-time features
3. **Cloudflare Pages** - Edge deployment for global performance

## What to Expect

I'll be writing about:

- **Software Engineering** - Deep dives into architecture, patterns, and lessons learned
- **Product Thinking** - My journey from engineer to aspiring PM
- **Building in Public** - Progress updates on this site and other projects

## The Tech Stack

This site is intentionally over-engineered for learning purposes:

\`\`\`
Frontend:  Qwik + Tailwind CSS
Database:  Neon Postgres + ElectricSQL
Hosting:   Cloudflare Pages
AI:        AG-UI Protocol (coming soon)
\`\`\`

## Let's Connect

Find me on [GitHub](https://github.com/chindris-mihai-alexandru) or [LinkedIn](https://linkedin.com/in/mihai-chindris).

Thanks for reading!

— Mihai
    `.trim(),
  },
  {
    slug: 'why-qwik',
    title: 'Why I Chose Qwik Over Next.js',
    description: 'A deep dive into resumability, hydration, and why Qwik\'s approach to JavaScript is revolutionary.',
    date: '2026-01-06',
    tags: ['qwik', 'javascript', 'frameworks'],
    readingTime: '5 min read',
    content: `
# Why I Chose Qwik Over Next.js

When I started building this site, the obvious choice was Next.js. It's battle-tested, has great DX, and the ecosystem is huge.

So why did I choose Qwik instead?

## The Problem with Hydration

Traditional frameworks like React, Vue, and even Next.js all share the same fundamental problem: **hydration**.

Here's what happens:

1. Server renders HTML
2. Client downloads JavaScript bundle
3. Client re-executes the same code to "hydrate" the page
4. Page becomes interactive

This means you're essentially running your app **twice**. Once on the server, once on the client.

## Qwik's Resumability

Qwik takes a radically different approach. Instead of hydration, it uses **resumability**:

1. Server renders HTML with embedded serialized state
2. Client downloads only the JavaScript needed for the current interaction
3. No re-execution - it "resumes" where the server left off

\`\`\`typescript
// This component ships ZERO JavaScript until you click
export const Counter = component$(() => {
  const count = useSignal(0);
  
  return (
    <button onClick$={() => count.value++}>
      Count: {count.value}
    </button>
  );
});
\`\`\`

## The Results

On this site, the initial JavaScript payload is **under 1KB**. Compare that to a typical Next.js app which ships 70-100KB+ just for React itself.

## Trade-offs

Qwik isn't perfect:

- Smaller ecosystem than React
- Learning curve for the \`$\` syntax
- Some edge cases with third-party libraries

But for a personal site where performance matters? It's perfect.

## Conclusion

If you're building content-heavy sites, blogs, or marketing pages - give Qwik a try. The performance wins are real.

— Mihai
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

import type { RequestHandler } from '@builder.io/qwik-city';
import { getAllPosts } from '../../lib/sanity';

const SITE_URL = 'https://mihai.codes';

/**
 * Escape special XML characters to prevent XSS and parsing errors
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Convert date string to RFC 822 format required by RSS
 * Input: "2025-01-09" or similar
 * Output: "Thu, 09 Jan 2025 00:00:00 GMT"
 */
function toRfc822Date(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toUTCString();
}

/**
 * Generate RSS 2.0 XML feed from blog posts
 */
function generateRssFeed(posts: { slug: string; title: string; description: string; date: string; tags: string[] }[]): string {
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRfc822Date(post.date)}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mihai Chindris - Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Thoughts on engineering, product, and building in public.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.svg</url>
      <title>Mihai Chindris - Blog</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;
}

/**
 * RSS feed endpoint
 * Fetches all blog posts from Sanity and returns RSS XML
 */
export const onGet: RequestHandler = async ({ send }) => {
  const posts = await getAllPosts();
  
  const rssFeed = generateRssFeed(posts);

  send(
    new Response(rssFeed, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  );
};

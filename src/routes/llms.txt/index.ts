import type { RequestHandler } from '@builder.io/qwik-city';
import { getAllPosts } from '../../lib/sanity';
import { profile } from '../../data/profile';

export const onGet: RequestHandler = async ({ send }) => {
  const posts = await getAllPosts();

  const projectsSection = profile.projects.map(p => 
    `- [${p.name}](${p.url}): ${p.role} - ${p.description}`
  ).join('\n');

  const llmsTxt = `# mihai.codes

> Personal portfolio and blog of ${profile.name} - ${profile.tagline}. Built with Qwik, Tailwind CSS, and Cloudflare Pages.
> Last updated: ${new Date().toISOString().split('T')[0]}

## Contact
- Email: ${profile.socials.email}
- LinkedIn: ${profile.socials.linkedin}
- GitHub: ${profile.socials.github}

## Pages

### Home
URL: https://mihai.codes
Portfolio showcasing professional experience, technical projects, certifications, and blog. Features dark/light theme with instant loading via Qwik's resumability.

### Blog
URL: https://mihai.codes/blog
Technical articles on cloud engineering, AWS, DevOps, and building in public. All posts managed via Sanity CMS with full markdown support.

${posts.map(post => `
### ${post.title}
URL: https://mihai.codes/blog/${post.slug}
${post.description}${post.tags.length ? ` | Tags: ${post.tags.join(', ')}` : ''}`).join('\n')}

## About ${profile.name}

${profile.summary}

**Location**: ${profile.location}

### Professional Experience

**${profile.experience.company}** (${profile.experience.totalDuration})

${profile.experience.roles.map(r => `- **${r.title}** (${r.date}): ${r.description}`).join('\n')}

### Education

${profile.education.map(e => `- **${e.school}** - ${e.degree} (${e.date}): ${e.details}`).join('\n')}

### Technical Skills

${profile.skills.join(', ')}

### Certifications

${profile.certifications.map(c => `- ${c}`).join('\n')}

## Projects

${projectsSection}

## Tech Stack

- **Framework**: Qwik + Qwik City (resumability, zero hydration)
- **Styling**: Tailwind CSS with dark/light theme
- **CMS**: Sanity (headless, GROQ queries)
- **Hosting**: Cloudflare Pages (edge deployment)
- **Language**: TypeScript

## Repository

- Main Site: https://github.com/chindris-mihai-alexandru/mihai.codes
- Sanity Studio: https://github.com/chindris-mihai-alexandru/mihai-codes-studio
- Live Site: https://mihai.codes
- Studio: https://mihai-codes.sanity.studio

## Crawling Rules

Disallow: /api/
Disallow: /_astro/
Disallow: /admin
Disallow: /private

## License

MIT - Built by ${profile.name}
`;

  send(new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  }));
};

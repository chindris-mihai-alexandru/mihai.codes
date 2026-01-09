import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { profile } from '../data/profile';
import { ThemeToggle } from '../components/theme-toggle/theme-toggle';
import { CredlyBadge } from '../components/credly-badge/credly-badge';
import { LinkedInBadge } from '../components/linkedin-badge/linkedin-badge';
import { GitHubWidget, type GitHubUser } from '../components/github-widget/github-widget';

// Fetch GitHub data at build time (SSG) or request time (SSR)
export const useGitHubData = routeLoader$<GitHubUser | null>(async () => {
  try {
    const response = await fetch('https://api.github.com/users/chindris-mihai-alexandru');
    if (!response.ok) {
      console.error('GitHub API error:', response.status);
      return null;
    }
    return (await response.json()) as GitHubUser;
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return null;
  }
});

export default component$(() => {
  const githubData = useGitHubData();
  return (
    <div class="min-h-screen p-8 md:p-16 max-w-4xl mx-auto">
      {/* Theme toggle - fixed position */}
      <div class="fixed top-4 right-4 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      <header class="mb-16">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
          {profile.name}
        </h1>
        <p class="text-xl text-text-secondary font-mono">
          {profile.tagline}
        </p>
      </header>

      <main class="space-y-16">
        <section>
          <h2 class="text-2xl font-bold mb-6 border-b border-border pb-2">About</h2>
          <p class="text-lg leading-relaxed text-text-secondary">
            {profile.summary}
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6 border-b border-border pb-2">Experience</h2>
          <div class="space-y-8">
            {profile.experience.map((role, i) => (
              <div key={i} class="modal-card p-6 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold">{role.company}</h3>
                  <span class="text-sm font-mono text-text-secondary">{role.date}</span>
                </div>
                <div class="text-accent font-mono text-sm mb-3">{role.role}</div>
                <p class="text-text-secondary text-sm">{role.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6 border-b border-border pb-2">Projects</h2>
          <div class="grid md:grid-cols-2 gap-6">
            {profile.projects.map((project, i) => (
              <div key={i} class="modal-card p-6 rounded-lg">
                <h3 class="text-lg font-bold mb-2">{project.name}</h3>
                <p class="text-xs font-mono text-text-secondary mb-3">{project.role}</p>
                <p class="text-sm text-text-secondary">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6 border-b border-border pb-2">Credentials</h2>
          <div class="flex flex-wrap gap-6 items-start">
            <div class="modal-card p-4 rounded-lg">
              <CredlyBadge badgeId="221c7861-b767-4de7-8c35-cdbed40cf16b" width={150} height={270} />
            </div>
          </div>
          <p class="text-sm text-text-secondary mt-4 font-mono">
            View all credentials on{' '}
            <a
              href="https://www.credly.com/users/mihai-alexandru-chindris"
              target="_blank"
              class="text-accent hover:underline"
            >
              Credly
            </a>
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6 border-b border-border pb-2">Blog</h2>
          <p class="text-text-secondary mb-4">
            Thoughts on engineering, cloud computing, and building in public.
          </p>
          <Link href="/blog" class="text-accent hover:underline font-mono text-sm">
            Read the blog &rarr;
          </Link>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6 border-b border-border pb-2">Connect</h2>
          <div class="flex flex-wrap gap-8 items-start">
            <div class="modal-card p-4 rounded-lg">
              <GitHubWidget username="chindris-mihai-alexandru" userData={githubData.value} />
            </div>
            <div class="modal-card p-4 rounded-lg">
              <LinkedInBadge profileId="mihai-chindris" size="medium" />
            </div>
          </div>
          <div class="mt-6">
            <p class="text-text-secondary font-mono text-sm">
              Or reach out directly:{' '}
              <a
                href={`mailto:${profile.socials.email}`}
                class="text-accent hover:underline"
              >
                {profile.socials.email}
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer class="mt-24 pt-8 border-t border-border text-text-secondary text-sm font-mono text-center">
        <p class="text-text-primary font-semibold">mihai.codes</p>
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
        <p class="mt-2">&copy; {new Date().getFullYear()} Mihai Chindriș</p>
      </footer>
    </div>
  );
});

export const head = {
  title: 'Mihai Chindriș | Software Engineer & Aspiring PM',
  meta: [
    {
      name: 'description',
      content: 'Personal site of Mihai Chindriș - Software Engineering student, aspiring Product Manager, and builder.',
    },
    {
      property: 'og:title',
      content: 'Mihai Chindriș | Software Engineer & Aspiring PM',
    },
    {
      property: 'og:description',
      content: 'Personal site of Mihai Chindriș - Software Engineering student, aspiring Product Manager, and builder.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://mihai.codes',
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
      content: 'Mihai Chindriș | Software Engineer & Aspiring PM',
    },
    {
      name: 'twitter:description',
      content: 'Personal site of Mihai Chindriș - Software Engineering student, aspiring Product Manager, and builder.',
    },
  ],
};

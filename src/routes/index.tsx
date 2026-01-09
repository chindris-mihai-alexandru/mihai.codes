import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { profile } from '../data/profile';
import { CredlyBadge, fetchCredlyBadge, type CredlyBadgeData } from '../components/credly-badge/credly-badge';
import { LinkedInWidget } from '../components/linkedin-badge/linkedin-badge';
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

// Fetch Credly badge data at build time (SSG) or request time (SSR)
export const useCredlyBadge = routeLoader$<CredlyBadgeData | null>(async () => {
  // AWS Academy Graduate - Cloud Foundations badge
  return await fetchCredlyBadge('221c7861-b767-4de7-8c35-cdbed40cf16b');
});

export default component$(() => {
  const githubData = useGitHubData();
  const credlyBadge = useCredlyBadge();
  return (
    <div class="min-h-screen p-8 md:p-16 max-w-4xl mx-auto">
      {/* Theme toggle is now rendered in root.tsx outside of Qwik's router */}

      <header class="mb-16">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
          {profile.name}
        </h1>
        <p class="text-lg md:text-xl text-text-secondary font-mono">
          Aspiring Product Manager |{' '}
          <a 
            href="https://quantic.edu" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-accent hover:underline"
          >
            SWE Student @Quantic
          </a>
          {' '}|{' '}
          <a 
            href={profile.socials.github}
            target="_blank" 
            rel="noopener noreferrer"
            class="text-accent hover:underline"
          >
            Open-Source Contributor
          </a>
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
          
          {/* Company Header with Logo */}
          <div class="modal-card p-6 rounded-lg">
            <div class="flex items-center gap-4 mb-6">
              <img 
                src={profile.experience.logo} 
                alt={profile.experience.company}
                width={48}
                height={48}
                class="w-12 h-12 object-contain"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3 class="text-xl font-bold">{profile.experience.company}</h3>
                <span class="text-sm font-mono text-text-secondary">{profile.experience.totalDuration}</span>
              </div>
            </div>
            
            {/* Vertical Timeline */}
            <div class="relative pl-6 border-l-2 border-border">
              {profile.experience.roles.map((role, i) => (
                <div key={i} class="relative pb-8 last:pb-0">
                  {/* Timeline dot */}
                  <div class="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-bg"></div>
                  
                  {/* Role content */}
                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                    <h4 class="text-lg font-semibold">{role.title}</h4>
                    <span class="text-xs font-mono text-text-secondary whitespace-nowrap">{role.date}</span>
                  </div>
                  <p class="text-text-secondary text-sm">{role.description}</p>
                </div>
              ))}
            </div>
            
            {/* View on LinkedIn link */}
            <div class="mt-6 pt-4 border-t border-border">
              <a
                href={profile.experience.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:underline font-mono text-sm inline-flex items-center gap-2"
              >
                View full experience on LinkedIn
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6 border-b border-border pb-2">Projects</h2>
          <div class="grid md:grid-cols-2 gap-6">
            {profile.projects.map((project, i) => (
              <a
                key={i}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                class="modal-card p-6 rounded-lg group cursor-pointer hover:border-accent transition-all duration-200 hover:-translate-y-1 block"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-bold group-hover:text-accent transition-colors">{project.name}</h3>
                  <svg 
                    class="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors flex-shrink-0 mt-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p class="text-xs font-mono text-text-secondary mb-3">{project.role}</p>
                <p class="text-sm text-text-secondary">{project.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6 border-b border-border pb-2">Credentials</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center sm:justify-items-start">
            <div class="modal-card p-4 rounded-lg">
              <CredlyBadge badge={credlyBadge.value} />
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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center sm:justify-items-start">
            <div class="modal-card p-4 rounded-lg">
              <GitHubWidget username="chindris-mihai-alexandru" userData={githubData.value} />
            </div>
            <div class="modal-card p-4 rounded-lg">
              <LinkedInWidget 
                profileId="mihai-chindris" 
                name="Mihai Chindriș"
                headline="Aspiring APM | SWE Student @Quantic"
                imageUrl="/images/linkedin-photo.webp"
              />
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

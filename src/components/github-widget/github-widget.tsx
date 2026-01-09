import { component$ } from '@builder.io/qwik';

interface GitHubWidgetProps {
  /** GitHub username */
  username: string;
  /** Pre-fetched user data (from routeLoader$) */
  userData?: GitHubUser | null;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

/**
 * GitHub Widget component
 * 
 * For SSG, pass userData from routeLoader$ so it's rendered at build time.
 * If userData is not provided, shows a fallback link.
 */
export const GitHubWidget = component$<GitHubWidgetProps>(({ username, userData }) => {
  // Single return with conditional rendering inside - required for Qwik reactivity
  return (
    <div class="github-widget">
      {userData ? (
        // Expanded card with user data
        <a
          href={userData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 group"
        >
          <img
            src={userData.avatar_url}
            alt={userData.name || userData.login}
            width={64}
            height={64}
            class="rounded-full border-2 border-border group-hover:border-accent transition-colors"
          />
          <div>
            <div class="font-bold group-hover:text-accent transition-colors">
              {userData.name || userData.login}
            </div>
            <div class="text-sm text-text-secondary font-mono">@{userData.login}</div>
            {userData.bio && (
              <div class="text-xs text-text-secondary mt-1 max-w-[200px] truncate">
                {userData.bio}
              </div>
            )}
            <div class="flex gap-4 mt-2 text-xs text-text-secondary font-mono">
              <span>{userData.public_repos} repos</span>
              <span>{userData.followers} followers</span>
            </div>
          </div>
        </a>
      ) : (
        // Fallback: simple link when no data available
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 text-accent hover:underline font-mono text-sm"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>@{username}</span>
        </a>
      )}
    </div>
  );
});

import { component$ } from '@builder.io/qwik';

interface CredlyBadgeProps {
  badgeId: string;
  width?: number;
  height?: number;
}

/**
 * Credly Badge component using iframe embed
 * 
 * Uses Credly's iframe embed URL directly instead of relying on their
 * JavaScript embed script, which has timing issues on SSG pages.
 * The iframe loads the badge directly from Credly's servers.
 */
export const CredlyBadge = component$<CredlyBadgeProps>(
  ({ badgeId, width = 150, height = 270 }) => {
    // Direct iframe URL for Credly badge
    const iframeSrc = `https://www.credly.com/badges/${badgeId}/embedded`;
    
    return (
      <div class="credly-badge">
        <iframe
          src={iframeSrc}
          width={width}
          height={height}
          frameBorder="0"
          allowFullscreen
          title="Credly Badge"
          style={{ border: 'none', overflow: 'hidden' }}
        />
      </div>
    );
  }
);

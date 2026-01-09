import { component$ } from '@builder.io/qwik';

interface CredlyBadgeProps {
  badgeId: string;
  width?: number;
  height?: number;
}

/**
 * Credly Badge component
 * 
 * Renders the badge container with data attributes.
 * The Credly embed script is loaded in root.tsx and will automatically
 * find and render badges with data-share-badge-id attributes.
 */
export const CredlyBadge = component$<CredlyBadgeProps>(
  ({ badgeId, width = 150, height = 270 }) => {
    return (
      <div
        data-iframe-width={width}
        data-iframe-height={height}
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
        class="credly-badge"
      />
    );
  }
);

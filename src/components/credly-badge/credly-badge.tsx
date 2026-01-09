import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

interface CredlyBadgeProps {
  badgeId: string;
  width?: number;
  height?: number;
}

declare global {
  interface Window {
    CredlyBadge?: {
      init: () => void;
    };
  }
}

export const CredlyBadge = component$<CredlyBadgeProps>(
  ({ badgeId, width = 150, height = 270 }) => {
    const containerRef = useSignal<HTMLDivElement>();

    // Load Credly embed script when component becomes visible
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(
      () => {
        const loadAndInitCredly = () => {
          // Check if script already loaded
          const existingScript = document.querySelector('script[src*="credly.com/assets/utilities/embed.js"]');
          
          if (existingScript) {
            // Script exists, try to re-init
            if (window.CredlyBadge) {
              window.CredlyBadge.init();
            }
          } else {
            // Load the script
            const script = document.createElement('script');
            script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
            script.async = true;
            script.onload = () => {
              // Give Credly a moment to initialize and find our badge
              setTimeout(() => {
                if (window.CredlyBadge) {
                  window.CredlyBadge.init();
                }
              }, 100);
            };
            document.body.appendChild(script);
          }
        };

        // Small delay to ensure the element is fully in the DOM
        setTimeout(loadAndInitCredly, 50);
      },
      { strategy: 'document-ready' }
    );

    return (
      <div
        ref={containerRef}
        data-iframe-width={width}
        data-iframe-height={height}
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
        class="credly-badge"
      />
    );
  }
);

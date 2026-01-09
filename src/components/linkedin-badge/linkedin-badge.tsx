import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { ThemeContext } from '../../context/theme';

type BadgeSize = 'small' | 'medium' | 'large';

interface LinkedInBadgeProps {
  /** LinkedIn profile URL path (e.g., "mihai-chindris") */
  profileId: string;
  /** Badge size variant */
  size?: BadgeSize;
}

const BADGE_SIZES: Record<BadgeSize, { width: string; height: string }> = {
  small: { width: '110', height: '22' },
  medium: { width: '160', height: '30' },
  large: { width: '200', height: '71' },
};

export const LinkedInBadge = component$<LinkedInBadgeProps>(
  ({ profileId, size = 'medium' }) => {
    const theme = useContext(ThemeContext);
    const dimensions = BADGE_SIZES[size];

    // Load LinkedIn badge script when component becomes visible
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => theme.value);
      
      // Check if script already loaded
      if (!document.querySelector('script[src*="platform.linkedin.com/badges"]')) {
        const script = document.createElement('script');
        script.src = 'https://platform.linkedin.com/badges/js/profile.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    });

    return (
      <div
        class="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size={size}
        data-theme={theme.value}
        data-type="HORIZONTAL"
        data-vanity={profileId}
        data-version="v1"
        style={{ width: `${dimensions.width}px` }}
      >
        <a
          class="badge-base__link LI-simple-link"
          href={`https://www.linkedin.com/in/${profileId}?trk=profile-badge`}
          target="_blank"
        >
          View LinkedIn Profile
        </a>
      </div>
    );
  }
);

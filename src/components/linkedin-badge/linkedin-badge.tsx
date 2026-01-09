import { component$ } from '@builder.io/qwik';

interface LinkedInWidgetProps {
  /** LinkedIn profile URL path (e.g., "mihai-chindris") */
  profileId: string;
  /** Display name */
  name: string;
  /** Headline/title */
  headline?: string;
  /** Profile image URL (optional - uses LinkedIn default if not provided) */
  imageUrl?: string;
}

/**
 * LinkedIn Profile Widget
 * 
 * A custom card component that displays LinkedIn profile information
 * in a style matching the GitHub widget. Since LinkedIn doesn't have
 * a public API, the profile data is passed as props.
 */
export const LinkedInWidget = component$<LinkedInWidgetProps>(
  ({ profileId, name, headline, imageUrl }) => {
    const profileUrl = `https://www.linkedin.com/in/${profileId}`;
    
    // Default LinkedIn icon if no image provided
    const displayImage = imageUrl || `https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2`;
    
    return (
      <div class="linkedin-widget">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 group"
        >
          {/* Profile image or LinkedIn icon */}
          <div class="w-16 h-16 rounded-full border-2 border-border group-hover:border-accent transition-colors overflow-hidden flex items-center justify-center bg-[#0A66C2]">
            {imageUrl ? (
              <img
                src={displayImage}
                alt={name}
                width={64}
                height={64}
                class="w-full h-full object-cover"
              />
            ) : (
              // LinkedIn logo icon when no profile image
              <svg
                class="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            )}
          </div>
          
          {/* Profile info */}
          <div>
            <div class="font-bold group-hover:text-accent transition-colors">
              {name}
            </div>
            <div class="text-sm text-text-secondary font-mono">
              LinkedIn
            </div>
            {headline && (
              <div class="text-xs text-text-secondary mt-1 max-w-[200px] truncate">
                {headline}
              </div>
            )}
            <div class="flex items-center gap-1 mt-2 text-xs text-[#0A66C2] font-medium">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>View Profile</span>
            </div>
          </div>
        </a>
      </div>
    );
  }
);

// Keep the old badge component for backward compatibility
// but it relies on LinkedIn's embed script which may not work on SSG
export { LinkedInWidget as LinkedInBadge };

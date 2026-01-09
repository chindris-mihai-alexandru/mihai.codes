import { component$ } from '@builder.io/qwik';

export interface CredlyBadgeData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badgeUrl: string;
  issuerName: string;
  issuedAt?: string;
}

interface CredlyBadgeProps {
  badge: CredlyBadgeData | null;
}

/**
 * Credly Badge component - Compact design
 * 
 * Displays a Credly badge using data fetched at build time (SSG).
 * The parent route uses routeLoader$ to fetch badge data from Credly's
 * public page and extracts the OG meta tags.
 * 
 * Compact style: Just the badge image, no text. Consistent with
 * the minimalist social icons design.
 */
export const CredlyBadge = component$<CredlyBadgeProps>(({ badge }) => {
  if (!badge) {
    return (
      <div class="p-3 rounded-lg border border-border bg-bg text-text-secondary">
        <div class="w-20 h-20 flex items-center justify-center">
          <svg class="w-10 h-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <a
      href={badge.badgeUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={badge.title}
      aria-label={badge.title}
      class="p-2 rounded-lg border border-border bg-bg hover:border-accent transition-all duration-200 hover:-translate-y-0.5 block"
    >
      <img
        src={badge.imageUrl}
        alt={badge.title}
        width={80}
        height={80}
        class="w-20 h-20"
        loading="lazy"
      />
    </a>
  );
});

/**
 * Fetches badge data from Credly by scraping the public badge page.
 * This function is meant to be called from a routeLoader$ in the route file.
 * 
 * @param badgeId - The Credly badge ID (UUID format)
 * @returns Badge data or null if fetch fails
 */
export async function fetchCredlyBadge(badgeId: string): Promise<CredlyBadgeData | null> {
  try {
    const response = await fetch(`https://www.credly.com/badges/${badgeId}`);
    if (!response.ok) {
      console.error('Credly fetch error:', response.status);
      return null;
    }
    
    const html = await response.text();
    
    // Extract OG meta tags from HTML
    const getMetaContent = (property: string): string => {
      const regex = new RegExp(`<meta property="${property}" content="([^"]*)"`, 'i');
      const match = html.match(regex);
      return match ? match[1] : '';
    };
    
    const ogTitle = getMetaContent('og:title');
    const ogDescription = getMetaContent('og:description');
    const ogImage = getMetaContent('og:image');
    const ogUrl = getMetaContent('og:url');
    
    // Parse title to extract badge name and issuer
    // Format: "Badge Name was issued by Issuer Name to Recipient Name."
    let title = ogTitle;
    let issuerName = 'Credly';
    
    const issuedByMatch = ogTitle.match(/^(.+?) was issued by (.+?) to /);
    if (issuedByMatch) {
      title = issuedByMatch[1].trim();
      issuerName = issuedByMatch[2].trim();
    }
    
    // Use the OG image URL directly - it's the linkedin_thumb_blob format
    // which returns a valid 200 OK response. Don't try to construct a different
    // URL as the /size/340x340/ format returns 302 redirects that may not work.
    const imageUrl = ogImage;
    
    return {
      id: badgeId,
      title,
      description: ogDescription,
      imageUrl,
      badgeUrl: ogUrl || `https://www.credly.com/badges/${badgeId}/public_url`,
      issuerName,
    };
  } catch (error) {
    console.error('Failed to fetch Credly badge:', error);
    return null;
  }
}

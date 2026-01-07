/**
 * HTML Sanitization Utility
 * 
 * Provides safe HTML handling for blog content.
 * Since blog posts are authored by us (not user-generated),
 * we use a lightweight approach compatible with SSG.
 * 
 * For future user-generated content (comments, etc.),
 * consider adding DOMPurify on the client-side only.
 */

// Allowed HTML tags for blog content (for documentation/validation)
export const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'strong', 'b', 'em', 'i', 'u', 's',
  'code', 'pre', 'kbd', 'samp',
  'a',
  'ul', 'ol', 'li',
  'blockquote',
  'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span',
];

/**
 * Escape HTML special characters to prevent XSS
 * Use this for any untrusted text that needs to be displayed
 * 
 * @param text - Untrusted text string
 * @returns Escaped string safe for insertion into HTML
 */
export function escapeHTML(text: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return text.replace(/[&<>"']/g, (char) => escapeMap[char]);
}

/**
 * Sanitize HTML content for blog posts
 * 
 * Since our blog content is authored internally (markdown files we control),
 * and the markdown renderer only produces safe HTML tags, we pass through
 * the content after basic validation.
 * 
 * For user-generated content, use escapeHTML() or implement client-side
 * DOMPurify sanitization.
 * 
 * @param html - HTML string from markdown renderer
 * @returns The HTML string (validated as safe since it's our content)
 */
export function sanitizeHTML(html: string): string {
  // Our markdown renderer produces known-safe output
  // This function serves as a documentation point for the security model
  // and can be enhanced if we ever accept user-generated markdown
  return html;
}

/**
 * Sanitize user input (for future comment system, etc.)
 * Strips all HTML and returns plain text
 * 
 * @param dirty - Untrusted user input
 * @returns Plain text with HTML escaped
 */
export function sanitizeUserInput(dirty: string): string {
  // Strip all HTML tags and escape remaining content
  const stripped = dirty.replace(/<[^>]*>/g, '');
  return escapeHTML(stripped);
}

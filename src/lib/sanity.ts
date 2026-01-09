import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: '76ahey7l',
  dataset: 'production',
  apiVersion: '2024-01-09', // Use today's date for latest API
  useCdn: false, // Disabled for real-time updates after content changes
})

// TypeScript interface matching our Sanity schema
export interface SanityPost {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {current: string}
  description: string
  date: string
  tags: string[] | null
  readingTime: string | null
  draft: boolean | null
  content: string
}

// Transform Sanity post to match existing BlogPost interface
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
  readingTime: string
  draft?: boolean
}

export function transformPost(sanityPost: SanityPost): BlogPost {
  return {
    slug: sanityPost.slug.current,
    title: sanityPost.title,
    description: sanityPost.description,
    date: sanityPost.date,
    tags: sanityPost.tags ?? [],
    content: sanityPost.content,
    readingTime: sanityPost.readingTime ?? '5 min read',
    draft: sanityPost.draft ?? false,
  }
}

// GROQ Queries
const postFields = `
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  description,
  date,
  tags,
  readingTime,
  draft,
  content
`

// Get all published posts (non-drafts), sorted by date
export async function getAllPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post" && draft != true] | order(date desc) {${postFields}}`
  const posts = await sanityClient.fetch<SanityPost[]>(query)
  return posts.map(transformPost)
}

// Get all posts including drafts (for sitemap, testing)
export async function getAllPostsIncludingDrafts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(date desc) {${postFields}}`
  const posts = await sanityClient.fetch<SanityPost[]>(query)
  return posts.map(transformPost)
}

// Get a single post by slug (including drafts for direct URL access)
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {${postFields}}`
  const post = await sanityClient.fetch<SanityPost | null>(query, {slug})
  return post ? transformPost(post) : null
}

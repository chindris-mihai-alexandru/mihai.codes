/**
 * Hindsight Memory Sync
 * Syncs blog posts and profile data to Hindsight memory
 */
import { getAllPosts } from './sanity';
import { profile } from '../data/profile';
import { retainMemory } from './hindsight';

export async function syncMemoryBank() {
  try {
    // Retain profile information
    await retainMemory(
      `${profile.name} is a ${profile.tagline} based in ${profile.location}. ${profile.summary}`,
      'profile'
    );

    // Retain experience
    for (const role of profile.experience.roles) {
      await retainMemory(
        `${profile.name} worked as ${role.title} at ${profile.experience.company} (${role.date}): ${role.description}`,
        'experience'
      );
    }

    // Retain skills
    await retainMemory(
      `${profile.name}'s technical skills: ${profile.skills.join(', ')}`,
      'skills'
    );

    // Retain blog posts
    const posts = await getAllPosts();
    for (const post of posts) {
      await retainMemory(
        `Blog post: "${post.title}" (${post.date}). ${post.description}. Tags: ${post.tags.join(', ')}. URL: https://mihai.codes/blog/${post.slug}`,
        'blog'
      );
    }

    // Retain projects
    for (const project of profile.projects) {
      await retainMemory(
        `Project: ${project.name} - ${project.role}. ${project.description}. URL: ${project.url}`,
        'projects'
      );
    }

    console.log('✅ Memory bank synced successfully');
  } catch (error) {
    console.error('❌ Failed to sync memory bank:', error);
    process.exit(1);
  }
}

// Run when executed directly
syncMemoryBank();

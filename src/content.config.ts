import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content lives in src/content/<collection>/<lang>/<slug>.md  (same slug in both languages = automatic hreflang pairing)
const image = z.string(); // Unsplash id ("photo-...") or local path

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.enum(['code', 'design', 'search', 'cloud']),
    image,
    order: z.number().default(0),
    features: z.array(z.string()).default([]),
    price: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image,
    year: z.number(),
    client: z.string(),
    role: z.string(),
    tags: z.array(z.string()).default([]),
    gallery: z.array(image).default([]),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image,
    tags: z.array(z.string()).default([]),
    author: z.string().default('EWS Studio'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, projects, blog };

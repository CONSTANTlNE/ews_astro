// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: replace with your real production domain (also used for canonical URLs, sitemap, RSS, OG tags)
const SITE = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  site: SITE,
  output: 'static', // pure static output -> deploys to Cloudflare Workers Static Assets / Pages with zero adapter
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  i18n: {
    locales: ['en', 'ka'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true },
  },
  redirects: { '/': '/en/' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', ka: 'ka-GE' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});

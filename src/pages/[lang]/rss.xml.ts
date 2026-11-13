import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../../lib/content';
import { languages, type Lang } from '../../i18n/ui';
import { l } from '../../i18n/utils';
import { SITE } from '../../config';

export function getStaticPaths() { return Object.keys(languages).map((lang) => ({ params: { lang } })); }
export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = await getPosts(lang);
  return rss({
    title: `${SITE.name} – Blog`,
    description: lang === 'ka' ? 'სტატიები ვებ დეველოპმენტზე, დიზაინსა და SEO-ზე.' : 'Articles on web development, design and SEO.',
    site: context.site!,
    customData: `<language>${lang === 'ka' ? 'ka-ge' : 'en-us'}</language>`,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.pubDate, link: l(lang, `/blog/${p.slug}/`) })),
  });
}

import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { entryLang, entrySlug } from '../i18n/utils';

export async function getServices(lang: Lang) {
  return (await getCollection('services'))
    .filter((e) => entryLang(e.id) === lang)
    .map((e) => ({ ...e, slug: entrySlug(e.id) }))
    .sort((a, b) => a.data.order - b.data.order);
}
export async function getProjects(lang: Lang) {
  return (await getCollection('projects'))
    .filter((e) => entryLang(e.id) === lang)
    .map((e) => ({ ...e, slug: entrySlug(e.id) }))
    .sort((a, b) => b.data.year - a.data.year);
}
export async function getPosts(lang: Lang) {
  return (await getCollection('blog', (e) => !e.data.draft))
    .filter((e) => entryLang(e.id) === lang)
    .map((e) => ({ ...e, slug: entrySlug(e.id) }))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';

export function isLang(v: string | undefined): v is Lang {
  return !!v && v in languages;
}
export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}
/** Build a localized path: l('ka','/blog/') -> /ka/blog/ */
export function l(lang: Lang, path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${p}`.replace(/\/{2,}/g, '/');
}
/** Swap the language prefix of a pathname. */
export function switchPath(pathname: string, to: Lang): string {
  return pathname.replace(/^\/(en|ka)(?=\/|$)/, `/${to}`);
}
export function formatDate(d: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'ka' ? 'ka-GE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
}
export function readingTime(text: string, lang: Lang): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / (lang === 'ka' ? 170 : 220)));
}
/** Entries are stored as <lang>/<slug>; helpers to split. */
export const entryLang = (id: string) => id.split('/')[0] as Lang;
export const entrySlug = (id: string) => id.split('/').slice(1).join('/').replace(/\.md$/, '');

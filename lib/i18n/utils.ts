import nb from './nb.json';
import en from './en.json';

export type Locale = 'nb' | 'en';

const translations: Record<Locale, typeof nb> = { nb, en };

export function t(key: string, locale: Locale = 'nb'): string {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}

export function getLocale(pathname: string): Locale {
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  return 'nb';
}

export function localePath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/en(\/|$)/, '/');
  if (locale === 'en') {
    return `/en${cleanPath === '/' ? '' : cleanPath}`;
  }
  return cleanPath || '/';
}

export function switchLocalePath(pathname: string): string {
  const currentLocale = getLocale(pathname);
  const otherLocale: Locale = currentLocale === 'nb' ? 'en' : 'nb';
  const cleanPath = pathname.replace(/^\/en(\/|$)/, '/');
  return localePath(cleanPath, otherLocale);
}

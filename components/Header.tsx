'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n/utils';
import { t, localePath } from '@/lib/i18n/utils';
import ThemeToggle from '@/components/ThemeToggle';
import LangToggle from '@/components/LangToggle';

interface HeaderProps {
  locale: Locale;
  showBooking?: boolean;
}

export default function Header({ locale, showBooking = false }: HeaderProps) {
  const pathname = usePathname();
  // Map internal /nb/ paths back to public paths
  const currentPath = pathname.replace(/^\/nb/, '') || '/';
  const isFrontPage = currentPath === '/' || currentPath === '/en' || currentPath === '/en/';

  const year = new Date().getFullYear();
  const homeHref = locale === 'en' ? '/en' : '/';

  const navItems = [
    { key: 'historie', href: '/historie' },
    { key: 'servering', href: '/servering' },
    { key: 'kulturformidling', href: '/kulturformidling' },
    { key: 'restaurering', href: '/restaurering' },
    { key: 'arkiv', href: '/arkiv' },
    { key: 'program', href: '/program', suffix: ` ${year}` },
    { key: 'referanser', href: '/referanser' },
    { key: 'finnOss', href: 'https://www.google.com/maps/search/Hamnvik+Handelssted+Ibestad', external: true },
    { key: 'kontakt', href: '/kontakt' },
  ];

  const renderNavItems = () => (
    <ul>
      {navItems.map(item => (
        <li key={item.key}>
          {item.external ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {t(`nav.${item.key}`, locale)}{item.suffix || ''} <span className="sr-only">{t('meta.opensNewWindow', locale)}</span>
            </a>
          ) : (
            <a
              href={localePath(item.href, locale)}
              className={currentPath === localePath(item.href, locale) ? 'active' : ''}
              {...(currentPath === localePath(item.href, locale) ? { 'aria-current': 'page' as const } : {})}
            >
              {t(`nav.${item.key}`, locale)}{item.suffix || ''}
            </a>
          )}
        </li>
      ))}
      {!isFrontPage && showBooking && (
        <li className="nav-cta-item">
          <a href={localePath('/kontakt', locale)} className="header-cta">{t('header.booking', locale)}</a>
        </li>
      )}
      <li className="nav-controls">
        <LangToggle locale={locale} currentPath={currentPath} />
        <ThemeToggle />
      </li>
    </ul>
  );

  if (isFrontPage) {
    return (
      <header className="site-header-front">
        <div className="site-name"><a href={homeHref}>{t('header.siteName', locale)}</a></div>
        <div className="site-subtitle">{t('header.subtitle', locale)}</div>
        <div className="site-tagline">{t('header.tagline', locale)}</div>
        <ThemeToggle className="header-theme-mobile" />
        <button className="nav-toggle" aria-expanded="false" aria-label={t('header.menu', locale)} type="button">
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <nav aria-label={locale === 'en' ? 'Main menu' : 'Hovedmeny'}>
          {renderNavItems()}
        </nav>
      </header>
    );
  }

  return (
    <header className="site-header-sticky">
      <div className="site-name"><a href={homeHref}>{t('header.siteName', locale)}</a></div>
      <ThemeToggle className="header-theme-mobile" />
      <button className="nav-toggle" aria-expanded="false" aria-label={t('header.menu', locale)} type="button">
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <nav aria-label={locale === 'en' ? 'Main menu' : 'Hovedmeny'}>
        {renderNavItems()}
      </nav>
    </header>
  );
}

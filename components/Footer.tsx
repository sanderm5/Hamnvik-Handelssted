import type { Locale } from '@/lib/i18n/utils';
import { t, localePath } from '@/lib/i18n/utils';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-illustration">
        <div className="footer-parallax-layer">
          <picture>
            <source srcSet="/images/footer-light.webp" type="image/webp" />
            <img src="/images/footer-light.png" alt="Hamnvik handelssted i vinterlandskap med dagslys" className="footer-img footer-img-light" width={1536} height={512} loading="lazy" decoding="async" />
          </picture>
          <picture>
            <source srcSet="/images/footer-dark.webp" type="image/webp" />
            <img src="/images/footer-dark.png" alt="Hamnvik handelssted med nordlys" className="footer-img footer-img-dark" width={1536} height={512} loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
      <div className="site-footer-content">
        <div className="site-footer-col">
          <p className="site-footer-label">{t('footer.inquiries', locale)}</p>
          <p><a href="mailto:post@hamnvikhandelssted.com">post@hamnvikhandelssted.com</a></p>
          <p>{t('footer.location', locale)}</p>
        </div>
        <div className="site-footer-col">
          <p className="site-footer-label">{t('header.siteName', locale)}</p>
          <p>{t('footer.heritage', locale)}</p>
          <p>{t('footer.address', locale)}</p>
          <p>{t('footer.municipality', locale)}</p>
        </div>
        <nav className="site-footer-col" aria-label={locale === 'en' ? 'Related links' : 'Relaterte lenker'}>
          <p className="site-footer-label">{t('footer.seeAlso', locale)}</p>
          <p><a href="https://www.facebook.com/groups/79814800828" target="_blank" rel="noopener noreferrer" className="footer-facebook-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> {t('footer.facebook', locale)} <span className="sr-only">{t('meta.opensNewWindow', locale)}</span></a></p>
        </nav>
      </div>
      <div className="site-footer-bottom">
        <span>&copy; {year} {t('footer.copyright', locale)}</span>
        <span className="footer-legal">
          <a href={localePath('/personvern', locale)}>{t('footer.privacy', locale)}</a> &middot; <a href={localePath('/vilkar', locale)}>{t('footer.terms', locale)}</a>
        </span>
      </div>
    </footer>
  );
}

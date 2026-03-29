import type { Locale } from '@/lib/i18n/utils';
import { t } from '@/lib/i18n/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileContactBar from '@/components/MobileContactBar';
import ClientInit from '@/components/ClientInit';

export async function generateStaticParams() {
  return [{ locale: 'nb' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <>
      <a href="#main-content" className="skip-link">{t('header.skipLink', loc)}</a>
      <div className="site-wrapper">
        <Header locale={loc} />
        <div className="page-content">
          {children}
        </div>
        <Footer locale={loc} />
      </div>
      <div className="nav-overlay" />
      <MobileContactBar />
      <ClientInit />
    </>
  );
}

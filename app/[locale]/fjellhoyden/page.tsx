import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { localePath } from '@/lib/i18n/utils';
import { readPage } from '@/lib/sanity-client';
import Section from '@/components/Section';

interface FjellhoydenData {
  heading: string;
  deck: string;
  byline: string;
  intro: string;
  sections: Array<{
    heading?: string;
    content: string;
    image?: string;
    imageAlt?: string;
    imageCaption?: string;
    pullQuote?: string;
  }>;
  noticeTitle?: string;
  noticeText?: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const siteUrl = 'https://hamnvikhandelssted.no';
  const path = loc === 'en' ? '/en/fjellhoyden' : '/fjellhoyden';
  return {
    title: loc === 'en' ? 'Fjellhøyden | Hamnvik Trading Post' : 'Fjellhøyden | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'Fjellhøyden at Hamnvik Trading Post.'
      : 'Fjellhøyden ved Hamnvik Handelssted.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/fjellhoyden`, en: `${siteUrl}/en/fjellhoyden` },
    },
  };
}

export default async function FjellhoydenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const fjellhoyden = await readPage<FjellhoydenData>('fjellhoyden', loc);

  if (!fjellhoyden) {
    return (
      <main id="main-content" className="main-content">
        <h1>Fjellhøyden</h1>
        <p className="page-intro">Innhold kommer snart.</p>
      </main>
    );
  }

  return (
    <main id="main-content" className="main-content">
      <h1>{fjellhoyden.heading}</h1>
      <p className="article-deck">{fjellhoyden.deck}</p>
      <p className="byline">{fjellhoyden.byline}</p>
      <p className="page-intro">{fjellhoyden.intro}</p>

      {fjellhoyden.sections?.map((section, i) => (
        <div key={i}>
          {i > 0 && <hr className="divider" />}
          <Section section={section} />
        </div>
      ))}

      {fjellhoyden.noticeTitle && (
        <div className="notice-box">
          <h3>{fjellhoyden.noticeTitle}</h3>
          <p><a href={localePath('/kontakt', loc)}>{fjellhoyden.noticeText}</a></p>
        </div>
      )}
    </main>
  );
}

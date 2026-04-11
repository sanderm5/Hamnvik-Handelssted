import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { localePath } from '@/lib/i18n/utils';
import { readPage } from '@/lib/sanity-client';
import Section from '@/components/Section';

interface KulturData {
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
  noticeTitle: string;
  noticeText: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const siteUrl = 'https://hamnvikhandelssted.no';
  const path = loc === 'en' ? '/en/kulturformidling' : '/kulturformidling';
  return {
    title: loc === 'en' ? 'Culture | Hamnvik Trading Post' : 'Kulturformidling | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'Cultural experiences at Hamnvik Trading Post. Guided tours, lectures and storytelling.'
      : 'Kulturformidling på Hamnvik Handelssted. Omvisninger, foredrag og historiefortelling i Donsegården, Ibestad.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/kulturformidling`, en: `${siteUrl}/en/kulturformidling` },
    },
  };
}

export default async function KulturformidlingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const kultur = await readPage<KulturData>('kulturformidling', loc);

  return (
    <main id="main-content" className="main-content">
      <h1>{kultur.heading}</h1>
      <p className="article-deck">{kultur.deck}</p>
      <p className="byline">{kultur.byline}</p>
      <p className="page-intro">{kultur.intro}</p>

      {kultur.sections?.map((section, i) => (
        <div key={i}>
          {i > 0 && <hr className="divider" />}
          <Section section={section} />
        </div>
      ))}

      <div className="notice-box">
        <h3>{kultur.noticeTitle}</h3>
        <p><a href={localePath('/kontakt', loc)}>{kultur.noticeText}</a></p>
      </div>
    </main>
  );
}

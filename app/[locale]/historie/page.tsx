import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { readPage } from '@/lib/sanity-client';
import Section from '@/components/Section';

interface HistorieData {
  heading: string;
  deck: string;
  byline: string;
  intro: string;
  introBody: string;
  pullQuote1: string;
  sections: Array<{
    heading?: string;
    content: string;
    image?: string;
    imageAlt?: string;
    imageCaption?: string;
    pullQuote?: string;
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const siteUrl = 'https://hamnvikhandelssted.com';
  const path = loc === 'en' ? '/en/historie' : '/historie';
  return {
    title: loc === 'en' ? 'History | Hamnvik Trading Post' : 'Historie | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'The history of Hamnvik Trading Post and Donsegården – a protected trading post from 1794.'
      : 'Historien om Hamnvik Handelssted og Donsegården – et fredet handelssted fra 1794 i Ibestad kommune, Troms.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/historie`, en: `${siteUrl}/en/historie` },
    },
  };
}

export default async function HistoriePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const historie = await readPage<HistorieData>('historie', loc);

  return (
    <main id="main-content" className="main-content">
      <h1>{historie.heading}</h1>
      <p className="article-deck">{historie.deck}</p>
      <p className="byline">{historie.byline}</p>
      <p className="page-intro">{historie.intro}</p>

      <div className="columns-2">
        <p>{historie.introBody}</p>
      </div>

      <blockquote className="pull-quote">{historie.pullQuote1}</blockquote>

      {historie.sections?.map((section, i) => (
        <div key={i}>
          <hr className="divider" />
          <Section section={section} />
        </div>
      ))}
    </main>
  );
}

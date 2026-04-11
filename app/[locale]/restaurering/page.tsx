import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { readPage } from '@/lib/sanity-client';
import Section from '@/components/Section';

interface RestaureringData {
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
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const siteUrl = 'https://hamnvikhandelssted.no';
  const path = loc === 'en' ? '/en/restaurering' : '/restaurering';
  return {
    title: loc === 'en' ? 'Restoration | Hamnvik Trading Post' : 'Restaurering | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'Restoration and preservation of Hamnvik Trading Post.'
      : 'Restaurering og bevaring av Hamnvik Handelssted – oppdateringer om pågående arbeid på det fredede handelsstedet i Ibestad.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/restaurering`, en: `${siteUrl}/en/restaurering` },
    },
  };
}

export default async function RestaureringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const restaurering = await readPage<RestaureringData>('restaurering', loc);

  return (
    <main id="main-content" className="main-content">
      <h1>{restaurering.heading}</h1>
      <p className="article-deck">{restaurering.deck}</p>
      <p className="byline">{restaurering.byline}</p>
      <p className="page-intro">{restaurering.intro}</p>

      {restaurering.sections?.map((section, i) => (
        <div key={i}>
          {i > 0 && <hr className="divider" />}
          <Section section={section} />
        </div>
      ))}
    </main>
  );
}

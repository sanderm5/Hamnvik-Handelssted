import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { localePath } from '@/lib/i18n/utils';
import { readPage } from '@/lib/sanity-client';
import Section from '@/components/Section';

interface ServeringData {
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
  const siteUrl = 'https://hamnvikhandelssted.com';
  const path = loc === 'en' ? '/en/servering' : '/servering';
  return {
    title: loc === 'en' ? 'Dining | Hamnvik Trading Post' : 'Servering | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'Dining at Hamnvik Trading Post. Enjoy local dishes in historic surroundings.'
      : 'Servering på Hamnvik Handelssted. Nyt lokale retter i historiske omgivelser på Donsegården i Ibestad, Troms.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/servering`, en: `${siteUrl}/en/servering` },
    },
  };
}

export default async function ServeringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const servering = await readPage<ServeringData>('servering', loc);

  return (
    <main id="main-content" className="main-content">
      <div style={{ width: '100%', height: '350px', overflow: 'hidden', marginBottom: '2rem' }}>
        <img src="/images/servering-dekt-bord.jpeg" alt="Dekt langbord med levende lys i historiske lokaler på Hamnvik Handelssted" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 75%', display: 'block' }} />
      </div>
      <h1>{servering.heading}</h1>
      <p className="article-deck">{servering.deck}</p>
      <p className="byline">{servering.byline}</p>
      <p className="page-intro">{servering.intro}</p>

      {servering.sections?.map((section, i) => (
        <div key={i}>
          {i > 0 && <hr className="divider" />}
          <Section section={section} />
        </div>
      ))}

      <div className="notice-box">
        <h3>{servering.noticeTitle}</h3>
        <p><a href={localePath('/kontakt', loc)}>{servering.noticeText}</a></p>
      </div>
    </main>
  );
}

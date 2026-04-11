import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { readAllNyheter, readProgramSettings } from '@/lib/sanity-client';
import Section from '@/components/Section';

interface NyhetEntry {
  _filename: string;
  title: string;
  deck?: string;
  byline?: string;
  date?: string;
  intro?: string;
  sections?: Array<{
    heading?: string;
    content: string;
    image?: string;
    imageAlt?: string;
    imageCaption?: string;
    pullQuote?: string;
  }>;
  photoCredit?: string;
  galleryImages?: Array<{ image: string; alt: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const currentYear = new Date().getFullYear();
  const siteUrl = 'https://hamnvikhandelssted.no';
  const path = loc === 'en' ? '/en/program' : '/program';
  return {
    title: loc === 'en' ? `Program ${currentYear} | Hamnvik Trading Post` : `Program ${currentYear} | Hamnvik Handelssted`,
    description: loc === 'en'
      ? `Program and events ${currentYear} at Hamnvik Trading Post.`
      : `Program og hendelser ${currentYear} ved Hamnvik Handelssted i Ibestad, Troms.`,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/program`, en: `${siteUrl}/en/program` },
    },
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const currentYear = new Date().getFullYear();
  const settings = await readProgramSettings(loc);
  const allArticles = await readAllNyheter<Omit<NyhetEntry, '_filename'>>();

  return (
    <main id="main-content" className="main-content">
      <h1>{settings?.heading || `Program ${currentYear}`}</h1>
      <p className="article-deck">{settings?.deck || ''}</p>
      <p className="byline">{settings?.byline || ''}</p>

      {allArticles.length > 0 ? (
        allArticles.map((article, idx) => (
          <div key={article._filename}>
            {idx > 0 && <hr className="divider-heavy" />}
            <article>
              <h2 className="section-heading">{article.title}</h2>
              {article.deck && <p className="article-deck">{article.deck}</p>}
              {article.byline && <p className="byline">{article.byline}</p>}
              {article.intro && <p className="drop-cap">{article.intro}</p>}

              {article.sections?.map((section, i) => (
                <Section key={i} section={section} />
              ))}
            </article>
          </div>
        ))
      ) : (
        <p className="page-intro">{settings?.emptyMessage || `Programmet for ${currentYear} er under planlegging. Følg med!`}</p>
      )}
    </main>
  );
}

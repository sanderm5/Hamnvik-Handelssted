import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { localePath } from '@/lib/i18n/utils';
import { readAllReferanser } from '@/lib/sanity-client';

interface ReferanseEntry {
  _filename: string;
  quote: string;
  source: string;
  date?: string;
  context?: string;
  sortOrder?: number;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const siteUrl = 'https://hamnvikhandelssted.com';
  const path = loc === 'en' ? '/en/referanser' : '/referanser';
  return {
    title: loc === 'en' ? 'Testimonials | Hamnvik Trading Post' : 'Referanser | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'Testimonials about Hamnvik Trading Post.'
      : 'Referanser og kilder knyttet til Hamnvik Handelssted og Donsegården i Ibestad.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/referanser`, en: `${siteUrl}/en/referanser` },
    },
  };
}

export default async function ReferanserPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const allRefs = await readAllReferanser<Omit<ReferanseEntry, '_filename'>>();
  const referanser = allRefs.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <main id="main-content" className="main-content">
      <h1>{loc === 'en' ? 'Testimonials' : 'Referanser'}</h1>
      <p className="article-deck">{loc === 'en' ? 'What our guests say about Hamnvik Trading Post' : 'Hva gjestene sier om Hamnvik Handelssted'}</p>
      <p className="byline">{loc === 'en' ? 'Selected recommendations · Hamnvik' : 'Utvalgte anbefalinger · Hamnvik'}</p>

      <p className="page-intro">
        {loc === 'en'
          ? 'Over the years, we have had the pleasure of welcoming guests from near and far. Here are some of the words they have shared with us.'
          : 'Gjennom årene har vi hatt gleden av å ta imot gjester fra nær og fjern. Her er noen av ordene de har delt med oss.'}
      </p>

      <div className="referanse-grid">
        {referanser.map((ref) => (
          <article key={ref._filename} className="referanse-card">
            <blockquote className="referanse-quote">{ref.quote}</blockquote>
            <footer className="referanse-footer">
              <span className="referanse-source">{ref.source}</span>
              {ref.date && <span className="referanse-date">{ref.date}</span>}
              {ref.context && <span className="referanse-context">{ref.context}</span>}
            </footer>
          </article>
        ))}
      </div>

      <div className="notice-box">
        <h3>{loc === 'en' ? 'Experience it yourself' : 'Opplev det selv'}</h3>
        <p><a href={localePath('/kontakt', loc)}>{loc === 'en' ? 'Get in touch to plan a visit, tour or event.' : 'Ta kontakt for å planlegge besøk, omvisning eller selskap.'}</a></p>
      </div>
    </main>
  );
}

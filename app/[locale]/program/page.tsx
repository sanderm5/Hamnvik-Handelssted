import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { t } from '@/lib/i18n/utils';
import { readAllNyheter } from '@/lib/sanity-client';
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
  const siteUrl = 'https://hamnvikhandelssted.com';
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
  const allArticles = await readAllNyheter<Omit<NyhetEntry, '_filename'>>();

  const currentArticles = allArticles.filter(a => {
    const date = a.date;
    if (!date) return true;
    return new Date(date).getFullYear() >= currentYear;
  });

  const archiveArticles = allArticles.filter(a => {
    const date = a.date;
    if (!date) return false;
    return new Date(date).getFullYear() < currentYear;
  });

  return (
    <main id="main-content" className="main-content">
      <h1>Program {currentYear}</h1>
      <p className="article-deck">{t('program.deck', loc)}</p>
      <p className="byline">{t('program.byline', loc)}</p>

      {currentArticles.length > 0 ? (
        currentArticles.map((article, idx) => (
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

              {article.galleryImages && article.galleryImages.length > 0 && (
                <>
                  <hr className="divider" />
                  <h3>{t('program.gallery', loc)}</h3>
                  {article.photoCredit && <p className="photo-credit">{article.photoCredit}</p>}
                  <div className="image-gallery">
                    {article.galleryImages.map((img, i) => (
                      <figure key={i} className="vintage-frame">
                        <img src={img.image?.includes('cdn.sanity.io') ? `${img.image}?auto=format&w=600` : img.image} alt={img.alt} width={600} height={450} loading="lazy" decoding="async" />
                      </figure>
                    ))}
                  </div>
                </>
              )}
            </article>
          </div>
        ))
      ) : (
        <p className="page-intro">{t('program.empty', loc).replace('{year}', String(currentYear))}</p>
      )}

      {archiveArticles.length > 0 && (
        <>
          <hr className="divider-heavy" />
          <details className="archive-section">
            <summary className="section-heading archive-toggle">{t('program.archive', loc)}</summary>
            {archiveArticles.map((article, idx) => (
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

                  {article.galleryImages && article.galleryImages.length > 0 && (
                    <>
                      <hr className="divider" />
                      <h3>{t('program.gallery', loc)}</h3>
                      {article.photoCredit && <p className="photo-credit">{article.photoCredit}</p>}
                      <div className="image-gallery">
                        {article.galleryImages.map((img, i) => (
                          <figure key={i} className="vintage-frame">
                            <picture>
                              <source srcSet={img.image.replace(/\.jpg$/, '.webp')} type="image/webp" />
                              <img src={img.image} alt={img.alt} width={600} height={450} loading="lazy" decoding="async" />
                            </picture>
                          </figure>
                        ))}
                      </div>
                    </>
                  )}
                </article>
              </div>
            ))}
          </details>
        </>
      )}
    </main>
  );
}

import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { t, localePath } from '@/lib/i18n/utils';
import { readPage } from '@/lib/tina-client';
import BookingForm from '@/components/BookingForm';

interface HjemData {
  heading: string;
  deck: string;
  byline: string;
  intro: string;
  bodyText1: string;
  bodyText2: string;
  pullQuote: string;
  cards: Array<{ title: string; link: string; description: string }>;
  dampskipHeading: string;
  dampskipText: string;
  dampskipImage: string;
  dampskipImageAlt: string;
  dampskipImageCaption: string;
  dampskipFotefarText: string;
  noticeTitle: string;
  noticeText: string;
  testimonials: Array<{ quote: string; source: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const siteUrl = 'https://hamnvikhandelssted.com';
  const currentPath = loc === 'en' ? '/en' : '/';
  return {
    title: loc === 'en' ? 'Welcome | Hamnvik Trading Post' : 'Velkommen | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'Welcome to Hamnvik Trading Post – a protected trading post from 1794 in Ibestad, Troms.'
      : 'Velkommen til Hamnvik Handelssted – fredet handelssted fra 1794 i Ibestad, Troms. Servering, kulturformidling og restaurering.',
    alternates: {
      canonical: `${siteUrl}${currentPath}`,
      languages: { nb: `${siteUrl}/`, en: `${siteUrl}/en` },
    },
    openGraph: {
      title: loc === 'en' ? 'Welcome | Hamnvik Trading Post' : 'Velkommen | Hamnvik Handelssted',
      url: `${siteUrl}${currentPath}`,
      siteName: 'Hamnvik Handelssted',
      locale: loc === 'en' ? 'en_US' : 'nb_NO',
      type: 'website',
      images: [`${siteUrl}/images/HAMNVIK.png`],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const hjem = readPage<HjemData>('hjem', loc);

  return (
    <>
      <div className="hero">
        <picture className="hero-light">
          <source srcSet="/images/HAMNVIK.webp" type="image/webp" />
          <img src="/images/HAMNVIK.png" alt="Illustrasjon av Hamnvik Handelssted med gule sjøhus, seilbåt og fjell i vinterlandskap" width={1184} height={761} sizes="100vw" fetchPriority="high" />
        </picture>
        <picture className="hero-dark">
          <source srcSet="/images/hamnvik-nordlys.webp" type="image/webp" />
          <img src="/images/hamnvik-nordlys.png" alt="Hamnvik Handelssted under nordlyset, gule sjøhus speiler seg i fjorden" width={1184} height={761} sizes="100vw" fetchPriority="high" />
        </picture>
        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-hint-label">{t('frontPage.scrollDown', loc)}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      <main id="main-content" className="main-content">
        <h1>{hjem.heading}</h1>
        <p className="article-deck">{hjem.deck}</p>
        <p className="byline">{hjem.byline}</p>
        <p className="page-intro">{hjem.intro}</p>

        <div className="columns-2">
          <p>{hjem.bodyText1}</p>
          <p>{hjem.bodyText2}</p>
        </div>

        <blockquote className="pull-quote scroll-reveal">{hjem.pullQuote}</blockquote>
      </main>

      <div className="sticky-cards-wrap">
        <section className="sticky-cards">
          <h2 className="section-heading scroll-reveal">{t('frontPage.experience', loc)}</h2>

          <div className="info-cards">
            {hjem.cards?.map((card, i) => (
              <div key={i} className="info-card scroll-reveal">
                <h3>{card.link ? <a href={localePath(card.link, loc)}>{card.title}</a> : card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          <hr className="divider" />

          <div className="section-with-image">
            {hjem.dampskipImage && (
              <figure className="vintage-frame scroll-reveal section-image-small">
                <picture>
                  <source srcSet={hjem.dampskipImage.replace(/\.(jpg|png)$/i, '.webp')} type="image/webp" />
                  <img src={hjem.dampskipImage} alt={hjem.dampskipImageAlt} width={260} height={340} loading="lazy" decoding="async" />
                </picture>
                <figcaption className="vintage-frame-caption">{hjem.dampskipImageCaption}</figcaption>
              </figure>
            )}
            <div className="section-text-col">
              <h2>{hjem.dampskipHeading}</h2>
              <p>{hjem.dampskipText}</p>
              <p>{hjem.dampskipFotefarText}</p>

              <div className="notice-box notice-box-small">
                <h3>{hjem.noticeTitle}</h3>
                <p><a href={localePath('/kontakt', loc)}>{hjem.noticeText}</a></p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="testimonials-section">
        <div className="testimonials-inner">
          <h2 className="section-heading scroll-reveal">{t('frontPage.testimonials', loc)}</h2>

          {hjem.testimonials?.map((testimonial, i) => (
            <blockquote key={i} className="pull-quote scroll-reveal">
              {testimonial.quote}
              <span className="pull-quote-source">{testimonial.source}</span>
            </blockquote>
          ))}

          <p className="text-center"><a href={localePath('/referanser', loc)}>{t('frontPage.moreReferences', loc)}</a></p>
        </div>
      </section>

      <section className="booking-section">
        <div className="main-content">
          <h2 className="section-heading scroll-reveal">{t('frontPage.bookingHeading', loc)}</h2>
          <p className="page-intro">{t('frontPage.bookingIntro', loc)}</p>
          <BookingForm formId="front-booking-form" locale={loc} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { t } from '@/lib/i18n/utils';
import { readPage } from '@/lib/sanity-client';
import BookingForm from '@/components/BookingForm';

interface KontaktData {
  heading: string;
  deck: string;
  byline: string;
  intro: string;
  contacts: Array<{ name: string; email: string; phone: string }>;
  generalEmail: string;
  businessName: string;
  addressLine1: string;
  addressLine2: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const siteUrl = 'https://hamnvikhandelssted.com';
  const path = loc === 'en' ? '/en/kontakt' : '/kontakt';
  return {
    title: loc === 'en' ? 'Contact | Hamnvik Trading Post' : 'Kontakt | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'Contact Hamnvik Trading Post. Inquiries about dining and events.'
      : 'Kontakt Hamnvik Handelssted. Henvendelser om servering og arrangement i Ibestad, Troms.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/kontakt`, en: `${siteUrl}/en/kontakt` },
    },
  };
}

export default async function KontaktPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const kontakt = await readPage<KontaktData>('kontakt', loc);

  return (
    <main id="main-content" className="main-content">
      <h1>{kontakt.heading}</h1>
      <p className="article-deck">{kontakt.deck}</p>
      <p className="byline">{kontakt.byline}</p>
      <p className="page-intro">{kontakt.intro}</p>

      <h2 className="section-heading">{t('form.heading', loc)}</h2>
      <BookingForm formId="booking-form" locale={loc} />

      <hr className="divider" />

      <h2 className="section-heading">{loc === 'en' ? 'Contact information' : 'Kontaktinformasjon'}</h2>

      <div className="contact-grid">
        {kontakt.contacts?.map((c, i) => (
          <div key={i} className="contact-card">
            <h3>{c.name}</h3>
            <p><a href={`mailto:${c.email}`}>{c.email}</a></p>
            <p><a href={`tel:+47${c.phone.replace(/\s/g, '')}`}>{c.phone}</a></p>
          </div>
        ))}
      </div>

      <div className="notice-box notice-box-narrow">
        <h3>{kontakt.businessName}</h3>
        <p><a href={`mailto:${kontakt.generalEmail}`}>{kontakt.generalEmail}</a></p>
        <p>{kontakt.addressLine1}</p>
        <p>{kontakt.addressLine2}</p>
      </div>
    </main>
  );
}

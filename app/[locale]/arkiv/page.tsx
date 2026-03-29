import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/utils';
import { readPage } from '@/lib/tina-client';
import Lightbox from '@/components/Lightbox';

interface GalleryImage {
  image: string;
  alt: string;
  caption?: string;
}

interface GallerySection {
  heading: string;
  description?: string;
  photoCredit?: string;
  images: GalleryImage[];
}

interface ArkivData {
  heading: string;
  deck: string;
  byline: string;
  intro: string;
  gallerySections: GallerySection[];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const siteUrl = 'https://hamnvikhandelssted.com';
  const path = loc === 'en' ? '/en/arkiv' : '/arkiv';
  return {
    title: loc === 'en' ? 'Archive | Hamnvik Trading Post' : 'Arkiv | Hamnvik Handelssted',
    description: loc === 'en'
      ? 'Photo archive from Hamnvik Trading Post.'
      : 'Bildearkiv fra Hamnvik Handelssted – fotografier av det fredede handelsstedet Donsegården i Ibestad.',
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: { nb: `${siteUrl}/arkiv`, en: `${siteUrl}/en/arkiv` },
    },
  };
}

export default async function ArkivPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const arkiv = readPage<ArkivData>('arkiv', loc);

  return (
    <main id="main-content" className="main-content">
      <h1>{arkiv.heading}</h1>
      <p className="article-deck">{arkiv.deck}</p>
      <p className="byline">{arkiv.byline}</p>
      <p className="page-intro">{arkiv.intro}</p>

      {arkiv.gallerySections?.map((section, i) => (
        <div key={i}>
          <hr className="divider" />
          <h2 className="section-heading">{section.heading}</h2>
          {section.description && <p>{section.description}</p>}
          {section.photoCredit && <p className="photo-credit">{section.photoCredit}</p>}

          <div className="image-gallery">
            {section.images?.map((img, j) => (
              <figure key={j} className="vintage-frame">
                <picture>
                  <source srcSet={img.image.replace(/\.(jpg|png)$/i, '.webp')} type="image/webp" />
                  <img src={img.image} alt={img.alt} width={600} height={450} loading="lazy" decoding="async" sizes="(max-width: 750px) 100vw, 50vw" />
                </picture>
                {img.caption && <figcaption className="vintage-frame-caption">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      ))}

      <Lightbox />
    </main>
  );
}

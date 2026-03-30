import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const sectionProjection = `{
  heading,
  content,
  "image": image.asset->url,
  imageAlt,
  imageCaption,
  pullQuote
}`

const imageItemProjection = `{
  "image": image.asset->url,
  alt,
  caption
}`

const galleryImageProjection = `{
  "image": image.asset->url,
  alt
}`

const pageQueries: Record<string, string> = {
  hjem: `*[_type == "hjem" && language == $locale][0]{
    heading, deck, byline, intro,
    bodyText1, bodyText2, pullQuote,
    cards[]{ title, link, description },
    dampskipHeading, dampskipText,
    "dampskipImage": dampskipImage.asset->url,
    dampskipImageAlt, dampskipImageCaption, dampskipFotefarText,
    noticeTitle, noticeText,
    testimonials[]{ quote, source }
  }`,
  historie: `*[_type == "historie" && language == $locale][0]{
    heading, deck, byline, intro,
    introBody, pullQuote1,
    sections[]${sectionProjection}
  }`,
  servering: `*[_type == "servering" && language == $locale][0]{
    heading, deck, byline, intro,
    sections[]${sectionProjection},
    noticeTitle, noticeText
  }`,
  kulturformidling: `*[_type == "kulturformidling" && language == $locale][0]{
    heading, deck, byline, intro,
    sections[]${sectionProjection},
    noticeTitle, noticeText
  }`,
  kontakt: `*[_type == "kontakt" && language == $locale][0]{
    heading, deck, byline, intro,
    contacts[]{ name, email, phone },
    generalEmail, businessName, addressLine1, addressLine2,
    sections[]${sectionProjection}
  }`,
  arkiv: `*[_type == "arkiv" && language == $locale][0]{
    heading, deck, byline, intro,
    gallerySections[]{
      heading, description, photoCredit,
      images[]${imageItemProjection}
    }
  }`,
  restaurering: `*[_type == "restaurering" && language == $locale][0]{
    heading, deck, byline, intro,
    sections[]${sectionProjection}
  }`,
}

export async function readPage<T>(pageName: string, locale: string = 'nb'): Promise<T> {
  const query = pageQueries[pageName]
  if (!query) throw new Error(`Unknown page: ${pageName}`)
  return client.fetch<T>(query, { locale })
}

export async function readAllNyheter<T>(): Promise<Array<T & { _filename: string }>> {
  const query = `*[_type == "nyhet"]{
    "_filename": _id,
    title, deck, byline, date, intro,
    sections[]${sectionProjection},
    photoCredit,
    galleryImages[]${galleryImageProjection}
  }`
  return client.fetch(query)
}

export async function readAllReferanser<T>(): Promise<Array<T & { _filename: string }>> {
  const query = `*[_type == "referanse"] | order(sortOrder asc){
    "_filename": _id,
    quote, source, date, context, sortOrder
  }`
  return client.fetch(query)
}

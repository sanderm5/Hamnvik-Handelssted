import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const contentDir = path.join(process.cwd(), 'content')
const publicDir = path.join(process.cwd(), 'public')

// Track uploaded images to avoid duplicates
const imageCache = new Map<string, string>()

async function uploadImage(imagePath: string): Promise<string | null> {
  if (!imagePath || imagePath.startsWith('http')) return imagePath

  // Normalize path
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`

  if (imageCache.has(cleanPath)) {
    return imageCache.get(cleanPath)!
  }

  const fullPath = path.join(publicDir, cleanPath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`  Image not found: ${fullPath}`)
    return null
  }

  try {
    const imageBuffer = fs.readFileSync(fullPath)
    const filename = path.basename(fullPath)
    const asset = await client.assets.upload('image', imageBuffer, { filename })
    console.log(`  Uploaded: ${cleanPath} -> ${asset._id}`)
    imageCache.set(cleanPath, asset._id)
    return asset._id
  } catch (err) {
    console.error(`  Failed to upload ${cleanPath}:`, err)
    return null
  }
}

function makeImageRef(assetId: string) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
  }
}

async function processSections(sections: Array<Record<string, unknown>> | undefined) {
  if (!sections) return undefined
  const result = []
  for (const section of sections) {
    const processed: Record<string, unknown> = {
      _type: 'section',
      _key: crypto.randomUUID(),
      heading: section.heading || undefined,
      content: section.content || undefined,
      imageAlt: section.imageAlt || undefined,
      imageCaption: section.imageCaption || undefined,
      pullQuote: section.pullQuote || undefined,
    }
    if (section.image) {
      const assetId = await uploadImage(section.image as string)
      if (assetId) processed.image = makeImageRef(assetId)
    }
    result.push(processed)
  }
  return result
}

function readYaml(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return YAML.parse(raw)
}

// ---- Migrate singleton pages ----

async function migratePagePair(pageName: string, type: string) {
  console.log(`\nMigrating ${type}...`)

  for (const locale of ['nb', 'en']) {
    const filename = locale === 'en' ? `${pageName}.en.yaml` : `${pageName}.yaml`
    const filePath = path.join(contentDir, 'pages', filename)

    if (!fs.existsSync(filePath)) {
      console.log(`  Skipping ${filename} (not found)`)
      continue
    }

    const data = readYaml(filePath)
    const docId = locale === 'en' ? `${type}-en` : type

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: type,
      language: locale,
      heading: data.heading,
      deck: data.deck,
      byline: data.byline,
      intro: data.intro,
    }

    // Type-specific fields
    if (type === 'hjem') {
      doc.bodyText1 = data.bodyText1
      doc.bodyText2 = data.bodyText2
      doc.pullQuote = data.pullQuote
      doc.cards = data.cards?.map((c: Record<string, string>) => ({
        _type: 'object',
        _key: crypto.randomUUID(),
        title: c.title,
        link: c.link,
        description: c.description,
      }))
      doc.dampskipHeading = data.dampskipHeading
      doc.dampskipText = data.dampskipText
      doc.dampskipImageAlt = data.dampskipImageAlt
      doc.dampskipImageCaption = data.dampskipImageCaption
      doc.dampskipFotefarText = data.dampskipFotefarText
      doc.noticeTitle = data.noticeTitle
      doc.noticeText = data.noticeText
      doc.testimonials = data.testimonials?.map((t: Record<string, string>) => ({
        _type: 'object',
        _key: crypto.randomUUID(),
        quote: t.quote,
        source: t.source,
      }))

      if (data.dampskipImage) {
        const assetId = await uploadImage(data.dampskipImage)
        if (assetId) doc.dampskipImage = makeImageRef(assetId)
      }
    }

    if (type === 'historie') {
      doc.introBody = data.introBody
      doc.pullQuote1 = data.pullQuote1
      doc.sections = await processSections(data.sections)
    }

    if (type === 'servering' || type === 'kulturformidling' || type === 'restaurering') {
      doc.sections = await processSections(data.sections)
      if (data.noticeTitle) doc.noticeTitle = data.noticeTitle
      if (data.noticeText) doc.noticeText = data.noticeText
    }

    if (type === 'kontakt') {
      doc.contacts = data.contacts?.map((c: Record<string, string>) => ({
        _type: 'object',
        _key: crypto.randomUUID(),
        name: c.name,
        email: c.email,
        phone: c.phone,
      }))
      doc.generalEmail = data.generalEmail
      doc.businessName = data.businessName
      doc.addressLine1 = data.addressLine1
      doc.addressLine2 = data.addressLine2
      doc.sections = await processSections(data.sections)
    }

    if (type === 'arkiv') {
      const gallerySections = []
      for (const gs of data.gallerySections || []) {
        const images = []
        for (const img of gs.images || []) {
          const imgDoc: Record<string, unknown> = {
            _type: 'object',
            _key: crypto.randomUUID(),
            alt: img.alt,
            caption: img.caption,
          }
          if (img.image) {
            const assetId = await uploadImage(img.image)
            if (assetId) imgDoc.image = makeImageRef(assetId)
          }
          images.push(imgDoc)
        }
        gallerySections.push({
          _type: 'object',
          _key: crypto.randomUUID(),
          heading: gs.heading,
          description: gs.description,
          photoCredit: gs.photoCredit,
          images,
        })
      }
      doc.gallerySections = gallerySections
    }

    await client.createOrReplace(doc)
    console.log(`  Created ${docId} (${locale})`)
  }
}

// ---- Migrate collections ----

async function migrateReferanser() {
  console.log('\nMigrating referanser...')
  const dir = path.join(contentDir, 'referanser')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.yaml'))

  for (const file of files) {
    const data = readYaml(path.join(dir, file))
    const slug = file.replace('.yaml', '')
    const doc = {
      _id: `referanse-${slug}`,
      _type: 'referanse',
      language: 'nb',
      source: data.source,
      quote: data.quote,
      date: data.date || undefined,
      context: data.context || undefined,
      sortOrder: data.sortOrder,
    }
    await client.createOrReplace(doc)
    console.log(`  Created referanse: ${data.source}`)
  }
}

async function migrateNyheter() {
  console.log('\nMigrating nyheter...')
  const dir = path.join(contentDir, 'nyheter')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.yaml'))

  for (const file of files) {
    const data = readYaml(path.join(dir, file))
    const slug = file.replace('.yaml', '')

    const doc: Record<string, unknown> = {
      _id: `nyhet-${slug}`,
      _type: 'nyhet',
      language: 'nb',
      title: data.title,
      deck: data.deck || undefined,
      byline: data.byline || undefined,
      date: data.date || undefined,
      intro: data.intro || undefined,
      photoCredit: data.photoCredit || undefined,
      sections: await processSections(data.sections),
    }

    if (data.galleryImages?.length) {
      const images = []
      for (const img of data.galleryImages) {
        const imgDoc: Record<string, unknown> = {
          _type: 'object',
          _key: crypto.randomUUID(),
          alt: img.alt,
        }
        if (img.image) {
          const assetId = await uploadImage(img.image)
          if (assetId) imgDoc.image = makeImageRef(assetId)
        }
        images.push(imgDoc)
      }
      doc.galleryImages = images
    }

    await client.createOrReplace(doc)
    console.log(`  Created nyhet: ${data.title}`)
  }
}

// ---- Run migration ----

async function main() {
  console.log('Starting migration to Sanity...')
  console.log(`Project: ${projectId}, Dataset: ${dataset}\n`)

  // Singleton pages
  await migratePagePair('hjem', 'hjem')
  await migratePagePair('historie', 'historie')
  await migratePagePair('servering', 'servering')
  await migratePagePair('kulturformidling', 'kulturformidling')
  await migratePagePair('kontakt', 'kontakt')
  await migratePagePair('arkiv', 'arkiv')
  await migratePagePair('restaurering', 'restaurering')

  // Collections
  await migrateReferanser()
  await migrateNyheter()

  console.log(`\nMigration complete! Uploaded ${imageCache.size} images.`)
}

main().catch(console.error)

function imgUrl(url: string) {
  if (url.includes('cdn.sanity.io')) return `${url}?auto=format`
  return url
}

interface SectionData {
  heading?: string;
  content?: string;
  image?: string | null;
  imageAlt?: string;
  imageCaption?: string;
  pullQuote?: string;
  imageSize?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: { width: 200, height: 280 },
  medium: { width: 280, height: 370 },
  large: { width: 400, height: 520 },
};

interface SectionProps {
  section: SectionData;
}

export default function Section({ section }: SectionProps) {
  const paragraphs = section.content ? section.content.split('\n\n').filter(Boolean) : [];
  const hasImage = !!section.image;
  const size = sizeMap[section.imageSize || 'medium'];

  return (
    <>
      {section.heading && <h2 className="section-heading">{section.heading}</h2>}

      {hasImage ? (
        <div className="section-with-image">
          <div className="section-text-col">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'drop-cap' : ''}>{p}</p>
            ))}
          </div>
          {section.imageCaption ? (
            <figure className="vintage-frame section-image-small" style={{ maxWidth: size.width }}>
              <img src={imgUrl(section.image!)} alt={section.imageAlt || section.heading || ''} width={size.width} height={size.height} loading="lazy" decoding="async" />
              <figcaption className="vintage-frame-caption">{section.imageCaption}</figcaption>
            </figure>
          ) : (
            <figure className="vintage-frame straight section-image-full" style={{ maxWidth: size.width }}>
              <img src={imgUrl(section.image!)} alt={section.imageAlt || section.heading || ''} width={size.width} height={size.height} loading="lazy" decoding="async" />
            </figure>
          )}
        </div>
      ) : paragraphs.length > 1 ? (
        <div className="columns-2">
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'drop-cap' : ''}>{p}</p>
          ))}
        </div>
      ) : paragraphs.length === 1 ? (
        <p className="drop-cap">{paragraphs[0]}</p>
      ) : null}

      {section.pullQuote && (
        <blockquote className="pull-quote">{section.pullQuote}</blockquote>
      )}
    </>
  );
}

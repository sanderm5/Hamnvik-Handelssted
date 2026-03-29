interface SectionData {
  heading?: string;
  content?: string;
  image?: string | null;
  imageAlt?: string;
  imageCaption?: string;
  pullQuote?: string;
}

interface SectionProps {
  section: SectionData;
}

export default function Section({ section }: SectionProps) {
  const paragraphs = section.content ? section.content.split('\n\n').filter(Boolean) : [];
  const hasImage = !!section.image;

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
            <figure className="vintage-frame section-image-small">
              <picture>
                <source srcSet={section.image!.replace(/\.(jpg|png)$/i, '.webp')} type="image/webp" />
                <img src={section.image!} alt={section.imageAlt || section.heading || ''} width={280} height={370} loading="lazy" decoding="async" />
              </picture>
              <figcaption className="vintage-frame-caption">{section.imageCaption}</figcaption>
            </figure>
          ) : (
            <figure className="vintage-frame straight section-image-full">
              <picture>
                <source srcSet={section.image!.replace(/\.(jpg|png)$/i, '.webp')} type="image/webp" />
                <img src={section.image!} alt={section.imageAlt || section.heading || ''} loading="lazy" decoding="async" />
              </picture>
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

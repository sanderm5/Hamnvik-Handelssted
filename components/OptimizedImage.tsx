interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  className?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  sizes,
  className,
  fetchPriority,
}: OptimizedImageProps) {
  const webp = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        sizes={sizes}
        className={className}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

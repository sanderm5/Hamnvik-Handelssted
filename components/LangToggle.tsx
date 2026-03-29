import type { Locale } from '@/lib/i18n/utils';
import { switchLocalePath } from '@/lib/i18n/utils';

interface LangToggleProps {
  locale: Locale;
  currentPath: string;
  className?: string;
}

export default function LangToggle({ locale, currentPath, className = '' }: LangToggleProps) {
  const switchHref = switchLocalePath(currentPath);
  const isEn = locale === 'en';

  return (
    <a href={switchHref} className={`lang-toggle ${className}`} aria-label={isEn ? 'Bytt til norsk' : 'Switch to English'}>
      <span className={`lang-btn ${!isEn ? 'active' : ''}`}>NO</span>
      <span className={`lang-btn ${isEn ? 'active' : ''}`}>EN</span>
    </a>
  );
}

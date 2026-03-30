import '@fontsource/playfair-display/900.css';
import '@fontsource/playfair-display/700-italic.css';
import '@fontsource/playfair-display/900-italic.css';
import '@fontsource/playfair-display-sc/700.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/cormorant-sc/400.css';
import '@fontsource/cormorant-sc/600.css';
import '@/styles/global.css';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/lib/sanity-client';
import { VisualEditing } from 'next-sanity/visual-editing';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();
  const themeScript = `(function(){var s=localStorage.getItem('theme')||'system';var h=document.documentElement;h.setAttribute('data-theme-setting',s);var d=s==='dark'||(s==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){h.setAttribute('data-theme','dark')}else{h.removeAttribute('data-theme')}})()`;

  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/images/4_stamp_ship.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f6f0e0" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1610" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/images/4_stamp_ship.png" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript><style dangerouslySetInnerHTML={{ __html: '.scroll-reveal{opacity:1;transform:none}' }} /></noscript>
      </head>
      <body>
        {children}
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}

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
import { SanityLive } from '@/lib/sanity-client';
import { VisualEditing } from 'next-sanity/visual-editing';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <script src="/theme.js" />
        <noscript><style>{'.scroll-reveal{opacity:1;transform:none}'}</style></noscript>
      </head>
      <body>
        {children}
        <SanityLive />
        <VisualEditing />
      </body>
    </html>
  );
}

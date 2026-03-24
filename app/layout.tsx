import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools4Free — Free Online Tools',
  description: 'Free online tools: text generator, QR codes, passwords, word counter, JSON formatter, and more. No signup. No ads. No BS.',
  metadataBase: new URL('https://tools4free.site'),
  verification: {
    google: 'JnY5OeQlLMQEM09W-Zjo848bgz7vsKBiwRrQ5piOMFI',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        
        {/* Plausible Analytics */}
        <script async src="https://plausible.io/js/pa-U211NhoJTesfts3Tub5NU.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()` }} />

        {/*
          ADSENSE: Uncomment when approved
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX" crossOrigin="anonymous"></script>
        */}
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}

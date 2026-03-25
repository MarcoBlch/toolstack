import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools4Free — Free Online Tools',
  description: 'Free online tools: text generator, QR codes, passwords, word counter, JSON formatter, and more. No signup. No ads. No BS.',
  metadataBase: new URL('https://tools4free.site'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Impact.com affiliate verification */}
        <meta name="impact-site-verification" content="25f4a71a-436b-4180-99fa-244eec7f5b3d" />
        {/* Bing Webmaster verification */}
        <meta name="msvalidate.01" content="BE95D272AC442B5E195855FF37C3366B" />
        {/* Yandex Webmaster verification */}
        <meta name="yandex-verification" content="90ab532b19a09e92" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        
        {/*
          ADSENSE: Uncomment when approved
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX" crossOrigin="anonymous"></script>
        */}

        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "w10n6afuk4");`
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}

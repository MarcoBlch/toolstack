export type ToolCategory =
  | 'HealthApplication'
  | 'FinanceApplication'
  | 'UtilityApplication'
  | 'DeveloperApplication'
  | 'DesignApplication'
  | 'SecurityApplication'
  | 'BusinessApplication'

export function generateToolJsonLd(params: {
  name: string
  url: string
  description: string
  category: ToolCategory
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    url: params.url,
    description: params.description,
    applicationCategory: params.category,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function generateHomepageJsonLd() {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tools4Free',
    url: 'https://tools4free.site',
    description: 'Free online tools for developers, designers and everyone. 40+ browser-based utilities with no signup and no tracking.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tools4free.site/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these tools really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all 40+ tools on Tools4Free are completely free to use. There is no premium version, no signup wall, no usage limit, and no hidden fees. Every feature is available to everyone immediately without restrictions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data safe when using Tools4Free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every tool runs entirely in your browser using client-side JavaScript and Web APIs. Your text, images, calculations, and personal information never leave your device. Nothing is sent to a server, stored in a database, or shared with third parties.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of tools does Tools4Free offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tools4Free offers over 40 tools across five categories: text and content tools (fancy text, word counter, case converter), developer tools (JSON formatter, hash generator, regex tester), image and design tools (image compressor, QR code generator), finance calculators (mortgage, loan, investment, salary), and health calculators (calories, BMI, macros, body fat, running pace).',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account to use these tools?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Every tool works instantly without any account, login, or registration. There are no cookies to accept and no email addresses to provide. Just open the page and start using the tool.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use Tools4Free on my phone or tablet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All tools are fully responsive and work on any device with a modern web browser, including smartphones, tablets, laptops, and desktops. The interface adapts to your screen size automatically.',
        },
      },
    ],
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tools4Free',
    url: 'https://tools4free.site',
    logo: 'https://tools4free.site/icon.svg',
  }

  return [website, faq, organization]
}

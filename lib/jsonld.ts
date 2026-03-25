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

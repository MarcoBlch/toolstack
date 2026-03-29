export const FALLBACK_RATES: Record<string, number> = {
  EUR: 1, USD: 1.08, GBP: 0.86, JPY: 163, CHF: 0.97, CAD: 1.47,
  AUD: 1.65, CNY: 7.80, INR: 90.5, BRL: 5.45, MXN: 18.5,
  KRW: 1430, SEK: 11.2, NOK: 11.5, DKK: 7.46, PLN: 4.32,
  CZK: 25.2, HUF: 395, RON: 4.97, TRY: 35.0, ZAR: 19.8,
  AED: 3.97, SGD: 1.45, HKD: 8.45, NZD: 1.78, THB: 37.5,
  MAD: 10.8, TND: 3.35, XOF: 655.96, XAF: 655.96, RUB: 97.0,
}

export async function getRates(): Promise<{ rates: Record<string, number>; date: string }> {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=EUR', {
      next: { revalidate: 86400 },
    })
    const data = await res.json()
    return { rates: { ...data.rates, EUR: 1 }, date: data.date }
  } catch {
    return { rates: FALLBACK_RATES, date: '2026-03-25' }
  }
}

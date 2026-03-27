import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tools4Free — Kostenlose Online-Tools | Ohne Anmeldung',
  description: 'Kostenlose Online-Tools: Textgenerator, QR-Codes, Passwörter, Wortzähler, JSON-Formatter, Rechner und mehr. Ohne Anmeldung, ohne Tracking.',
  alternates: {
    canonical: 'https://tools4free.site/de',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — Kostenlose Online-Tools',
    description: 'Kostenlose Online-Tools. QR-Codes, Passwörter, JSON, Rechner und mehr. Ohne Anmeldung.',
    url: 'https://tools4free.site/de',
  },
}

const TOOLS_DE: { href: string; name: string; desc: string }[] = [
  { href: '/de/schriftarten-generator', name: 'Schriftarten Generator', desc: 'Text in 20+ Unicode-Stile für Instagram, TikTok und mehr umwandeln' },
  { href: '/de/qr-code-generator', name: 'QR-Code Generator', desc: 'QR-Codes für URL, WiFi, E-Mail, Telefon erstellen' },
  { href: '/de/passwort-generator', name: 'Passwort Generator', desc: 'Kryptographisch sichere Passwörter' },
  { href: '/de/einheiten-umrechner', name: 'Einheiten Umrechner', desc: 'Länge, Gewicht, Temperatur, Volumen, Geschwindigkeit und mehr' },
  { href: '/de/woerter-zaehler', name: 'Wörter Zähler', desc: 'Wörter, Zeichen, Sätze und Absätze zählen' },
  { href: '/de/bild-komprimieren', name: 'Bild Komprimieren', desc: 'Bildgröße um bis zu 80% reduzieren' },
  { href: '/de/json-formatter', name: 'JSON Formatter', desc: 'JSON formatieren, validieren und minifizieren' },
  { href: '/de/gross-kleinschreibung', name: 'Groß-/Kleinschreibung', desc: 'GROß, klein, Titel und mehr' },
  { href: '/de/css-gradient-generator', name: 'CSS Gradient Generator', desc: 'Schöne CSS-Verläufe visuell erstellen' },
  { href: '/de/lorem-ipsum-generator', name: 'Lorem Ipsum Generator', desc: 'Platzhaltertext. Absätze, Sätze oder Wortanzahl' },
  { href: '/de/rechnungsgenerator', name: 'Rechnungsgenerator', desc: 'Professionelle Rechnungen erstellen. PDF herunterladen' },
  { href: '/de/baufinanzierung-rechner', name: 'Baufinanzierung Rechner', desc: 'Monatliche Raten, Gesamtzinsen, Tilgungsplan' },
  { href: '/de/zinsrechner', name: 'Zinsrechner', desc: 'Zinseszins. Sehen Sie Ihr Geld wachsen' },
  { href: '/de/brutto-netto-rechner', name: 'Brutto Netto Rechner', desc: 'Brutto zu Netto. Steueraufschlüsselung' },
  { href: '/de/kreditrechner', name: 'Kreditrechner', desc: 'Monatliche Raten für jeden Kredit' },
  { href: '/de/prozentrechner', name: 'Prozentrechner', desc: 'Wie viel ist X% von Y? Prozentuale Veränderung' },
  { href: '/de/bmi-rechner', name: 'BMI Rechner', desc: 'Body-Mass-Index berechnen' },
  { href: '/de/trinkgeld-rechner', name: 'Trinkgeld Rechner', desc: 'Trinkgeld berechnen und Rechnung teilen' },
  { href: '/de/mehrwertsteuer-rechner', name: 'Mehrwertsteuer Rechner', desc: 'MwSt. hinzufügen oder entfernen. Ländersätze' },
  { href: '/de/waehrungsrechner', name: 'Währungsrechner', desc: 'Zwischen 30+ Weltwährungen umrechnen' },
  { href: '/de/rentenrechner', name: 'Rentenrechner', desc: 'Planen Sie Ihre Altersvorsorge' },
  { href: '/de/kalorienrechner', name: 'Kalorienrechner', desc: 'Täglicher Kalorienbedarf. BMR, TDEE' },
  { href: '/de/makrorechner', name: 'Makrorechner', desc: 'Proteine, Kohlenhydrate, Fette' },
  { href: '/de/koerperfettrechner', name: 'Körperfettrechner', desc: 'US Navy Methode. Fett- und Magermasse' },
  { href: '/de/geburtsterminrechner', name: 'Geburtsterminrechner', desc: 'Voraussichtlicher Termin, Trimester, Schwangerschaftswoche' },
  { href: '/de/kaloriendefizit-rechner', name: 'Kaloriendefizit Rechner', desc: 'Zeit bis zum Zielgewicht' },
  { href: '/de/herzfrequenz-rechner', name: 'Herzfrequenz Rechner', desc: 'Cardio-Zonen, Fettverbrennung, VO2 max' },
  { href: '/de/idealgewicht-rechner', name: 'Idealgewicht Rechner', desc: '4 Formeln. Gesunder BMI-Bereich für Ihre Größe' },
  { href: '/de/wasserbedarf-rechner', name: 'Wasserbedarf Rechner', desc: 'Wie viel Wasser pro Tag nach Gewicht' },
  { href: '/de/1rm-rechner', name: '1RM Rechner', desc: 'Schätzen Sie Ihr maximales Gewicht. Epley, Brzycki' },
  { href: '/de/laufpace-rechner', name: 'Laufpace Rechner', desc: '5K, 10K, Halbmarathon, Marathon. Splits und Pace' },
]

const fb = "'Outfit', -apple-system, sans-serif"

export default function GermanHomePage() {
  return (
    <div style={{ fontFamily: fb, background: '#FAFAF8', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <Link href="/" style={{ fontSize: 13, color: '#9A958A', textDecoration: 'none' }}>← English</Link>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1C1B18', margin: '24px 0 8px' }}>
          Kostenlose Online-Tools
        </h1>
        <p style={{ fontSize: 16, color: '#5C5850', marginBottom: 32, lineHeight: 1.6 }}>
          {TOOLS_DE.length} kostenlose Tools. Ohne Anmeldung, ohne Tracking. 100% in Ihrem Browser.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {TOOLS_DE.map(t => (
            <Link key={t.href} href={t.href} style={{
              display: 'block', padding: '16px 18px', borderRadius: 10,
              border: '1px solid #E8E4DB', background: '#fff', textDecoration: 'none',
              transition: 'all .15s',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1B18', marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: '#9A958A', lineHeight: 1.4 }}>{t.desc}</div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48, fontSize: 12, color: '#B0AAA0' }}>
          © 2026 Tools4Free — Für immer kostenlos
        </div>
      </div>
    </div>
  )
}

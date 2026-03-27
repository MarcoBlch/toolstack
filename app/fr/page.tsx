import type { Metadata } from 'next'
import Link from 'next/link'
import { TRANSLATIONS } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Tools4Free — Outils en Ligne Gratuits | Sans Inscription',
  description: 'Outils gratuits en ligne : générateur de texte, QR codes, mots de passe, compteur de mots, formateur JSON, calculatrices et plus. Sans inscription, sans tracking.',
  alternates: {
    canonical: 'https://tools4free.site/fr',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — Outils en Ligne Gratuits',
    description: 'Outils gratuits en ligne. QR codes, mots de passe, JSON, calculatrices et plus. Sans inscription.',
    url: 'https://tools4free.site/fr',
  },
}

const TOOLS_FR: { href: string; name: string; desc: string }[] = [
  { href: '/fr/texte-style', name: 'Générateur de Texte Stylé', desc: 'Convertissez du texte en 20+ styles Unicode pour Instagram, TikTok et plus' },
  { href: '/fr/generateur-qr-code', name: 'Générateur de QR Code', desc: 'Créez des QR codes pour URL, WiFi, email, téléphone' },
  { href: '/fr/generateur-mot-de-passe', name: 'Générateur de Mot de Passe', desc: 'Mots de passe cryptographiquement sécurisés' },
  { href: '/fr/convertisseur-unites', name: 'Convertisseur d\'Unités', desc: 'Longueur, poids, température, volume, vitesse et plus' },
  { href: '/fr/compteur-mots', name: 'Compteur de Mots', desc: 'Comptez mots, caractères, phrases et paragraphes' },
  { href: '/fr/compresser-image', name: 'Compresser Image', desc: 'Réduisez la taille des images jusqu\'à 80%' },
  { href: '/fr/formateur-json', name: 'Formateur JSON', desc: 'Formatez, validez et minifiez du JSON' },
  { href: '/fr/convertisseur-majuscules', name: 'Convertisseur Majuscules', desc: 'MAJUSCULES, minuscules, Titre et plus' },
  { href: '/fr/generateur-degrade-css', name: 'Générateur Dégradé CSS', desc: 'Créez de beaux dégradés CSS visuellement' },
  { href: '/fr/generateur-lorem-ipsum', name: 'Générateur Lorem Ipsum', desc: 'Texte de remplissage. Paragraphes, phrases ou nombre de mots' },
  { href: '/fr/facture-gratuite', name: 'Facture Gratuite', desc: 'Créez des factures professionnelles. Téléchargez en PDF' },
  { href: '/fr/calculatrice-pret-immobilier', name: 'Calculatrice Prêt Immobilier', desc: 'Mensualités, intérêts totaux, amortissement' },
  { href: '/fr/simulateur-investissement', name: 'Simulateur Investissement', desc: 'Intérêts composés. Voyez votre argent croître' },
  { href: '/fr/salaire-brut-net', name: 'Salaire Brut Net', desc: 'Convertissez brut en net. Détail des impôts' },
  { href: '/fr/calculatrice-credit', name: 'Calculatrice Crédit', desc: 'Mensualités pour tout prêt. Tableau d\'amortissement' },
  { href: '/fr/calculatrice-pourcentage', name: 'Calculatrice Pourcentage', desc: 'Combien fait X% de Y ? Variation en pourcentage' },
  { href: '/fr/calcul-imc', name: 'Calcul IMC', desc: 'Calculez votre indice de masse corporelle' },
  { href: '/fr/calculatrice-pourboire', name: 'Calculatrice Pourboire', desc: 'Calculez le pourboire et partagez l\'addition' },
  { href: '/fr/calcul-tva', name: 'Calcul TVA', desc: 'Ajoutez ou retirez la TVA. Taux par pays' },
  { href: '/fr/convertisseur-devise', name: 'Convertisseur Devise', desc: 'Convertissez entre 30+ devises mondiales' },
  { href: '/fr/simulateur-retraite', name: 'Simulateur Retraite', desc: 'Planifiez votre épargne retraite' },
  { href: '/fr/calculateur-calories', name: 'Calculateur Calories', desc: 'Besoins caloriques journaliers. BMR, TDEE' },
  { href: '/fr/calculateur-macros', name: 'Calculateur Macros', desc: 'Protéines, glucides, lipides' },
  { href: '/fr/calcul-masse-grasse', name: 'Calcul Masse Grasse', desc: 'Méthode US Navy. Masse grasse et maigre' },
  { href: '/fr/calcul-date-accouchement', name: 'Date d\'Accouchement', desc: 'Date prévue, trimestre, âge gestationnel' },
  { href: '/fr/calcul-deficit-calorique', name: 'Déficit Calorique', desc: 'Temps pour atteindre votre poids cible' },
  { href: '/fr/frequence-cardiaque', name: 'Fréquence Cardiaque', desc: 'Zones cardio, brûle-graisses, VO2 max' },
  { href: '/fr/poids-ideal', name: 'Poids Idéal', desc: '4 formules. Plage IMC saine pour votre taille' },
  { href: '/fr/calcul-hydratation', name: 'Calcul Hydratation', desc: 'Combien d\'eau par jour selon votre poids' },
  { href: '/fr/calculateur-1rm', name: 'Calculateur 1RM', desc: 'Estimez votre rep max. Epley, Brzycki' },
  { href: '/fr/calculateur-allure-course', name: 'Allure de Course', desc: '5K, 10K, semi, marathon. Splits et allure' },
]

const fb = "'Outfit', -apple-system, sans-serif"

export default function FrenchHomePage() {
  return (
    <div style={{ fontFamily: fb, background: '#FAFAF8', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <Link href="/" style={{ fontSize: 13, color: '#9A958A', textDecoration: 'none' }}>← English</Link>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1C1B18', margin: '24px 0 8px' }}>
          Outils en Ligne Gratuits
        </h1>
        <p style={{ fontSize: 16, color: '#5C5850', marginBottom: 32, lineHeight: 1.6 }}>
          {TOOLS_FR.length} outils gratuits. Sans inscription, sans tracking. 100% dans votre navigateur.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {TOOLS_FR.map(t => (
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
          © 2026 Tools4Free — Gratuit pour toujours
        </div>
      </div>
    </div>
  )
}

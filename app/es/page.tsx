import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tools4Free — Herramientas Online Gratis | Sin Registro',
  description: 'Herramientas online gratuitas: generador de texto, códigos QR, contraseñas, contador de palabras, formateador JSON, calculadoras y más. Sin registro, sin rastreo.',
  alternates: {
    canonical: 'https://tools4free.site/es',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — Herramientas Online Gratis',
    description: 'Herramientas online gratuitas. QR codes, contraseñas, JSON, calculadoras y más. Sin registro.',
    url: 'https://tools4free.site/es',
  },
}

const TOOLS_ES: { href: string; name: string; desc: string }[] = [
  { href: '/es/letras-bonitas', name: 'Letras Bonitas', desc: 'Convierte texto en 20+ estilos Unicode para Instagram, TikTok y más' },
  { href: '/es/generador-qr', name: 'Generador QR', desc: 'Crea códigos QR para URL, WiFi, email, teléfono' },
  { href: '/es/generador-contrasena', name: 'Generador de Contraseña', desc: 'Contraseñas criptográficamente seguras' },
  { href: '/es/convertidor-unidades', name: 'Convertidor de Unidades', desc: 'Longitud, peso, temperatura, volumen, velocidad y más' },
  { href: '/es/contador-palabras', name: 'Contador de Palabras', desc: 'Cuenta palabras, caracteres, frases y párrafos' },
  { href: '/es/compresor-imagen', name: 'Compresor de Imagen', desc: 'Reduce el tamaño de imágenes hasta un 80%' },
  { href: '/es/formateador-json', name: 'Formateador JSON', desc: 'Formatea, valida y minifica JSON' },
  { href: '/es/conversor-mayusculas', name: 'Conversor Mayúsculas', desc: 'MAYÚSCULAS, minúsculas, Título y más' },
  { href: '/es/generador-degradado-css', name: 'Generador Degradado CSS', desc: 'Crea hermosos degradados CSS visualmente' },
  { href: '/es/generador-lorem', name: 'Generador Lorem Ipsum', desc: 'Texto de relleno. Párrafos, frases o cantidad de palabras' },
  { href: '/es/factura-gratis', name: 'Factura Gratis', desc: 'Crea facturas profesionales. Descarga PDF' },
  { href: '/es/calculadora-hipoteca', name: 'Calculadora Hipoteca', desc: 'Cuotas mensuales, intereses totales, amortización' },
  { href: '/es/calculadora-inversion', name: 'Calculadora Inversión', desc: 'Interés compuesto. Mira crecer tu dinero' },
  { href: '/es/calculadora-salario-neto', name: 'Calculadora Salario Neto', desc: 'De bruto a neto. Desglose de impuestos' },
  { href: '/es/calculadora-prestamo', name: 'Calculadora Préstamo', desc: 'Cuotas mensuales para cualquier préstamo' },
  { href: '/es/calculadora-porcentaje', name: 'Calculadora Porcentaje', desc: '¿Cuánto es X% de Y? Variación porcentual' },
  { href: '/es/calculadora-imc', name: 'Calculadora IMC', desc: 'Calcula tu índice de masa corporal' },
  { href: '/es/calculadora-propina', name: 'Calculadora Propina', desc: 'Calcula la propina y divide la cuenta' },
  { href: '/es/calculadora-iva', name: 'Calculadora IVA', desc: 'Añade o quita IVA. Tasas por país' },
  { href: '/es/convertidor-moneda', name: 'Convertidor Moneda', desc: 'Convierte entre 30+ monedas mundiales' },
  { href: '/es/calculadora-jubilacion', name: 'Calculadora Jubilación', desc: 'Planifica tu ahorro para la jubilación' },
  { href: '/es/calculadora-calorias', name: 'Calculadora Calorías', desc: 'Necesidades calóricas diarias. TMB, TDEE' },
  { href: '/es/calculadora-macros', name: 'Calculadora Macros', desc: 'Proteínas, carbohidratos, grasas' },
  { href: '/es/calculadora-grasa-corporal', name: 'Calculadora Grasa Corporal', desc: 'Método US Navy. Masa grasa y magra' },
  { href: '/es/calculadora-fecha-parto', name: 'Calculadora Fecha de Parto', desc: 'Fecha prevista, trimestre, edad gestacional' },
  { href: '/es/calculadora-deficit-calorico', name: 'Déficit Calórico', desc: 'Tiempo para alcanzar tu peso objetivo' },
  { href: '/es/calculadora-frecuencia-cardiaca', name: 'Frecuencia Cardíaca', desc: 'Zonas cardio, quema grasa, VO2 max' },
  { href: '/es/calculadora-peso-ideal', name: 'Peso Ideal', desc: '4 fórmulas. Rango IMC saludable para tu altura' },
  { href: '/es/calculadora-agua-diaria', name: 'Agua Diaria', desc: 'Cuánta agua por día según tu peso' },
  { href: '/es/calculadora-1rm', name: 'Calculadora 1RM', desc: 'Estima tu rep máxima. Epley, Brzycki' },
  { href: '/es/calculadora-ritmo-carrera', name: 'Ritmo de Carrera', desc: '5K, 10K, media, maratón. Splits y ritmo' },
]

const fb = "'Outfit', -apple-system, sans-serif"

export default function SpanishHomePage() {
  return (
    <div style={{ fontFamily: fb, background: '#FAFAF8', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <Link href="/" style={{ fontSize: 13, color: '#9A958A', textDecoration: 'none' }}>← English</Link>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1C1B18', margin: '24px 0 8px' }}>
          Herramientas Online Gratis
        </h1>
        <p style={{ fontSize: 16, color: '#5C5850', marginBottom: 32, lineHeight: 1.6 }}>
          {TOOLS_ES.length} herramientas gratuitas. Sin registro, sin rastreo. 100% en tu navegador.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {TOOLS_ES.map(t => (
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
          © 2026 Tools4Free — Gratis para siempre
        </div>
      </div>
    </div>
  )
}

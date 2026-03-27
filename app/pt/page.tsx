import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tools4Free — Ferramentas Online Grátis | Sem Cadastro',
  description: 'Ferramentas online gratuitas: gerador de texto, QR codes, senhas, contador de palavras, formatador JSON, calculadoras e mais. Sem cadastro, sem rastreamento.',
  alternates: {
    canonical: 'https://tools4free.site/pt',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — Ferramentas Online Grátis',
    description: 'Ferramentas online gratuitas. QR codes, senhas, JSON, calculadoras e mais. Sem cadastro.',
    url: 'https://tools4free.site/pt',
  },
}

const TOOLS_PT: { href: string; name: string; desc: string }[] = [
  { href: '/pt/texto-estilizado', name: 'Texto Estilizado', desc: 'Converta texto em 20+ estilos Unicode para Instagram, TikTok e mais' },
  { href: '/pt/gerador-qr', name: 'Gerador QR', desc: 'Crie QR codes para URL, WiFi, email, telefone' },
  { href: '/pt/gerador-senha', name: 'Gerador de Senha', desc: 'Senhas criptograficamente seguras' },
  { href: '/pt/conversor-unidades', name: 'Conversor de Unidades', desc: 'Comprimento, peso, temperatura, volume, velocidade e mais' },
  { href: '/pt/contador-palavras', name: 'Contador de Palavras', desc: 'Conte palavras, caracteres, frases e parágrafos' },
  { href: '/pt/compressor-imagem', name: 'Compressor de Imagem', desc: 'Reduza o tamanho das imagens em até 80%' },
  { href: '/pt/formatador-json', name: 'Formatador JSON', desc: 'Formate, valide e minifique JSON' },
  { href: '/pt/conversor-maiusculas', name: 'Conversor Maiúsculas', desc: 'MAIÚSCULAS, minúsculas, Título e mais' },
  { href: '/pt/gerador-gradiente-css', name: 'Gerador Gradiente CSS', desc: 'Crie belos gradientes CSS visualmente' },
  { href: '/pt/gerador-lorem', name: 'Gerador Lorem Ipsum', desc: 'Texto placeholder. Parágrafos, frases ou contagem de palavras' },
  { href: '/pt/calculadora-financiamento', name: 'Calculadora Financiamento', desc: 'Parcelas mensais, juros totais, amortização' },
  { href: '/pt/calculadora-investimento', name: 'Calculadora Investimento', desc: 'Juros compostos. Veja seu dinheiro crescer' },
  { href: '/pt/calculadora-salario-liquido', name: 'Calculadora Salário Líquido', desc: 'De bruto para líquido. Detalhamento de impostos' },
  { href: '/pt/calculadora-emprestimo', name: 'Calculadora Empréstimo', desc: 'Parcelas mensais para qualquer empréstimo' },
  { href: '/pt/calculadora-porcentagem', name: 'Calculadora Porcentagem', desc: 'Quanto é X% de Y? Variação percentual' },
  { href: '/pt/calculadora-imc', name: 'Calculadora IMC', desc: 'Calcule seu índice de massa corporal' },
  { href: '/pt/calculadora-gorjeta', name: 'Calculadora Gorjeta', desc: 'Calcule a gorjeta e divida a conta' },
  { href: '/pt/calculadora-imposto', name: 'Calculadora Imposto', desc: 'Adicione ou remova imposto. Taxas por país' },
  { href: '/pt/conversor-moeda', name: 'Conversor Moeda', desc: 'Converta entre 30+ moedas mundiais' },
  { href: '/pt/calculadora-aposentadoria', name: 'Calculadora Aposentadoria', desc: 'Planeje sua poupança para aposentadoria' },
  { href: '/pt/calculadora-calorias', name: 'Calculadora Calorias', desc: 'Necessidades calóricas diárias. TMB, TDEE' },
  { href: '/pt/calculadora-macros', name: 'Calculadora Macros', desc: 'Proteínas, carboidratos, gorduras' },
  { href: '/pt/calculadora-gordura-corporal', name: 'Calculadora Gordura Corporal', desc: 'Método US Navy. Massa gorda e magra' },
  { href: '/pt/calculadora-data-parto', name: 'Calculadora Data do Parto', desc: 'Data prevista, trimestre, idade gestacional' },
  { href: '/pt/calculadora-deficit-calorico', name: 'Déficit Calórico', desc: 'Tempo para atingir seu peso meta' },
  { href: '/pt/calculadora-frequencia-cardiaca', name: 'Frequência Cardíaca', desc: 'Zonas cardio, queima de gordura, VO2 max' },
  { href: '/pt/calculadora-peso-ideal', name: 'Peso Ideal', desc: '4 fórmulas. Faixa IMC saudável para sua altura' },
  { href: '/pt/calculadora-agua-diaria', name: 'Água Diária', desc: 'Quanta água por dia pelo seu peso' },
  { href: '/pt/calculadora-1rm', name: 'Calculadora 1RM', desc: 'Estime sua rep máxima. Epley, Brzycki' },
  { href: '/pt/calculadora-ritmo-corrida', name: 'Ritmo de Corrida', desc: '5K, 10K, meia, maratona. Splits e ritmo' },
]

const fb = "'Outfit', -apple-system, sans-serif"

export default function PortugueseHomePage() {
  return (
    <div style={{ fontFamily: fb, background: '#FAFAF8', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <Link href="/" style={{ fontSize: 13, color: '#9A958A', textDecoration: 'none' }}>← English</Link>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1C1B18', margin: '24px 0 8px' }}>
          Ferramentas Online Grátis
        </h1>
        <p style={{ fontSize: 16, color: '#5C5850', marginBottom: 32, lineHeight: 1.6 }}>
          {TOOLS_PT.length} ferramentas gratuitas. Sem cadastro, sem rastreamento. 100% no seu navegador.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {TOOLS_PT.map(t => (
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
          © 2026 Tools4Free — Grátis para sempre
        </div>
      </div>
    </div>
  )
}

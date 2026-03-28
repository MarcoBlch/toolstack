'use client'
import { useState, useCallback, useRef } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

type LineItem = { id: number; desc: string; qty: number; price: number }

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso' },
]

const COLORS = ['#1C1B18', '#3B82F6', '#22A065', '#8B5CF6', '#E8457A', '#D85A30', '#0EA5E9', '#059669']

const LABELS: Record<string, Record<Locale, string>> = {
  // Settings section
  settings: { en: 'Settings', fr: 'Paramètres', es: 'Configuración', pt: 'Configurações', de: 'Einstellungen' },
  currency: { en: 'Currency', fr: 'Devise', es: 'Moneda', pt: 'Moeda', de: 'Währung' },
  accentColor: { en: 'Accent color', fr: 'Couleur d\'accent', es: 'Color de acento', pt: 'Cor de destaque', de: 'Akzentfarbe' },
  invoiceNum: { en: 'Invoice #', fr: 'N° de facture', es: 'N° de factura', pt: 'N° da fatura', de: 'Rechnungs-Nr.' },
  date: { en: 'Date', fr: 'Date', es: 'Fecha', pt: 'Data', de: 'Datum' },
  dueDate: { en: 'Due date', fr: 'Échéance', es: 'Vencimiento', pt: 'Vencimento', de: 'Fälligkeitsdatum' },

  // From section
  fromSection: { en: 'From (your business)', fr: 'De (votre entreprise)', es: 'De (tu negocio)', pt: 'De (sua empresa)', de: 'Von (Ihr Unternehmen)' },
  businessName: { en: 'Business name', fr: 'Nom de l\'entreprise', es: 'Nombre del negocio', pt: 'Nome da empresa', de: 'Firmenname' },
  address: { en: 'Address', fr: 'Adresse', es: 'Dirección', pt: 'Endereço', de: 'Adresse' },
  email: { en: 'Email', fr: 'E-mail', es: 'Correo electrónico', pt: 'E-mail', de: 'E-Mail' },

  // To section
  toSection: { en: 'To (client)', fr: 'À (client)', es: 'Para (cliente)', pt: 'Para (cliente)', de: 'An (Kunde)' },
  clientName: { en: 'Client name', fr: 'Nom du client', es: 'Nombre del cliente', pt: 'Nome do cliente', de: 'Kundenname' },

  // Line items
  lineItems: { en: 'Line items', fr: 'Postes', es: 'Partidas', pt: 'Itens', de: 'Positionen' },
  description: { en: 'Description', fr: 'Description', es: 'Descripción', pt: 'Descrição', de: 'Beschreibung' },
  qty: { en: 'Qty', fr: 'Qté', es: 'Cant.', pt: 'Qtd.', de: 'Menge' },
  serviceOrProduct: { en: 'Service or product', fr: 'Service ou produit', es: 'Servicio o producto', pt: 'Serviço ou produto', de: 'Dienstleistung oder Produkt' },
  addLineItem: { en: '+ Add line item', fr: '+ Ajouter un poste', es: '+ Añadir partida', pt: '+ Adicionar item', de: '+ Position hinzufügen' },

  // Tax & discount
  taxRate: { en: 'Tax rate (%)', fr: 'Taux de taxe (%)', es: 'Tasa de impuesto (%)', pt: 'Taxa de imposto (%)', de: 'Steuersatz (%)' },
  discountPercent: { en: 'Discount (%)', fr: 'Remise (%)', es: 'Descuento (%)', pt: 'Desconto (%)', de: 'Rabatt (%)' },

  // Notes
  notesTerms: { en: 'Notes / terms', fr: 'Notes / conditions', es: 'Notas / condiciones', pt: 'Notas / termos', de: 'Notizen / Bedingungen' },
  defaultNotes: {
    en: 'Payment is due within 30 days. Thank you for your business.',
    fr: 'Le paiement est dû sous 30 jours. Merci pour votre confiance.',
    es: 'El pago vence en 30 días. Gracias por su confianza.',
    pt: 'O pagamento deve ser efetuado em 30 dias. Obrigado pela preferência.',
    de: 'Zahlung fällig innerhalb von 30 Tagen. Vielen Dank für Ihr Vertrauen.',
  },

  // Preview labels
  yourBusiness: { en: 'Your Business', fr: 'Votre Entreprise', es: 'Tu Negocio', pt: 'Sua Empresa', de: 'Ihr Unternehmen' },
  invoiceTitle: { en: 'INVOICE', fr: 'FACTURE', es: 'FACTURA', pt: 'FATURA', de: 'RECHNUNG' },
  billTo: { en: 'Bill to', fr: 'Facturer à', es: 'Facturar a', pt: 'Faturar para', de: 'Rechnung an' },
  clientNamePreview: { en: 'Client Name', fr: 'Nom du Client', es: 'Nombre del Cliente', pt: 'Nome do Cliente', de: 'Kundenname' },
  subtotal: { en: 'Subtotal', fr: 'Sous-total', es: 'Subtotal', pt: 'Subtotal', de: 'Zwischensumme' },
  discount: { en: 'Discount', fr: 'Remise', es: 'Descuento', pt: 'Desconto', de: 'Rabatt' },
  tax: { en: 'Tax', fr: 'Taxe', es: 'Impuesto', pt: 'Imposto', de: 'Steuer' },
  notes: { en: 'Notes', fr: 'Notes', es: 'Notas', pt: 'Notas', de: 'Notizen' },
  footer: {
    en: 'Generated with tools4free.site — Free invoice generator',
    fr: 'Généré avec tools4free.site — Générateur de factures gratuit',
    es: 'Generado con tools4free.site — Generador de facturas gratis',
    pt: 'Gerado com tools4free.site — Gerador de faturas grátis',
    de: 'Erstellt mit tools4free.site — Kostenloser Rechnungsgenerator',
  },

  // Actions
  downloadPDF: { en: 'Download PDF', fr: 'Télécharger PDF', es: 'Descargar PDF', pt: 'Baixar PDF', de: 'PDF herunterladen' },

  // SEO
  seoH2: {
    en: 'Free invoice generator — no signup, no watermark',
    fr: 'Générateur de factures gratuit — sans inscription, sans filigrane',
    es: 'Generador de facturas gratis — sin registro, sin marca de agua',
    pt: 'Gerador de faturas grátis — sem cadastro, sem marca d\'água',
    de: 'Kostenloser Rechnungsgenerator — ohne Anmeldung, ohne Wasserzeichen',
  },
  seoP1: {
    en: 'InvoiceForge creates professional invoices instantly in your browser. Add your business details, client information, line items with quantities and prices, tax rates, and discounts. A live preview updates as you type so you can see exactly what your client will receive. Download the finished invoice as a PDF with one click. The tool supports 10 currencies including USD, EUR, GBP, BRL, and JPY, and you can customize the accent color to match your brand.',
    fr: 'InvoiceForge crée des factures professionnelles instantanément dans votre navigateur. Ajoutez vos informations d\'entreprise, les données du client, les postes avec quantités et prix, les taux de taxe et les remises. Un aperçu en direct se met à jour au fur et à mesure que vous tapez pour voir exactement ce que votre client recevra. Téléchargez la facture finalisée en PDF en un clic. L\'outil prend en charge 10 devises dont USD, EUR, GBP, BRL et JPY, et vous pouvez personnaliser la couleur d\'accent pour correspondre à votre marque.',
    es: 'InvoiceForge crea facturas profesionales instantáneamente en tu navegador. Añade los datos de tu negocio, información del cliente, partidas con cantidades y precios, tasas de impuestos y descuentos. Una vista previa en vivo se actualiza mientras escribes para que veas exactamente lo que recibirá tu cliente. Descarga la factura terminada como PDF con un clic. La herramienta soporta 10 monedas incluyendo USD, EUR, GBP, BRL y JPY, y puedes personalizar el color de acento para que coincida con tu marca.',
    pt: 'O InvoiceForge cria faturas profissionais instantaneamente no seu navegador. Adicione os dados da sua empresa, informações do cliente, itens com quantidades e preços, taxas de impostos e descontos. Uma visualização ao vivo atualiza enquanto você digita para que veja exatamente o que seu cliente receberá. Baixe a fatura finalizada como PDF com um clique. A ferramenta suporta 10 moedas incluindo USD, EUR, GBP, BRL e JPY, e você pode personalizar a cor de destaque para combinar com sua marca.',
    de: 'InvoiceForge erstellt professionelle Rechnungen sofort in deinem Browser. Füge deine Geschäftsdaten, Kundeninformationen, Positionen mit Mengen und Preisen, Steuersätze und Rabatte hinzu. Eine Live-Vorschau aktualisiert sich beim Tippen, damit du genau siehst, was dein Kunde erhalten wird. Lade die fertige Rechnung mit einem Klick als PDF herunter. Das Tool unterstützt 10 Währungen einschließlich USD, EUR, GBP, BRL und JPY, und du kannst die Akzentfarbe an deine Marke anpassen.',
  },
  seoH3a: {
    en: 'Line items, tax, and discount calculations',
    fr: 'Postes, taxes et calculs de remises',
    es: 'Partidas, impuestos y cálculos de descuentos',
    pt: 'Itens, impostos e cálculos de descontos',
    de: 'Positionen, Steuer- und Rabattberechnungen',
  },
  seoP2: {
    en: 'Add as many line items as you need, each with a description, quantity, and unit price. The subtotal updates automatically. Apply a tax percentage and the tool calculates the tax amount and grand total for you. You can also add a discount that is subtracted before tax, making it easy to offer early-payment incentives or volume pricing. These calculations happen in real time, so there is no need to reach for a separate calculator.',
    fr: 'Ajoutez autant de postes que nécessaire, chacun avec une description, une quantité et un prix unitaire. Le sous-total se met à jour automatiquement. Appliquez un pourcentage de taxe et l\'outil calcule le montant de la taxe et le total général pour vous. Vous pouvez aussi ajouter une remise soustraite avant la taxe, facilitant l\'offre d\'incitations au paiement anticipé ou de tarifs par volume. Ces calculs se font en temps réel, pas besoin de recourir à une calculatrice séparée.',
    es: 'Añade tantas partidas como necesites, cada una con una descripción, cantidad y precio unitario. El subtotal se actualiza automáticamente. Aplica un porcentaje de impuesto y la herramienta calcula el monto del impuesto y el total general por ti. También puedes añadir un descuento que se resta antes del impuesto, facilitando ofrecer incentivos de pago anticipado o precios por volumen. Estos cálculos ocurren en tiempo real, sin necesidad de una calculadora aparte.',
    pt: 'Adicione quantos itens precisar, cada um com descrição, quantidade e preço unitário. O subtotal atualiza automaticamente. Aplique uma porcentagem de imposto e a ferramenta calcula o valor do imposto e o total geral para você. Você também pode adicionar um desconto que é subtraído antes do imposto, facilitando oferecer incentivos de pagamento antecipado ou preços por volume. Esses cálculos acontecem em tempo real, sem necessidade de uma calculadora separada.',
    de: 'Füge so viele Positionen hinzu wie nötig, jeweils mit Beschreibung, Menge und Stückpreis. Die Zwischensumme aktualisiert sich automatisch. Wende einen Steuerprozentsatz an und das Tool berechnet den Steuerbetrag und die Gesamtsumme für dich. Du kannst auch einen Rabatt hinzufügen, der vor der Steuer abgezogen wird, was es einfach macht, Frühzahler-Anreize oder Mengenrabatte anzubieten. Diese Berechnungen geschehen in Echtzeit, ohne dass du einen separaten Taschenrechner brauchst.',
  },
  seoH3b: {
    en: 'Privacy and PDF export',
    fr: 'Confidentialité et export PDF',
    es: 'Privacidad y exportación PDF',
    pt: 'Privacidade e exportação PDF',
    de: 'Datenschutz und PDF-Export',
  },
  seoP3: {
    en: 'All data stays in your browser. Nothing is uploaded to a server, which means your business details and client information remain confidential. The PDF export produces a clean, professional document that you can email directly or print for your records. There is no account required, no watermark stamped on the output, and no limit on the number of invoices you can generate. It is a completely free tool for freelancers, small businesses, and anyone who needs to bill clients.',
    fr: 'Toutes les données restent dans votre navigateur. Rien n\'est envoyé sur un serveur, ce qui signifie que vos informations d\'entreprise et celles de vos clients restent confidentielles. L\'export PDF produit un document propre et professionnel que vous pouvez envoyer par email directement ou imprimer pour vos archives. Aucun compte requis, aucun filigrane sur le résultat, et aucune limite au nombre de factures que vous pouvez générer. C\'est un outil entièrement gratuit pour les freelances, les petites entreprises et quiconque doit facturer des clients.',
    es: 'Todos los datos permanecen en tu navegador. Nada se sube a un servidor, lo que significa que los datos de tu negocio y la información de tus clientes permanecen confidenciales. La exportación PDF produce un documento limpio y profesional que puedes enviar por correo electrónico directamente o imprimir para tus registros. No se requiere cuenta, no hay marca de agua en el resultado y no hay límite en el número de facturas que puedes generar. Es una herramienta completamente gratis para freelancers, pequeñas empresas y cualquiera que necesite facturar clientes.',
    pt: 'Todos os dados permanecem no seu navegador. Nada é enviado para um servidor, o que significa que os dados da sua empresa e as informações dos clientes permanecem confidenciais. A exportação PDF produz um documento limpo e profissional que você pode enviar por email diretamente ou imprimir para seus registros. Não é necessário conta, não há marca d\'água no resultado e não há limite no número de faturas que você pode gerar. É uma ferramenta completamente grátis para freelancers, pequenas empresas e qualquer pessoa que precise faturar clientes.',
    de: 'Alle Daten bleiben in deinem Browser. Nichts wird auf einen Server hochgeladen, was bedeutet, dass deine Geschäftsdaten und Kundeninformationen vertraulich bleiben. Der PDF-Export erzeugt ein sauberes, professionelles Dokument, das du direkt per E-Mail versenden oder für deine Unterlagen ausdrucken kannst. Kein Konto erforderlich, kein Wasserzeichen auf dem Ergebnis und keine Begrenzung der Anzahl der Rechnungen, die du erstellen kannst. Es ist ein vollständig kostenloses Tool für Freiberufler, kleine Unternehmen und jeden, der Kunden abrechnen muss.',
  },
  seoP4: {
    en: 'Need to calculate percentages for discounts or markups? Use the <a>Percentage Calculator</a> for quick math. If you need to figure out VAT amounts for different regions, the <b>VAT Calculator</b> can help you get the numbers right.',
    fr: 'Besoin de calculer des pourcentages pour les remises ou majorations ? Utilisez le <a>Calculateur de pourcentage</a> pour un calcul rapide. Si vous devez déterminer les montants de TVA pour différentes régions, le <b>Calculateur de TVA</b> peut vous aider à obtenir les bons chiffres.',
    es: '¿Necesitas calcular porcentajes para descuentos o márgenes? Usa la <a>Calculadora de porcentajes</a> para cálculos rápidos. Si necesitas calcular montos de IVA para diferentes regiones, la <b>Calculadora de IVA</b> puede ayudarte a obtener los números correctos.',
    pt: 'Precisa calcular porcentagens para descontos ou margens? Use a <a>Calculadora de porcentagem</a> para cálculos rápidos. Se precisar calcular valores de IVA para diferentes regiões, a <b>Calculadora de IVA</b> pode ajudar a acertar os números.',
    de: 'Musst du Prozentsätze für Rabatte oder Aufschläge berechnen? Nutze den <a>Prozentrechner</a> für schnelle Berechnungen. Wenn du MwSt.-Beträge für verschiedene Regionen ermitteln musst, hilft dir der <b>MwSt.-Rechner</b>, die richtigen Zahlen zu erhalten.',
  },
}

let nextId = 1

export default function InvoiceClient({ locale = 'en' as Locale }: { locale?: Locale } = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [fromName, setFromName] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [toName, setToName] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [toEmail, setToEmail] = useState('')
  const [invoiceNum, setInvoiceNum] = useState('INV-001')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().split('T')[0]
  })
  const [items, setItems] = useState<LineItem[]>([{ id: nextId++, desc: '', qty: 1, price: 0 }])
  const [taxRate, setTaxRate] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [notes, setNotes] = useState(lt('defaultNotes'))
  const [currency, setCurrency] = useState('EUR')
  const [accentColor, setAccentColor] = useState('#3B82F6')
  const printRef = useRef<HTMLDivElement>(null)

  const cur = CURRENCIES.find(c => c.code === currency) || CURRENCIES[1]

  const addItem = () => setItems([...items, { id: nextId++, desc: '', qty: 1, price: 0 }])
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id))
  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0)
  const discountAmount = subtotal * (discount / 100)
  const taxableAmount = subtotal - discountAmount
  const taxAmount = taxableAmount * (taxRate / 100)
  const total = taxableAmount + taxAmount

  const fmt = (n: number) => {
    const f = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${cur.symbol}${f}`
  }

  const handlePrint = useCallback(() => {
    const el = printRef.current
    if (!el) return
    const win = window.open('', '_blank', 'width=800,height=1100')
    if (!win) return
    win.document.write(`<!DOCTYPE html><html><head><title>${lt('invoiceTitle')} ${invoiceNum}</title>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Outfit',sans-serif; color:#1C1B18; padding:48px; background:#fff; }
        @media print { body { padding:0; } @page { margin:20mm; } }
      </style></head><body>${el.innerHTML}</body></html>`)
    win.document.close()
    setTimeout(() => { win.print(); win.close() }, 400)
  }, [invoiceNum, locale])

  const inputStyle = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8, padding: '10px 12px',
    fontSize: 14, fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none',
  }
  const labelStyle = {
    fontSize: 11, fontWeight: 600 as const, color: '#9A958A', textTransform: 'uppercase' as const,
    letterSpacing: '.6px', display: 'block' as const, marginBottom: 4,
  }

  return (
    <ToolShell name="Invoice Generator" icon="📄" currentPath="/invoice-generator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>$</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>InvoiceForge</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={handlePrint} style={{
              fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '9px 22px', borderRadius: 10,
              border: 'none', background: accentColor, color: '#fff', cursor: 'pointer',
            }}>{lt('downloadPDF')}</button>
            <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
          </div>
        </nav>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 28px 40px', display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, alignItems: 'start' }}>
          {/* LEFT: Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Settings */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{lt('settings')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div>
                  <label style={labelStyle}>{lt('currency')}</label>
                  <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.symbol}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{lt('accentColor')}</label>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setAccentColor(c)} style={{
                        width: 28, height: 28, borderRadius: 6, background: c, cursor: 'pointer',
                        border: accentColor === c ? '2px solid #1C1B18' : '2px solid transparent',
                      }} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <div>
                  <label style={labelStyle}>{lt('invoiceNum')}</label>
                  <input value={invoiceNum} onChange={e => setInvoiceNum(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{lt('date')}</label>
                  <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{lt('dueDate')}</label>
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* From */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{lt('fromSection')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder={lt('businessName')} value={fromName} onChange={e => setFromName(e.target.value)} style={inputStyle} />
                <input placeholder={lt('address')} value={fromAddress} onChange={e => setFromAddress(e.target.value)} style={inputStyle} />
                <input placeholder={lt('email')} value={fromEmail} onChange={e => setFromEmail(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {/* To */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{lt('toSection')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder={lt('clientName')} value={toName} onChange={e => setToName(e.target.value)} style={inputStyle} />
                <input placeholder={lt('address')} value={toAddress} onChange={e => setToAddress(e.target.value)} style={inputStyle} />
                <input placeholder={lt('email')} value={toEmail} onChange={e => setToEmail(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {/* Items */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{lt('lineItems')}</div>
              {items.map((item, idx) => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 28px', gap: 6, marginBottom: 8, alignItems: 'end' }}>
                  <div>
                    {idx === 0 && <label style={labelStyle}>{lt('description')}</label>}
                    <input placeholder={lt('serviceOrProduct')} value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    {idx === 0 && <label style={labelStyle}>{lt('qty')}</label>}
                    <input type="number" min="1" value={item.qty} onChange={e => updateItem(item.id, 'qty', +e.target.value)} style={{ ...inputStyle, textAlign: 'center' }} />
                  </div>
                  <div>
                    {idx === 0 && <label style={labelStyle}>{t('price', locale)}</label>}
                    <input type="number" min="0" step="0.01" value={item.price || ''} onChange={e => updateItem(item.id, 'price', +e.target.value)} style={{ ...inputStyle, textAlign: 'right' }} placeholder="0.00" />
                  </div>
                  <button onClick={() => items.length > 1 && removeItem(item.id)} style={{
                    width: 28, height: 38, borderRadius: 6, border: '1px solid #E8E4DB', background: 'transparent',
                    color: items.length > 1 ? '#E24B4A' : '#E8E4DB', cursor: items.length > 1 ? 'pointer' : 'default',
                    fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>×</button>
                </div>
              ))}
              <button onClick={addItem} style={{
                fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 8,
                border: '1.5px dashed #E8E4DB', background: 'transparent', color: '#6B6560',
                cursor: 'pointer', width: '100%', marginTop: 4,
              }}>{lt('addLineItem')}</button>
            </div>

            {/* Tax & discount */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelStyle}>{lt('taxRate')}</label>
                  <input type="number" min="0" max="100" value={taxRate || ''} onChange={e => setTaxRate(+e.target.value)} style={inputStyle} placeholder="0" />
                </div>
                <div>
                  <label style={labelStyle}>{lt('discountPercent')}</label>
                  <input type="number" min="0" max="100" value={discount || ''} onChange={e => setDiscount(+e.target.value)} style={inputStyle} placeholder="0" />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <label style={labelStyle}>{lt('notesTerms')}</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                style={{ ...inputStyle, resize: 'none', fontFamily: fb }} />
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div style={{ position: 'sticky', top: 20 }}>
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div ref={printRef}>
                <div style={{ padding: '40px 44px', fontFamily: "'Outfit', -apple-system, sans-serif" }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: accentColor, letterSpacing: '-0.5px', marginBottom: 4 }}>
                        {fromName || lt('yourBusiness')}
                      </div>
                      {fromAddress && <div style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.6 }}>{fromAddress}</div>}
                      {fromEmail && <div style={{ fontSize: 12, color: '#6B6560' }}>{fromEmail}</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 32, fontWeight: 800, color: '#1C1B18', letterSpacing: '-1px' }}>{lt('invoiceTitle')}</div>
                      <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: accentColor, marginTop: 2 }}>{invoiceNum}</div>
                    </div>
                  </div>

                  {/* Dates + Bill To */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>{lt('billTo')}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1B18' }}>{toName || lt('clientNamePreview')}</div>
                      {toAddress && <div style={{ fontSize: 12, color: '#6B6560', marginTop: 2 }}>{toAddress}</div>}
                      {toEmail && <div style={{ fontSize: 12, color: '#6B6560' }}>{toEmail}</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('date')}</div>
                        <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{invoiceDate}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('dueDate')}</div>
                        <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{dueDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${accentColor}` }}>
                        <th style={{ textAlign: 'left', fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', padding: '8px 0' }}>{lt('description')}</th>
                        <th style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', padding: '8px 0', width: 60 }}>{lt('qty')}</th>
                        <th style={{ textAlign: 'right', fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', padding: '8px 0', width: 90 }}>{t('price', locale)}</th>
                        <th style={{ textAlign: 'right', fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', padding: '8px 0', width: 100 }}>{t('amount', locale)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #E8E4DB' }}>
                          <td style={{ padding: '10px 0', fontSize: 13, color: '#1C1B18' }}>{item.desc || '—'}</td>
                          <td style={{ padding: '10px 0', fontSize: 13, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", color: '#6B6560' }}>{item.qty}</td>
                          <td style={{ padding: '10px 0', fontSize: 13, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", color: '#6B6560' }}>{fmt(item.price)}</td>
                          <td style={{ padding: '10px 0', fontSize: 13, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{fmt(item.qty * item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Totals */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: 240 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                        <span style={{ color: '#6B6560' }}>{lt('subtotal')}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{fmt(subtotal)}</span>
                      </div>
                      {discount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                          <span style={{ color: '#6B6560' }}>{lt('discount')} ({discount}%)</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#22A065' }}>-{fmt(discountAmount)}</span>
                        </div>
                      )}
                      {taxRate > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                          <span style={{ color: '#6B6560' }}>{lt('tax')} ({taxRate}%)</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{fmt(taxAmount)}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', borderTop: `2px solid ${accentColor}`, marginTop: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 700 }}>{t('total', locale)}</span>
                        <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: accentColor }}>{fmt(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {notes && (
                    <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #E8E4DB' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>{lt('notes')}</div>
                      <div style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{notes}</div>
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ marginTop: 40, textAlign: 'center', fontSize: 11, color: '#B0AAA0' }}>
                    {lt('footer')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            {(() => {
              const parts = lt('seoP4').split(/<\/?[ab]>/)
              return <>
                {parts[0]}<a href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[1]}</a>{parts[2]}<a href="/vat-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[3]}</a>{parts[4]}
              </>
            })()}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}

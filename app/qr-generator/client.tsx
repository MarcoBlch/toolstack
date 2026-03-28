'use client'
import { useState, useEffect, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', sans-serif"

const LABELS: Record<string, Record<Locale, string>> = {
  // Nav / Title
  navTitle: {
    en: 'QRDrop', fr: 'QRDrop', es: 'QRDrop', pt: 'QRDrop', de: 'QRDrop',
  },
  titleMain: {
    en: 'QR codes that', fr: 'Des QR codes qui', es: 'Códigos QR que', pt: 'QR codes que', de: 'QR-Codes die',
  },
  titleAccent: {
    en: 'just work', fr: 'fonctionnent', es: 'simplemente funcionan', pt: 'simplesmente funcionam', de: 'einfach funktionieren',
  },
  subtitle: {
    en: 'Free. No signup. No watermark. Download as PNG.',
    fr: 'Gratuit. Sans inscription. Sans filigrane. Téléchargez en PNG.',
    es: 'Gratis. Sin registro. Sin marca de agua. Descarga en PNG.',
    pt: 'Grátis. Sem cadastro. Sem marca d\'água. Baixe em PNG.',
    de: 'Kostenlos. Ohne Anmeldung. Ohne Wasserzeichen. Als PNG herunterladen.',
  },
  // Presets
  presetURL: { en: 'URL', fr: 'URL', es: 'URL', pt: 'URL', de: 'URL' },
  presetText: { en: 'Text', fr: 'Texte', es: 'Texto', pt: 'Texto', de: 'Text' },
  presetWifi: { en: 'WiFi', fr: 'WiFi', es: 'WiFi', pt: 'WiFi', de: 'WLAN' },
  presetEmail: { en: 'Email', fr: 'E-mail', es: 'Correo', pt: 'E-mail', de: 'E-Mail' },
  presetPhone: { en: 'Phone', fr: 'Téléphone', es: 'Teléfono', pt: 'Telefone', de: 'Telefon' },
  // Placeholders
  placeholderURL: { en: 'https://example.com', fr: 'https://exemple.com', es: 'https://ejemplo.com', pt: 'https://exemplo.com', de: 'https://beispiel.de' },
  placeholderText: { en: 'Any text to encode', fr: 'N\'importe quel texte à encoder', es: 'Cualquier texto para codificar', pt: 'Qualquer texto para codificar', de: 'Beliebiger Text zum Codieren' },
  placeholderWifi: { en: 'Network name', fr: 'Nom du réseau', es: 'Nombre de red', pt: 'Nome da rede', de: 'Netzwerkname' },
  placeholderEmail: { en: 'hello@example.com', fr: 'bonjour@exemple.com', es: 'hola@ejemplo.com', pt: 'ola@exemplo.com', de: 'hallo@beispiel.de' },
  placeholderPhone: { en: '+1 555 0100', fr: '+33 1 23 45 67 89', es: '+34 612 345 678', pt: '+55 11 91234 5678', de: '+49 30 12345678' },
  // WiFi labels
  networkName: { en: 'Network name', fr: 'Nom du réseau', es: 'Nombre de red', pt: 'Nome da rede', de: 'Netzwerkname' },
  password: { en: 'Password', fr: 'Mot de passe', es: 'Contraseña', pt: 'Senha', de: 'Passwort' },
  wifiPassPlaceholder: { en: 'WiFi password', fr: 'Mot de passe WiFi', es: 'Contraseña WiFi', pt: 'Senha WiFi', de: 'WLAN-Passwort' },
  // Color themes
  colorClassic: { en: 'Classic', fr: 'Classique', es: 'Clásico', pt: 'Clássico', de: 'Klassisch' },
  colorMidnight: { en: 'Midnight', fr: 'Minuit', es: 'Medianoche', pt: 'Meia-noite', de: 'Mitternacht' },
  colorForest: { en: 'Forest', fr: 'Forêt', es: 'Bosque', pt: 'Floresta', de: 'Wald' },
  colorViolet: { en: 'Violet', fr: 'Violet', es: 'Violeta', pt: 'Violeta', de: 'Violett' },
  colorRuby: { en: 'Ruby', fr: 'Rubis', es: 'Rubí', pt: 'Rubi', de: 'Rubin' },
  colorOcean: { en: 'Ocean', fr: 'Océan', es: 'Océano', pt: 'Oceano', de: 'Ozean' },
  // Color label
  colorLabel: { en: 'Color', fr: 'Couleur', es: 'Color', pt: 'Cor', de: 'Farbe' },
  // Download & result
  downloadPNG: { en: 'Download PNG — Free', fr: 'Télécharger PNG — Gratuit', es: 'Descargar PNG — Gratis', pt: 'Baixar PNG — Grátis', de: 'PNG herunterladen — Kostenlos' },
  qrPlaceholder: { en: 'Your QR code here', fr: 'Votre QR code ici', es: 'Tu código QR aquí', pt: 'Seu QR code aqui', de: 'Ihr QR-Code hier' },
  // SEO
  seoH2: {
    en: 'Free QR code generator',
    fr: 'Générateur de QR codes gratuit',
    es: 'Generador de códigos QR gratuito',
    pt: 'Gerador de QR codes gratuito',
    de: 'Kostenloser QR-Code-Generator',
  },
  seoP1: {
    en: 'QRDrop generates QR codes instantly for URLs, plain text, WiFi credentials, email addresses, phone numbers, and SMS messages. Choose from multiple color themes to match your brand, then download the result as a high-resolution PNG. There is no signup required, no watermark added, and no limit on how many codes you can create. Everything runs in your browser, so your data never leaves your device.',
    fr: 'QRDrop génère instantanément des QR codes pour les URL, le texte brut, les identifiants WiFi, les adresses e-mail, les numéros de téléphone et les SMS. Choisissez parmi plusieurs thèmes de couleurs pour correspondre à votre marque, puis téléchargez le résultat en PNG haute résolution. Aucune inscription requise, aucun filigrane ajouté et aucune limite au nombre de codes que vous pouvez créer. Tout fonctionne dans votre navigateur, vos données ne quittent jamais votre appareil.',
    es: 'QRDrop genera códigos QR al instante para URLs, texto plano, credenciales WiFi, direcciones de correo electrónico, números de teléfono y mensajes SMS. Elige entre varios temas de color para que coincida con tu marca y luego descarga el resultado como PNG de alta resolución. No se requiere registro, no se añade marca de agua y no hay límite en la cantidad de códigos que puedes crear. Todo funciona en tu navegador, así que tus datos nunca salen de tu dispositivo.',
    pt: 'O QRDrop gera QR codes instantaneamente para URLs, texto simples, credenciais WiFi, endereços de e-mail, números de telefone e mensagens SMS. Escolha entre vários temas de cores para combinar com sua marca e baixe o resultado como PNG de alta resolução. Não é necessário cadastro, nenhuma marca d\'água é adicionada e não há limite de quantos códigos você pode criar. Tudo funciona no seu navegador, então seus dados nunca saem do seu dispositivo.',
    de: 'QRDrop generiert sofort QR-Codes für URLs, einfachen Text, WLAN-Zugangsdaten, E-Mail-Adressen, Telefonnummern und SMS-Nachrichten. Wählen Sie aus mehreren Farbthemen passend zu Ihrer Marke und laden Sie das Ergebnis als hochauflösendes PNG herunter. Keine Anmeldung erforderlich, kein Wasserzeichen und keine Begrenzung der Anzahl der Codes. Alles läuft in Ihrem Browser, sodass Ihre Daten Ihr Gerät nie verlassen.',
  },
  seoH3a: {
    en: 'QR code types and use cases',
    fr: 'Types de QR codes et cas d\'utilisation',
    es: 'Tipos de códigos QR y casos de uso',
    pt: 'Tipos de QR codes e casos de uso',
    de: 'QR-Code-Typen und Anwendungsfälle',
  },
  seoP2: {
    en: 'URL codes are the most popular type, letting people visit a website by scanning with their phone camera. WiFi codes allow guests to join your network without typing a password, which is perfect for cafes, offices, and events. Email and phone codes pre-fill the recipient address or number so the scanner can reach you with a single tap. Each type follows a specific encoding standard that smartphones recognize automatically.',
    fr: 'Les codes URL sont le type le plus populaire, permettant aux gens de visiter un site web en scannant avec l\'appareil photo de leur téléphone. Les codes WiFi permettent aux invités de rejoindre votre réseau sans taper de mot de passe, idéal pour les cafés, bureaux et événements. Les codes e-mail et téléphone préremplissent l\'adresse du destinataire ou le numéro pour que le scanner puisse vous joindre en un seul tapotement. Chaque type suit une norme d\'encodage spécifique que les smartphones reconnaissent automatiquement.',
    es: 'Los códigos URL son el tipo más popular y permiten a las personas visitar un sitio web escaneando con la cámara de su teléfono. Los códigos WiFi permiten a los invitados unirse a tu red sin escribir una contraseña, lo cual es perfecto para cafeterías, oficinas y eventos. Los códigos de correo electrónico y teléfono rellenan previamente la dirección del destinatario o el número para que el escáner pueda contactarte con un solo toque. Cada tipo sigue un estándar de codificación específico que los smartphones reconocen automáticamente.',
    pt: 'Os códigos URL são o tipo mais popular, permitindo que as pessoas visitem um site escaneando com a câmera do celular. Os códigos WiFi permitem que convidados se conectem à sua rede sem digitar uma senha, perfeito para cafés, escritórios e eventos. Os códigos de e-mail e telefone preenchem automaticamente o endereço do destinatário ou o número para que o scanner possa entrar em contato com você com um único toque. Cada tipo segue um padrão de codificação específico que os smartphones reconhecem automaticamente.',
    de: 'URL-Codes sind der beliebteste Typ und ermöglichen es Menschen, eine Website zu besuchen, indem sie mit ihrer Handykamera scannen. WLAN-Codes ermöglichen es Gästen, Ihrem Netzwerk beizutreten, ohne ein Passwort einzugeben — perfekt für Cafés, Büros und Veranstaltungen. E-Mail- und Telefoncodes füllen die Empfängeradresse oder Nummer vor, sodass der Scanner Sie mit einem einzigen Tippen erreichen kann. Jeder Typ folgt einem spezifischen Codierungsstandard, den Smartphones automatisch erkennen.',
  },
  seoH3b: {
    en: 'Customizing colors and downloading',
    fr: 'Personnalisation des couleurs et téléchargement',
    es: 'Personalización de colores y descarga',
    pt: 'Personalização de cores e download',
    de: 'Farben anpassen und herunterladen',
  },
  seoP3: {
    en: 'A QR code does not have to be plain black and white. QRDrop offers several color theme presets so your code can complement your marketing materials or website palette. Ensure there is enough contrast between the foreground and background so scanners can read it reliably. The downloaded PNG is high resolution and looks crisp whether printed on a business card, a poster, or displayed on a screen.',
    fr: 'Un QR code n\'a pas besoin d\'être en noir et blanc classique. QRDrop propose plusieurs préréglages de thèmes de couleurs pour que votre code complète vos supports marketing ou la palette de votre site web. Assurez-vous qu\'il y a suffisamment de contraste entre le premier plan et l\'arrière-plan pour que les scanners puissent le lire de manière fiable. Le PNG téléchargé est en haute résolution et reste net qu\'il soit imprimé sur une carte de visite, une affiche ou affiché sur un écran.',
    es: 'Un código QR no tiene que ser blanco y negro. QRDrop ofrece varios temas de color preestablecidos para que tu código complemente tus materiales de marketing o la paleta de tu sitio web. Asegúrate de que haya suficiente contraste entre el primer plano y el fondo para que los escáneres puedan leerlo de forma fiable. El PNG descargado es de alta resolución y se ve nítido ya sea impreso en una tarjeta de visita, un póster o mostrado en una pantalla.',
    pt: 'Um QR code não precisa ser preto e branco. O QRDrop oferece vários temas de cores predefinidos para que seu código complemente seus materiais de marketing ou a paleta do seu site. Certifique-se de que haja contraste suficiente entre o primeiro plano e o fundo para que os scanners possam lê-lo de forma confiável. O PNG baixado é de alta resolução e fica nítido seja impresso em um cartão de visita, um pôster ou exibido em uma tela.',
    de: 'Ein QR-Code muss nicht schwarz-weiß sein. QRDrop bietet mehrere Farbthemen-Voreinstellungen, damit Ihr Code zu Ihren Marketingmaterialien oder Ihrer Website-Palette passt. Stellen Sie sicher, dass genügend Kontrast zwischen Vorder- und Hintergrund besteht, damit Scanner ihn zuverlässig lesen können. Das heruntergeladene PNG ist hochauflösend und sieht scharf aus, egal ob auf einer Visitenkarte, einem Poster oder auf einem Bildschirm.',
  },
  seoCrossPromo: {
    en: 'Want to shrink the file size of your downloaded QR code image? Run it through the',
    fr: 'Envie de réduire la taille de votre image QR code téléchargée ? Passez-la dans le',
    es: '¿Quieres reducir el tamaño del archivo de tu imagen QR descargada? Pásala por el',
    pt: 'Quer reduzir o tamanho do arquivo da sua imagem QR baixada? Passe-a pelo',
    de: 'Möchten Sie die Dateigröße Ihres heruntergeladenen QR-Code-Bildes verkleinern? Verwenden Sie den',
  },
  imageCompLink: {
    en: 'Image Compressor', fr: 'Compresseur d\'images', es: 'Compresor de imágenes', pt: 'Compressor de imagens', de: 'Bildkompressor',
  },
  crossPromoMid: {
    en: 'to optimize it for the web. You can also create a matching',
    fr: 'pour l\'optimiser pour le web. Vous pouvez aussi créer un',
    es: 'para optimizarla para la web. También puedes crear un',
    pt: 'para otimizá-la para a web. Você também pode criar um',
    de: 'um es für das Web zu optimieren. Sie können auch ein passendes',
  },
  faviconLink: {
    en: 'Favicon', fr: 'Favicon', es: 'Favicon', pt: 'Favicon', de: 'Favicon',
  },
  crossPromoEnd: {
    en: 'for the landing page your QR code points to.',
    fr: 'correspondant pour la page d\'atterrissage vers laquelle pointe votre QR code.',
    es: 'correspondiente para la página de destino a la que apunta tu código QR.',
    pt: 'correspondente para a página de destino para a qual seu QR code aponta.',
    de: 'für die Landingpage erstellen, auf die Ihr QR-Code verweist.',
  },
}

const PRESETS_DATA = [
  { id: 'url', labelKey: 'presetURL', icon: '🔗', placeholderKey: 'placeholderURL', prefix: '' },
  { id: 'text', labelKey: 'presetText', icon: '📝', placeholderKey: 'placeholderText', prefix: '' },
  { id: 'wifi', labelKey: 'presetWifi', icon: '📶', placeholderKey: 'placeholderWifi', prefix: '' },
  { id: 'email', labelKey: 'presetEmail', icon: '✉', placeholderKey: 'placeholderEmail', prefix: 'mailto:' },
  { id: 'phone', labelKey: 'presetPhone', icon: '📞', placeholderKey: 'placeholderPhone', prefix: 'tel:' },
]

const COLORS = [
  { fg: '#000000', bg: '#FFFFFF', nameKey: 'colorClassic' },
  { fg: '#1A1A2E', bg: '#F0F0F5', nameKey: 'colorMidnight' },
  { fg: '#2D6A4F', bg: '#F0FFF4', nameKey: 'colorForest' },
  { fg: '#7B2D8E', bg: '#FBF0FF', nameKey: 'colorViolet' },
  { fg: '#C0392B', bg: '#FFF5F5', nameKey: 'colorRuby' },
  { fg: '#1565C0', bg: '#F0F7FF', nameKey: 'colorOcean' },
]

export default function QRClient({
  locale = 'en' as Locale,
}: {
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [mode, setMode] = useState('url')
  const [input, setInput] = useState('')
  const [wifiPass, setWifiPass] = useState('')
  const [colorIdx, setColorIdx] = useState(0)
  const [qrUrl, setQrUrl] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if ((window as any).QRious) { setLoaded(true); return }
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js'
    s.onload = () => setLoaded(true)
    document.head.appendChild(s)
  }, [])

  useEffect(() => {
    if (!loaded || !input.trim()) { setQrUrl(null); return }
    const preset = PRESETS_DATA.find(p => p.id === mode)!
    let payload = mode === 'wifi' ? `WIFI:T:WPA;S:${input};P:${wifiPass};;` : (preset.prefix + input.trim())
    const qr = new (window as any).QRious({ value: payload, size: 300, foreground: COLORS[colorIdx].fg, background: COLORS[colorIdx].bg, level: 'M', padding: 16 })
    setQrUrl(qr.toDataURL('image/png'))
  }, [loaded, input, wifiPass, mode, colorIdx])

  const download = () => {
    if (!qrUrl) return
    const a = document.createElement('a'); a.href = qrUrl; a.download = `qr-${Date.now()}.png`; a.click()
  }

  return (
    <ToolShell name={lt('navTitle')} icon="◫" currentPath="/qr-generator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#1A6B4E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>Q</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleMain')} <em style={{ color: '#1A6B4E' }}>{lt('titleAccent')}</em>
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 40px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
              {PRESETS_DATA.map(p => (
                <button key={p.id} onClick={() => { setMode(p.id); setInput(''); setWifiPass('') }} style={{
                  fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
                  border: mode === p.id ? '1.5px solid #1A6B4E' : '1.5px solid #E8E4DB',
                  background: mode === p.id ? '#1A6B4E0C' : '#fff', color: mode === p.id ? '#1A6B4E' : '#6B6560',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}><span style={{ fontSize: 14 }}>{p.icon}</span> {lt(p.labelKey)}</button>
              ))}
            </div>

            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 8 }}>
                {mode === 'wifi' ? lt('networkName') : lt(PRESETS_DATA.find(p => p.id === mode)!.labelKey)}
              </label>
              <input type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder={lt(PRESETS_DATA.find(p => p.id === mode)!.placeholderKey)}
                style={{ width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 10, padding: '12px 14px', fontSize: 16, fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none' }} />
              {mode === 'wifi' && (
                <div style={{ marginTop: 12 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>{lt('password')}</label>
                  <input type="text" value={wifiPass} onChange={e => setWifiPass(e.target.value)} placeholder={lt('wifiPassPlaceholder')}
                    style={{ width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 10, padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none' }} />
                </div>
              )}
            </div>

            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 10 }}>{lt('colorLabel')}</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {COLORS.map((c, i) => (
                  <button key={i} onClick={() => setColorIdx(i)} title={lt(c.nameKey)} style={{
                    width: 36, height: 36, borderRadius: 10, cursor: 'pointer',
                    border: colorIdx === i ? '2px solid #1A6B4E' : '2px solid #E8E4DB',
                    background: `linear-gradient(135deg, ${c.fg} 50%, ${c.bg} 50%)`,
                    transform: colorIdx === i ? 'scale(1.1)' : 'scale(1)',
                  }} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, textAlign: 'center', position: 'sticky', top: 20 }}>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: 14, background: qrUrl ? COLORS[colorIdx].bg : '#F5F3EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden', border: '1px solid #E8E4DB' }}>
              {qrUrl ? <img src={qrUrl} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: 13, color: '#B0AAA0' }}>{lt('qrPlaceholder')}</span>}
            </div>
            <button onClick={download} disabled={!qrUrl} style={{
              fontFamily: fb, fontSize: 15, fontWeight: 700, width: '100%', padding: 14, borderRadius: 12,
              border: 'none', cursor: qrUrl ? 'pointer' : 'default',
              background: qrUrl ? '#1A6B4E' : '#E8E4DB', color: qrUrl ? '#fff' : '#9A958A',
            }}>{lt('downloadPNG')}</button>
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
            {lt('seoCrossPromo')} <a href="/image-compressor" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('imageCompLink')}</a> {lt('crossPromoMid')} <a href="/favicon-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('faviconLink')}</a> {lt('crossPromoEnd')}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}

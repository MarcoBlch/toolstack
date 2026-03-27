export type Lang = 'en' | 'fr' | 'es' | 'pt' | 'de'

export interface Tool {
  href: string
  name: string
  desc: string
  icon: string
  color: string
  searches: string
  tag: string
}

export interface ComingItem {
  name: string
  searches: string
}

export interface HomeStrings {
  heroLine1: string
  heroLine2: string
  heroSubtitle: string
  comingSoonLabel: string
  footerCopyright: string
}

export interface HomeData {
  tools: Tool[]
  coming: ComingItem[]
  strings: HomeStrings
}

// Base tool data (icon, color, searches, tag) shared across all languages
const BASE = [
  { key: '/fancy-text', icon: '✦', color: '#FF6B35', searches: '4M+', tag: 'LIVE' },
  { key: '/qr-generator', icon: '◫', color: '#1A6B4E', searches: '5.2M+', tag: 'LIVE' },
  { key: '/password-generator', icon: '⬡', color: '#22D97A', searches: '3.1M+', tag: 'LIVE' },
  { key: '/unit-converter', icon: '⇄', color: '#3B82F6', searches: '3.2M+', tag: 'LIVE' },
  { key: '/word-counter', icon: '¶', color: '#0EA5E9', searches: '2.8M+', tag: 'LIVE' },
  { key: '/timezone-converter', icon: '🕐', color: '#0891B2', searches: '2.1M+', tag: 'NEW' },
  { key: '/image-compressor', icon: '🗜', color: '#D85A30', searches: '2M+', tag: 'LIVE' },
  { key: '/json-formatter', icon: '{ }', color: '#8B5CF6', searches: '1.5M+', tag: 'LIVE' },
  { key: '/lorem-generator', icon: 'L', color: '#7C3AED', searches: '1.5M+', tag: 'LIVE' },
  { key: '/case-converter', icon: 'Aa', color: '#E8457A', searches: '1.2M+', tag: 'LIVE' },
  { key: '/hash-generator', icon: '#', color: '#059669', searches: '800K+', tag: 'NEW' },
  { key: '/gradient-generator', icon: '◆', color: '#6366F1', searches: '800K+', tag: 'LIVE' },
  { key: '/base64', icon: '↔', color: '#CA8A04', searches: '700K+', tag: 'NEW' },
  { key: '/diff-checker', icon: '≠', color: '#DC2626', searches: '600K+', tag: 'NEW' },
  { key: '/regex-tester', icon: '.*', color: '#9333EA', searches: '600K+', tag: 'NEW' },
  { key: '/emoji-picker', icon: '😀', color: '#F59E0B', searches: '900K+', tag: 'NEW' },
  { key: '/color-picker', icon: '🎨', color: '#E11D48', searches: '500K+', tag: 'NEW' },
  { key: '/markdown-editor', icon: 'M↓', color: '#1C1B18', searches: '500K+', tag: 'NEW' },
  { key: '/favicon-generator', icon: '◨', color: '#2563EB', searches: '400K+', tag: 'NEW' },
  { key: '/screenshot-mockup', icon: '🖼', color: '#7C3AED', searches: '300K+', tag: 'NEW' },
  { key: '/invoice-generator', icon: '📄', color: '#059669', searches: '2.4M+', tag: 'NEW' },
  { key: '/mortgage-calculator', icon: '🏠', color: '#059669', searches: '5M+', tag: 'FINANCE' },
  { key: '/bmi-calculator', icon: '⚖️', color: '#0891B2', searches: '6M+', tag: 'FINANCE' },
  { key: '/currency-converter', icon: '💱', color: '#059669', searches: '5M+', tag: 'FINANCE' },
  { key: '/loan-calculator', icon: '🏦', color: '#DC2626', searches: '4M+', tag: 'FINANCE' },
  { key: '/percentage-calculator', icon: '%', color: '#D97706', searches: '3.5M+', tag: 'FINANCE' },
  { key: '/salary-calculator', icon: '💰', color: '#7C3AED', searches: '3M+', tag: 'FINANCE' },
  { key: '/tip-calculator', icon: '🍽️', color: '#EA580C', searches: '2.5M+', tag: 'FINANCE' },
  { key: '/investment-calculator', icon: '📈', color: '#2563EB', searches: '2M+', tag: 'FINANCE' },
  { key: '/vat-calculator', icon: '🧾', color: '#4338CA', searches: '1.5M+', tag: 'FINANCE' },
  { key: '/retirement-calculator', icon: '🏖️', color: '#7C3AED', searches: '1.5M+', tag: 'FINANCE' },
  { key: '/calorie-calculator', icon: '🔥', color: '#EF4444', searches: '4.5M+', tag: 'HEALTH' },
  { key: '/due-date-calculator', icon: '🤰', color: '#EC4899', searches: '3M+', tag: 'HEALTH' },
  { key: '/macro-calculator', icon: '🥗', color: '#16A34A', searches: '2M+', tag: 'HEALTH' },
  { key: '/ideal-weight', icon: '⚖️', color: '#8B5CF6', searches: '2M+', tag: 'HEALTH' },
  { key: '/body-fat-calculator', icon: '📊', color: '#D97706', searches: '1.5M+', tag: 'HEALTH' },
  { key: '/calorie-deficit', icon: '📉', color: '#0EA5E9', searches: '1.2M+', tag: 'HEALTH' },
  { key: '/water-intake', icon: '💧', color: '#0891B2', searches: '1M+', tag: 'HEALTH' },
  { key: '/heart-rate-calculator', icon: '❤️', color: '#DC2626', searches: '800K+', tag: 'HEALTH' },
  { key: '/pace-calculator', icon: '🏃', color: '#EA580C', searches: '800K+', tag: 'HEALTH' },
  { key: '/one-rep-max', icon: '🏋️', color: '#1D4ED8', searches: '600K+', tag: 'HEALTH' },
] as const

// Translated names + descriptions per tool per language
// key = English path, value = { name, desc } per language
type ToolText = { name: string; desc: string; href: string }

const TEXTS: Record<string, Record<Lang, ToolText>> = {
  '/fancy-text': {
    en: { href: '/fancy-text', name: 'Fancy Text Generator', desc: 'Convert text to 20+ Unicode font styles for Instagram, TikTok & more' },
    fr: { href: '/fr/texte-style', name: 'Générateur de Texte Stylé', desc: 'Convertissez du texte en 20+ styles Unicode pour Instagram, TikTok et plus' },
    es: { href: '/es/letras-bonitas', name: 'Letras Bonitas', desc: 'Convierte texto en 20+ estilos Unicode para Instagram, TikTok y más' },
    pt: { href: '/pt/texto-estilizado', name: 'Texto Estilizado', desc: 'Converta texto em 20+ estilos Unicode para Instagram, TikTok e mais' },
    de: { href: '/de/schriftarten-generator', name: 'Schriftarten Generator', desc: 'Text in 20+ Unicode-Stile für Instagram, TikTok und mehr umwandeln' },
  },
  '/qr-generator': {
    en: { href: '/qr-generator', name: 'QR Code Generator', desc: 'Create QR codes for URLs, WiFi, email, phone. Color themes. Free PNG download.' },
    fr: { href: '/fr/generateur-qr-code', name: 'Générateur de QR Code', desc: 'Créez des QR codes pour URL, WiFi, email, téléphone' },
    es: { href: '/es/generador-qr', name: 'Generador QR', desc: 'Crea códigos QR para URL, WiFi, email, teléfono' },
    pt: { href: '/pt/gerador-qr', name: 'Gerador QR', desc: 'Crie QR codes para URL, WiFi, email, telefone' },
    de: { href: '/de/qr-code-generator', name: 'QR-Code Generator', desc: 'QR-Codes für URL, WiFi, E-Mail, Telefon erstellen' },
  },
  '/password-generator': {
    en: { href: '/password-generator', name: 'Password Generator', desc: 'Cryptographically secure passwords. Strength meter. Never stored.' },
    fr: { href: '/fr/generateur-mot-de-passe', name: 'Générateur de Mot de Passe', desc: 'Mots de passe cryptographiquement sécurisés' },
    es: { href: '/es/generador-contrasena', name: 'Generador de Contraseña', desc: 'Contraseñas criptográficamente seguras' },
    pt: { href: '/pt/gerador-senha', name: 'Gerador de Senha', desc: 'Senhas criptograficamente seguras' },
    de: { href: '/de/passwort-generator', name: 'Passwort Generator', desc: 'Kryptographisch sichere Passwörter' },
  },
  '/unit-converter': {
    en: { href: '/unit-converter', name: 'Unit Converter', desc: 'Convert length, weight, temperature, volume, area, speed, data & time.' },
    fr: { href: '/fr/convertisseur-unites', name: 'Convertisseur d\'Unités', desc: 'Longueur, poids, température, volume, vitesse et plus' },
    es: { href: '/es/convertidor-unidades', name: 'Convertidor de Unidades', desc: 'Longitud, peso, temperatura, volumen, velocidad y más' },
    pt: { href: '/pt/conversor-unidades', name: 'Conversor de Unidades', desc: 'Comprimento, peso, temperatura, volume, velocidade e mais' },
    de: { href: '/de/einheiten-umrechner', name: 'Einheiten Umrechner', desc: 'Länge, Gewicht, Temperatur, Volumen, Geschwindigkeit und mehr' },
  },
  '/word-counter': {
    en: { href: '/word-counter', name: 'Word & Character Counter', desc: 'Count words, characters, sentences, paragraphs. Reading time & keyword density.' },
    fr: { href: '/fr/compteur-mots', name: 'Compteur de Mots', desc: 'Comptez mots, caractères, phrases et paragraphes' },
    es: { href: '/es/contador-palabras', name: 'Contador de Palabras', desc: 'Cuenta palabras, caracteres, frases y párrafos' },
    pt: { href: '/pt/contador-palavras', name: 'Contador de Palavras', desc: 'Conte palavras, caracteres, frases e parágrafos' },
    de: { href: '/de/woerter-zaehler', name: 'Wörter Zähler', desc: 'Wörter, Zeichen, Sätze und Absätze zählen' },
  },
  '/timezone-converter': {
    en: { href: '/timezone-converter', name: 'Timezone Converter', desc: 'Convert time between 24 zones. Live world clock. Meeting planner.' },
    fr: { href: '/timezone-converter', name: 'Convertisseur Fuseau Horaire', desc: 'Convertissez l\'heure entre 24 fuseaux. Horloge mondiale.' },
    es: { href: '/timezone-converter', name: 'Conversor Zona Horaria', desc: 'Convierte hora entre 24 zonas. Reloj mundial.' },
    pt: { href: '/timezone-converter', name: 'Conversor Fuso Horário', desc: 'Converta hora entre 24 fusos. Relógio mundial.' },
    de: { href: '/timezone-converter', name: 'Zeitzonen Umrechner', desc: 'Zeit zwischen 24 Zeitzonen umrechnen. Weltuhr.' },
  },
  '/image-compressor': {
    en: { href: '/image-compressor', name: 'Image Compressor', desc: 'Reduce image size by up to 80%. JPEG, PNG, WebP. Nothing leaves your browser.' },
    fr: { href: '/fr/compresser-image', name: 'Compresser Image', desc: 'Réduisez la taille des images jusqu\'à 80%' },
    es: { href: '/es/compresor-imagen', name: 'Compresor de Imagen', desc: 'Reduce el tamaño de imágenes hasta un 80%' },
    pt: { href: '/pt/compressor-imagem', name: 'Compressor de Imagem', desc: 'Reduza o tamanho das imagens em até 80%' },
    de: { href: '/de/bild-komprimieren', name: 'Bild Komprimieren', desc: 'Bildgröße um bis zu 80% reduzieren' },
  },
  '/json-formatter': {
    en: { href: '/json-formatter', name: 'JSON Formatter & Validator', desc: 'Format, validate, minify JSON. Syntax highlighting. Error detection.' },
    fr: { href: '/fr/formateur-json', name: 'Formateur JSON', desc: 'Formatez, validez et minifiez du JSON' },
    es: { href: '/es/formateador-json', name: 'Formateador JSON', desc: 'Formatea, valida y minifica JSON' },
    pt: { href: '/pt/formatador-json', name: 'Formatador JSON', desc: 'Formate, valide e minifique JSON' },
    de: { href: '/de/json-formatter', name: 'JSON Formatter', desc: 'JSON formatieren, validieren und minifizieren' },
  },
  '/lorem-generator': {
    en: { href: '/lorem-generator', name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text. Paragraphs, sentences, or exact word count.' },
    fr: { href: '/fr/generateur-lorem-ipsum', name: 'Générateur Lorem Ipsum', desc: 'Texte de remplissage. Paragraphes, phrases ou nombre de mots' },
    es: { href: '/es/generador-lorem', name: 'Generador Lorem Ipsum', desc: 'Texto de relleno. Párrafos, frases o cantidad de palabras' },
    pt: { href: '/pt/gerador-lorem', name: 'Gerador Lorem Ipsum', desc: 'Texto placeholder. Parágrafos, frases ou contagem de palavras' },
    de: { href: '/de/lorem-ipsum-generator', name: 'Lorem Ipsum Generator', desc: 'Platzhaltertext. Absätze, Sätze oder Wortanzahl' },
  },
  '/case-converter': {
    en: { href: '/case-converter', name: 'Text Case Converter', desc: 'UPPER, lower, Title, camelCase, snake_case, kebab-case & 6 more.' },
    fr: { href: '/fr/convertisseur-majuscules', name: 'Convertisseur Majuscules', desc: 'MAJUSCULES, minuscules, Titre et plus' },
    es: { href: '/es/conversor-mayusculas', name: 'Conversor Mayúsculas', desc: 'MAYÚSCULAS, minúsculas, Título y más' },
    pt: { href: '/pt/conversor-maiusculas', name: 'Conversor Maiúsculas', desc: 'MAIÚSCULAS, minúsculas, Título e mais' },
    de: { href: '/de/gross-kleinschreibung', name: 'Groß-/Kleinschreibung', desc: 'GROß, klein, Titel und mehr' },
  },
  '/hash-generator': {
    en: { href: '/hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes. Web Crypto API powered.' },
    fr: { href: '/hash-generator', name: 'Générateur de Hash', desc: 'Générez des hachages MD5, SHA-1, SHA-256, SHA-512' },
    es: { href: '/hash-generator', name: 'Generador de Hash', desc: 'Genera hashes MD5, SHA-1, SHA-256, SHA-512' },
    pt: { href: '/hash-generator', name: 'Gerador de Hash', desc: 'Gere hashes MD5, SHA-1, SHA-256, SHA-512' },
    de: { href: '/hash-generator', name: 'Hash Generator', desc: 'MD5, SHA-1, SHA-256, SHA-512 Hashes generieren' },
  },
  '/gradient-generator': {
    en: { href: '/gradient-generator', name: 'CSS Gradient Generator', desc: 'Create beautiful CSS gradients visually. Pick colors, angle, copy CSS.' },
    fr: { href: '/fr/generateur-degrade-css', name: 'Générateur Dégradé CSS', desc: 'Créez de beaux dégradés CSS visuellement' },
    es: { href: '/es/generador-degradado-css', name: 'Generador Degradado CSS', desc: 'Crea hermosos degradados CSS visualmente' },
    pt: { href: '/pt/gerador-gradiente-css', name: 'Gerador Gradiente CSS', desc: 'Crie belos gradientes CSS visualmente' },
    de: { href: '/de/css-gradient-generator', name: 'CSS Gradient Generator', desc: 'Schöne CSS-Verläufe visuell erstellen' },
  },
  '/base64': {
    en: { href: '/base64', name: 'Base64 Encoder/Decoder', desc: 'Encode text to Base64 or decode Base64 back. Image to data URI.' },
    fr: { href: '/base64', name: 'Encodeur/Décodeur Base64', desc: 'Encodez en Base64 ou décodez. Image en data URI.' },
    es: { href: '/base64', name: 'Codificador/Decodificador Base64', desc: 'Codifica texto a Base64 o decodifica. Imagen a data URI.' },
    pt: { href: '/base64', name: 'Codificador/Decodificador Base64', desc: 'Codifique texto em Base64 ou decodifique. Imagem para data URI.' },
    de: { href: '/base64', name: 'Base64 Encoder/Decoder', desc: 'Text zu Base64 kodieren oder Base64 dekodieren. Bild zu Data URI.' },
  },
  '/diff-checker': {
    en: { href: '/diff-checker', name: 'Text Diff Checker', desc: 'Compare two texts side by side. Additions in green, deletions in red.' },
    fr: { href: '/diff-checker', name: 'Comparateur de Texte', desc: 'Comparez deux textes côte à côte. Ajouts en vert, suppressions en rouge.' },
    es: { href: '/diff-checker', name: 'Comparador de Texto', desc: 'Compara dos textos lado a lado. Adiciones en verde, eliminaciones en rojo.' },
    pt: { href: '/diff-checker', name: 'Comparador de Texto', desc: 'Compare dois textos lado a lado. Adições em verde, remoções em vermelho.' },
    de: { href: '/diff-checker', name: 'Text Vergleich', desc: 'Zwei Texte nebeneinander vergleichen. Hinzufügungen grün, Löschungen rot.' },
  },
  '/regex-tester': {
    en: { href: '/regex-tester', name: 'Regex Tester', desc: 'Write regex, test against text, see matches highlighted in real time.' },
    fr: { href: '/regex-tester', name: 'Testeur Regex', desc: 'Écrivez une regex, testez sur du texte, voyez les correspondances en temps réel.' },
    es: { href: '/regex-tester', name: 'Probador Regex', desc: 'Escribe regex, prueba contra texto, ve coincidencias en tiempo real.' },
    pt: { href: '/regex-tester', name: 'Testador Regex', desc: 'Escreva regex, teste contra texto, veja correspondências em tempo real.' },
    de: { href: '/regex-tester', name: 'Regex Tester', desc: 'Regex schreiben, gegen Text testen, Treffer in Echtzeit sehen.' },
  },
  '/emoji-picker': {
    en: { href: '/emoji-picker', name: 'Emoji Picker', desc: 'Browse and copy all emojis. Search by name. 9 categories. One-click copy.' },
    fr: { href: '/emoji-picker', name: 'Sélecteur d\'Emoji', desc: 'Parcourez et copiez tous les emojis. Recherche par nom. 9 catégories.' },
    es: { href: '/emoji-picker', name: 'Selector de Emoji', desc: 'Busca y copia todos los emojis. Busca por nombre. 9 categorías.' },
    pt: { href: '/emoji-picker', name: 'Seletor de Emoji', desc: 'Navegue e copie todos os emojis. Pesquise por nome. 9 categorias.' },
    de: { href: '/emoji-picker', name: 'Emoji Auswahl', desc: 'Alle Emojis durchsuchen und kopieren. Nach Name suchen. 9 Kategorien.' },
  },
  '/color-picker': {
    en: { href: '/color-picker', name: 'Color Picker', desc: 'Pick colors. Get HEX, RGB, HSL. Generate shades, tints, complementary.' },
    fr: { href: '/color-picker', name: 'Sélecteur de Couleur', desc: 'Choisissez des couleurs. HEX, RGB, HSL. Nuances et complémentaires.' },
    es: { href: '/color-picker', name: 'Selector de Color', desc: 'Elige colores. HEX, RGB, HSL. Tonos, matices, complementarios.' },
    pt: { href: '/color-picker', name: 'Seletor de Cor', desc: 'Escolha cores. HEX, RGB, HSL. Tons, matizes, complementares.' },
    de: { href: '/color-picker', name: 'Farbwähler', desc: 'Farben wählen. HEX, RGB, HSL. Abstufungen und Komplementärfarben.' },
  },
  '/markdown-editor': {
    en: { href: '/markdown-editor', name: 'Markdown Editor', desc: 'Write Markdown, see live HTML preview. Copy HTML. Split-pane editor.' },
    fr: { href: '/markdown-editor', name: 'Éditeur Markdown', desc: 'Écrivez en Markdown, aperçu HTML en direct. Copiez le HTML.' },
    es: { href: '/markdown-editor', name: 'Editor Markdown', desc: 'Escribe Markdown, vista previa HTML en vivo. Copia HTML.' },
    pt: { href: '/markdown-editor', name: 'Editor Markdown', desc: 'Escreva Markdown, veja prévia HTML ao vivo. Copie HTML.' },
    de: { href: '/markdown-editor', name: 'Markdown Editor', desc: 'Markdown schreiben, Live-HTML-Vorschau. HTML kopieren.' },
  },
  '/favicon-generator': {
    en: { href: '/favicon-generator', name: 'Favicon Generator', desc: 'Generate favicons from a letter or emoji. All sizes. Download PNG pack.' },
    fr: { href: '/favicon-generator', name: 'Générateur de Favicon', desc: 'Générez des favicons à partir d\'une lettre ou emoji. Téléchargez le pack PNG.' },
    es: { href: '/favicon-generator', name: 'Generador de Favicon', desc: 'Genera favicons desde una letra o emoji. Descarga pack PNG.' },
    pt: { href: '/favicon-generator', name: 'Gerador de Favicon', desc: 'Gere favicons a partir de uma letra ou emoji. Baixe o pack PNG.' },
    de: { href: '/favicon-generator', name: 'Favicon Generator', desc: 'Favicons aus Buchstaben oder Emoji generieren. Alle Größen. PNG-Paket.' },
  },
  '/screenshot-mockup': {
    en: { href: '/screenshot-mockup', name: 'Screenshot Mockup', desc: 'Frame screenshots in browser or device mockups. Gradient backgrounds.' },
    fr: { href: '/screenshot-mockup', name: 'Maquette de Capture', desc: 'Encadrez vos captures dans des maquettes navigateur ou appareil.' },
    es: { href: '/screenshot-mockup', name: 'Maqueta de Captura', desc: 'Enmarca capturas en maquetas de navegador o dispositivo.' },
    pt: { href: '/screenshot-mockup', name: 'Mockup de Captura', desc: 'Emoldure capturas em mockups de navegador ou dispositivo.' },
    de: { href: '/screenshot-mockup', name: 'Screenshot Mockup', desc: 'Screenshots in Browser- oder Geräte-Mockups einrahmen.' },
  },
  '/invoice-generator': {
    en: { href: '/invoice-generator', name: 'Invoice Generator', desc: 'Create professional invoices. Line items, tax, discounts. Download PDF. Free.' },
    fr: { href: '/fr/facture-gratuite', name: 'Facture Gratuite', desc: 'Créez des factures professionnelles. Téléchargez en PDF' },
    es: { href: '/es/factura-gratis', name: 'Factura Gratis', desc: 'Crea facturas profesionales. Descarga PDF' },
    pt: { href: '/pt/gerador-fatura', name: 'Gerador de Fatura', desc: 'Crie faturas profissionais. Baixe em PDF' },
    de: { href: '/de/rechnungsgenerator', name: 'Rechnungsgenerator', desc: 'Professionelle Rechnungen erstellen. PDF herunterladen' },
  },
  '/mortgage-calculator': {
    en: { href: '/mortgage-calculator', name: 'Mortgage Calculator', desc: 'Calculate monthly payments, total interest, amortization.' },
    fr: { href: '/fr/calculatrice-pret-immobilier', name: 'Calculatrice Prêt Immobilier', desc: 'Mensualités, intérêts totaux, amortissement' },
    es: { href: '/es/calculadora-hipoteca', name: 'Calculadora Hipoteca', desc: 'Cuotas mensuales, intereses totales, amortización' },
    pt: { href: '/pt/calculadora-financiamento', name: 'Calculadora Financiamento', desc: 'Parcelas mensais, juros totais, amortização' },
    de: { href: '/de/baufinanzierung-rechner', name: 'Baufinanzierung Rechner', desc: 'Monatliche Raten, Gesamtzinsen, Tilgungsplan' },
  },
  '/bmi-calculator': {
    en: { href: '/bmi-calculator', name: 'BMI Calculator', desc: 'Calculate Body Mass Index. Metric and imperial.' },
    fr: { href: '/fr/calcul-imc', name: 'Calcul IMC', desc: 'Calculez votre indice de masse corporelle' },
    es: { href: '/es/calculadora-imc', name: 'Calculadora IMC', desc: 'Calcula tu índice de masa corporal' },
    pt: { href: '/pt/calculadora-imc', name: 'Calculadora IMC', desc: 'Calcule seu índice de massa corporal' },
    de: { href: '/de/bmi-rechner', name: 'BMI Rechner', desc: 'Body-Mass-Index berechnen' },
  },
  '/currency-converter': {
    en: { href: '/currency-converter', name: 'Currency Converter', desc: 'Convert between 30+ world currencies instantly.' },
    fr: { href: '/fr/convertisseur-devise', name: 'Convertisseur Devise', desc: 'Convertissez entre 30+ devises mondiales' },
    es: { href: '/es/convertidor-moneda', name: 'Convertidor Moneda', desc: 'Convierte entre 30+ monedas mundiales' },
    pt: { href: '/pt/conversor-moeda', name: 'Conversor Moeda', desc: 'Converta entre 30+ moedas mundiais' },
    de: { href: '/de/waehrungsrechner', name: 'Währungsrechner', desc: 'Zwischen 30+ Weltwährungen umrechnen' },
  },
  '/loan-calculator': {
    en: { href: '/loan-calculator', name: 'Loan Calculator', desc: 'Monthly payments for any loan. Amortization schedule.' },
    fr: { href: '/fr/calculatrice-credit', name: 'Calculatrice Crédit', desc: 'Mensualités pour tout prêt. Tableau d\'amortissement' },
    es: { href: '/es/calculadora-prestamo', name: 'Calculadora Préstamo', desc: 'Cuotas mensuales para cualquier préstamo' },
    pt: { href: '/pt/calculadora-emprestimo', name: 'Calculadora Empréstimo', desc: 'Parcelas mensais para qualquer empréstimo' },
    de: { href: '/de/kreditrechner', name: 'Kreditrechner', desc: 'Monatliche Raten für jeden Kredit' },
  },
  '/percentage-calculator': {
    en: { href: '/percentage-calculator', name: 'Percentage Calculator', desc: 'What is X% of Y? Percentage change, difference.' },
    fr: { href: '/fr/calculatrice-pourcentage', name: 'Calculatrice Pourcentage', desc: 'Combien fait X% de Y ? Variation en pourcentage' },
    es: { href: '/es/calculadora-porcentaje', name: 'Calculadora Porcentaje', desc: '¿Cuánto es X% de Y? Variación porcentual' },
    pt: { href: '/pt/calculadora-porcentagem', name: 'Calculadora Porcentagem', desc: 'Quanto é X% de Y? Variação percentual' },
    de: { href: '/de/prozentrechner', name: 'Prozentrechner', desc: 'Wie viel ist X% von Y? Prozentuale Veränderung' },
  },
  '/salary-calculator': {
    en: { href: '/salary-calculator', name: 'Salary Calculator', desc: 'Gross to net salary. Tax breakdown by country.' },
    fr: { href: '/fr/salaire-brut-net', name: 'Salaire Brut Net', desc: 'Convertissez brut en net. Détail des impôts' },
    es: { href: '/es/calculadora-salario-neto', name: 'Calculadora Salario Neto', desc: 'De bruto a neto. Desglose de impuestos' },
    pt: { href: '/pt/calculadora-salario-liquido', name: 'Calculadora Salário Líquido', desc: 'De bruto para líquido. Detalhamento de impostos' },
    de: { href: '/de/brutto-netto-rechner', name: 'Brutto Netto Rechner', desc: 'Brutto zu Netto. Steueraufschlüsselung' },
  },
  '/tip-calculator': {
    en: { href: '/tip-calculator', name: 'Tip Calculator', desc: 'Calculate tip and split the bill. Quick and easy.' },
    fr: { href: '/fr/calculatrice-pourboire', name: 'Calculatrice Pourboire', desc: 'Calculez le pourboire et partagez l\'addition' },
    es: { href: '/es/calculadora-propina', name: 'Calculadora Propina', desc: 'Calcula la propina y divide la cuenta' },
    pt: { href: '/pt/calculadora-gorjeta', name: 'Calculadora Gorjeta', desc: 'Calcule a gorjeta e divida a conta' },
    de: { href: '/de/trinkgeld-rechner', name: 'Trinkgeld Rechner', desc: 'Trinkgeld berechnen und Rechnung teilen' },
  },
  '/investment-calculator': {
    en: { href: '/investment-calculator', name: 'Investment Calculator', desc: 'Compound interest. See your money grow over time.' },
    fr: { href: '/fr/simulateur-investissement', name: 'Simulateur Investissement', desc: 'Intérêts composés. Voyez votre argent croître' },
    es: { href: '/es/calculadora-inversion', name: 'Calculadora Inversión', desc: 'Interés compuesto. Mira crecer tu dinero' },
    pt: { href: '/pt/calculadora-investimento', name: 'Calculadora Investimento', desc: 'Juros compostos. Veja seu dinheiro crescer' },
    de: { href: '/de/zinsrechner', name: 'Zinsrechner', desc: 'Zinseszins. Sehen Sie Ihr Geld wachsen' },
  },
  '/vat-calculator': {
    en: { href: '/vat-calculator', name: 'VAT Calculator', desc: 'Add or remove VAT/sales tax. Pre-set country rates.' },
    fr: { href: '/fr/calcul-tva', name: 'Calcul TVA', desc: 'Ajoutez ou retirez la TVA. Taux par pays' },
    es: { href: '/es/calculadora-iva', name: 'Calculadora IVA', desc: 'Añade o quita IVA. Tasas por país' },
    pt: { href: '/pt/calculadora-imposto', name: 'Calculadora Imposto', desc: 'Adicione ou remova imposto. Taxas por país' },
    de: { href: '/de/mehrwertsteuer-rechner', name: 'Mehrwertsteuer Rechner', desc: 'MwSt. hinzufügen oder entfernen. Ländersätze' },
  },
  '/retirement-calculator': {
    en: { href: '/retirement-calculator', name: 'Retirement Calculator', desc: 'Plan retirement savings. Monthly income projection.' },
    fr: { href: '/fr/simulateur-retraite', name: 'Simulateur Retraite', desc: 'Planifiez votre épargne retraite' },
    es: { href: '/es/calculadora-jubilacion', name: 'Calculadora Jubilación', desc: 'Planifica tu ahorro para la jubilación' },
    pt: { href: '/pt/calculadora-aposentadoria', name: 'Calculadora Aposentadoria', desc: 'Planeje sua poupança para aposentadoria' },
    de: { href: '/de/rentenrechner', name: 'Rentenrechner', desc: 'Planen Sie Ihre Altersvorsorge' },
  },
  '/calorie-calculator': {
    en: { href: '/calorie-calculator', name: 'Calorie Calculator', desc: 'Daily calorie needs. BMR, TDEE. Lose, maintain, gain.' },
    fr: { href: '/fr/calculateur-calories', name: 'Calculateur Calories', desc: 'Besoins caloriques journaliers. BMR, TDEE' },
    es: { href: '/es/calculadora-calorias', name: 'Calculadora Calorías', desc: 'Necesidades calóricas diarias. TMB, TDEE' },
    pt: { href: '/pt/calculadora-calorias', name: 'Calculadora Calorias', desc: 'Necessidades calóricas diárias. TMB, TDEE' },
    de: { href: '/de/kalorienrechner', name: 'Kalorienrechner', desc: 'Täglicher Kalorienbedarf. BMR, TDEE' },
  },
  '/due-date-calculator': {
    en: { href: '/due-date-calculator', name: 'Due Date Calculator', desc: 'Pregnancy due date, trimester, gestational age.' },
    fr: { href: '/fr/calcul-date-accouchement', name: 'Date d\'Accouchement', desc: 'Date prévue, trimestre, âge gestationnel' },
    es: { href: '/es/calculadora-fecha-parto', name: 'Calculadora Fecha de Parto', desc: 'Fecha prevista, trimestre, edad gestacional' },
    pt: { href: '/pt/calculadora-data-parto', name: 'Calculadora Data do Parto', desc: 'Data prevista, trimestre, idade gestacional' },
    de: { href: '/de/geburtsterminrechner', name: 'Geburtsterminrechner', desc: 'Voraussichtlicher Termin, Trimester, Schwangerschaftswoche' },
  },
  '/macro-calculator': {
    en: { href: '/macro-calculator', name: 'Macro Calculator', desc: 'Protein, carbs, fat. Balanced, keto, high protein.' },
    fr: { href: '/fr/calculateur-macros', name: 'Calculateur Macros', desc: 'Protéines, glucides, lipides' },
    es: { href: '/es/calculadora-macros', name: 'Calculadora Macros', desc: 'Proteínas, carbohidratos, grasas' },
    pt: { href: '/pt/calculadora-macros', name: 'Calculadora Macros', desc: 'Proteínas, carboidratos, gorduras' },
    de: { href: '/de/makrorechner', name: 'Makrorechner', desc: 'Proteine, Kohlenhydrate, Fette' },
  },
  '/ideal-weight': {
    en: { href: '/ideal-weight', name: 'Ideal Weight Calculator', desc: '4 formulas. Healthy BMI range for your height.' },
    fr: { href: '/fr/poids-ideal', name: 'Poids Idéal', desc: '4 formules. Plage IMC saine pour votre taille' },
    es: { href: '/es/calculadora-peso-ideal', name: 'Peso Ideal', desc: '4 fórmulas. Rango IMC saludable para tu altura' },
    pt: { href: '/pt/calculadora-peso-ideal', name: 'Peso Ideal', desc: '4 fórmulas. Faixa IMC saudável para sua altura' },
    de: { href: '/de/idealgewicht-rechner', name: 'Idealgewicht Rechner', desc: '4 Formeln. Gesunder BMI-Bereich für Ihre Größe' },
  },
  '/body-fat-calculator': {
    en: { href: '/body-fat-calculator', name: 'Body Fat Calculator', desc: 'US Navy method. Fat mass, lean mass, category.' },
    fr: { href: '/fr/calcul-masse-grasse', name: 'Calcul Masse Grasse', desc: 'Méthode US Navy. Masse grasse et maigre' },
    es: { href: '/es/calculadora-grasa-corporal', name: 'Calculadora Grasa Corporal', desc: 'Método US Navy. Masa grasa y magra' },
    pt: { href: '/pt/calculadora-gordura-corporal', name: 'Calculadora Gordura Corporal', desc: 'Método US Navy. Massa gorda e magra' },
    de: { href: '/de/koerperfettrechner', name: 'Körperfettrechner', desc: 'US Navy Methode. Fett- und Magermasse' },
  },
  '/calorie-deficit': {
    en: { href: '/calorie-deficit', name: 'Calorie Deficit Calculator', desc: 'Time to goal weight. Safe daily calorie targets.' },
    fr: { href: '/fr/calcul-deficit-calorique', name: 'Déficit Calorique', desc: 'Temps pour atteindre votre poids cible' },
    es: { href: '/es/calculadora-deficit-calorico', name: 'Déficit Calórico', desc: 'Tiempo para alcanzar tu peso objetivo' },
    pt: { href: '/pt/calculadora-deficit-calorico', name: 'Déficit Calórico', desc: 'Tempo para atingir seu peso meta' },
    de: { href: '/de/kaloriendefizit-rechner', name: 'Kaloriendefizit Rechner', desc: 'Zeit bis zum Zielgewicht' },
  },
  '/water-intake': {
    en: { href: '/water-intake', name: 'Water Intake Calculator', desc: 'How much water per day. By weight and activity.' },
    fr: { href: '/fr/calcul-hydratation', name: 'Calcul Hydratation', desc: 'Combien d\'eau par jour selon votre poids' },
    es: { href: '/es/calculadora-agua-diaria', name: 'Agua Diaria', desc: 'Cuánta agua por día según tu peso' },
    pt: { href: '/pt/calculadora-agua-diaria', name: 'Água Diária', desc: 'Quanta água por dia pelo seu peso' },
    de: { href: '/de/wasserbedarf-rechner', name: 'Wasserbedarf Rechner', desc: 'Wie viel Wasser pro Tag nach Gewicht' },
  },
  '/heart-rate-calculator': {
    en: { href: '/heart-rate-calculator', name: 'Heart Rate Zones', desc: 'Fat burn, cardio, VO2 max zones. Karvonen method.' },
    fr: { href: '/fr/frequence-cardiaque', name: 'Fréquence Cardiaque', desc: 'Zones cardio, brûle-graisses, VO2 max' },
    es: { href: '/es/calculadora-frecuencia-cardiaca', name: 'Frecuencia Cardíaca', desc: 'Zonas cardio, quema grasa, VO2 max' },
    pt: { href: '/pt/calculadora-frequencia-cardiaca', name: 'Frequência Cardíaca', desc: 'Zonas cardio, queima de gordura, VO2 max' },
    de: { href: '/de/herzfrequenz-rechner', name: 'Herzfrequenz Rechner', desc: 'Cardio-Zonen, Fettverbrennung, VO2 max' },
  },
  '/pace-calculator': {
    en: { href: '/pace-calculator', name: 'Running Pace Calculator', desc: '5K, 10K, half, marathon. Splits, pace, time.' },
    fr: { href: '/fr/calculateur-allure-course', name: 'Allure de Course', desc: '5K, 10K, semi, marathon. Splits et allure' },
    es: { href: '/es/calculadora-ritmo-carrera', name: 'Ritmo de Carrera', desc: '5K, 10K, media, maratón. Splits y ritmo' },
    pt: { href: '/pt/calculadora-ritmo-corrida', name: 'Ritmo de Corrida', desc: '5K, 10K, meia, maratona. Splits e ritmo' },
    de: { href: '/de/laufpace-rechner', name: 'Laufpace Rechner', desc: '5K, 10K, Halbmarathon, Marathon. Splits und Pace' },
  },
  '/one-rep-max': {
    en: { href: '/one-rep-max', name: '1RM Calculator', desc: 'Estimate one rep max. Epley, Brzycki. % chart.' },
    fr: { href: '/fr/calculateur-1rm', name: 'Calculateur 1RM', desc: 'Estimez votre rep max. Epley, Brzycki' },
    es: { href: '/es/calculadora-1rm', name: 'Calculadora 1RM', desc: 'Estima tu rep máxima. Epley, Brzycki' },
    pt: { href: '/pt/calculadora-1rm', name: 'Calculadora 1RM', desc: 'Estime sua rep máxima. Epley, Brzycki' },
    de: { href: '/de/1rm-rechner', name: '1RM Rechner', desc: 'Schätzen Sie Ihr maximales Gewicht. Epley, Brzycki' },
  },
}

function buildTools(lang: Lang): Tool[] {
  return BASE.map(b => {
    const text = TEXTS[b.key]?.[lang] || TEXTS[b.key]?.en
    if (!text) return null
    return {
      href: text.href,
      name: text.name,
      desc: text.desc,
      icon: b.icon,
      color: b.color,
      searches: b.searches,
      tag: b.tag,
    }
  }).filter(Boolean) as Tool[]
}

const COMING_DATA: Record<Lang, ComingItem[]> = {
  en: [
    { name: 'Date & Time Tools', searches: '15M+' },
    { name: 'Math & Education', searches: '12M+' },
    { name: 'Electrical & DIY', searches: '8M+' },
    { name: 'Cooking Converter', searches: '3M+' },
    { name: 'Photo & Design Tools', searches: '5M+' },
  ],
  fr: [
    { name: 'Outils Date & Heure', searches: '15M+' },
    { name: 'Maths & Éducation', searches: '12M+' },
    { name: 'Électricité & Bricolage', searches: '8M+' },
    { name: 'Convertisseur Cuisine', searches: '3M+' },
    { name: 'Outils Photo & Design', searches: '5M+' },
  ],
  es: [
    { name: 'Herramientas Fecha y Hora', searches: '15M+' },
    { name: 'Matemáticas y Educación', searches: '12M+' },
    { name: 'Electricidad y Bricolaje', searches: '8M+' },
    { name: 'Conversor de Cocina', searches: '3M+' },
    { name: 'Herramientas Foto y Diseño', searches: '5M+' },
  ],
  pt: [
    { name: 'Ferramentas Data e Hora', searches: '15M+' },
    { name: 'Matemática e Educação', searches: '12M+' },
    { name: 'Eletricidade e DIY', searches: '8M+' },
    { name: 'Conversor de Cozinha', searches: '3M+' },
    { name: 'Ferramentas Foto e Design', searches: '5M+' },
  ],
  de: [
    { name: 'Datum & Zeit Tools', searches: '15M+' },
    { name: 'Mathe & Bildung', searches: '12M+' },
    { name: 'Elektrik & Heimwerken', searches: '8M+' },
    { name: 'Kochrechner', searches: '3M+' },
    { name: 'Foto & Design Tools', searches: '5M+' },
  ],
}

const STRINGS_DATA: Record<Lang, HomeStrings> = {
  en: {
    heroLine1: 'Every tool you Google,',
    heroLine2: 'in one place.',
    heroSubtitle: 'Free. Fast. No signup. No tracking. All tools run locally in your browser — your data never leaves your device.',
    comingSoonLabel: 'Coming soon',
    footerCopyright: '© 2026 Tools4Free — Free forever',
  },
  fr: {
    heroLine1: 'Tous les outils que vous cherchez,',
    heroLine2: 'au même endroit.',
    heroSubtitle: 'Gratuit. Rapide. Sans inscription. Sans tracking. Tous les outils fonctionnent dans votre navigateur — vos données ne quittent jamais votre appareil.',
    comingSoonLabel: 'Bientôt disponible',
    footerCopyright: '© 2026 Tools4Free — Gratuit pour toujours',
  },
  es: {
    heroLine1: 'Todas las herramientas que buscas,',
    heroLine2: 'en un solo lugar.',
    heroSubtitle: 'Gratis. Rápido. Sin registro. Sin rastreo. Todas las herramientas funcionan en tu navegador — tus datos nunca salen de tu dispositivo.',
    comingSoonLabel: 'Próximamente',
    footerCopyright: '© 2026 Tools4Free — Gratis para siempre',
  },
  pt: {
    heroLine1: 'Todas as ferramentas que você procura,',
    heroLine2: 'em um só lugar.',
    heroSubtitle: 'Grátis. Rápido. Sem cadastro. Sem rastreamento. Todas as ferramentas funcionam no seu navegador — seus dados nunca saem do seu dispositivo.',
    comingSoonLabel: 'Em breve',
    footerCopyright: '© 2026 Tools4Free — Grátis para sempre',
  },
  de: {
    heroLine1: 'Alle Tools, die Sie suchen,',
    heroLine2: 'an einem Ort.',
    heroSubtitle: 'Kostenlos. Schnell. Ohne Anmeldung. Ohne Tracking. Alle Tools laufen lokal in Ihrem Browser — Ihre Daten verlassen nie Ihr Gerät.',
    comingSoonLabel: 'Demnächst',
    footerCopyright: '© 2026 Tools4Free — Für immer kostenlos',
  },
}

export const HOME_DATA: Record<Lang, HomeData> = {
  en: { tools: buildTools('en'), coming: COMING_DATA.en, strings: STRINGS_DATA.en },
  fr: { tools: buildTools('fr'), coming: COMING_DATA.fr, strings: STRINGS_DATA.fr },
  es: { tools: buildTools('es'), coming: COMING_DATA.es, strings: STRINGS_DATA.es },
  pt: { tools: buildTools('pt'), coming: COMING_DATA.pt, strings: STRINGS_DATA.pt },
  de: { tools: buildTools('de'), coming: COMING_DATA.de, strings: STRINGS_DATA.de },
}

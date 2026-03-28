'use client'
import { useState, useRef, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(2) + ' MB'
}

type CompressedImage = {
  name: string
  originalSize: number
  compressedSize: number
  originalUrl: string
  compressedUrl: string
  compressedBlob: Blob
  width: number
  height: number
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  titleImage: { en: 'Image', fr: 'Compresseur', es: 'Compresor', pt: 'Compressor', de: 'Bild' },
  titleCompressor: { en: 'compressor', fr: 'd\'images', es: 'de imágenes', pt: 'de imagens', de: 'kompressor' },
  subtitle: {
    en: 'Drop images. Get smaller files. Nothing leaves your browser.',
    fr: 'Déposez des images. Obtenez des fichiers plus petits. Rien ne quitte votre navigateur.',
    es: 'Arrastra imágenes. Obtén archivos más pequeños. Nada sale de tu navegador.',
    pt: 'Solte imagens. Obtenha arquivos menores. Nada sai do seu navegador.',
    de: 'Bilder ablegen. Kleinere Dateien erhalten. Nichts verlässt deinen Browser.',
  },

  // Controls
  quality: { en: 'Quality', fr: 'Qualité', es: 'Calidad', pt: 'Qualidade', de: 'Qualität' },
  compressing: { en: 'Compressing...', fr: 'Compression en cours...', es: 'Comprimiendo...', pt: 'Comprimindo...', de: 'Komprimiere...' },
  dropHere: {
    en: 'Drop images here or click to browse',
    fr: 'Déposez des images ici ou cliquez pour parcourir',
    es: 'Arrastra imágenes aquí o haz clic para buscar',
    pt: 'Solte imagens aqui ou clique para navegar',
    de: 'Bilder hier ablegen oder klicken zum Durchsuchen',
  },
  fileFormats: {
    en: 'JPEG, PNG, WebP — up to 50MB per image',
    fr: 'JPEG, PNG, WebP — jusqu\'à 50 Mo par image',
    es: 'JPEG, PNG, WebP — hasta 50 MB por imagen',
    pt: 'JPEG, PNG, WebP — até 50 MB por imagem',
    de: 'JPEG, PNG, WebP — bis zu 50 MB pro Bild',
  },

  // Stats
  images: { en: 'Images', fr: 'Images', es: 'Imágenes', pt: 'Imagens', de: 'Bilder' },
  original: { en: 'Original', fr: 'Original', es: 'Original', pt: 'Original', de: 'Original' },
  compressed: { en: 'Compressed', fr: 'Compressé', es: 'Comprimido', pt: 'Comprimido', de: 'Komprimiert' },
  saved: { en: 'Saved', fr: 'Économisé', es: 'Ahorrado', pt: 'Economizado', de: 'Gespart' },
  downloadAll: { en: 'Download all', fr: 'Tout télécharger', es: 'Descargar todo', pt: 'Baixar tudo', de: 'Alle herunterladen' },
  save: { en: 'Save', fr: 'Enregistrer', es: 'Guardar', pt: 'Salvar', de: 'Speichern' },

  // SEO
  seoH2: {
    en: 'Free image compressor — 100% private',
    fr: 'Compresseur d\'images gratuit — 100 % privé',
    es: 'Compresor de imágenes gratis — 100 % privado',
    pt: 'Compressor de imagens grátis — 100 % privado',
    de: 'Kostenloser Bildkompressor — 100 % privat',
  },
  seoP1: {
    en: 'CompressIt reduces image file sizes directly in your browser using the HTML Canvas API. No files are ever uploaded to a server, so your photos and screenshots remain completely private. The tool supports JPEG, PNG, and WebP formats. Simply drag and drop your images, adjust the quality slider to find the right balance between file size and visual clarity, and download the optimized versions instantly.',
    fr: 'CompressIt réduit la taille des fichiers image directement dans votre navigateur grâce à l\'API HTML Canvas. Aucun fichier n\'est jamais envoyé sur un serveur, vos photos et captures d\'écran restent donc entièrement privées. L\'outil prend en charge les formats JPEG, PNG et WebP. Glissez-déposez simplement vos images, ajustez le curseur de qualité pour trouver le bon équilibre entre taille du fichier et clarté visuelle, et téléchargez les versions optimisées instantanément.',
    es: 'CompressIt reduce el tamaño de los archivos de imagen directamente en tu navegador usando la API HTML Canvas. Ningún archivo se sube jamás a un servidor, por lo que tus fotos y capturas de pantalla permanecen completamente privadas. La herramienta soporta formatos JPEG, PNG y WebP. Simplemente arrastra y suelta tus imágenes, ajusta el control de calidad para encontrar el equilibrio adecuado entre tamaño de archivo y claridad visual, y descarga las versiones optimizadas al instante.',
    pt: 'O CompressIt reduz o tamanho dos arquivos de imagem diretamente no seu navegador usando a API HTML Canvas. Nenhum arquivo é enviado para um servidor, então suas fotos e capturas de tela permanecem completamente privadas. A ferramenta suporta formatos JPEG, PNG e WebP. Simplesmente arraste e solte suas imagens, ajuste o controle de qualidade para encontrar o equilíbrio certo entre tamanho do arquivo e clareza visual, e baixe as versões otimizadas instantaneamente.',
    de: 'CompressIt reduziert Bilddateigrößen direkt in deinem Browser mit der HTML Canvas API. Keine Dateien werden jemals auf einen Server hochgeladen, sodass deine Fotos und Screenshots vollständig privat bleiben. Das Tool unterstützt JPEG-, PNG- und WebP-Formate. Ziehe einfach deine Bilder per Drag & Drop, stelle den Qualitätsregler ein, um die richtige Balance zwischen Dateigröße und visueller Klarheit zu finden, und lade die optimierten Versionen sofort herunter.',
  },
  seoH3a: {
    en: 'How browser-based compression works',
    fr: 'Comment fonctionne la compression dans le navigateur',
    es: 'Cómo funciona la compresión en el navegador',
    pt: 'Como funciona a compressão no navegador',
    de: 'Wie browserbasierte Komprimierung funktioniert',
  },
  seoP2: {
    en: 'Traditional compression tools require you to upload images to a remote server, which raises privacy concerns and adds latency. CompressIt uses the Canvas API built into modern browsers to re-encode your image at a lower quality setting. This means the entire process happens on your device in milliseconds. The quality slider gives you fine-grained control, so you can push file sizes down aggressively for thumbnails or keep quality high for hero images.',
    fr: 'Les outils de compression traditionnels vous obligent à envoyer vos images sur un serveur distant, ce qui pose des problèmes de confidentialité et ajoute de la latence. CompressIt utilise l\'API Canvas intégrée aux navigateurs modernes pour ré-encoder votre image à un réglage de qualité inférieur. Cela signifie que tout le processus se déroule sur votre appareil en quelques millisecondes. Le curseur de qualité vous offre un contrôle précis, vous permettant de réduire agressivement la taille des fichiers pour les miniatures ou de maintenir une qualité élevée pour les images principales.',
    es: 'Las herramientas de compresión tradicionales requieren que subas imágenes a un servidor remoto, lo que plantea preocupaciones de privacidad y añade latencia. CompressIt usa la API Canvas integrada en los navegadores modernos para recodificar tu imagen a un ajuste de calidad inferior. Esto significa que todo el proceso ocurre en tu dispositivo en milisegundos. El control de calidad te da un control preciso, para que puedas reducir agresivamente el tamaño de los archivos para miniaturas o mantener alta la calidad para imágenes principales.',
    pt: 'Ferramentas de compressão tradicionais exigem que você envie imagens para um servidor remoto, o que levanta preocupações de privacidade e adiciona latência. O CompressIt usa a API Canvas incorporada nos navegadores modernos para recodificar sua imagem em uma configuração de qualidade inferior. Isso significa que todo o processo acontece no seu dispositivo em milissegundos. O controle de qualidade oferece controle refinado, para que você possa reduzir agressivamente o tamanho dos arquivos para miniaturas ou manter a qualidade alta para imagens de destaque.',
    de: 'Traditionelle Komprimierungstools erfordern das Hochladen von Bildern auf einen Remote-Server, was Datenschutzbedenken aufwirft und Latenz hinzufügt. CompressIt verwendet die in modernen Browsern eingebaute Canvas API, um dein Bild mit einer niedrigeren Qualitätseinstellung neu zu kodieren. Das bedeutet, der gesamte Prozess findet auf deinem Gerät in Millisekunden statt. Der Qualitätsregler gibt dir feine Kontrolle, sodass du Dateigrößen aggressiv für Thumbnails reduzieren oder die Qualität für Hero-Bilder hoch halten kannst.',
  },
  seoH3b: {
    en: 'When to compress your images',
    fr: 'Quand compresser vos images',
    es: 'Cuándo comprimir tus imágenes',
    pt: 'Quando comprimir suas imagens',
    de: 'Wann du deine Bilder komprimieren solltest',
  },
  seoP3: {
    en: 'Large images slow down websites, increase email bounce rates, and eat into mobile data plans. Compressing photos before uploading them to your site can cut load times significantly and improve search engine rankings. It is also useful before attaching images to emails or sharing them on social media, where platforms re-compress uploads and sometimes reduce quality further. Starting with an optimized file gives you better control over the final result.',
    fr: 'Les images volumineuses ralentissent les sites web, augmentent les taux de rebond des emails et consomment les forfaits de données mobiles. Compresser les photos avant de les envoyer sur votre site peut réduire considérablement les temps de chargement et améliorer le référencement. C\'est aussi utile avant de joindre des images aux emails ou de les partager sur les réseaux sociaux, où les plateformes recompressent les envois et réduisent parfois davantage la qualité. Partir d\'un fichier optimisé vous donne un meilleur contrôle sur le résultat final.',
    es: 'Las imágenes grandes ralentizan los sitios web, aumentan las tasas de rebote de correos electrónicos y consumen planes de datos móviles. Comprimir fotos antes de subirlas a tu sitio puede reducir significativamente los tiempos de carga y mejorar el posicionamiento en buscadores. También es útil antes de adjuntar imágenes a correos electrónicos o compartirlas en redes sociales, donde las plataformas recomprimen las subidas y a veces reducen aún más la calidad. Empezar con un archivo optimizado te da mejor control sobre el resultado final.',
    pt: 'Imagens grandes tornam sites mais lentos, aumentam as taxas de rejeição de emails e consomem planos de dados móveis. Comprimir fotos antes de enviá-las para seu site pode reduzir significativamente os tempos de carregamento e melhorar o ranking nos motores de busca. Também é útil antes de anexar imagens a emails ou compartilhá-las nas redes sociais, onde as plataformas recomprimem os uploads e às vezes reduzem ainda mais a qualidade. Começar com um arquivo otimizado dá a você melhor controle sobre o resultado final.',
    de: 'Große Bilder verlangsamen Websites, erhöhen E-Mail-Bounce-Raten und belasten mobile Datenpläne. Das Komprimieren von Fotos vor dem Hochladen auf deine Website kann Ladezeiten erheblich verkürzen und Suchmaschinen-Rankings verbessern. Es ist auch nützlich, bevor du Bilder an E-Mails anhängst oder in sozialen Medien teilst, wo Plattformen Uploads neu komprimieren und manchmal die Qualität weiter reduzieren. Mit einer optimierten Datei zu beginnen gibt dir bessere Kontrolle über das Endergebnis.',
  },
  seoP4: {
    en: 'After compressing your images, present them in a professional frame with the <a>Screenshot Mockup</a> tool. Need a QR code that links to your optimized gallery? Generate one with the <b>QR Code Generator</b>.',
    fr: 'Après avoir compressé vos images, présentez-les dans un cadre professionnel avec l\'outil <a>Screenshot Mockup</a>. Besoin d\'un QR code renvoyant vers votre galerie optimisée ? Générez-en un avec le <b>Générateur de QR Code</b>.',
    es: 'Después de comprimir tus imágenes, preséntalas en un marco profesional con la herramienta <a>Screenshot Mockup</a>. ¿Necesitas un código QR que enlace a tu galería optimizada? Genera uno con el <b>Generador de códigos QR</b>.',
    pt: 'Após comprimir suas imagens, apresente-as em uma moldura profissional com a ferramenta <a>Screenshot Mockup</a>. Precisa de um QR code que direcione para sua galeria otimizada? Gere um com o <b>Gerador de QR Code</b>.',
    de: 'Nachdem du deine Bilder komprimiert hast, präsentiere sie in einem professionellen Rahmen mit dem <a>Screenshot Mockup</a>-Tool. Brauchst du einen QR-Code, der zu deiner optimierten Galerie verlinkt? Erstelle einen mit dem <b>QR-Code-Generator</b>.',
  },
}

export default function ImageCompressorClient({ locale = 'en' as Locale }: { locale?: Locale } = {}) {
  const [images, setImages] = useState<CompressedImage[]>([])
  const [quality, setQuality] = useState(75)
  const [processing, setProcessing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const compress = useCallback(async (files: FileList | File[]) => {
    setProcessing(true)
    const results: CompressedImage[] = []

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue

      const originalUrl = URL.createObjectURL(file)
      const img = new Image()
      await new Promise<void>((resolve) => {
        img.onload = () => resolve()
        img.src = originalUrl
      })

      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const qualityValue = outputType === 'image/png' ? undefined : quality / 100

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), outputType, qualityValue)
      })

      const compressedUrl = URL.createObjectURL(blob)

      results.push({
        name: file.name,
        originalSize: file.size,
        compressedSize: blob.size,
        originalUrl,
        compressedUrl,
        compressedBlob: blob,
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }

    setImages(prev => [...results, ...prev])
    setProcessing(false)
  }, [quality])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) compress(e.dataTransfer.files)
  }, [compress])

  const download = (img: CompressedImage) => {
    const a = document.createElement('a')
    a.href = img.compressedUrl
    const ext = img.compressedBlob.type === 'image/png' ? '.png' : '.jpg'
    a.download = img.name.replace(/\.[^.]+$/, '') + '-compressed' + ext
    a.click()
  }

  const downloadAll = () => images.forEach(download)

  const totalOriginal = images.reduce((s, i) => s + i.originalSize, 0)
  const totalCompressed = images.reduce((s, i) => s + i.compressedSize, 0)
  const totalSaved = totalOriginal > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0

  return (
    <ToolShell name="Image Compressor" icon="🗜" currentPath="/image-compressor" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#D85A30', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>C</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>CompressIt</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleImage')} <span style={{ color: '#D85A30' }}>{lt('titleCompressor')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px' }}>
          {/* Quality slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('quality')}</span>
            <input type="range" min="10" max="95" step="5" value={quality} onChange={e => setQuality(+e.target.value)}
              style={{ width: 200, accentColor: '#D85A30' }} />
            <span style={{ fontFamily: fm, fontSize: 16, fontWeight: 700, color: '#D85A30', minWidth: 40 }}>{quality}%</span>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            style={{
              background: dragOver ? '#D85A3008' : '#fff',
              border: `2px dashed ${dragOver ? '#D85A30' : '#E8E4DB'}`,
              borderRadius: 18, padding: '48px 28px', textAlign: 'center',
              cursor: 'pointer', transition: 'all .2s', marginBottom: 20,
            }}
          >
            <input ref={inputRef} type="file" accept="image/*" multiple hidden
              onChange={e => e.target.files && compress(e.target.files)} />
            <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.4 }}>
              {processing ? '⏳' : '🖼️'}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1C1B18', marginBottom: 4 }}>
              {processing ? lt('compressing') : lt('dropHere')}
            </div>
            <div style={{ fontSize: 13, color: '#9A958A' }}>
              {lt('fileFormats')}
            </div>
          </div>

          {/* Stats bar */}
          {images.length > 0 && (
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB',
              padding: '16px 20px', marginBottom: 16,
            }}>
              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{lt('images')}</div>
                  <div style={{ fontFamily: fm, fontSize: 18, fontWeight: 700 }}>{images.length}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{lt('original')}</div>
                  <div style={{ fontFamily: fm, fontSize: 18, fontWeight: 700 }}>{formatSize(totalOriginal)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{lt('compressed')}</div>
                  <div style={{ fontFamily: fm, fontSize: 18, fontWeight: 700, color: '#22A065' }}>{formatSize(totalCompressed)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{lt('saved')}</div>
                  <div style={{ fontFamily: fm, fontSize: 18, fontWeight: 700, color: '#D85A30' }}>{totalSaved}%</div>
                </div>
              </div>
              <button onClick={downloadAll} style={{
                fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 10,
                border: 'none', background: '#D85A30', color: '#fff', cursor: 'pointer',
              }}>{lt('downloadAll')}</button>
            </div>
          )}

          {/* Image results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {images.map((img, i) => {
              const saved = Math.round((1 - img.compressedSize / img.originalSize) * 100)
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB',
                  padding: '14px 18px',
                }}>
                  <img src={img.compressedUrl} alt="" style={{
                    width: 56, height: 56, borderRadius: 10, objectFit: 'cover',
                    border: '1px solid #E8E4DB',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</div>
                    <div style={{ fontSize: 12, color: '#9A958A', marginTop: 2 }}>
                      {img.width}×{img.height} · {formatSize(img.originalSize)} → <span style={{ color: '#22A065', fontWeight: 600 }}>{formatSize(img.compressedSize)}</span>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: fm, fontSize: 14, fontWeight: 700,
                    color: saved > 0 ? '#22A065' : '#E24B4A',
                    minWidth: 50, textAlign: 'right',
                  }}>-{saved}%</div>
                  <button onClick={() => download(img)} style={{
                    fontFamily: fb, fontSize: 12, fontWeight: 700, padding: '8px 14px', borderRadius: 8,
                    border: '1.5px solid #E8E4DB', background: 'transparent', color: '#6B6560',
                    cursor: 'pointer', flexShrink: 0,
                  }}>{lt('save')}</button>
                </div>
              )
            })}
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
                {parts[0]}<a href="/screenshot-mockup" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[1]}</a>{parts[2]}<a href="/qr-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[3]}</a>{parts[4]}
              </>
            })()}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}

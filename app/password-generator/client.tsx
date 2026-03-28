'use client'
import { useState, useCallback, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const CHARS = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', numbers: '0123456789', symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?' }
const fb = "'Outfit', sans-serif"
const fm = "'JetBrains Mono', monospace"

const LABELS: Record<string, Record<Locale, string>> = {
  // Nav / Title
  navTitle: {
    en: 'PassForge', fr: 'PassForge', es: 'PassForge', pt: 'PassForge', de: 'PassForge',
  },
  titleMain: {
    en: 'Strong passwords,', fr: 'Des mots de passe forts,', es: 'Contraseñas seguras,', pt: 'Senhas fortes,', de: 'Starke Passwörter,',
  },
  titleAccent: {
    en: 'instantly', fr: 'instantanément', es: 'al instante', pt: 'instantaneamente', de: 'sofort',
  },
  subtitle: {
    en: 'Cryptographically secure. Never stored. 100% local.',
    fr: 'Cryptographiquement sûr. Jamais stocké. 100 % local.',
    es: 'Criptográficamente seguro. Nunca almacenado. 100 % local.',
    pt: 'Criptograficamente seguro. Nunca armazenado. 100 % local.',
    de: 'Kryptographisch sicher. Nie gespeichert. 100 % lokal.',
  },
  // Controls
  length: { en: 'Length', fr: 'Longueur', es: 'Longitud', pt: 'Comprimento', de: 'Länge' },
  uppercase: { en: 'Uppercase', fr: 'Majuscules', es: 'Mayúsculas', pt: 'Maiúsculas', de: 'Großbuchstaben' },
  lowercase: { en: 'Lowercase', fr: 'Minuscules', es: 'Minúsculas', pt: 'Minúsculas', de: 'Kleinbuchstaben' },
  numbers: { en: 'Numbers', fr: 'Chiffres', es: 'Números', pt: 'Números', de: 'Zahlen' },
  symbols: { en: 'Symbols', fr: 'Symboles', es: 'Símbolos', pt: 'Símbolos', de: 'Symbole' },
  // Buttons
  copyBtn: { en: 'Copy', fr: 'Copier', es: 'Copiar', pt: 'Copiar', de: 'Kopieren' },
  copiedBtn: { en: 'Copied!', fr: 'Copié !', es: '¡Copiado!', pt: 'Copiado!', de: 'Kopiert!' },
  regenerate: { en: 'Regenerate', fr: 'Régénérer', es: 'Regenerar', pt: 'Regenerar', de: 'Neu generieren' },
  // Recent
  recent: { en: 'Recent', fr: 'Récents', es: 'Recientes', pt: 'Recentes', de: 'Letzte' },
  // Strength
  strong: { en: 'Strong', fr: 'Fort', es: 'Fuerte', pt: 'Forte', de: 'Stark' },
  good: { en: 'Good', fr: 'Bon', es: 'Bueno', pt: 'Bom', de: 'Gut' },
  fair: { en: 'Fair', fr: 'Moyen', es: 'Regular', pt: 'Razoável', de: 'Mittel' },
  weak: { en: 'Weak', fr: 'Faible', es: 'Débil', pt: 'Fraco', de: 'Schwach' },
  // SEO
  seoH2: {
    en: 'Free secure password generator',
    fr: 'Générateur de mots de passe sécurisé gratuit',
    es: 'Generador de contraseñas seguras gratuito',
    pt: 'Gerador de senhas seguras gratuito',
    de: 'Kostenloser sicherer Passwort-Generator',
  },
  seoP1: {
    en: 'PassForge generates cryptographically secure passwords using your browser\'s built-in Web Crypto API. No passwords are ever sent to a server or stored anywhere. Choose a length between 6 and 64 characters, toggle individual character types on or off, and watch the real-time strength meter update as you adjust settings. Copy any generated password with a single click and move on with confidence.',
    fr: 'PassForge génère des mots de passe cryptographiquement sécurisés en utilisant l\'API Web Crypto intégrée à votre navigateur. Aucun mot de passe n\'est jamais envoyé à un serveur ni stocké nulle part. Choisissez une longueur entre 6 et 64 caractères, activez ou désactivez les types de caractères individuels et observez l\'indicateur de force se mettre à jour en temps réel. Copiez n\'importe quel mot de passe généré en un seul clic et avancez en toute confiance.',
    es: 'PassForge genera contraseñas criptográficamente seguras usando la API Web Crypto integrada en tu navegador. Ninguna contraseña se envía a un servidor ni se almacena en ningún lugar. Elige una longitud entre 6 y 64 caracteres, activa o desactiva los tipos de caracteres individuales y observa cómo el medidor de fortaleza se actualiza en tiempo real. Copia cualquier contraseña generada con un solo clic y continúa con confianza.',
    pt: 'O PassForge gera senhas criptograficamente seguras usando a API Web Crypto integrada ao seu navegador. Nenhuma senha é enviada a um servidor ou armazenada em qualquer lugar. Escolha um comprimento entre 6 e 64 caracteres, ative ou desative tipos individuais de caracteres e observe o medidor de força se atualizar em tempo real. Copie qualquer senha gerada com um único clique e siga em frente com confiança.',
    de: 'PassForge generiert kryptographisch sichere Passwörter mit der integrierten Web Crypto API Ihres Browsers. Keine Passwörter werden jemals an einen Server gesendet oder irgendwo gespeichert. Wählen Sie eine Länge zwischen 6 und 64 Zeichen, schalten Sie einzelne Zeichentypen ein oder aus und beobachten Sie, wie sich die Stärkeanzeige in Echtzeit aktualisiert. Kopieren Sie jedes generierte Passwort mit einem einzigen Klick und machen Sie sicher weiter.',
  },
  seoH3a: {
    en: 'Why cryptographic randomness matters',
    fr: 'Pourquoi l\'aléatoire cryptographique est important',
    es: 'Por qué importa la aleatoriedad criptográfica',
    pt: 'Por que a aleatoriedade criptográfica é importante',
    de: 'Warum kryptographische Zufälligkeit wichtig ist',
  },
  seoP2: {
    en: 'Many password generators rely on basic random number functions that can produce predictable patterns. PassForge uses the Web Crypto API, the same cryptographic engine that secures HTTPS connections, to produce truly unpredictable output. This means every character in your password is chosen from a uniform distribution, eliminating biases that attackers could exploit. The result is a password that resists brute-force attacks far better than one you would create by hand.',
    fr: 'De nombreux générateurs de mots de passe s\'appuient sur des fonctions de nombres aléatoires basiques qui peuvent produire des motifs prévisibles. PassForge utilise l\'API Web Crypto, le même moteur cryptographique qui sécurise les connexions HTTPS, pour produire une sortie véritablement imprévisible. Cela signifie que chaque caractère de votre mot de passe est choisi selon une distribution uniforme, éliminant les biais que les attaquants pourraient exploiter. Le résultat est un mot de passe qui résiste aux attaques par force brute bien mieux qu\'un mot de passe créé manuellement.',
    es: 'Muchos generadores de contraseñas dependen de funciones básicas de números aleatorios que pueden producir patrones predecibles. PassForge usa la API Web Crypto, el mismo motor criptográfico que protege las conexiones HTTPS, para producir una salida verdaderamente impredecible. Esto significa que cada carácter de tu contraseña se elige de una distribución uniforme, eliminando sesgos que los atacantes podrían explotar. El resultado es una contraseña que resiste ataques de fuerza bruta mucho mejor que una creada manualmente.',
    pt: 'Muitos geradores de senhas dependem de funções básicas de números aleatórios que podem produzir padrões previsíveis. O PassForge usa a API Web Crypto, o mesmo motor criptográfico que protege conexões HTTPS, para produzir uma saída verdadeiramente imprevisível. Isso significa que cada caractere da sua senha é escolhido de uma distribuição uniforme, eliminando vieses que atacantes poderiam explorar. O resultado é uma senha que resiste a ataques de força bruta muito melhor do que uma criada manualmente.',
    de: 'Viele Passwort-Generatoren verlassen sich auf grundlegende Zufallszahlenfunktionen, die vorhersehbare Muster erzeugen können. PassForge verwendet die Web Crypto API, dieselbe kryptographische Engine, die HTTPS-Verbindungen sichert, um wirklich unvorhersehbare Ausgaben zu erzeugen. Das bedeutet, dass jedes Zeichen in Ihrem Passwort aus einer gleichmäßigen Verteilung gewählt wird, wodurch Verzerrungen eliminiert werden, die Angreifer ausnutzen könnten. Das Ergebnis ist ein Passwort, das Brute-Force-Angriffen weit besser widersteht als eines, das Sie von Hand erstellen würden.',
  },
  seoH3b: {
    en: 'Password strength and best practices',
    fr: 'Force des mots de passe et bonnes pratiques',
    es: 'Fortaleza de contraseñas y mejores prácticas',
    pt: 'Força de senhas e melhores práticas',
    de: 'Passwortstärke und Best Practices',
  },
  seoP3: {
    en: 'A strong password is long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. Aim for at least 16 characters when protecting important accounts. Avoid reusing passwords across services, because a breach on one site can compromise all your other accounts. Use a password manager to store your generated passwords securely. PassForge makes it easy to create a unique, strong password every time you sign up for something new.',
    fr: 'Un mot de passe fort est long et comprend un mélange de majuscules, minuscules, chiffres et symboles. Visez au moins 16 caractères pour protéger les comptes importants. Évitez de réutiliser les mots de passe entre les services, car une fuite sur un site peut compromettre tous vos autres comptes. Utilisez un gestionnaire de mots de passe pour stocker vos mots de passe générés en toute sécurité. PassForge facilite la création d\'un mot de passe unique et fort chaque fois que vous vous inscrivez à un nouveau service.',
    es: 'Una contraseña fuerte es larga e incluye una mezcla de mayúsculas, minúsculas, números y símbolos. Apunta a al menos 16 caracteres al proteger cuentas importantes. Evita reutilizar contraseñas entre servicios, porque una brecha en un sitio puede comprometer todas tus otras cuentas. Usa un gestor de contraseñas para almacenar tus contraseñas generadas de forma segura. PassForge facilita la creación de una contraseña única y fuerte cada vez que te registras en algo nuevo.',
    pt: 'Uma senha forte é longa e inclui uma mistura de maiúsculas, minúsculas, números e símbolos. Procure usar pelo menos 16 caracteres ao proteger contas importantes. Evite reutilizar senhas entre serviços, pois uma violação em um site pode comprometer todas as suas outras contas. Use um gerenciador de senhas para armazenar suas senhas geradas com segurança. O PassForge facilita a criação de uma senha única e forte toda vez que você se cadastra em algo novo.',
    de: 'Ein starkes Passwort ist lang und enthält eine Mischung aus Großbuchstaben, Kleinbuchstaben, Zahlen und Symbolen. Verwenden Sie mindestens 16 Zeichen zum Schutz wichtiger Konten. Vermeiden Sie es, Passwörter zwischen Diensten wiederzuverwenden, da ein Datenleck auf einer Website alle Ihre anderen Konten gefährden kann. Verwenden Sie einen Passwort-Manager, um Ihre generierten Passwörter sicher zu speichern. PassForge macht es einfach, jedes Mal ein einzigartiges, starkes Passwort zu erstellen, wenn Sie sich für etwas Neues anmelden.',
  },
  seoCrossPromo: {
    en: 'Need to verify data integrity? Try the',
    fr: 'Besoin de vérifier l\'intégrité des données ? Essayez le',
    es: '¿Necesitas verificar la integridad de los datos? Prueba el',
    pt: 'Precisa verificar a integridade dos dados? Experimente o',
    de: 'Müssen Sie die Datenintegrität überprüfen? Probieren Sie den',
  },
  hashGenLink: {
    en: 'Hash Generator', fr: 'Générateur de hash', es: 'Generador de hash', pt: 'Gerador de hash', de: 'Hash-Generator',
  },
  crossPromoMid: {
    en: 'to create SHA-256 and MD5 hashes. You can also encode sensitive strings with the',
    fr: 'pour créer des hachages SHA-256 et MD5. Vous pouvez aussi encoder des chaînes sensibles avec l\'',
    es: 'para crear hashes SHA-256 y MD5. También puedes codificar cadenas sensibles con el',
    pt: 'para criar hashes SHA-256 e MD5. Você também pode codificar strings sensíveis com o',
    de: 'um SHA-256- und MD5-Hashes zu erstellen. Sie können auch sensible Zeichenketten mit dem',
  },
  base64Link: {
    en: 'Base64 Encoder', fr: 'Encodeur Base64', es: 'Codificador Base64', pt: 'Codificador Base64', de: 'Base64-Encoder',
  },
  crossPromoEnd: {
    en: 'for safe transport in URLs and APIs.',
    fr: 'pour un transport sûr dans les URL et API.',
    es: 'para un transporte seguro en URLs y APIs.',
    pt: 'para transporte seguro em URLs e APIs.',
    de: 'für sicheren Transport in URLs und APIs codieren.',
  },
}

export default function PassClient({
  defaultLength,
  locale = 'en' as Locale,
}: {
  defaultLength?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [len, setLen] = useState(defaultLength || 16)
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [passwords, setPasswords] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const gen = useCallback(() => {
    let cs = ''
    if (opts.upper) cs += CHARS.upper; if (opts.lower) cs += CHARS.lower
    if (opts.numbers) cs += CHARS.numbers; if (opts.symbols) cs += CHARS.symbols
    if (!cs) cs = CHARS.lower
    const a = new Uint32Array(len); crypto.getRandomValues(a)
    const pw = Array.from(a, x => cs[x % cs.length]).join('')
    setPasswords(p => [pw, ...p].slice(0, 6))
  }, [len, opts])

  useEffect(() => { gen() }, [])

  const copy = (pw: string, i: number) => { navigator.clipboard.writeText(pw); setCopied(i); setTimeout(() => setCopied(null), 1500) }

  const strength = (() => {
    let s = Math.min(len * 4, 40); let tCount = 0
    if (opts.upper) tCount++; if (opts.lower) tCount++; if (opts.numbers) tCount++; if (opts.symbols) tCount++
    s += tCount * 15; if (len >= 16) s += 10; if (len >= 24) s += 10
    return Math.min(s, 100)
  })()
  const sInfo = strength >= 80 ? { l: lt('strong'), c: '#22A065' } : strength >= 60 ? { l: lt('good'), c: '#97C459' } : strength >= 30 ? { l: lt('fair'), c: '#EF9F27' } : { l: lt('weak'), c: '#E24B4A' }

  return (
    <ToolShell name={lt('navTitle')} icon="⬡" currentPath="/password-generator" locale={locale}>
      <div style={{ background: '#0E0E11', minHeight: '100vh', color: '#E8E6F0', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#22D97A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0E0E11', fontSize: 12, fontWeight: 800 }}>P</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#5A586E', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 6 }}>
            {lt('titleMain')} <span style={{ color: '#22D97A' }}>{lt('titleAccent')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#5A586E', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 32px' }}>
          {passwords[0] && (
            <div style={{ background: '#17171C', borderRadius: 16, border: '1.5px solid #25252E', padding: '20px 24px', marginBottom: 16 }}>
              <div style={{ fontFamily: fm, fontSize: 'clamp(14px, 2.5vw, 18px)', wordBreak: 'break-all', lineHeight: 1.6, marginBottom: 14, letterSpacing: '.5px' }}>
                {[...passwords[0]].map((ch, i) => (
                  <span key={i} style={{ color: CHARS.symbols.includes(ch) ? '#22D97A' : CHARS.numbers.includes(ch) ? '#8B5CF6' : CHARS.upper.includes(ch) ? '#E8E6F0' : '#8A88A0' }}>{ch}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button onClick={() => copy(passwords[0], 0)} style={{ fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '10px 24px', borderRadius: 10, cursor: 'pointer', background: copied === 0 ? '#22D97A15' : '#22D97A', color: copied === 0 ? '#22D97A' : '#0E0E11', border: copied === 0 ? '1.5px solid #22D97A30' : '1.5px solid transparent' }}>
                  {copied === 0 ? lt('copiedBtn') : lt('copyBtn')}
                </button>
                <button onClick={gen} style={{ fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '10px 24px', borderRadius: 10, cursor: 'pointer', background: 'transparent', color: '#8A88A0', border: '1.5px solid #25252E' }}>{lt('regenerate')}</button>
                <div style={{ flex: 1 }} />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: sInfo.c, marginBottom: 3 }}>{sInfo.l}</div>
                  <div style={{ width: 80, height: 4, borderRadius: 2, background: '#25252E', overflow: 'hidden' }}>
                    <div style={{ width: `${strength}%`, height: '100%', borderRadius: 2, background: sInfo.c, transition: 'all .3s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{ background: '#17171C', borderRadius: 16, border: '1.5px solid #25252E', padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('length')}</span>
              <span style={{ fontFamily: fm, fontSize: 16, fontWeight: 700, color: '#22D97A' }}>{len}</span>
            </div>
            <input type="range" min="6" max="64" value={len} onChange={e => { setLen(+e.target.value); setTimeout(gen, 30) }}
              style={{ width: '100%', accentColor: '#22D97A' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              {[{ k: 'upper', l: 'A-Z', d: lt('uppercase') }, { k: 'lower', l: 'a-z', d: lt('lowercase') }, { k: 'numbers', l: '0-9', d: lt('numbers') }, { k: 'symbols', l: '!@#', d: lt('symbols') }].map(o => (
                <button key={o.k} onClick={() => { setOpts(p => ({ ...p, [o.k]: !p[o.k as keyof typeof p] })); setTimeout(gen, 30) }}
                  style={{ padding: '12px 14px', borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${opts[o.k as keyof typeof opts] ? '#22D97A30' : '#25252E'}`, background: opts[o.k as keyof typeof opts] ? '#22D97A15' : 'transparent', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: fm, fontSize: 14, fontWeight: 700, color: opts[o.k as keyof typeof opts] ? '#22D97A' : '#5A586E', minWidth: 28 }}>{o.l}</span>
                  <span style={{ fontSize: 12, color: opts[o.k as keyof typeof opts] ? '#E8E6F0' : '#5A586E' }}>{o.d}</span>
                </button>
              ))}
            </div>
          </div>

          {passwords.length > 1 && (
            <div style={{ background: '#17171C', borderRadius: 16, border: '1.5px solid #25252E', padding: '14px 18px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>{lt('recent')}</div>
              {passwords.slice(1).map((pw, i) => (
                <div key={i} onClick={() => copy(pw, i + 1)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 8px', borderRadius: 8, cursor: 'pointer' }}>
                  <span style={{ fontFamily: fm, fontSize: 12, color: '#8A88A0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: 12 }}>{pw}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: copied === i + 1 ? '#22D97A' : '#5A586E', flexShrink: 0 }}>{copied === i + 1 ? lt('copiedBtn') : lt('copyBtn')}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #1C1C24' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8, marginTop: 16 }}>
            {lt('seoCrossPromo')} <a href="/hash-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('hashGenLink')}</a> {lt('crossPromoMid')} <a href="/base64" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('base64Link')}</a> {lt('crossPromoEnd')}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}

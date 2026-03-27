'use client'
import { useState, useMemo, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"

const EMOJI_DATA: Record<string, [string, string][]> = {
  'Smileys': [['😀','grinning'],['😁','beaming'],['😂','joy'],['🤣','rofl'],['😃','smiley'],['😄','smile'],['😅','sweat smile'],['😆','laughing'],['😉','wink'],['😊','blush'],['😋','yum'],['😎','sunglasses'],['😍','heart eyes'],['🥰','love'],['😘','kiss'],['😗','kissing'],['😙','kissing smile'],['😚','kissing closed'],['🙂','slight smile'],['🤗','hug'],['🤩','star struck'],['🤔','thinking'],['🤨','raised eyebrow'],['😐','neutral'],['😑','expressionless'],['😶','no mouth'],['🙄','eye roll'],['😏','smirk'],['😣','persevere'],['😥','sad relieved'],['😮','open mouth'],['🤐','zipper mouth'],['😯','hushed'],['😪','sleepy'],['😫','tired'],['🥱','yawn'],['😴','sleeping'],['😌','relieved'],['😛','tongue'],['😜','wink tongue'],['😝','squinting tongue'],['🤤','drool'],['😒','unamused'],['😓','downcast sweat'],['😔','pensive'],['😕','confused'],['🙃','upside down'],['🤑','money face'],['😲','astonished'],['🥵','hot'],['🥶','cold'],['😱','scream'],['😨','fearful'],['😰','anxious'],['😢','cry'],['😭','sob'],['😤','angry huff'],['😠','angry'],['🤬','cursing'],['😈','devil smile'],['👿','devil'],['💀','skull'],['☠️','skull crossbones'],['🤡','clown'],['👻','ghost'],['👽','alien'],['🤖','robot'],['💩','poop'],['🥳','party']],
  'Hands': [['👋','wave'],['🤚','raised back'],['🖐️','hand spread'],['✋','raised hand'],['🖖','vulcan'],['👌','ok'],['🤌','pinched'],['✌️','peace'],['🤞','crossed fingers'],['🤟','love you'],['🤘','rock'],['🤙','call me'],['👈','point left'],['👉','point right'],['👆','point up'],['👇','point down'],['☝️','index up'],['👍','thumbs up'],['👎','thumbs down'],['✊','fist'],['👊','punch'],['🤛','left fist'],['🤜','right fist'],['👏','clap'],['🙌','raise'],['👐','open hands'],['🤲','palms up'],['🤝','handshake'],['🙏','pray'],['💪','muscle'],['🦾','mechanical arm']],
  'Hearts': [['❤️','red heart'],['🧡','orange heart'],['💛','yellow heart'],['💚','green heart'],['💙','blue heart'],['💜','purple heart'],['🖤','black heart'],['🤍','white heart'],['🤎','brown heart'],['💔','broken heart'],['❤️‍🔥','fire heart'],['💕','two hearts'],['💞','revolving hearts'],['💓','beating heart'],['💗','growing heart'],['💖','sparkling heart'],['💘','arrow heart'],['💝','ribbon heart'],['💟','heart decoration'],['♥️','heart suit']],
  'People': [['👶','baby'],['🧒','child'],['👦','boy'],['👧','girl'],['🧑','person'],['👱','blond'],['👨','man'],['👩','woman'],['🧔','beard'],['👴','old man'],['👵','old woman'],['🙍','frowning'],['🙎','pouting'],['🙅','no gesture'],['🙆','ok gesture'],['💁','tipping hand'],['🙋','raising hand'],['🧏','deaf'],['🙇','bowing'],['🤦','facepalm'],['🤷','shrug'],['👮','police'],['🕵️','detective'],['👷','construction'],['🤴','prince'],['👸','princess'],['🦸','superhero'],['🦹','villain'],['🧙','mage'],['🧚','fairy'],['🧛','vampire'],['🧜','merperson'],['🧝','elf'],['💃','dance woman'],['🕺','dance man']],
  'Animals': [['🐶','dog'],['🐱','cat'],['🐭','mouse'],['🐹','hamster'],['🐰','rabbit'],['🦊','fox'],['🐻','bear'],['🐼','panda'],['🐨','koala'],['🐯','tiger'],['🦁','lion'],['🐮','cow'],['🐷','pig'],['🐸','frog'],['🐵','monkey'],['🐔','chicken'],['🐧','penguin'],['🐦','bird'],['🦅','eagle'],['🦉','owl'],['🦇','bat'],['🐺','wolf'],['🐗','boar'],['🐴','horse'],['🦄','unicorn'],['🐝','bee'],['🐛','bug'],['🦋','butterfly'],['🐌','snail'],['🐙','octopus'],['🦑','squid'],['🦀','crab'],['🐠','fish'],['🐬','dolphin'],['🐳','whale'],['🦈','shark'],['🐊','crocodile'],['🐘','elephant'],['🦒','giraffe'],['🐕','dog2']],
  'Food': [['🍎','apple'],['🍐','pear'],['🍊','orange'],['🍋','lemon'],['🍌','banana'],['🍉','watermelon'],['🍇','grapes'],['🍓','strawberry'],['🫐','blueberries'],['🍒','cherries'],['🥝','kiwi'],['🍑','peach'],['🥭','mango'],['🍍','pineapple'],['🥥','coconut'],['🍅','tomato'],['🥑','avocado'],['🌮','taco'],['🌯','burrito'],['🍕','pizza'],['🍔','burger'],['🍟','fries'],['🌭','hotdog'],['🥪','sandwich'],['🍣','sushi'],['🍜','ramen'],['🍝','spaghetti'],['🍦','ice cream'],['🍩','donut'],['🍪','cookie'],['🎂','cake'],['🍰','shortcake'],['☕','coffee'],['🍵','tea'],['🍺','beer'],['🍷','wine'],['🥂','cheers']],
  'Travel': [['🚗','car'],['🚕','taxi'],['🚌','bus'],['🚎','trolleybus'],['🏎️','race car'],['🚓','police car'],['🚑','ambulance'],['🚒','fire truck'],['✈️','airplane'],['🚀','rocket'],['🛸','ufo'],['🚁','helicopter'],['⛵','sailboat'],['🚢','ship'],['🏠','house'],['🏢','office'],['🏰','castle'],['🗼','tower'],['🗽','statue liberty'],['⛩️','shrine'],['🌍','earth africa'],['🌎','earth americas'],['🌏','earth asia'],['🗺️','map'],['🧭','compass'],['⛰️','mountain'],['🏖️','beach'],['🌋','volcano']],
  'Objects': [['⌚','watch'],['📱','phone'],['💻','laptop'],['⌨️','keyboard'],['🖥️','desktop'],['🖨️','printer'],['🖱️','mouse'],['💡','lightbulb'],['🔦','flashlight'],['📷','camera'],['🎥','video camera'],['📺','tv'],['📻','radio'],['🎙️','microphone'],['🎧','headphones'],['🔑','key'],['🗝️','old key'],['🔒','lock'],['🔓','unlock'],['📦','package'],['📫','mailbox'],['✏️','pencil'],['🖊️','pen'],['📌','pin'],['📎','paperclip'],['✂️','scissors'],['📐','ruler'],['🧲','magnet']],
  'Symbols': [['✅','check'],['❌','cross'],['❓','question'],['❗','exclamation'],['⭐','star'],['🌟','glowing star'],['💫','dizzy'],['✨','sparkles'],['🔥','fire'],['💯','hundred'],['💤','zzz'],['🎵','music'],['🎶','notes'],['💰','money bag'],['💎','gem'],['🏆','trophy'],['🥇','gold medal'],['🥈','silver medal'],['🥉','bronze medal'],['⚡','lightning'],['☀️','sun'],['🌙','moon'],['🌈','rainbow'],['☁️','cloud'],['❄️','snowflake'],['💧','droplet'],['🍀','four leaf clover'],['🎯','target'],['♻️','recycle']],
}

const CATS = Object.keys(EMOJI_DATA)

export default function EmojiClient() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Smileys')
  const [copied, setCopied] = useState<string | null>(null)
  const [recent, setRecent] = useState<string[]>([])

  const filtered = useMemo(() => {
    if (search.trim()) {
      const q = search.toLowerCase()
      const results: [string, string][] = []
      for (const emojis of Object.values(EMOJI_DATA)) {
        for (const [emoji, name] of emojis) {
          if (name.includes(q) || emoji === q) results.push([emoji, name])
        }
      }
      return results
    }
    return EMOJI_DATA[cat] || []
  }, [search, cat])

  const copy = useCallback((emoji: string) => {
    navigator.clipboard.writeText(emoji)
    setCopied(emoji)
    setRecent(prev => [emoji, ...prev.filter(e => e !== emoji)].slice(0, 16))
    setTimeout(() => setCopied(null), 800)
  }, [])

  return (
    <ToolShell name="Emoji Picker" icon="😀" currentPath="/emoji-picker">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>😀</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>EmojiDB</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Emoji <span style={{ color: '#F59E0B' }}>picker</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 20 }}>Click any emoji to copy. Search by name.</p>

          <div style={{ maxWidth: 440, margin: '0 auto 20px' }}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search emojis... (e.g. fire, heart, smile)"
              style={{ width: '100%', border: '2px solid #E8E4DB', borderRadius: 14, padding: '14px 18px', fontSize: 16, fontFamily: fb, color: '#1C1B18', outline: 'none', background: '#fff' }} />
          </div>
        </section>

        {!search && (
          <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 12px' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)} style={{
                  fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 10, cursor: 'pointer',
                  border: cat === c ? '1.5px solid #F59E0B' : '1.5px solid #E8E4DB',
                  background: cat === c ? '#F59E0B10' : '#fff', color: cat === c ? '#B45309' : '#6B6560',
                }}>{c}</button>
              ))}
            </div>
          </section>
        )}

        {recent.length > 0 && !search && (
          <section style={{ maxWidth: 860, margin: '0 auto', padding: '8px 28px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>Recently used</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {recent.map((e, i) => (
                <button key={i} onClick={() => copy(e)} style={{
                  fontSize: 24, width: 42, height: 42, borderRadius: 10, border: '1px solid #E8E4DB',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{e}</button>
              ))}
            </div>
          </section>
        )}

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '8px 28px 40px' }}>
          {search && filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9A958A' }}>No emojis found for "{search}"</div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {filtered.map(([emoji, name], i) => (
                <button key={i} onClick={() => copy(emoji)} title={name} style={{
                  fontSize: 28, width: 50, height: 50, borderRadius: 12, cursor: 'pointer',
                  border: copied === emoji ? '2px solid #F59E0B' : '1.5px solid transparent',
                  background: copied === emoji ? '#F59E0B10' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all .1s',
                }}>{emoji}</button>
              ))}
            </div>
          )}
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free emoji picker — copy & paste</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            EmojiDB lets you browse and copy all Unicode emojis instantly. Search by keyword or browse by category including smileys, hands, hearts, people, animals, food, travel, objects, and symbols. One click copies any emoji to your clipboard so you can paste it immediately. It works everywhere — Instagram, X/Twitter, WhatsApp, Discord, Slack, email, and any platform that supports Unicode characters.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>How Unicode emojis work across devices</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Emojis are part of the Unicode standard, which means they are recognized by every modern operating system and browser. When you copy an emoji from this picker, you are copying a Unicode character, not an image. Each platform renders it using its own emoji font, so the same smiley might look slightly different on Apple, Google, or Samsung devices, but the meaning stays the same and it always displays correctly.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Finding the right emoji quickly</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The search bar filters emojis by descriptive keywords, so typing "fire" or "celebration" narrows the grid to relevant options immediately. Category tabs let you jump between groups without scrolling through the entire set. This is faster than using your phone keyboard or operating system emoji panel, especially when you are writing on a desktop and need to add emojis to social media posts, emails, or documents.
          </p>

          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Pair your emojis with stylish text using the <a href="/fancy-text" style={{ color: '#FF6B35', textDecoration: 'underline' }}>fancy text generator</a> for Unicode font styles. If you need to adjust the capitalization of your text before adding emojis, the <a href="/case-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>case converter</a> handles that in one click.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}

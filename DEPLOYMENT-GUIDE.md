# TOOLSTACK — Deployment Guide

## What's Inside

6 fully built, production-ready tools + homepage + sitemap + SEO:

| Tool | Path | Monthly Searches |
|------|------|-----------------|
| Homepage | / | (hub) |
| Fancy Text Generator | /fancy-text | 4,000,000+ |
| QR Code Generator | /qr-generator | 5,200,000+ |
| Password Generator | /password-generator | 3,100,000+ |
| Word & Character Counter | /word-counter | 2,800,000+ |
| JSON Formatter & Validator | /json-formatter | 1,500,000+ |
| Text Case Converter | /case-converter | 1,200,000+ |
| **TOTAL** | | **17,800,000+** |

All 6 tools are pure client-side. Zero API calls. Zero backend.
Everything runs in the user's browser.

---

## Deploy in 10 Minutes

### Step 1: Extract the project
```bash
mkdir toolstack && cd toolstack
tar -xzf toolstack-project.tar.gz
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Test locally
```bash
npm run dev
# Open http://localhost:3000
# Click through all 6 tools — everything should work
```

### Step 4: Create a GitHub repo
```bash
git init
git add .
git commit -m "Initial: 6 tools live"
git remote add origin https://github.com/YOUR_USERNAME/toolstack.git
git push -u origin main
```

### Step 5: Deploy on Vercel (free)
1. Go to vercel.com → Sign in with GitHub
2. Click "Import Project" → Select your toolstack repo
3. Click "Deploy" — Vercel auto-detects Next.js
4. Wait ~60 seconds → Your site is live at toolstack.vercel.app

### Step 6: Add custom domain
1. Buy a domain: toolstack.dev, quicktools.app, or similar (~€10)
2. In Vercel dashboard → Settings → Domains → Add domain
3. Update DNS records as Vercel instructs
4. Wait 5-10 minutes for propagation

### Step 7: Update domain in code
Find and replace these 2 lines:
- `app/layout.tsx` line 6: change `https://toolstack.dev` to your domain
- `app/sitemap.ts` line 3: change `https://toolstack.dev` to your domain
- `app/robots.ts` line 5: change `https://toolstack.dev` to your domain

Push the changes:
```bash
git add . && git commit -m "Update domain" && git push
```
Vercel auto-deploys on push.

### Step 8: Submit to Google Search Console
1. Go to search.google.com/search-console
2. Add your domain as a property
3. Verify ownership (Vercel makes this easy with DNS)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Google starts crawling within 24-48 hours

---

## Add AdSense (When You Have Traffic)

1. Sign up at adsense.google.com
2. Get approved (needs ~50-100 daily visitors, takes 1-7 days)
3. Get your `ca-pub-XXXXXXX` code
4. Uncomment the AdSense script in `app/layout.tsx` (line 13)
5. Add ad units in strategic positions:
   - One leaderboard (728x90) above each tool
   - One rectangle (300x250) in the results/output area
6. Push to GitHub → Vercel auto-deploys → Ads go live

---

## What to Build Next (Priority Order)

### This week:
- [ ] Unit Converter (/unit-converter) — 3.2M searches
- [ ] Image Compressor (/image-compressor) — 2M searches
- [ ] Lorem Ipsum Generator (/lorem-generator) — 1.5M searches

### Next week:
- [ ] CSS Gradient Generator (/gradient-generator) — 800K
- [ ] Emoji Picker (/emoji) — 900K
- [ ] Timezone Converter (/timezone) — 2.1M
- [ ] Text Diff Checker (/diff-checker) — 600K

### Week 3:
- [ ] Base64 Encoder/Decoder (/base64) — 700K
- [ ] Hash Generator (/hash-generator) — 800K
- [ ] Regex Tester (/regex) — 600K
- [ ] Markdown Editor (/markdown) — 500K

### Week 4:
- [ ] Favicon Generator (/favicon) — 400K
- [ ] Screenshot Mockup (/mockup) — 300K
- [ ] Color Palette Extractor (Chrome Extension)

### For each new tool:
1. Create `app/[tool-name]/page.tsx` (metadata)
2. Create `app/[tool-name]/client.tsx` (the tool)
3. Add it to the TOOLS array in `app/page.tsx` (homepage)
4. Add it to the TOOLS_NAV array in `components/ToolShell.tsx` (cross-links)
5. Add it to `app/sitemap.ts`
6. `git push` → Vercel deploys automatically

---

## Niche Pages (SEO Multiplier)

For each tool, create keyword-specific landing pages.
Same tool code, different page title and description.

Example for Fancy Text:
```
app/instagram-fonts/page.tsx → "Instagram Fonts Generator — Cool Bio Fonts"
app/cursive-text/page.tsx → "Cursive Text Generator — Free Fancy Cursive Font"
app/bold-text/page.tsx → "Bold Text Generator — Bold Unicode Letters"
```

Each page imports the same `FancyTextClient` component but has unique SEO metadata.
5 minutes per page. Each captures 100K-500K monthly searches.

---

## The File Structure at Scale

```
toolstack/
├── app/
│   ├── layout.tsx                 ← Global layout + AdSense
│   ├── page.tsx                   ← Homepage
│   ├── sitemap.ts                 ← Auto-generated sitemap
│   ├── robots.ts                  ← Search engine rules
│   ├── fancy-text/                ← Tool #1
│   │   ├── page.tsx (metadata)
│   │   └── client.tsx (tool)
│   ├── qr-generator/             ← Tool #2
│   ├── password-generator/        ← Tool #3
│   ├── word-counter/             ← Tool #4
│   ├── json-formatter/           ← Tool #5
│   ├── case-converter/           ← Tool #6
│   ├── instagram-fonts/          ← Niche page (reuses fancy-text)
│   ├── cursive-text/             ← Niche page
│   └── ... (14 more tools + niche pages)
├── components/
│   └── ToolShell.tsx             ← Shared nav + cross-promotion footer
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## You're Live. Now What?

Day 1 (today): Deploy. Submit sitemap. Done.
Day 2-7: Build 3 more tools.
Day 8-14: Build 3 more tools.
Day 15-30: Add niche pages for all tools.
Month 2: Apply for AdSense.
Month 3: First revenue.
Month 6: €2,000-5,000/month.
Month 12: €10,000-20,000/month.

Cost: €10/year (domain). Everything else is free.

Go.

# Cloud Hak — Complete Website Build (8 Services + Individual Service Pages)

## Overview
You are building a **complete, production-ready website** for Cloud Hak, an AI agency based in Brighton & Hove, UK. The site currently has a working homepage (index.html) with CSS/JS. Your job is to:

1. **Update the existing homepage** — add AEO and CRM Setup & Management to services, update email to info@cloud-hak.com
2. **Create 8 individual service pages** — one dedicated page per service under `/services/<slug>/`
3. **Full SEO + AEO optimisation** on every page — structured data, meta tags, FAQ schema, semantic HTML

## Brand Identity
- **Company:** Cloud Hak — AI-powered growth for local business
- **Location:** Brighton & Hove, East Sussex, England, UK
- **Website:** cloud-hak.com
- **Email:** info@cloud-hak.com (UPDATE everywhere — currently says hello@cloud-hak.com)
- **Phone:** +44 1273 000000
- **Hours:** Mon–Fri, 9am–6pm BST

## Design System — Apply These EXACT Tokens

### Colors
```
--cream:        #f6f3ed    (main background)
--cream-2:      #efeae1    (section backgrounds)
--cream-3:      #e6e0d4    (borders, dividers)
--paper:        #fbf9f4    (card backgrounds)
--ink:          #0a1a3a    (primary text, dark navy)
--ink-2:        #1a2a4d    (secondary text)
--ink-3:        #2a3a5d    (tertiary text)
--muted:        #5a6378    (body text, descriptions)
--muted-2:      #8a91a3    (labels, subtle text)
--copper:       #c08552    (accent colour — CTAs, highlights, eyebrows)
--copper-2:     #a06a3a    (darker copper for hover)
--champagne:    #d9b97a    (warm gold accent)
--live:         #2d8a4a    (status green)
```

### Typography
- **Display/Headlines:** Fraunces (Google Fonts) — `font-family: 'Fraunces', serif` — weight 400–600
- **Body Text:** Inter — `font-family: 'Inter', sans-serif` — weights 400, 500, 600
- **Monospace/Labels:** JetBrains Mono — `font-family: 'JetBrains Mono', monospace` — weights 400, 500, 600
- Google Fonts link: `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..600,0,0..1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap`

### Layout
- Max width: 1280px
- Gutters: clamp(20px, 4vw, 56px)
- Section padding: clamp(64px, 9vw, 128px) 0
- Border radius: 4px (small), 8px (default), 14px (large)
- Transitions: cubic-bezier(.2,.7,.2,1)

### Component Patterns (from existing CSS)
- **Eyebrow labels:** `font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper);` with `::before { content: "//" }`
- **Service cards:** Grid with 1px borders between cards, hover to var(--paper) background
- **Buttons:** Uppercase mono text with arrow suffix (`→`), `.btn-primary` (navy bg, cream text), `.btn-ghost` (outlined)
- **Reveal animations:** `.reveal` class with IntersectionObserver (already in main.js)
- **Terminal accents:** Code-block style panels for tech/process descriptions

## CRITICAL RULES
1. **Use the existing CSS file** (`assets/css/main.css`) as-is — do NOT modify it. All service page styles must use the existing design tokens and classes.
2. **Share ONE CSS file and ONE JS file** across all pages — linked via relative paths (e.g. `../assets/css/main.css` from service pages)
3. **Every service page MUST look like it belongs to the same site** — same header, footer, announce bar, fonts, colours, spacing
4. **Mobile-first responsive** — all pages must work beautifully on phones (375px+)
5. **No external dependencies** — no CDN JS libraries, no images (unless SVG inline), no icon fonts
6. **Phone numbers must NOT be masked** — use the full +44 1273 000000 everywhere
7. **Email is info@cloud-hak.com** — replace ALL instances of hello@cloud-hak.com

---

## PART 1: Homepage Updates

Update `index.html` with these changes:

### 1a. Update Email
Replace ALL instances of `hello@cloud-hak.com` with `info@cloud-hak.com`

### 1b. Update Services Section (8 services total)
Replace the current 8 service cards with these 8 services (in this order):

| # | Title | Slug | Short Description | Pills |
|---|-------|------|-------------------|-------|
| 01 | Web Design & Development | websites | Fast, mobile-first websites that convert visitors into customers. No templates, no bloat. | WordPress · GoHighLevel · Static |
| 02 | AI Chatbots | chatbots | A 24/7 assistant on your website that answers questions, qualifies leads, and books appointments while you sleep. | Website chat · WhatsApp · Custom trained |
| 03 | AI Voice Agents | voice-agents | Never miss a call again. AI answers, qualifies, and routes callers to the right place. | Inbound · Outbound · CRM-routed |
| 04 | SEO | seo | Get found on Google when local customers search for what you sell. We focus on calls and bookings, not vanity metrics. | Local SEO · Google Business · Technical |
| 05 | AEO (Answer Engine Optimisation) | aeo | Make your business the answer AI assistants quote. Optimise for ChatGPT, Gemini, and voice search results. | AI citations · Structured data · FAQ schema |
| 06 | Google & Social Ads | ads | Paid campaigns that actually pay for themselves. We track real revenue, not just clicks. | Google Ads · Meta Ads · Retargeting |
| 07 | Automation | automation | Connect your tools so leads stop falling through the cracks. Forms, calendars, CRM, and ads all talking to each other. | Zapier · GHL · Workflows |
| 08 | CRM Setup & Management | crm | Get a CRM that actually works for your business. We set up, customise, and manage your customer relationship system so nothing falls through the cracks. | GoHighLevel · Pipelines · Reporting |

### 1c. Update Service Cards to Link to Service Pages
Each service card's `<h3>` title should be a link to the corresponding service page:
- `01 → services/websites/index.html`
- `02 → services/chatbots/index.html`
- `03 → services/voice-agents/index.html`
- `04 → services/seo/index.html`
- `05 → services/aeo/index.html`
- `06 → services/ads/index.html`
- `07 → services/automation/index.html`
- `08 → services/crm/index.html`

### 1d. Update Terminal Panel
Update the hero terminal to list all 8 services:
```
01  web-design      ● ready
02  ai-chatbots     ● ready
03  ai-voice        ● ready
04  seo             ● ready
05  aeo             ● ready
06  ads             ● ready
07  automation      ● ready
08  crm-setup       ● ready
```

### 1e. Update Marquee
Update the hero marquee to: Web Design · AI Chatbots · AI Voice · SEO · AEO · Ads · Automation · CRM

### 1f. Update Footer
Update the Services column to link to all 8 service pages.

### 1g. Update Form Checkbox Options
Add "AEO" and "CRM Setup" to the intake form service checkboxes. Remove "Analytics" (replaced by CRM).

### 1h. Update JSON-LD Structured Data
Update the LocalBusiness schema to include info@cloud-hak.com and add a `hasOfferCatalog` listing all 8 services.

---

## PART 2: Service Pages (8 pages)

Create these files:
```
services/websites/index.html
services/chatbots/index.html
services/voice-agents/index.html
services/seo/index.html
services/aeo/index.html
services/ads/index.html
services/automation/index.html
services/crm/index.html
```

### Shared Service Page Structure
Every service page must have:

1. **Announce bar** — identical to homepage
2. **Header/nav** — identical to homepage (but "Services" nav link becomes a dropdown or links to #services on homepage)
3. **Service hero section** — large title, eyebrow label with service number, one-paragraph description, CTA button linking to #intake on homepage (use `../../index.html#intake`)
4. **"What is [Service]?" section** — 2-3 paragraphs explaining the service in plain English for a local business owner who may not be technical
5. **"How it works" section** — 3-4 step process with numbered steps (01_discover, 02_implement, etc. pattern matching the existing approach section style)
6. **"What you get" section** — specific deliverables in a list/grid format with checkmarks
7. **"Who is this for?" section** — types of businesses that benefit most (bullet list)
8. **FAQ section** — 4-6 questions with natural, conversational answers. Each FAQ must use `<details>/<summary>` HTML for interactivity AND include FAQPage schema markup in JSON-LD
9. **CTA section** — "Ready to get started?" with link back to homepage intake form
10. **Footer** — identical to homepage (with updated email and service links)
11. **JSON-LD structured data** — Service schema + FAQPage schema in `<head>`

### SEO Requirements for Every Page
- Unique `<title>` tag: "Cloud Hak | [Service Name] — Brighton & Hove AI Agency"
- Unique `<meta name="description">` — 150-160 chars, includes service name + Brighton location
- Open Graph tags (og:title, og:description, og:type, og:url)
- Canonical URL: `https://cloud-hak.com/services/[slug]/`
- `<link rel="canonical">` tag
- JSON-LD `Service` schema with name, description, provider, areaServed
- JSON-LD `FAQPage` schema with all Q&As
- Semantic HTML: `<article>`, `<section>`, proper heading hierarchy (one `<h1>`, then `<h2>`, `<h3>`)
- Internal links to other relevant services

### AEO (Answer Engine Optimisation) Requirements for Every Page
- Write in **natural, conversational language** — the kind of text an AI assistant would quote directly
- Answer the "What is [service]?" question in the first paragraph clearly and directly
- Use **question-and-answer format** in FAQs with complete, self-contained answers
- Include **definitions** and **explanations** that AI models can extract as facts
- Each FAQ answer should be 2-4 sentences — long enough to be informative, short enough to be quotable
- Use **"is" statements** ("AEO is the practice of…" not "AEO can be thought of as…")
- Include specific, concrete details (prices ranges, timeframes, tools used)
- Cross-reference related services naturally in the text

### Per-Service Content Specifications

#### 1. Web Design & Development (`services/websites/`)
- **What it is:** Custom website design and development for local businesses
- **How it works:** Discovery call → Design mockup → Development → Launch → Ongoing support
- **What you get:** Responsive website, contact form, Google Analytics, SSL, basic SEO setup, 30-day post-launch support
- **Who it's for:** New businesses needing their first site, established businesses with outdated sites, businesses switching from DIY builders
- **FAQs:** How long does it take? (2-4 weeks typical), Do you use templates? (No, custom builds), What platform? (WordPress, GoHighLevel, or static HTML depending on needs), Do you handle hosting? (Yes, we can), How much does a website cost? (From £1,500 depending on scope), What about ongoing maintenance? (Optional retainer available)
- **Related services:** SEO, AEO, Chatbots

#### 2. AI Chatbots (`services/chatbots/`)
- **What it is:** Custom AI-powered chatbots trained on your business to answer customer questions, qualify leads, and book appointments 24/7
- **How it works:** Discovery & training data collection → Bot building & training → Testing → Deployment → Monitoring & optimisation
- **What you get:** Custom-trained AI chatbot, website widget integration, WhatsApp integration (optional), lead qualification flows, appointment booking, monthly performance report
- **Who it's for:** Businesses that get repetitive questions, businesses missing leads outside business hours, service businesses that rely on appointments
- **FAQs:** How does the AI learn about my business? (We train it on your website, FAQs, and business documents), Can it book appointments? (Yes, integrates with your calendar), Does it work on WhatsApp? (Yes), What if it gives a wrong answer? (We monitor and retrain; complex queries route to you), How much does it cost? (From £500 setup + £50/month), Can I see it in action? (Yes, we'll build a demo)
- **Related services:** Voice Agents, Automation, CRM

#### 3. AI Voice Agents (`services/voice-agents/`)
- **What it is:** AI-powered phone answering that handles inbound calls, qualifies callers, and routes them to the right person — so you never miss a call
- **How it works:** Call flow design → Voice AI setup & training → Testing with real scenarios → Go live → Ongoing optimisation
- **What you get:** Custom AI voice agent, inbound call handling, call routing & transfers, CRM integration, voicemail transcription, call analytics dashboard
- **Who it's for:** Businesses missing calls during busy periods, businesses that want after-hours call handling, clinics and service businesses with high call volume
- **FAQs:** Does it sound like a robot? (Modern AI voices are natural and conversational), Can it transfer calls to me? (Yes, when needed), What happens if the caller gets frustrated? (We design graceful handoffs to a human), Does it work with my existing phone number? (Yes, we can forward your existing number), How much does it cost? (From £300 setup + usage-based pricing), Can it handle outbound calls too? (Yes, for appointment reminders and follow-ups)
- **Related services:** Chatbots, Automation, CRM

#### 4. SEO (`services/seo/`)
- **What it is:** Search Engine Optimisation that helps your business appear when local customers search Google for what you offer
- **How it works:** SEO audit → Keyword & competitor research → On-page optimisation → Content strategy → Google Business Profile optimisation → Monthly reporting
- **What you get:** Technical SEO audit, keyword strategy, on-page optimisation, Google Business Profile setup/optimisation, local citation building, monthly ranking reports
- **Who it's for:** Businesses not showing up on Google, businesses relying on word-of-mouth who want more online visibility, businesses with a website that gets no traffic
- **FAQs:** How long does SEO take? (3-6 months for meaningful results), Do you guarantee page 1? (No ethical SEO provider can — but we focus on real results like calls and bookings), What's the difference between SEO and AEO? (SEO targets Google search results; AEO targets AI assistants like ChatGPT and Gemini), How much does SEO cost? (From £300/month), Do I need SEO if I have a new website? (Yes — a website without SEO is like opening a shop in a dark alley), What about Google Ads? (We do both — SEO is long-term, Ads are immediate)
- **Related services:** AEO, Websites, Ads

#### 5. AEO — Answer Engine Optimisation (`services/aeo/`)
- **What it is:** Answer Engine Optimisation (AEO) is the practice of making your business the source that AI assistants like ChatGPT, Gemini, and Alexa quote when people ask about your services. It's SEO for the AI era.
- **How it works:** Content audit → Identify answerable questions → Create structured, quotable content → Add FAQ schema and structured data → Monitor AI citations → Refine and expand
- **What you get:** AEO content strategy, structured FAQ content with schema markup, conversational content optimisation, citation monitoring, monthly AEO performance report
- **Who it's for:** Businesses wanting to appear in AI-generated answers, businesses in competitive local markets, professional services and healthcare providers
- **FAQs:** What is AEO? (Answer Engine Optimisation is the practice of structuring your website content so AI assistants like ChatGPT and Google's AI Overviews quote your business when answering relevant questions), Is AEO replacing SEO? (No — AEO complements SEO. SEO targets search engines; AEO targets AI answer engines. You need both), How do you measure AEO success? (We track AI citations, featured snippet appearances, and organic traffic from AI-generated answers), How quickly does AEO work? (2-4 months for initial AI citations), How much does AEO cost? (From £200/month as an add-on to SEO, or £400/month standalone), What's structured data? (Code on your website that helps AI and search engines understand your content — like FAQ schema, business schema, and service schema)
- **Related services:** SEO, Websites, Content & Copy

#### 6. Google & Social Ads (`services/ads/`)
- **What it is:** Managed Google Ads and social media advertising that generates real leads and customers, not just clicks and impressions
- **How it works:** Business & audience research → Campaign strategy → Ad creation → Launch → Daily monitoring → Monthly optimisation & reporting
- **What you get:** Google Ads campaign setup, Meta (Facebook/Instagram) ads, ad copy and creative, landing page optimisation, conversion tracking, monthly ROI report
- **Who it's for:** Businesses wanting immediate visibility on Google, businesses with a service people actively search for, businesses wanting to retarget website visitors
- **FAQs:** How much should I spend on ads? (We recommend starting from £500/month ad spend + our management fee), Do you create the ad images? (Yes, we handle all creative), How do you track results? (We track calls, form submissions, and revenue — not just clicks), What's the minimum contract? (3 months — enough to optimise and see real results), Can I just run Google Ads myself? (You can, but most businesses waste 30-40% of their budget without expert management), What ROI can I expect? (Varies by industry, but we aim for 3-5x return on ad spend)
- **Related services:** SEO, AEO, Automation

#### 7. Automation (`services/automation/`)
- **What it is:** Connecting your business tools so they talk to each other automatically — no more manual data entry, missed follow-ups, or leads falling through the cracks
- **How it works:** Process audit → Workflow design → Integration setup → Testing → Launch → Ongoing monitoring
- **What you get:** Workflow automation setup, tool integration (CRM, calendar, email, forms), lead routing automation, follow-up sequences, notification setup, process documentation
- **Who it's for:** Businesses using multiple tools that don't connect, businesses losing leads because of slow follow-up, businesses spending hours on manual admin tasks
- **FAQs:** What tools do you integrate? (GoHighLevel, Google Workspace, Calendly, Stripe, Zapier, and many more), What's GoHighLevel? (An all-in-one CRM and marketing platform — we're specialists), Can you automate my email marketing? (Yes — sequences, drip campaigns, and follow-ups), How long does setup take? (1-3 weeks depending on complexity), How much does automation cost? (From £500 for a single workflow, £1,500+ for full system setup), What if something breaks? (We monitor and fix issues as part of our retainer)
- **Related services:** CRM, Chatbots, Voice Agents

#### 8. CRM Setup & Management (`services/crm/`)
- **What it is:** We set up, customise, and manage a CRM system tailored to your business so you can track every lead, nurture every customer, and never lose track of a conversation
- **How it works:** Needs assessment → CRM selection & setup → Pipeline configuration → Data migration → Team training → Ongoing management & optimisation
- **What you get:** Fully configured CRM, custom pipelines and stages, automated lead scoring, email and SMS templates, reporting dashboard, team onboarding, ongoing support
- **Who it's for:** Businesses using spreadsheets to track leads, businesses with sales processes that rely on memory, growing businesses that need to systematise their customer management
- **FAQs:** What CRM do you recommend? (GoHighLevel for most small businesses — it replaces multiple tools), Do you migrate data from my old system? (Yes, we handle full data migration), Will my team need training? (Yes — we include onboarding sessions), Can the CRM automate follow-ups? (Yes — emails, SMS, and task reminders), How much does CRM setup cost? (From £1,000 for setup + £100/month management), Do I need a CRM if I'm a solo business? (If you have more than 10 leads a month, yes — it pays for itself in saved time and won deals)
- **Related services:** Automation, Chatbots, Voice Agents

---

## PART 3: Technical Requirements

### File Structure
```
/
├── index.html (UPDATED homepage)
├── assets/
│   ├── css/main.css (UNCHANGED — do not modify)
│   └── js/main.js (UNCHANGED — do not modify)
├── services/
│   ├── websites/index.html
│   ├── chatbots/index.html
│   ├── voice-agents/index.html
│   ├── seo/index.html
│   ├── aeo/index.html
│   ├── ads/index.html
│   ├── automation/index.html
│   └── crm/index.html
```

### Asset Paths from Service Pages
- CSS: `../../assets/css/main.css`
- JS: `../../assets/js/main.js`
- Homepage link: `../../index.html`
- Other service pages: `../<slug>/`

### JSON-LD for Each Service Page
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name]",
  "description": "[Service description]",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Cloud Hak",
    "url": "https://cloud-hak.com",
    "telephone": "+44 1273 000000",
    "email": "info@cloud-hak.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brighton & Hove",
      "addressRegion": "East Sussex",
      "addressCountry": "GB"
    }
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 50.8225,
      "longitude": -0.1372
    },
    "geoRadius": "50000"
  }
}
```

Plus FAQPage schema:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

### Navigation on Service Pages
- Brand/logo links back to `../../index.html`
- Nav links: Services (links to ../../index.html#services), Approach (../../index.html#approach), Contact (../../index.html#contact)
- Phone number in header (same as homepage)
- Breadcrumb: Home > Services > [Service Name] at the top of the page

### Mobile Navigation
Service pages must work on mobile. Since main.js handles the homepage scroll behaviour, ensure service pages still use the shared JS file. You can add a small inline `<script>` at the bottom of each service page if needed for mobile menu toggle (if the existing JS doesn't handle it).

---

## PART 4: Quality Checklist
Before finishing, verify:
- [ ] Every page has unique title and meta description
- [ ] Every page has canonical URL
- [ ] Every page has JSON-LD (Service + FAQPage)
- [ ] All internal links work (no broken relative paths)
- [ ] Email is info@cloud-hak.com everywhere (check header, footer, JSON-LD, contact sections)
- [ ] Phone numbers are NOT masked (full +44 1273 000000)
- [ ] All 8 service cards on homepage link to their respective pages
- [ ] Footer service links updated to all 8
- [ ] Form checkboxes include AEO and CRM, exclude Analytics
- [ ] Terminal panel lists all 8 services
- [ ] Marquee lists all 8 services
- [ ] Every FAQ uses <details>/<summary> for accessibility
- [ ] Content is written for local business owners (plain English, no jargon)
- [ ] AEO-optimised content (direct answers, quotable sentences, "is" statements)
- [ ] Mobile responsive (test viewport 375px)

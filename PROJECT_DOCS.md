# SMBify Agency — Complete Project Documentation

> Single-file reference for AI agents and developers to understand the full project.
> Last updated: 2026-03-18

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Directory Structure](#3-directory-structure)
4. [Core Configuration Files](#4-core-configuration-files)
5. [HTML Pages Reference](#5-html-pages-reference)
6. [CSS Architecture](#6-css-architecture)
7. [JavaScript Architecture](#7-javascript-architecture)
8. [API / Serverless Functions](#8-api--serverless-functions)
9. [Include Templates](#9-include-templates)
10. [Assets](#10-assets)
11. [Python Build Scripts](#11-python-build-scripts)
12. [Agent Workflows](#12-agent-workflows)
13. [SEO & Structured Data](#13-seo--structured-data)
14. [Payment & Checkout Flow](#14-payment--checkout-flow)
15. [Blog System](#15-blog-system)
16. [Chatbot System](#16-chatbot-system)
17. [Generated Citation Pages](#17-generated-citation-pages)
18. [Deployment](#18-deployment)
19. [Environment Variables](#19-environment-variables)
20. [Business & Contact Info](#20-business--contact-info)

---

## 1. Project Overview

**SMBify Agency** is a full-featured white-label SEO services website targeting small-to-medium businesses (SMBs). It is a static-first site with serverless API endpoints for interactive features (payments, chat). There are no frontend frameworks — everything is vanilla HTML, CSS, and JavaScript.

| Property | Value |
|----------|-------|
| Live URL | https://www.smbify.net |
| Repository | https://github.com/smbifyagency/SMBify-Agency |
| Hosting | Vercel |
| Contact | contact@smbify.net |
| WhatsApp | +92-306-6050256 |

### What the site does

- **Sells SEO services** (Local SEO, backlinks, citations, guest posts, press releases, etc.) with Stripe-powered checkout on each service page
- **Showcases portfolio** with before/after case studies for local business clients
- **Publishes blog content** via a JavaScript-powered blog database (no CMS)
- **Provides free SEO tools** (calculators, generators, checkers) in the `/resources/` section to attract organic traffic
- **Auto-generates citation pages** for 195 countries and 57 industries as SEO landing pages
- **AI chatbot** (OpenAI GPT-4o via Vercel serverless) + fallback rule-based bot for sales support

---

## 2. Technology Stack

### Frontend
| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, grid, flexbox, animations |
| Scripting | Vanilla JavaScript (ES6+, no frameworks) |
| Fonts | Google Fonts: Inter (body), Outfit (headings) |

### Backend / Services
| Service | Purpose |
|---------|---------|
| Vercel | Hosting + serverless API functions |
| Stripe | Payment processing / checkout sessions |
| OpenAI API (GPT-4o) | Chatbot AI responses |
| Supabase | Order/database storage (configured, verify if active) |
| Web3Forms | Contact form submissions (no-server form handling) |
| Google Analytics | `G-2ZEXKVH0S5` |
| Google Search Console | Site verified |

### Tooling
| Tool | Purpose |
|------|---------|
| Git / GitHub | Version control |
| VS Code | Editor (`.vscode/settings.json` present) |
| Python 3 | Build scripts for generating and syncing pages |

---

## 3. Directory Structure

```
SMBify Agency/
│
├── .agent/workflows/               # AI agent task guides
│   ├── create-new-page.md
│   ├── create-blog-post.md
│   └── deploy-to-hostinger.md
│
├── api/                            # Vercel serverless functions
│   ├── chat.js                     # OpenAI chat endpoint
│   ├── create-checkout-session.js  # Stripe checkout
│   └── save-order.js               # Order persistence
│
├── assets/                         # Static media
│   ├── blog/                       # 8 blog featured images
│   ├── portfolio/                  # 7 portfolio images
│   ├── favicon.png
│   ├── logo-dark.png
│   ├── logo-light.png
│   ├── og-image.jpg
│   └── [Team photos: hero images, team-*.jpg/jpeg]
│
├── blog-categories/                # 8 blog category landing pages
│   ├── ai-automation.html
│   ├── gbp-optimization.html
│   ├── growth-breakdowns.html
│   ├── lead-generation.html
│   ├── local-seo-strategies.html
│   ├── niche-marketing.html
│   ├── reviews-trust.html
│   └── website-optimization.html
│
├── css/
│   ├── styles.css                  # 105KB — global styles
│   └── product-page.css            # 20KB — service/product page styles
│
├── includes/                       # Shared HTML partials
│   ├── header-template.html
│   └── footer-template.html
│
├── js/
│   ├── main.js                     # 27KB — core app logic
│   ├── blog-db.js                  # 535KB — blog posts database
│   ├── chatbot.js                  # 27KB — chat widget
│   ├── reviews.js                  # 5KB — Google reviews renderer
│   └── global-cta.js               # 2.8KB — CTA injector (mostly superseded by main.js)
│
├── portfolio/                      # 4 client case study pages
│   ├── prime-plumbing.html
│   ├── cleaning-caddy.html
│   ├── hometown-ductcleaning.html
│   └── raleigh-roofpro.html
│
├── resources/                      # 10 interactive SEO tools
│   ├── seo-margin-calculator.html
│   ├── seo-roi-calculator.html
│   ├── ads-vs-seo-calculator.html
│   ├── citation-health-checker.html
│   ├── citation-consistency-checker.html
│   ├── gmb-category-finder.html
│   ├── robots-txt-generator.html
│   ├── sitemap-generator.html
│   ├── schema-markup-generator.html
│   └── seo-geo-tag-image-tool.html
│
├── services/                       # 13 service/product pages
│   ├── local-seo-service.html      # PRIMARY service page
│   ├── brand-mentions.html
│   ├── cloud-stack-backlinks.html
│   ├── forum-backlinks.html
│   ├── foundational-backlinks.html
│   ├── google-entity-stack.html
│   ├── local-citations.html
│   ├── local-seo-intake.html
│   ├── premium-guest-posting.html
│   ├── press-release.html
│   ├── social-signals.html
│   ├── web2-map-embeds.html
│   └── website-design.html
│
├── [252 generated citation pages]  # Auto-generated SEO landing pages
│   ├── *-local-citations.html      # 195 country-specific pages
│   └── *-category-citations.html   # 57 industry-specific pages
│
├── [20 Python build scripts]       # Site generation utilities
│
├── index.html                      # Homepage
├── about.html
├── team.html
├── services.html
├── portfolio.html
├── blog-category.html
├── contacts.html
├── terms.html
├── privacy-policy.html
├── sitemap-html.html
├── 404.html
│
├── vercel.json                     # Vercel deployment config
├── robots.txt
├── .htaccess                       # Apache server config
├── .env.example                    # Environment variable template
├── package.json
└── .gitignore
```

**Total page count**: 269+ HTML files (13 services + 8 blog categories + 4 portfolio + 10 resources + 252 generated citation pages + 11 core pages)

---

## 4. Core Configuration Files

### `vercel.json`
- Strips `.html` extensions (clean URLs)
- Permanent redirects: trailing slashes, `/index` → `/`
- Marketplace route rewrites
- Security headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### `robots.txt`
- `User-agent: *` — allows all crawlers
- Disallow: `/admin-login.html`, `/admin-blog.html`, `/marketplace/admin/`
- Sitemap: `https://www.smbify.net/sitemap.xml`

### `.htaccess`
Apache URL rewriting and redirect rules (legacy/Hostinger deployment support).

### `package.json`
```json
{
  "name": "smbify-agency",
  "version": "1.0.0",
  "type": "commonjs",
  "dependencies": {
    "openai": "^6.16.0",
    "stripe": "^20.1.0"
  }
}
```

---

## 5. HTML Pages Reference

### Core Pages

| File | Purpose | Notes |
|------|---------|-------|
| `index.html` | Homepage | Hero, R.A.N.K. methodology section, blog grid, CTA |
| `about.html` | Company story & mission | |
| `team.html` | Team member bios + photos | |
| `services.html` | Service catalog | 4-column grid of all offerings |
| `portfolio.html` | Case study index | Links to `/portfolio/` pages |
| `blog-category.html` | Blog category landing | Dynamic — renders from `blog-db.js` |
| `contacts.html` | Contact form | Web3Forms integration; **no global CTA** (intentional) |
| `terms.html` | Terms of service | |
| `privacy-policy.html` | Privacy policy | |
| `sitemap-html.html` | HTML sitemap | Human-readable site index |
| `404.html` | Custom 404 page | |

### Service Pages (`/services/`)

| File | Service | Pricing |
|------|---------|---------|
| `local-seo-service.html` | Local SEO (primary) | Basic $299/mo, Pro $499/mo, Advanced $799/mo |
| `foundational-backlinks.html` | Foundational backlinks | Starter $99, Growth $199, Authority $299 |
| `google-entity-stack.html` | Google Entity Stack | $49 flat |
| `local-citations.html` | Local citations | $1+ per citation (quantity slider) |
| `social-signals.html` | Social signals | Starting at $49 |
| `press-release.html` | Press release distribution | 4 tiers: $149–$599 |
| `website-design.html` | Web design | WordPress $200, Custom HTML $400 |
| `premium-guest-posting.html` | Guest posts | Starting at $150 |
| `brand-mentions.html` | Brand mentions | — |
| `cloud-stack-backlinks.html` | Cloud stack backlinks | — |
| `forum-backlinks.html` | Forum backlinks | — |
| `web2-map-embeds.html` | Web2 map embeds | — |
| `local-seo-intake.html` | Client intake form | — |

### Portfolio Case Studies (`/portfolio/`)

| File | Client |
|------|--------|
| `prime-plumbing.html` | Prime Plumbing |
| `cleaning-caddy.html` | Cleaning Caddy |
| `hometown-ductcleaning.html` | Hometown Duct Cleaning |
| `raleigh-roofpro.html` | Raleigh Roof Pro |

### Resource Tools (`/resources/`)

| File | Tool |
|------|------|
| `seo-margin-calculator.html` | SEO margin/profit calculator |
| `seo-roi-calculator.html` | SEO ROI calculator |
| `ads-vs-seo-calculator.html` | PPC vs SEO comparison |
| `citation-health-checker.html` | Citation consistency checker |
| `citation-consistency-checker.html` | Citation consistency checker (v2) |
| `gmb-category-finder.html` | Google Business Profile category finder with related suggestions |
| `robots-txt-generator.html` | robots.txt builder |
| `sitemap-generator.html` | XML sitemap generator |
| `schema-markup-generator.html` | JSON-LD schema generator |
| `seo-geo-tag-image-tool.html` | Image geo-tagging tool |

### Blog Categories (`/blog-categories/`)

`ai-automation.html`, `gbp-optimization.html`, `growth-breakdowns.html`, `lead-generation.html`, `local-seo-strategies.html`, `niche-marketing.html`, `reviews-trust.html`, `website-optimization.html`

---

## 6. CSS Architecture

### `css/styles.css` (105KB) — Global Stylesheet

**Variables (CSS custom properties)**
- Brand: `--color-primary: #84CC16` (lime green), `--color-dark: #1E293B` (slate)
- Spacing scale, border radius, shadow levels
- Typography sizes
- Theme variables (override for `.dark-mode`)

**Themes**
- Default = light mode
- Dark mode via `.dark-mode` class on `<html>`
- Toggled by `ThemeManager` in `main.js`

**Component coverage**
- Header (sticky, mobile nav, theme toggle)
- Navigation (active states, dropdowns)
- Hero sections
- CTA sections (gradient: lime to teal)
- Blog grids (3-column, skeleton loaders)
- Service cards
- Forms and inputs
- Footer (multi-column)

**Breakpoints**
- `1200px` — tablet landscape
- `900px` — tablet portrait
- `600px` — mobile

### `css/product-page.css` (20KB) — Service Page Styles

Used exclusively on service/product pages. Covers:
- Order form layout (sidebar + main)
- Package selection (styled radio buttons)
- Quantity sliders
- Business details form sections
- Checkout sidebar summary
- Field validation states

---

## 7. JavaScript Architecture

### `js/main.js` (27KB) — Core Application

**Key responsibilities:**

| Module | What it does |
|--------|-------------|
| `ThemeManager` | Light/dark toggle; persists to `localStorage`; respects `prefers-color-scheme` |
| `MobileNav` | Hamburger menu open/close; dropdown submenus |
| Auto Header/Footer Injection | Fetches `/includes/header-template.html` and `/includes/footer-template.html` and injects into every page's `<header>` and `<footer>` elements |
| Auto CTA Injection | Injects the global CTA section before `<footer>` on all pages **except** those that opt out (e.g., `contacts.html`) |
| Page Detection | Sets `active` class on the current nav item |
| Scroll Animations | `IntersectionObserver`-based fade-in for elements with `.animate-on-scroll` |
| Window Resize | Handles responsive state changes |

**Opt-out for CTA injection**: Add `data-no-cta="true"` to `<body>` or ensure a `.cta-section` is already present.

### `js/blog-db.js` (535KB) — Blog Database

A giant JS file exporting an array of blog post objects. Each post has:
```js
{
  title: "...",
  slug: "...",
  category: "local-seo-strategies",
  excerpt: "...",           // used for search
  image: "../assets/blog/filename.jpg",
  content: "<full HTML>",
  published_at: "2025-01-15",
  author: "SMBify Team",
  read_time: "8 min read",
  url: "/blog/slug"
}
```

Used by blog category pages and blog search functionality.

### `js/chatbot.js` (27KB) — Chat Widget

- Floating chat bubble (bottom-right of all pages)
- **Primary mode**: Calls `/api/chat` (OpenAI GPT-4o) for AI responses
- **Fallback mode**: Rule-based keyword matching against a built-in SMBify knowledge base
- Sales handoff: Offers WhatsApp link for complex queries
- Greeting, placeholder, and title are configurable at the top of the file

### `js/reviews.js` (5KB) — Reviews Renderer

- Contains static Google reviews data (5-star, Dec 2025)
- Dynamically renders reviews into a `.reviews-container` element
- Uses static data because Google Places API key is not configured

### `js/global-cta.js` (2.8KB) — Legacy CTA Injector

Originally injected the CTA section before this was moved into `main.js`. Now largely redundant — do **not** add `<script src="../js/global-cta.js">` to new pages. The CTA is handled by `main.js`.

---

## 8. API / Serverless Functions

All live at `/api/` and are deployed as Vercel Edge/Serverless functions.

### `api/chat.js` — AI Chat Endpoint

```
POST /api/chat
Body: { messages: [{ role, content }] }
Response: { reply: "...", usage: {...} }
```

- Model: `gpt-4o`, max 500 tokens
- System prompt: SMBify sales assistant persona
- CORS enabled (all origins)

### `api/create-checkout-session.js` (236 lines) — Stripe Checkout

```
POST /api/create-checkout-session
Body: { serviceType, packageTier, quantity, businessDetails, ... }
Response: { sessionId, url }
```

**Pricing map** (authoritative source of truth for service prices):

| Service | Pricing Logic |
|---------|--------------|
| Local Citations | $1 per citation (quantity-based) |
| Social Signals | $1 per signal (quantity-based) |
| Local SEO | Basic $299, Pro $499, Advanced $799 (monthly) |
| Website Design | WordPress $200, Custom HTML $400 |
| Press Release | 4 tiers: $149 / $249 / $399 / $599 |
| Foundational Backlinks | Starter $99, Growth $199, Authority $299 |
| Google Entity Stack | $49 flat |

- Optional addon: Citations Audit (+$50)
- On success: redirects to success page with `?session_id=`
- Metadata stored on Stripe session for order tracking

### `api/save-order.js` — Order Storage

Persists order details to Supabase after checkout completion.

---

## 9. Include Templates

Both templates are loaded dynamically by `main.js` via `fetch()`. Every page must have a `<header>` and `<footer>` element for auto-injection to work.

### `includes/header-template.html`

- SMBify logo (light + dark variants, switches with theme)
- Main navigation:
  - Home, About, Our Team, Services (dropdown), Portfolio, Blog (dropdown), Resources (dropdown), Contacts
- Theme toggle button (sun ↔ moon icon)
- CTA buttons: "Local SEO Service" (primary), "Services" (secondary)
- Mobile hamburger toggle

### `includes/footer-template.html`

- Logo + brand tagline
- Social links: LinkedIn, Facebook, X (Twitter), Instagram, Google Business
- Contact: address, phone, email
- Footer nav columns: Services, Blog, Resources, Company
- Newsletter signup section
- Business hours: Mon–Fri 9:00–18:00
- Legal links: Terms, Privacy, HTML Sitemap

---

## 10. Assets

```
assets/
├── blog/               8 blog featured images (PNG/JPG, 1200×630px target)
├── portfolio/          7 client case study images
├── favicon.png
├── logo-dark.png       Used in dark mode header/footer
├── logo-light.png      Used in light mode header/footer
├── og-image.jpg        Open Graph / social share preview (1200×630px)
├── about-page-hero.jpeg
├── contact-page.jpeg
├── hero-homepage.jpeg
├── our-team-page-hero.jpeg
├── team-group.jpg
├── team-meeting.jpg
├── team-zoya.jpg
└── [other team member photos]
```

**Image naming**: lowercase, hyphens, descriptive (e.g., `local-seo-guide-2025.png`)
**Blog images**: Should be 1200×630px for og:image compatibility

---

## 11. Python Build Scripts

Used for bulk page generation and maintenance. Run locally — not deployed.

| Script | Purpose |
|--------|---------|
| `generate_all_countries.py` | Creates 195 `*-local-citations.html` pages |
| `generate_category_pages.py` | Creates 57 `*-category-citations.html` pages |
| `generate_sitemap.py` | Outputs `sitemap.xml` |
| `sync_headers_footers.py` | Propagates header/footer changes across all pages |
| `build_final_hubs.py` | Builds hub/pillar pages with optimized content |
| `build_usa.py` | USA-specific citation content |
| `create_category_hub.py` | Creates industry category hubs |
| `clean_category_hub.py` | Cleans up category hub HTML |
| `fix_styles.py` | Bulk CSS style fixes |
| `rebuild_pages.py` | Rebuilds multiple pages at once |
| `update_countries.py` | Updates country data in generated pages |
| `update_categories.py` | Updates category data |
| `patch_hubs_layout.py` | Patches layout on hub pages |
| `add_cats.py` | Adds category info to pages |
| `add_seo.py` | Adds/updates SEO metadata |
| `align_hubs.py` | Aligns hub page structures |
| `strip_html_links.py` | Bulk link removal |
| `parse_blogs.py` | Parses/imports blog post data |

---

## 12. Agent Workflows

Located in `.agent/workflows/` — guides for AI agents performing common tasks.

### `create-new-page.md`
1. Copy the closest existing page as base
2. Update `<title>`, meta description, Open Graph tags
3. Fix asset paths: use `../assets/`, `../css/`, `../js/` for pages in subdirectories
4. Ensure `<header>` and `<footer>` elements exist (auto-injection fills them)
5. Set the correct nav active state
6. Add a page header section with breadcrumb
7. Checklist: favicon, fonts (Google Fonts), GA script, canonical URL

### `create-blog-post.md`
1. Use `local-seo-guide-2025.html` as template
2. Set all meta tags and og: tags
3. CTA button gradient: `#FF6B6B → #fa5252` (coral, not lime — blog-specific)
4. Add to blog search array in `blog-db.js`
5. Update related posts sections on similar posts
6. Blog images: 1200×630px, save to `assets/blog/`

### `deploy-to-hostinger.md`
Instructions for deploying the site to Hostinger hosting (alternative to Vercel).

---

## 13. SEO & Structured Data

Every page includes JSON-LD structured data. Common schemas used:

- **Organization** — company name, URL, logo, contact, social profiles
- **WebSite** — with `SearchAction` for sitelinks search box
- **SiteNavigationElement** — main nav links
- **FAQPage** — on service pages with FAQs
- **AboutPage** — on `about.html`
- **BreadcrumbList** — on inner pages

**Open Graph** tags on every page:
- `og:title`, `og:description`, `og:image` (`/assets/og-image.jpg`), `og:url`, `og:type`

**Twitter Card**: `summary_large_image` on all pages.

**Canonical URLs**: Set per page to prevent duplicate content issues.

---

## 14. Payment & Checkout Flow

```
User clicks "Buy Now" / "Order Now" on service page
        ↓
JS collects form data (package, quantity, business info)
        ↓
POST /api/create-checkout-session
        ↓
Stripe Checkout Session created
        ↓
User redirected to Stripe-hosted payment page
        ↓
On success → redirect to success page + ?session_id=...
On cancel  → redirect back to service page
        ↓
/api/save-order saves order details to Supabase
```

**Stripe keys** come from environment variables:
- `STRIPE_PUBLISHABLE_KEY` (frontend)
- `STRIPE_SECRET_KEY` (server-side only, never exposed)

---

## 15. Blog System

The blog does **not** use a CMS or database queries. All content lives in `js/blog-db.js`.

**How it works:**
1. `blog-db.js` exports a global `blogPosts` array
2. Blog category pages filter the array by `category` slug
3. `blog-category.html` renders the filtered posts dynamically
4. Individual blog posts are standalone HTML files (not dynamically rendered)

**Adding a new blog post:**
1. Create the HTML file (follow `.agent/workflows/create-blog-post.md`)
2. Add an entry to `blogPosts` array in `blog-db.js`
3. Place featured image in `assets/blog/`

---

## 16. Chatbot System

The chat widget (`js/chatbot.js`) auto-injects into every page via `main.js`.

**Flow:**
1. User opens chat bubble (bottom-right)
2. Greeting message shown
3. User types message
4. `chatbot.js` sends `POST /api/chat` with conversation history
5. OpenAI GPT-4o responds with SMBify sales context
6. If API fails → falls back to rule-based responses from built-in knowledge base
7. Complex/sales queries → offers WhatsApp handoff link

**Customization:** Edit the `chatbotConfig` object at the top of `chatbot.js`:
- `title`: Widget header text
- `greeting`: Initial bot message
- `placeholder`: Input placeholder text

---

## 17. Generated Citation Pages

252 HTML pages auto-generated by Python scripts for SEO.

### Country Pages (195 files)
Pattern: `[country-slug]-local-citations.html`
Examples: `united-states-local-citations.html`, `united-kingdom-local-citations.html`

These target keywords like "local citations for businesses in [Country]".

### Category/Industry Pages (57 files)
Pattern: `[industry-slug]-category-citations.html`
Examples: `accountants-category-citations.html`, `attorneys-category-citations.html`, `auto-repair-category-citations.html`

These target keywords like "local citations for [industry type]".

**Do not hand-edit these files.** They are regenerated via Python scripts. Make template changes in the generator scripts instead.

---

## 18. Deployment

### Primary: Vercel

- Connected to GitHub repository
- Auto-deploys on push to `main` branch
- Serverless functions in `/api/` are auto-detected
- Environment variables set in Vercel dashboard (not in `.env` files)
- `vercel.json` controls routing, redirects, and headers

### Alternative: Hostinger

See `.agent/workflows/deploy-to-hostinger.md` for FTP/file manager deployment steps.

### Environment Variables (Vercel Dashboard)

Set these in the Vercel project settings (not committed to repo):

```
OPENAI_API_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
SUPABASE_URL
SUPABASE_ANON_KEY
```

---

## 19. Environment Variables

From `.env.example` (never commit actual values):

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# OpenAI
OPENAI_API_KEY=sk-...

# App
APP_NAME=SMBify Agency
CURRENCY=usd

# Domains
PRODUCTION_DOMAIN=https://www.smbify.net
LOCAL_DOMAIN=http://localhost:3000
```

---

## 20. Business & Contact Info

| Field | Value |
|-------|-------|
| Company | SMBify Agency |
| Address | Shop #1, Mohalla Faqeer Ahmad Gul, Paharpur, 29160, Pakistan |
| Coordinates | 32.0996°N, 70.7929°E |
| Phone / WhatsApp | +92-306-6050256 |
| Email | contact@smbify.net |
| Website | https://www.smbify.net |
| LinkedIn | smbifyagency |
| Facebook | SMBifyAgency |
| Twitter/X | @smbifyagency |
| Instagram | @smbifyagency |
| Business Hours | Monday–Friday, 09:00–18:00 |
| Service Area | Worldwide |
| Google Analytics | G-2ZEXKVH0S5 |

---

## Developer Quick-Start

### Adding a new service page
1. Copy `services/local-seo-service.html` as template
2. Update: `<title>`, meta tags, service name, pricing, FAQ content
3. Add Stripe pricing entry to `api/create-checkout-session.js`
4. Add link to `services.html` catalog and navigation dropdown in `includes/header-template.html`
5. Run `sync_headers_footers.py` if you modify the header/footer templates

### Adding a new blog post
1. Follow `.agent/workflows/create-blog-post.md`
2. Add entry to `js/blog-db.js`

### Adding a new resource tool
1. Copy closest existing tool from `resources/`
2. Fix asset paths (`../css/`, `../js/`, `../assets/`)
3. Add link to the resources dropdown in `includes/header-template.html`

### Modifying header or footer
1. Edit `includes/header-template.html` or `includes/footer-template.html`
2. Run `python sync_headers_footers.py` to push changes to all static pages (if needed)
3. Dynamic pages get the update automatically via `main.js` fetch

### Changing service pricing
- Edit `api/create-checkout-session.js` — this is the single source of truth for prices
- Update the visible price displayed on the corresponding service page HTML

---

*End of documentation*

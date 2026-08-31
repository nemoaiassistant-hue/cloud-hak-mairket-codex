# SEO Audit Punch List — cloud-hak.com — 2026-08-30

From OpenSEO audit `f65c8821` (7 pages crawled of ~30 published; Lighthouse did not run).
All 10 crawler-reported issues were fixed in the repo the same day (see run summary).
Everything below was **found but not fixed** — ordered by the same priority classes.

---

## Class 3 — Uncrawlable / discoverability (biggest gap on the site)

### 1. No `sitemap.xml` (https://cloud-hak.com/sitemap.xml → 404)
- **What breaks:** crawlers and AI engines must discover all ~30 pages by links alone; today they can only find 7. Google Search Console cannot be told what matters.
- **Exact change:** add `sitemap.xml` at the repo root listing every canonical URL (24 pages carry canonicals; the 5 demo pages under `/demos/` do not). Starter:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://cloud-hak.com/</loc></url>
    <url><loc>https://cloud-hak.com/pricing</loc></url>
    <url><loc>https://cloud-hak.com/blog</loc></url>
    <url><loc>https://cloud-hak.com/our-work</loc></url>
    <url><loc>https://cloud-hak.com/testimonials</loc></url>
    <url><loc>https://cloud-hak.com/privacy.html</loc></url>
    <url><loc>https://cloud-hak.com/ai-visibility/</loc></url>
    <url><loc>https://cloud-hak.com/ai-workforce/</loc></url>
    <!-- + one <url><loc> per /services/*/  /industries/*/ /demos/*/ page -->
  </urlset>
  ```
- **Who:** repo owner (site is on Vercel; file deploys on push).

### 2. No `robots.txt` (https://cloud-hak.com/robots.txt → 404)
- **What breaks:** no crawl guidance and no `Sitemap:` pointer for crawlers that don't read HTML.
- **Exact change:** add `robots.txt` at repo root:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://cloud-hak.com/sitemap.xml
  ```
- **Who:** repo owner.

### 3. ~22 of ~30 pages are orphans — no internal link points at them
- **Evidence:** the crawler found only 7 pages at depth ≤ 1 (home, pricing, blog, our-work, testimonials, ai-visibility, privacy). None of `/services/*` (10 pages), `/industries/*` (4), `/ai-workforce/`, or `/demos/*` (6) are linked from any crawled page — a visitor and a bot can only reach them by typing the URL.
- **What breaks:** those pages can't accumulate link equity or get crawled regularly; Google may never index them; AI engines won't cite them.
- **Exact change:** add a "Services" item to the nav (or footer) linking `/services/seo/`, `/services/websites/`, etc., and an "Industries" block on the homepage linking the four `/industries/*` pages. Caveat: most URLs in this repo are extension-less (`/pricing`), which Vercel serves via clean-URL resolution — if Vercel's `cleanUrls` setting is off in your project settings, link to the `.html` form or enable it, or the new links will 404.
- **Who:** repo owner (nav/footer templates are inlined per page — 30 files).

---

## Class 4 — Thin content

### 4. Five `/demos/*` pages have no `<link rel="canonical">`
- **Files:** `demos/carnivore-tracker/`, `demos/airway-clinic-plan/`, `demos/airway-monthly-plan/`, `demos/broadway-dental-boutique/`, `demos/mac-studio-business-case/` (`demos/airway-triage/` has one).
- **What breaks:** duplicate/parameterised variants can compete with the canonical version.
- **Exact change:** add `<link rel="canonical" href="https://cloud-hak.com/demos/<slug>/" />` to each `<head>`.
- **Who:** repo owner. Low priority — portfolio demos.

---

## Class 5 — Performance

### 5. Lighthouse performance data was never collected (0 of 7 pages measured)
- **What breaks:** no Core Web Vitals / performance signal for any page; class-5 issues could exist undetected.
- **Exact change:** after the next deploy, re-run the audit (SEO-GOD → audit, or OpenSEO dashboard → cloud-hak.com → new audit). If Lighthouse still yields nothing, check that the container can reach `https://www.googleapis.com/` and that no WAF rule blocks headless Chrome.
- **Who:** repo owner / server admin.

---

## Also worth doing (not from this crawl)
- Connect Google Search Console — SEO-GOD's **measure** phase handles this and will unlock real query/ranking data for cloud-hak.com.
- Re-run the audit after the punch-list items land so the crawler sees all ~30 pages, not 7.

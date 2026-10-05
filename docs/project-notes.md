# Arcade Game Australia

## Scope

Sixteen content pages: home, five service pages, service areas, about, contact, privacy, a Guides index and five supporting articles. The five service pages are generated from `lib/content.ts`. Seven regional sections reflect the supplied NSW coverage brief. No unconfirmed suburb pages, fictional testimonials, prices, inventory or street addresses are included. At the user’s request, the contact page and footer now show clearly labelled demo contact details.

The design uses Big Top Amusements as a broad visual reference, with original layout, copy, branding and illustrative generated machine images. Images do not represent actual stock or completed client installations.

## SEO

Page copy follows the September 2026 Australia keyword plan, prioritising Sydney arcade hire, claw hire, local sales, venue placement and supply/installation. Each page has a unique title and description, a canonical URL and a single main heading. Service structured data, organisation data, internal links, robots.txt and sitemap.xml are included. FAQ answers are included in server-rendered HTML.

Private staging is for review; it does not establish public Google visibility. Before a public launch, update the canonical host, sitemap URLs and structured-data URLs to the final domain and confirm the legal business identity, contact information, real equipment, service coverage and commercial terms.

The September 2026 SEO completion pass expands all five service pages and seven regional sections. `lib/seo.ts` now centralises the trusted origin, page metadata and shared schema. See `seo-implementation.md`, `seo-keyword-coverage.csv` and `seo-validation.json` for the implementation, all 375 research-term decisions, validation and remaining launch requirements.

## Enquiries

The contact form POSTs JSON to `/api/enquiries`. It validates the payload on the server, requires consent, saves enquiries to the Sites D1 `DB` binding, uses prepared statements and returns a reference only after a successful database write. Retries with the same request ID are idempotent. There is a honeypot and a per-email submission limit. A storage failure preserves the form input and displays a retry message.

Enquiries are saved in the `enquiries` table. No public endpoint exposes submitted data. Local test enquiries are kept only in the local preview database and are not packaged for deployment.

**Email notifications are not configured.** A recipient address and authenticated email sending service are required before launch. Do not describe the form as delivering email until a provider is connected and delivery is tested. The current success message confirms database receipt only.

## Assets and maintenance

Internal page links use native anchors and canonical, slash-free paths (except the home page). This deliberately loads the complete server-rendered page instead of relying on client-router or RSC-prefetch requests in the private preview. Keep query strings for service/area form preselection and fragment links for regional sections intact.

The header provides access to all sixteen pages. Desktop navigation groups the five services in Services and all five articles plus their index in Guides, with Home, Service areas, About us, Privacy and Contact & quotes alongside them. The mobile menu lists all sixteen pages and scrolls on short screens. Service menu entries come from the same `services` data used to render the pages.

Images and fonts live in `public/`, so they travel with the source repository. Google Fonts: Barlow Condensed and DM Sans. The six served WOFF font files total 190,536 bytes, 48.1% smaller than the original TTFs. Original font files and licences remain in the repository. Generated images are WebP, roughly 134 KB and 149 KB. No external image hotlinks or font calls are required.

The final editorial and technical completion pass is documented in `seo-implementation.md`. Run `node scripts/audit-seo.mjs docs/seo-validation.json` after the production build to verify the built Worker pages, metadata, structured data, internal links, crawl files, asset references and missing-page status. The report does not imply that a private Site is indexed by Google.

Schema: `db/schema.ts`. Initial schema-only migration: `drizzle/0000_omniscient_nekra.sql`. Runtime queries are behind `lib/enquiries.ts`. Follow the Sites lifecycle and existing README for local migrations and preview. Applied production migrations must remain immutable.

## Demo contact details

The user authorised placeholders for the current demo. `lib/demo-contact.ts` contains the display-only phone `02 0000 0000`, email `hello@arcadegameaustralia.example` and reserved example domain `arcadegameaustralia.example`. These are not connected or clickable contact destinations. The existing private Sites URL remains the working temporary website address and canonical host. Form submissions still save to D1; no mail is sent to the placeholder email.

## Launch information still needed

- Final domain, confirmed business phone/email and legal business details.
- Actual stock/machine photos and specifications, if a catalogue is wanted.
- Confirmed pricing, delivery terms, placement arrangements and warranty/support terms.
- Receiving email address and email provider connection for enquiry notifications.

The content deliberately uses enquiry-based language where these details have not been supplied.

## Supporting content and off-page preparation

See `content-growth-20260927.md` for the five guides, regional planning additions, browser checks and external SEO preparation. These additions retain the completed service keyword targets. The expanded sixteen-page audit is saved in `seo-validation.json`. External listings and outreach are prepared, not submitted.

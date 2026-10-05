# Arcade Game Australia — complete portable website

This is a source export of the completed 16-page Arcade Game Australia website, based on published source commit `49f768c676b226fd92837028790e7d406edbf712` (Sites version 9). The existing React components, copy, layout, responsive styles, images, fonts, navigation, form UI and SEO definitions have been retained. It is not a redesign or a homepage-only reconstruction.

The ChatGPT Sites hosting runtime itself is not a portable product. This project replaces that runtime with standard Next.js static generation plus a small, separately hosted enquiry endpoint. You do not need a ChatGPT Sites account to install, build or run this export.

## Framework and commands

- Next.js 16.3.4, React 19.2.6, TypeScript and Tailwind CSS 4.
- Node.js **22.13 or newer**; `.nvmrc` selects Node 22.
- npm with a committed `package-lock.json`; no private package registry required.
- Every important URL is generated as a complete HTML document, including its copy, metadata and structured data. JavaScript adds the existing interactive behavior.

Run these commands in the folder containing `package.json`:

| Task | Command |
| --- | --- |
| Install exact dependencies | `npm ci` |
| Develop, with the enquiry endpoint | `npm run dev` |
| Production build | `npm run build` |
| Production output | **`out/`** |
| Serve the production build with the Node enquiry endpoint | `npm start` |
| Check TypeScript | `npm run typecheck` |
| Compare generated pages/assets/SEO with the exported original | `npm run verify` |
| Test the form handler using a simulated provider; sends no email | `npm run test:form` |
| Test the production HTTP server; sends no email | `node tests/runtime.test.mjs` |
| Test the development server; sends no email | `node tests/runtime.test.mjs --dev` |

Development and production preview use `http://localhost:3000`. For another port: `npm run dev -- --port 3001` or `npm start -- --port 3001`.

The ZIP contains source, assets, configuration, a dependency lockfile, tests and verification reports. Generated `out/`, `.next/` and `node_modules/` folders are intentionally excluded; `npm ci` and `npm run build` recreate them. Open the project through its server, rather than double-clicking HTML files.

## Environment and enquiry delivery

The public form sends to **`POST /api/enquiries` on the same website origin**. Two included adapters run the same server-side handler:

| Environment | Adapter | Persistent storage |
| --- | --- | --- |
| Local development, Bolt preview or a Node host | `server/index.ts` | SQLite through `sql.js` in `.data/enquiries.sqlite` |
| Cloudflare Pages | `functions/api/enquiries.ts` | A Cloudflare D1 binding named `DB` |

For Node/Bolt development, copy `.env.example` to `.env.local`, then privately set:

```dotenv
RESEND_API_KEY=your-server-side-key
PORT=3000
ENQUIRY_DB_PATH=.data/enquiries.sqlite
```

`RESEND_API_KEY` is required to send mail, but is **not required to build or browse the website**. `PORT` and `ENQUIRY_DB_PATH` are optional. On a deployed Node host, set these through the host's server environment. The key is never read by a client component, serialized into HTML, or written to logs. Never use a `NEXT_PUBLIC_` or `VITE_` prefix for the key. `.env.local`, `.dev.vars` and local databases are ignored by Git.

The receiving configuration is retained exactly:

- From: `Arcade Game Australia <admin@arcadegameaustralia.com.au>`
- To: `admin@arcadegameaustralia.com.au`
- Reply-To: the customer's submitted email
- Provider: HTTPS `https://api.resend.com/emails`

The sender domain must be verified in the Resend account associated with the new environment's key. The original hosted secret is not included in this ZIP and is not transferred automatically.

The handler retains validation, escaped email HTML, prepared SQL, a bounded request body, honeypot, per-email limits, duplicate detection, send leases and stable Resend idempotency keys. The visible form shows success only after Resend accepts the message and returns an ID, or after a previously accepted identical submission is found. A missing key or database configuration returns an error, never a simulated success.

The Node adapter applies the included SQL migrations automatically when configured email delivery first needs the database. Its file needs a persistent writable disk and one owning Node process; for multiple processes or ephemeral/serverless hosting, use the included D1 adapter or supply a shared database implementation of `lib/enquiry-db.ts`. Bolt preview storage is for development, not a substitute for a production database.

After deployment and configuration, use the visible contact form to send an authorized test and match its reference to the event in Resend. Export verification used a simulated provider and did **not** send a new email.

## Import into GitHub and Bolt.new

1. Extract the ZIP. Enter the `arcade-game-australia` folder.
2. Create your GitHub repository and upload/commit **the contents of that folder**, including its nested folders, `package-lock.json`, `.gitignore` and environment examples. `package.json` must be at the repository root. Do not upload the ZIP as the only repository file, or upload real environment files.
3. On Bolt's home page, choose the GitHub import button. Connect the account, select the repository (or use **Import from URL**), then choose the repository to import.
4. Install with `npm ci` if Bolt has not already done so, and run `npm run dev`. The preview includes all 16 routes without asking Bolt to regenerate them.
5. Add `RESEND_API_KEY` privately to the development/server environment only if you want preview email sending. Restart the dev server after changing it. Configure the destination host separately for production.

Suggested initial instruction to Bolt: “Work in this existing Next.js static-export project. Preserve all 16 routes, page copy, assets, layout and SEO. Do not convert it to a client-only SPA or regenerate pages. Use the existing npm scripts and README.”

Importing into Bolt does not automatically deploy the Cloudflare Pages Function, transfer the old database, connect a domain or configure Resend. Use the deployment instructions below when moving the production site.

## Deploy to Cloudflare Pages

This export uses **Cloudflare Pages static HTML plus one Pages Function**. It does not need a separate Worker project or a Next.js server adapter.

### Prepare the database

From the project root, authenticate and create a new D1 database:

```sh
npx wrangler login
npx wrangler d1 create arcade-enquiries
```

In `wrangler.jsonc`, replace the all-zero `database_id` with the returned ID. Keep the binding name **`DB`**. If you choose a different database name, update the name in both the configuration and commands. The placeholder ID cannot serve production enquiries.

Apply the schema to that new database:

```sh
npx wrangler d1 migrations apply arcade-enquiries --remote
```

Commit the configured `wrangler.jsonc`. Database IDs are configuration, not secret email credentials. The SQL migrations create a fresh empty enquiry database; existing customer enquiries were not exported.

### Connect the repository

In Cloudflare's **Workers & Pages**, create a **Pages** application and import the GitHub repository. Use these project settings:

| Setting | Value |
| --- | --- |
| Production branch | Your committed branch, usually `main` |
| Root directory | Repository root, containing `package.json` and `functions/` |
| Framework preset | Next.js (Static HTML Export), or None with the values below |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `22` or a supported newer release |

`functions/api/enquiries.ts` is compiled with the Pages deployment. `public/_routes.json` becomes `out/_routes.json` and limits function execution to API paths. The root `404.html` generated in `out/` supplies missing-page handling. Do not add a catch-all rewrite to `/index.html`; every page already has its own HTML.

### Add the runtime secret

In the Pages project's settings, add **`RESEND_API_KEY` as an encrypted secret** for Production (and Preview only if wanted). Alternatively, after the Pages project exists:

```sh
npx wrangler pages secret put RESEND_API_KEY --project-name arcade-game-australia
```

Use your actual Pages project name if different. Redeploy after changing runtime secrets/bindings. Confirm that the deployment has the `DB` binding from `wrangler.jsonc` and the applied schema.

A CLI deployment is also supported once the project is configured:

```sh
npm ci
npm run build
npx wrangler pages deploy out --project-name arcade-game-australia
```

Run that command from the project root so Wrangler finds `functions/` and `wrangler.jsonc`. A static-only drag-and-drop upload does not connect the enquiry backend.

To preview the Pages adapter locally, copy `.dev.vars.example` to `.dev.vars`, set a private key if sending is intended, then run:

```sh
npx wrangler d1 migrations apply arcade-enquiries --local
npm run build
npm run pages:dev
```

Connect `arcadegameaustralia.com.au` as a custom domain only when ready to move hosting. This export has not changed the live domain or DNS. Retain the existing canonical domain while previewing; if the permanent domain changes later, update the central origin in `lib/seo.ts` deliberately and rebuild.

## Included routes

| Page | URL |
| --- | --- |
| Home | `/` |
| Arcade machine hire | `/arcade-machine-hire` |
| Claw machine hire | `/claw-machine-hire` |
| Commercial venue placement | `/arcade-machine-placement` |
| Arcade machine sales | `/arcade-machines-for-sale` |
| Amusement machine supply & installation | `/amusement-machine-supply-installation` |
| Service areas | `/service-areas` |
| About | `/about` |
| Contact & quotes | `/contact` |
| Privacy | `/privacy` |
| Guides | `/guides` |
| Arcade machine hire costs | `/guides/arcade-machine-hire-costs` |
| Claw machine prize planning | `/guides/claw-machine-prize-planning` |
| Placement vs buying | `/guides/arcade-machine-placement-vs-buying` |
| Buying an arcade machine | `/guides/buying-an-arcade-machine` |
| Delivery checklist | `/guides/arcade-machine-delivery-checklist` |

Also included: `/sitemap.xml`, `/robots.txt`, the branded 404 page and `POST /api/enquiries`. Service/area query parameters on `/contact` remain supported; their canonical is `/contact`.

## Preservation and platform differences

- The original design, page content, contact fields and six service options remain intact. Images, favicon variants, font files and font licences are local in `public/`; no temporary ChatGPT asset URLs are needed.
- The original Vinext/Sites renderer is replaced with standard Next.js. Public pages are generated at build time. Asset filenames and hydration internals consequently differ, while page content and metadata are compared against the original.
- Contact query-string defaults are applied after hydration. The complete unfilled form is present in the static HTML, and the same service/location presets appear once JavaScript starts.
- ChatGPT hosting access controls, version history, private repository integration, hosted secrets and production database data are not transferred. The unused Sites authentication helper is omitted; the public website does not depend on it.
- The original `RESEND_API_KEY` and Sites-managed `DB` become destination-host configuration. The portable backend preserves the original send/deduplication behavior.
- Existing demo phone/email/website text and illustrative machine photos are retained intentionally. These visible placeholders have not been replaced with invented contact information or stock claims.
- The original `docs/*.md` and SEO research files are retained as historical project records. Some describe earlier staging/save-only form behavior. **This README and `docs/export/` describe the current exported implementation and override historical operational instructions.**

## Verification included

`docs/export/published-pages.json` records the rendered original page content and SEO. `preserved-files.json` records hashes of 129 unchanged original files. The verification reports record the build comparison, HTTP route checks and simulated form tests. `npm run verify` intentionally fails when original page content, SEO or preserved files change; after an intentional future edit, review and update the baseline rather than silently ignoring a mismatch.

The checked export has 16 crawlable page documents, 570 working internal links/anchors, matching metadata and structured data, local asset resolution, sitemap/robots preservation and a noindex 404. Verification establishes the exported project, not a later deployment or inbox delivery on a new host.

Official reference documentation:

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Cloudflare Pages: Next.js static HTML](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Cloudflare Pages Function bindings](https://developers.cloudflare.com/pages/functions/bindings/)
- [Cloudflare Pages Functions routing](https://developers.cloudflare.com/pages/functions/routing/)
- [Bolt GitHub import](https://support.bolt.new/integrations/git)

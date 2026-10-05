import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { summarize, tags, decode, hash } from "./html-summary.mjs";

const baseline = JSON.parse(fs.readFileSync("docs/export/published-pages.json", "utf8"));
const preserved = JSON.parse(fs.readFileSync("docs/export/preserved-files.json", "utf8"));
const origin = "https://arcadegameaustralia.com.au";
const routes = Object.keys(baseline.pages);
assert.equal(routes.length, 16);
const documents = new Map();
const assets = new Set();
const local = url => {
  if (!url || url.startsWith("data:")) return;
  const parsed = new URL(url, origin);
  assert.ok(!/chatgpt\.site|oaiusercontent|blob\.core\.windows|sediment:/.test(url), "Temporary platform asset URL: " + url);
  if (parsed.origin !== origin) return;
  const filename = path.join("out", decodeURIComponent(parsed.pathname));
  assert.ok(fs.existsSync(filename) && fs.statSync(filename).isFile(), "Missing local asset: " + url);
  assets.add(parsed.pathname);
};
for (const route of routes) {
  const filename = path.join("out", route === "/" ? "index.html" : route.slice(1) + ".html");
  assert.ok(fs.existsSync(filename), "Missing crawlable HTML: " + route);
  const html = fs.readFileSync(filename, "utf8");
  const summary = summarize(html);
  for (const key of Object.keys(baseline.pages[route])) assert.deepEqual(summary[key], baseline.pages[route][key], route + ": changed " + key);
  assert.equal(summary.headings.filter(([tag]) => tag === "h1").length, 1);
  assert.ok(!summary.metadata.some(([name, value]) => name === "robots" && value.includes("noindex")));
  for (const image of tags(html, "img")) local(image.src);
  for (const script of tags(html, "script")) if (script.src) local(script.src);
  for (const link of tags(html, "link")) if (["stylesheet", "icon", "apple-touch-icon", "preload", "modulepreload"].includes(link.rel)) local(link.href);
  documents.set(route, { ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => decode(match[1]))), links: summary.links });
}
let linkCount = 0;
for (const [route, document] of documents) for (const { href } of document.links) {
  if (!href) continue;
  const url = new URL(href, origin + route);
  if (url.origin !== origin) continue;
  const target = documents.get(url.pathname);
  assert.ok(target, "Missing internal route: " + href);
  if (url.hash) assert.ok(target.ids.has(decodeURIComponent(url.hash.slice(1))), "Missing internal anchor: " + href);
  linkCount++;
}
for (const file of fs.readdirSync("out", { recursive: true }).filter(file => file.endsWith(".css"))) {
  const css = fs.readFileSync(path.join("out", file), "utf8");
  for (const match of css.matchAll(/url\(\s*["']?([^\s)'";]+)["']?\s*\)/g)) {
    if (match[1].startsWith("/")) local(match[1]);
  }
}
for (const [filename, sha256] of Object.entries(preserved.files)) assert.equal(hash(fs.readFileSync(filename)), sha256, "Original source/asset changed: " + filename);
assert.equal(fs.readFileSync("out/robots.txt", "utf8").trim(), baseline.robots.trim());
// XML whitespace may differ between renderers; all sitemap data must match.
assert.equal(fs.readFileSync("out/sitemap.xml", "utf8").replace(/>\s+</g, "><").trim(), baseline.sitemap.replace(/>\s+</g, "><").trim());
const missing = fs.readFileSync("out/404.html", "utf8");
assert.match(missing, /GAME OVER/);
assert.ok(tags(missing, "meta").some(tag => tag.name === "robots" && tag.content.includes("noindex")));
for (const file of fs.readdirSync("out", { recursive: true }).filter(file => /\.(js|html|map)$/.test(file))) {
  const value = fs.readFileSync(path.join("out", file), "utf8");
  assert.ok(!value.includes("RESEND_API_KEY") && !value.includes("api.resend.com"), "Server mail code leaked: " + file);
}
const report = {
  passed: true, checkedAt: new Date().toISOString(), sourceCommit: baseline.sourceCommit,
  routes, pages: routes.length, internalLinksAndAnchors: linkCount,
  uniqueLocalAssets: assets.size, unchangedOriginalFiles: Object.keys(preserved.files).length,
  checks: ["Complete static HTML for all 16 routes", "Exact normalized page copy, headings and links", "Exact titles, descriptions, canonicals, Open Graph, Twitter and JSON-LD", "Exact image paths, alt text and dimensions", "All local page assets and CSS fonts resolve", "Original styling, content and component files retain SHA-256 hashes", "Sitemap, robots and noindex 404 preserved", "No Resend key/configuration or mail endpoint in client bundles"],
  limitations: ["No email was sent during export verification.", "Resend and the persistent database must be connected on the destination host.", "This check does not establish a deployment on the user's Bolt or Cloudflare account."],
};
fs.writeFileSync("docs/export/verification.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));

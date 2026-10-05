import { createHash } from "node:crypto";

export const hash = value => createHash("sha256").update(value).digest("hex");
export const decode = value => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
export const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)].map(match => [match[1].toLowerCase(), decode(match[2])]));
export const tags = (html, tag) => [...html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "gi"))].map(match => attrs(match[0]));
export const strip = text => decode(text.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const contentOnly = html => html.replace(/<(script|style|title)\b[^>]*>[\s\S]*?<\/\1>/gi, "").replace(/<\!--[\s\S]*?-->/g, "");

export function summarize(html) {
  const clean = contentOnly(html);
  const body = clean.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || clean;
  const meta = tags(html, "meta").filter(tag => tag.name === "description" || tag.name?.startsWith("twitter:") || tag.property?.startsWith("og:") || tag.property?.startsWith("article:") || tag.name === "robots")
    .map(tag => [tag.name || tag.property, tag.content]).sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
  const graphs = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(match => JSON.parse(match[1])["@graph"] || [JSON.parse(match[1])]);
  return {
    title: strip(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ""),
    metadata: meta,
    canonical: tags(html, "link").filter(tag => tag.rel === "canonical").map(tag => tag.href),
    headings: [...clean.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(match => [match[1].toLowerCase(), strip(match[2])]),
    bodyText: strip(body),
    images: tags(clean, "img").map(({ src, alt, width, height }) => ({ src, alt, width, height })),
    links: [...clean.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(match => ({ href: attrs(match[1]).href, text: strip(match[2]) })),
    schema: graphs.sort((a, b) => String(a["@id"]).localeCompare(String(b["@id"]))),
  };
}

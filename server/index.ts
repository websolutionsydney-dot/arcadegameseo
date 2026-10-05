import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { config } from "dotenv";
import { POST } from "../lib/enquiry-handler";
import { openDatabase } from "./database";
import sitemap from "../app/sitemap";

config({ path: [".env.local", ".env"], quiet: true });
const args = process.argv.slice(2);
const option = (name: string) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const dev = args.includes("--dev");
const port = Number(option("--port") || process.env.PORT || 3000);
const hostname = option("--host") || process.env.HOST || "0.0.0.0";
const output = path.resolve("out");
const databasePath = path.resolve(process.env.ENQUIRY_DB_PATH || ".data/enquiries.sqlite");
let database: ReturnType<typeof openDatabase> | undefined;
let nextHandler: ((req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>) | undefined;
let notFoundHandler: typeof nextHandler;
const pageRoutes = new Set([...sitemap().map(page => new URL(page.url).pathname), "/robots.txt", "/sitemap.xml"]);
if (dev) {
  const { default: next } = await import("next");
  const app = next({ dev: true, webpack: true, hostname, port });
  await app.prepare();
  nextHandler = app.getRequestHandler();
  notFoundHandler = (req, res) => app.render404(req, res);
} else if (!fs.existsSync(path.join(output, "index.html"))) {
  throw new Error("No production build found. Run npm run build first.");
}

const contentTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp",
  ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff": "font/woff",
  ".woff2": "font/woff2", ".ttf": "font/ttf",
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || `localhost:${port}`}`);
    if (url.pathname.replace(/\/$/, "") === "/api/enquiries") {
      if (req.method !== "POST") {
        res.writeHead(405, { Allow: "POST", "Cache-Control": "no-store" }); res.end("Method not allowed"); return;
      }
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
      // A reverse proxy may terminate HTTPS. Compare Origin to the same host
      // rather than accepting arbitrary forwarded host/protocol values.
      const origin = headers.get("origin");
      if (origin) { const supplied = new URL(origin); if (supplied.host === url.host) url.protocol = supplied.protocol; }
      const request = new Request(url, {
        method: "POST", headers, body: Readable.toWeb(req) as ReadableStream,
        duplex: "half",
      } as RequestInit);
      // Missing configuration goes through the normal handler and returns 503.
      const key = process.env.RESEND_API_KEY?.trim();
      const db = key ? await (database ??= openDatabase(databasePath)) : undefined;
      const result = await POST(request, { DB: db, RESEND_API_KEY: key });
      res.writeHead(result.status, Object.fromEntries(result.headers));
      res.end(Buffer.from(await result.arrayBuffer())); return;
    }
    if (url.pathname.startsWith("/api/")) {
      res.writeHead(404, { "Cache-Control": "no-store" }); res.end("Not found"); return;
    }
    if (nextHandler) {
      // Next's development static-export renderer otherwise throws a 500 for
      // a dynamic slug absent from generateStaticParams. Match production 404s.
      const publicPath = path.resolve("public", "." + url.pathname);
      const isPublicFile = publicPath.startsWith(path.resolve("public") + path.sep) && fs.existsSync(publicPath) && fs.statSync(publicPath).isFile();
      const pagePath = url.pathname.replace(/\/$/, "") || "/";
      if (!pageRoutes.has(pagePath) && !isPublicFile && !url.pathname.startsWith("/_next/")) {
        await notFoundHandler!(req, res);
      } else await nextHandler(req, res);
      return;
    }
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { Allow: "GET, HEAD" }); res.end(); return;
    }
    const pathname = decodeURIComponent(url.pathname);
    const relative = pathname.replace(/^\/+/, "").replace(/\/$/, "");
    const candidate = path.resolve(output, relative || "index.html");
    let file: string | undefined;
    if (candidate.startsWith(output + path.sep)) {
      file = [candidate, candidate + ".html", path.join(candidate, "index.html")]
        .find(name => fs.existsSync(name) && fs.statSync(name).isFile());
    }
    const status = file ? 200 : 404;
    file ||= path.join(output, "404.html");
    res.writeHead(status, {
      "Content-Type": contentTypes[path.extname(file)] || "application/octet-stream",
      "Cache-Control": file.includes(`${path.sep}_next${path.sep}static${path.sep}`) ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
      ...(status === 404 ? { "X-Robots-Tag": "noindex" } : {}),
    });
    if (req.method === "HEAD") res.end(); else fs.createReadStream(file).pipe(res);
  } catch {
    // Do not log request bodies, credentials, or upstream response bodies.
    console.error("portable_server_request_failed", { status: 503 });
    if (!res.headersSent) res.writeHead(503, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify({ error: "We could not send your enquiry right now. Please try again shortly." }));
  }
});
server.listen(port, hostname, () => console.info(`Arcade Game Australia ${dev ? "development" : "production"} server: http://localhost:${port}`));

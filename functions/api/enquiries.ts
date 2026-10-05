import { POST } from "../../lib/enquiry-handler";

interface Env {
  DB: D1Database;
  RESEND_API_KEY?: string;
}

// Cloudflare Pages provides the runtime bindings; neither is included in HTML.
export const onRequest: PagesFunction<Env> = ({ request, env }) => request.method === "POST"
  ? POST(request, env)
  : new Response("Method not allowed", {
    status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" },
  });

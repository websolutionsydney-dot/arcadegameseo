import { z } from "zod";
import type { EnquiryEnvironment } from "./enquiry-db";
import { enquiryServiceOptions } from "./enquiry-services";
import { createEnquiryEmail, sendEnquiryEmail } from "./enquiry-email";

const singleLine = (max: number) => z.string().trim().max(max).refine(value => !/[\u0000-\u001f\u007f]/.test(value));
const schema = z.object({
  requestId: z.string().uuid(), name: singleLine(100).pipe(z.string().min(1)),
  email: singleLine(254).pipe(z.string().email()).transform(value => value.toLowerCase()),
  phone: singleLine(40).default(""),
  service: z.string().refine(value => value === "" || enquiryServiceOptions.some(option => option.value === value)).default(""),
  location: singleLine(150).default(""),
  eventDate: z.string().refine(value => value === "" || (/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value)).default(""),
  message: z.string().trim().min(1).max(4000).transform(value => value.replace(/\r\n?/g, "\n")).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)),
  consent: z.literal(true), website: z.string().max(0).default(""),
});
type Delivery = { id: string; reference: string; payload_hash: string | null; delivery_status: string; email_payload: string | null; delivery_attempted_at: number | null; created_at: number };
const response = (body: object, status = 200, headers: Record<string, string> = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
const deliveryFailure = () => response({ error: "We could not send your enquiry right now. Please try again shortly." }, 503);

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > 32768) throw new Error("body_too_large");
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 32768) { await reader.cancel(); throw new Error("body_too_large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return new TextDecoder().decode(bytes);
}

export async function POST(request: Request, environment: EnquiryEnvironment) {
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([new URL(request.url).origin, "https://arcadegameaustralia.com.au"]);
  if ((origin && !allowedOrigins.has(origin)) || request.headers.get("sec-fetch-site") === "cross-site") return response({ error: "Please submit the enquiry from this website." }, 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return response({ error: "Please use the enquiry form to send your message." }, 415);
  let body: unknown;
  try { body = JSON.parse(await readBody(request)); }
  catch (error) {
    const tooLarge = error instanceof Error && error.message === "body_too_large";
    return response({ error: tooLarge ? "Your enquiry is too long. Please shorten it and try again." : "Please check your enquiry and try again." }, tooLarge ? 413 : 400);
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = { name: "Please enter your name (up to 100 characters).", email: "Please enter a valid email address.", phone: "Please check your phone number.", service: "Please choose a service from the list.", location: "Please check your location or suburb (up to 150 characters).", eventDate: "Please enter a valid preferred date.", message: "Please enter a message (up to 4,000 characters).", consent: "Please agree to the privacy notice before sending." };
    return response({ error: errors[String(parsed.error.issues[0]?.path[0])] || "Please refresh the form and try again." }, 400);
  }
  const { requestId, website: _website, ...values } = parsed.data;
  let stage = "configuration";
  console.info("enquiry_submission_started", { requestId });
  try {
    const key = environment.RESEND_API_KEY?.trim() || "";
    if (!key) { console.error("enquiry_email_not_configured", { requestId, status: 503 }); return deliveryFailure(); }
    stage = "database_lookup";
    if (!environment.DB) throw new Error("Enquiry storage binding unavailable");
    const db = environment.DB, now = Date.now();
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(values)));
    const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
    let record = await db.prepare("SELECT id,reference,payload_hash,delivery_status,email_payload,delivery_attempted_at,created_at FROM enquiries WHERE id = ?").bind(requestId).first<Delivery>();
    if (record && record.payload_hash !== hash) return response({ error: "This submission has changed. Please refresh the page before sending it again." }, 409);
    if (!record) {
      stage = "database_insert";
      const reference = "AGA-" + requestId.replace(/-/g, "").slice(0, 12).toUpperCase();
      const emailPayload = JSON.stringify(createEnquiryEmail(values, reference));
      // Atomic insert also prevents identical enquiries sent again after a reload.
      await db.prepare(`INSERT INTO enquiries (id,reference,name,business,email,phone,service,location,event_date,message,consent,created_at,payload_hash,delivery_status,email_payload)
        SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        WHERE NOT EXISTS (SELECT 1 FROM enquiries WHERE payload_hash = ? AND created_at > ?)
          AND (SELECT COUNT(*) FROM enquiries WHERE email = ? AND created_at > ?) < 3
        ON CONFLICT(id) DO NOTHING`)
        .bind(requestId, reference, values.name, "", values.email, values.phone, values.service, values.location, values.eventDate, values.message, 1, now, hash, "pending", emailPayload, hash, now - 600000, values.email, now - 3600000).run();
      record = await db.prepare(`SELECT id,reference,payload_hash,delivery_status,email_payload,delivery_attempted_at,created_at FROM enquiries
        WHERE id = ? OR (payload_hash = ? AND created_at > ?) ORDER BY created_at DESC LIMIT 1`).bind(requestId, hash, now - 600000).first<Delivery>();
      if (!record) return response({ error: "You have sent several enquiries recently. Please try again in an hour." }, 429, { "Retry-After": "3600" });
      if (record.payload_hash !== hash) return response({ error: "Please refresh the page before sending this enquiry." }, 409);
    }
    if (record.delivery_status === "sent") return response({ sent: true, reference: record.reference });
    if (!record.email_payload || (record.delivery_attempted_at && now - record.delivery_attempted_at > 23 * 3600000))
      return response({ error: "We could not confirm this earlier enquiry. Please contact admin@arcadegameaustralia.com.au and quote " + record.reference + "." }, 409);
    // A lease protects concurrent sends. Safe retries reuse the stored email body and Resend key.
    stage = "send_claim";
    const claimed = await db.prepare(`UPDATE enquiries SET delivery_status = 'sending', delivery_updated_at = ?, delivery_attempted_at = COALESCE(delivery_attempted_at, ?)
      WHERE id = ? AND (delivery_status IN ('pending','failed') OR (delivery_status = 'sending' AND delivery_updated_at < ?))`).bind(now, now, record.id, now - 60000).run();
    if (!claimed.meta.changes) return response({ error: "Your enquiry is already being sent. Please wait a few seconds and try again.", pending: true }, 409, { "Retry-After": "3" });
    stage = "resend_request";
    console.info("enquiry_resend_request_started", { reference: record.reference });
    const result = await sendEnquiryEmail(key, record.id, record.email_payload);
    if (!result.ok) {
      await db.prepare("UPDATE enquiries SET delivery_status = 'failed', delivery_updated_at = ? WHERE id = ?").bind(Date.now(), record.id).run();
      console.error("enquiry_email_send_failed", { reference: record.reference, code: result.code });
      return deliveryFailure();
    }
    console.info("enquiry_resend_accepted", { reference: record.reference, resendId: result.id, status: result.status });
    stage = "delivery_record";
    try { await db.prepare("UPDATE enquiries SET delivery_status = 'sent', resend_id = ?, delivery_updated_at = ? WHERE id = ?").bind(result.id, Date.now(), record.id).run(); }
    catch { console.error("enquiry_email_status_update_failed", { reference: record.reference }); }
    return response({ sent: true, reference: record.reference }, 201);
  } catch (error) {
    // Never log submitted content, credentials, headers or provider responses.
    const detail = error instanceof Error ? error.message : "";
    const code = /no such (column|table)/i.test(detail) ? "database_schema_missing" : stage.startsWith("database") || stage === "send_claim" ? "database_operation_failed" : "internal_error";
    console.error("enquiry_submission_failed", { requestId, stage, code, status: 503 });
    return deliveryFailure();
  }
}

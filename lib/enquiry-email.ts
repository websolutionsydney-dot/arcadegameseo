import { enquiryServiceOptions } from "@/lib/enquiry-services";

type Enquiry = { name: string; email: string; phone: string; service: string; location: string; eventDate: string; message: string };
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export function createEnquiryEmail(enquiry: Enquiry, reference: string) {
  const service = enquiryServiceOptions.find(option => option.value === enquiry.service)?.label || "Not specified";
  const fields = [["Reference", reference], ["Name", enquiry.name], ["Email", enquiry.email], ["Phone", enquiry.phone || "Not provided"], ["Service required", service], ["Location / suburb", enquiry.location || "Not provided"], ["Preferred date", enquiry.eventDate || "Not provided"]];
  return {
    from: "Arcade Game Australia <admin@arcadegameaustralia.com.au>",
    to: ["admin@arcadegameaustralia.com.au"],
    reply_to: enquiry.email,
    subject: `Website enquiry — ${service} — ${reference}`,
    text: "New Arcade Game Australia website enquiry\n\n" + fields.map(([label, value]) => `${label}: ${value}`).join("\n") + "\n\nMessage:\n" + enquiry.message,
    html: `<div style="font-family:Arial,sans-serif;color:#17191b;max-width:640px"><h1 style="font-size:24px;color:#c91820">New website enquiry</h1><p>Arcade Game Australia</p><table style="width:100%;border-collapse:collapse">${fields.map(([label, value]) => `<tr><th style="padding:10px;text-align:left;vertical-align:top;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:10px;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`).join("")}</table><h2 style="font-size:18px;margin-top:24px">Message</h2><div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(enquiry.message)}</div><p style="font-size:12px;color:#626266">Reply to this email to respond directly to the customer.</p></div>`,
  };
}

export async function sendEnquiryEmail(key: string, requestId: string, payload: string): Promise<{ ok: true; id: string; status: number } | { ok: false; code: string }> {
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST", redirect: "manual", signal: AbortSignal.timeout(15000),
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `aga-enquiry-v1/${requestId}` },
      body: payload,
    });
    if (!result.ok) return { ok: false, code: `http_${result.status}` };
    const data = await result.json() as { id?: unknown };
    if (typeof data.id !== "string" || !/^[a-f0-9-]{36}$/i.test(data.id)) return { ok: false, code: "invalid_response" };
    return { ok: true, id: data.id, status: result.status };
  } catch { return { ok: false, code: "connection_failed" }; }
}

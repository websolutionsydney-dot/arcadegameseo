import assert from "node:assert/strict";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { POST } from "../lib/enquiry-handler";
import { openDatabase } from "../server/database";

const db = await openDatabase(":memory:");
const environment = { DB: db, RESEND_API_KEY: "test-only-placeholder" };
const origin = "https://arcadegameaustralia.com.au";
type Input = Record<string, unknown>;
const make = (extra: Input = {}): Input => ({ requestId: randomUUID(), name: "Form integration test", email: `test-${randomUUID()}@example.com`, message: "Testing an exported website enquiry.", consent: true, ...extra });
const request = (body: Input | string, headers: Record<string, string> = {}) => new Request(origin + "/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json", Origin: origin, ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
const post = async (body: Input | string, headers: Record<string, string> = {}) => { const result = await POST(request(body, headers), environment); return { status: result.status, body: await result.json() as Record<string, unknown> }; };
const calls: { key: string | null; body: Record<string, unknown> }[] = [];
let failNext = false;
const originalFetch = globalThis.fetch;
// No network request is permitted: every provider call is intercepted here.
globalThis.fetch = async (url, options) => {
  assert.equal(url, "https://api.resend.com/emails");
  assert.equal(options?.method, "POST");
  const headers = new Headers(options?.headers);
  assert.equal(headers.get("Authorization"), "Bearer test-only-placeholder");
  calls.push({ key: headers.get("Idempotency-Key"), body: JSON.parse(String(options?.body)) });
  if (failNext) { failNext = false; return Response.json({ message: "private provider detail" }, { status: 503 }); }
  await new Promise(resolve => setTimeout(resolve, 25));
  return Response.json({ id: randomUUID() });
};
const checks: string[] = [];
try {
  for (const [name, values] of Object.entries({ "empty name": { name: " " }, "invalid email": { email: "invalid" }, "header injection": { email: "customer@example.com\r\nBcc:other@example.com" }, "missing message": { message: "" }, "invalid service": { service: "spam" }, "invalid date": { eventDate: "2026-02-31" }, honeypot: { website: "bot" }, consent: { consent: false } })) {
    assert.equal((await post(make(values))).status, 400, name); checks.push(name);
  }
  assert.equal((await post(make(), { Origin: "https://other.example" })).status, 403);
  assert.equal((await post(make(), { "Content-Type": "text/plain" })).status, 415);
  assert.equal((await post("{")).status, 400);
  assert.equal((await post("x".repeat(33000))).status, 413);
  assert.equal((await POST(request(make()), { DB: db })).status, 503);
  assert.equal(calls.length, 0); checks.push("invalid requests and missing key never send or show success");
  const values = make({ name: 'Test <script> & "name"', message: '<script>alert("test")</script>\nPlain text.' });
  const first = await post(values); assert.equal(first.status, 201); assert.equal(first.body.sent, true); assert.ok(first.body.reference);
  assert.equal(calls.length, 1);
  const mail = calls[0].body;
  assert.equal(mail.from, "Arcade Game Australia <admin@arcadegameaustralia.com.au>");
  assert.deepEqual(mail.to, ["admin@arcadegameaustralia.com.au"]); assert.equal(mail.reply_to, values.email);
  assert.ok(String(mail.html).includes("&lt;script&gt;")); assert.ok(!String(mail.html).includes("<script>"));
  checks.push("exact sender, recipient, reply-to and escaped HTML");
  assert.deepEqual((await post(values)).body, first.body);
  assert.deepEqual((await post({ ...values, requestId: randomUUID() })).body, first.body); assert.equal(calls.length, 1);
  assert.equal((await post({ ...values, message: "Changed content" })).status, 409);
  const concurrent = make(); const results = await Promise.all([post(concurrent), post({ ...concurrent, requestId: randomUUID() }), post(concurrent)]);
  assert.ok(results.some(result => result.status === 201)); assert.ok(results.every(result => [200, 201, 409].includes(result.status))); assert.equal(calls.length, 2);
  checks.push("duplicate and concurrent submissions send once");
  failNext = true; const retry = make(); const failed = await post(retry);
  assert.equal(failed.status, 503); assert.notEqual(failed.body.sent, true); assert.ok(!JSON.stringify(failed).includes("private provider"));
  assert.equal((await post(retry)).status, 201); assert.equal(calls[2].key, calls[3].key); assert.deepEqual(calls[2].body, calls[3].body);
  checks.push("provider failure has no false success; safe idempotent retry");
  for (let n = 0; n < 3; n++) assert.equal((await post(make({ email: "rate-limit@example.com", message: `Different ${n}` }))).status, 201);
  assert.equal((await post(make({ email: "rate-limit@example.com", message: "Fourth message" }))).status, 429);
  checks.push("email rate limit enforced");
  const report = { passed: true, checkedAt: new Date().toISOString(), transport: "Stubbed HTTPS provider; no real email sent", checks };
  fs.writeFileSync("docs/export/form-verification.json", JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
} finally { globalThis.fetch = originalFetch; }

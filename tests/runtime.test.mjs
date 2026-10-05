import assert from "node:assert/strict";
import fs from "node:fs";
import { spawn } from "node:child_process";

const dev = process.argv.includes("--dev");
const port = dev ? 3192 : 3191;
const origin = `http://127.0.0.1:${port}`;
// Blank means no provider is contacted, even if the caller has a key configured.
const child = spawn(process.execPath, ["--import", "tsx", "server/index.ts", ...(dev ? ["--dev"] : []), "--port", String(port), "--host", "127.0.0.1"], { env: { ...process.env, RESEND_API_KEY: "" }, stdio: ["ignore", "pipe", "pipe"] });
let stderr = "";
child.stderr.on("data", data => { stderr += data.toString(); });
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Server startup timeout: " + stderr)), 45000);
    child.stdout.on("data", data => { if (data.toString().includes("server: http://localhost:")) { clearTimeout(timer); resolve(); } });
    child.once("exit", code => { clearTimeout(timer); reject(new Error(`Server exited ${code}: ${stderr}`)); });
  });
  const pages = Object.keys(JSON.parse(fs.readFileSync("docs/export/published-pages.json", "utf8")).pages);
  for (const route of dev ? ["/", "/contact", "/guides/buying-an-arcade-machine"] : pages) {
    const response = await fetch(origin + route); assert.equal(response.status, 200, route); assert.ok((await response.text()).includes("<h1"));
  }
  for (const route of ["/missing-export-check", "/guides/missing-export-check"]) {
    const response = await fetch(origin + route); assert.equal(response.status, 404); assert.match(await response.text(), /GAME OVER/);
  }
  const response = await fetch(origin + "/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json", Origin: origin }, body: JSON.stringify({ requestId: crypto.randomUUID(), name: "Configuration check", email: "test@example.com", message: "No email should be sent because no key is configured.", consent: true }) });
  assert.equal(response.status, 503); const data = await response.json(); assert.ok(data.error && !data.sent);
  const query = await fetch(origin + "/contact?service=claw-machine-hire&area=Central%20Coast");
  assert.equal(query.status, 200); assert.match(await query.text(), /rel="canonical" href="https:\/\/arcadegameaustralia.com.au\/contact"/);
  const report = { passed: true, checkedAt: new Date().toISOString(), mode: dev ? "development" : "production", pageRoutes: dev ? 3 : pages.length, unknownPageStatus: 404, unknownGuideStatus: 404, missingKeyEndpointStatus: 503, falseSuccess: false, emailSent: false };
  fs.writeFileSync(`docs/export/${dev ? "development" : "runtime"}-verification.json`, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
} finally { child.kill("SIGTERM"); }

# Enquiry form delivery

The public form submits JSON to the same-origin `POST /api/enquiries` route. The server reads the hosted secret `RESEND_API_KEY` and sends through `https://api.resend.com/emails` with the fixed business sender/recipient and the submitted customer email as Reply-To.

A successful response requires Resend acceptance and contains `sent: true` plus the enquiry reference. The frontend requires this flag; a saved database record alone cannot produce a success message.

The existing database stores enquiries, delivery state and the Resend message ID. Validation, escaped HTML, bounded request sizes, a honeypot, email rate limits, atomic send claims, content deduplication and stable Resend idempotency keys protect submissions and retries. Secrets and enquiry content are never logged.

## Production diagnosis on 28 September 2026

The published version 8 was source commit `c5556ee2f9d45dcc7f84988b89542ec65db73947`. Its endpoint only inserted the enquiry into the database and returned HTTP 201. There was no Resend call. Its deployment used environment revision 0, while the configured hosted secret was in revision 4. The previous email test therefore did not validate the published form.

This change deploys the real email handler and current environment revision. Production logs trace a request using `enquiry_submission_started`, `enquiry_resend_request_started`, and `enquiry_resend_accepted`, with reference, provider HTTP status and Resend ID. Failures identify the stage or provider HTTP status without exposing credentials or submitted content.

## Local checks

`node scripts/test-enquiries.mjs` checks the built endpoint with a stubbed provider, including concurrent requests, failure/retry behavior and escaped content. These are local checks, not evidence of a live form email. A genuine live-browser submission and its matching Resend event must be verified separately.

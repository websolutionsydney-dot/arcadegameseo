"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { enquiryServiceOptions } from "@/lib/enquiry-services";

function makeRequestId() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function QuoteForm({ initialService, initialArea }: { initialService?: string; initialArea?: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const inFlight = useRef(false);
  const submission = useRef({ signature: "", id: "" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    const data = new FormData(event.currentTarget);
    const values = { ...Object.fromEntries(data), consent: data.get("consent") === "on" };
    const signature = JSON.stringify(values);
    if (submission.current.signature !== signature) submission.current = { signature, id: makeRequestId() };
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(25000),
        body: JSON.stringify({ ...values, requestId: submission.current.id }),
      });
      const result = await response.json() as { error?: string; reference?: string; sent?: boolean };
      if (!response.ok || result.sent !== true || !result.reference) {
        setError(result.error || "We could not send your enquiry. Please try again.");
        return;
      }
      setReference(result.reference);
    } catch {
      setError("We could not confirm your enquiry was sent. Please check your connection and try again.");
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  if (reference) return <div className="form-success" role="status" aria-live="polite">
    <CheckCircle2 size={38} /><h2>THANKS.<br />WE’VE GOT IT.</h2>
    <p>Your enquiry has been sent to our team. Thank you for contacting Arcade Game Australia.</p>
    <span className="reference">Reference: {reference}</span>
    <p>This is an enquiry, not a confirmed booking. Equipment, pricing and dates are confirmed separately.</p>
    <a href="/" className="button button-dark">Back to the good times <ArrowUpRight size={17} /></a>
  </div>;

  return <form className="quote-form" onSubmit={submit} aria-busy={pending} aria-describedby="enquiry-form-note">
    <fieldset className="form-grid" disabled={pending} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
      <legend className="sr-only">Contact and enquiry details</legend>
      <div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} /></div>
      <div className="field"><label htmlFor="email">Email *</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></div>
      <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Your best contact number" maxLength={40} /></div>
      <div className="field"><label htmlFor="eventDate">Preferred date</label><input id="eventDate" name="eventDate" type="date" /></div>
      <div className="field full"><label htmlFor="service">Service required</label><NativeSelect id="service" name="service" defaultValue={enquiryServiceOptions.some(option => option.value === initialService) ? initialService : ""}>
        <NativeSelectOption value="">Select a service (optional)</NativeSelectOption>
        {enquiryServiceOptions.map(option => <NativeSelectOption key={option.value} value={option.value}>{option.label}</NativeSelectOption>)}
      </NativeSelect></div>
      <div className="field full"><label htmlFor="location">Location / suburb</label><input id="location" name="location" autoComplete="address-level2" placeholder="Suburb, town or postcode" maxLength={150} defaultValue={initialArea?.slice(0, 150) || ""} /></div>
      <div className="field full"><label htmlFor="message">Message *</label><textarea id="message" name="message" required maxLength={4000} placeholder="Your event or venue, the machines you have in mind, timing, space or access details…" /></div>
    </fieldset>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="form-consent"><input type="checkbox" name="consent" required disabled={pending} /><span>I agree that my details can be used to respond to this enquiry, as described in the <a href="/privacy">privacy notice</a>. *</span></label>
    {error && <div className="form-error" role="alert">{error} Your details are still in the form.</div>}
    <button type="submit" className="button button-dark" disabled={pending}>{pending ? <>Sending your enquiry <LoaderCircle size={17} className="animate-spin" /></> : <>Send enquiry <ArrowUpRight size={18} /></>}</button>
    <p className="form-note" id="enquiry-form-note">Your enquiry is sent directly to our team. Sending this form does not confirm availability or create a booking.</p>
  </form>;
}

"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import { membershipTypes, businessCategories, requestPages } from "@/lib/enquiries";

export function EnquiryForm({ sourcePage }: { sourcePage: keyof typeof requestPages }) {
  const kind = requestPages[sourcePage];
  const membership = kind === "membership";
  const booking = kind === "booking";
  const [busy, setBusy] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const [reference, setReference] = useState("");
  const requestId = useRef<string | null>(null);
  const pendingPayload = useRef("");
  const feedback = useRef<HTMLDivElement>(null);
  const title = membership ? "Become a member" : booking ? "Request a meeting space" : kind === "renewal" ? "Renew your membership" : kind === "advertising" ? "Advertise with us" : "How can we help?";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError(""); setFields({});
    if (!consent) { setError("Please agree to be contacted about your request."); return; }
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const payload = JSON.stringify({ ...values, sourcePage, consent });
    if (!requestId.current || pendingPayload.current !== payload) requestId.current = crypto.randomUUID();
    pendingPayload.current = payload;
    setBusy(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...JSON.parse(payload), id: requestId.current }),
      });
      const result = await response.json();
      if (!response.ok) {
        setFields(result.fields ?? {});
        throw new Error(result.error || "We couldn’t save your request. Please try again.");
      }
      setReference(result.reference);
      requestAnimationFrame(() => feedback.current?.focus());
    } catch (error) {
      setError(error instanceof Error ? error.message : "The connection was interrupted. Your details are still here — please try again.");
    } finally { setBusy(false); }
  }
  const field = (name: string, label: string, type = "text", required = true, autoComplete?: string) => (
    <label key={name}>
      {label}{required && " *"}
      <Input name={name} type={type} required={required} autoComplete={autoComplete} maxLength={type === "email" ? 254 : type === "tel" ? 25 : 160}
        min={type === "number" ? 1 : type === "date" ? new Date().toISOString().slice(0,10) : undefined} max={type === "number" ? 10000 : undefined}
        aria-invalid={!!fields[name]} aria-describedby={fields[name] ? `${name}-error` : undefined} />
      {fields[name] && <span className="field-error" id={`${name}-error`}>{fields[name][0]}</span>}
    </label>
  );
  const select = (name: string, label: string, choices: readonly string[]) => (
    <label>{label} *
      <NativeSelect name={name} required defaultValue="" aria-invalid={!!fields[name]} aria-describedby={fields[name] ? `${name}-error` : undefined}>
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {choices.map(choice => <option key={choice} value={choice}>{choice}</option>)}
      </NativeSelect>
      {fields[name] && <span className="field-error" id={`${name}-error`}>{fields[name][0]}</span>}
    </label>
  );
  return (
    <section className="enquiry-section" id="request" aria-labelledby="request-title">
      <div className="enquiry-intro">
        <p className="eyebrow">{membership ? "YOUR NEXT CHAPTER" : "LET’S CONNECT"}</p>
        <h2 id="request-title">{title}<span>.</span></h2>
        <p>{membership ? "Build new connections, find business opportunities and be part of Vizag’s growing community. Tell us about you and your organisation." : booking ? "Tell us about your meeting. Availability, pricing and your reservation will be confirmed separately." : "Share your details and your request using the form below."}</p>
        {membership && <a href="/join/benefits" className="underlined-link">Explore membership benefits <ArrowUpRight size={16} /></a>}
        <p className="form-note">* Required fields. Your request is saved securely on this website.</p>
      </div>
      {reference ? (
        <div className="enquiry-success" role="status" tabIndex={-1} ref={feedback}>
          <CheckCircle2 size={44} />
          <h3>{membership ? "Application received" : "Request received"}</h3>
          <p>Your {membership ? "application" : "request"} has been saved for review. Keep this reference for your records.</p>
          <strong className="request-reference">{reference}</strong>
          <p>{membership ? "Membership confirmation and any applicable fees are handled separately." : booking ? "This is an enquiry. Your venue is not reserved until availability is confirmed." : "Your request is pending review."}</p>
          <a href="/" className="button button-gold">Back to the Chamber</a>
        </div>
      ) : (
        <form className="enquiry-form" onSubmit={submit} aria-busy={busy}>
          <fieldset className="form-grid" disabled={busy}>
            <legend className="sr-only">{title}</legend>
            {membership && <>{select("membershipType", "Membership type", membershipTypes)}{select("businessCategory", "Business category", businessCategories)}</>}
            {field("company", "Company / organisation", "text", membership, "organization")}
            {field("fullName", "Full name", "text", true, "name")}
            {field("email", "Email address", "email", true, "email")}
            {field("phone", "Phone number", "tel", true, "tel")}
            {membership && <>{field("contactPerson", "Person in charge")}
              <label>Address *<Textarea name="address" required rows={3} maxLength={1000} autoComplete="street-address" aria-invalid={!!fields.address} />{fields.address && <span className="field-error">{fields.address[0]}</span>}</label>
            </>}
            {kind === "renewal" && field("memberId", "Membership number (if known)", "text", false)}
            {booking && <>{select("venue", "Meeting space", ["VCCI Conference Hall", "Board Room"])}{field("eventDate", "Preferred date", "date")}{select("duration", "Duration", ["3 Hours", "4 Hours", "Full Day"])}{field("capacity", "Number of attendees", "number")}</>}
            <label className="wide">{membership ? "Message (optional)" : "Tell us about your request *"}
              <Textarea name="message" rows={4} maxLength={3000} required={!membership} aria-invalid={!!fields.message} placeholder={booking ? "Purpose of the meeting, preferred time and any additional requirements…" : "How can the Chamber support you?"} />
              {fields.message && <span className="field-error">{fields.message[0]}</span>}
            </label>
            <div className="form-honeypot" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <div className="consent-row wide">
              <Checkbox id="request-consent" checked={consent} onCheckedChange={v => setConsent(v === true)} aria-required="true" />
              <label htmlFor="request-consent">I agree to be contacted about this request and have read the <a href="/privacy-policy" target="_blank" rel="noreferrer">privacy policy</a>.</label>
            </div>
            {error && <p className="form-error wide" role="alert">{error}</p>}
            <button type="submit" className="button button-gold wide" disabled={busy}>
              {busy ? <><LoaderCircle className="form-spinner" size={18} /> Saving your request…</> : <>{membership ? "Submit membership application" : "Submit request"}<ArrowUpRight size={18} /></>}
            </button>
          </fieldset>
        </form>
      )}
    </section>
  );
}

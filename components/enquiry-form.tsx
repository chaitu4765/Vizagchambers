"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import { enquirySchema, membershipTypes, businessCategories, requestPages, todayInVizag } from "@/lib/enquiries";

export function EnquiryForm({ sourcePage }: { sourcePage: keyof typeof requestPages }) {
  const kind = requestPages[sourcePage];
  const membership = kind === "membership";
  const booking = kind === "booking";
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const [emailDraft, setEmailDraft] = useState("");
  const feedback = useRef<HTMLDivElement>(null);
  const title = membership ? "Become a member" : booking ? "Request a meeting space" : kind === "renewal" ? "Renew your membership" : kind === "advertising" ? "Advertise with us" : "How can we help?";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setFields({});
    if (!consent) { setError("Please agree to be contacted about your request."); return; }
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = enquirySchema.safeParse({ ...values, sourcePage, consent });
    if (!parsed.success) {
      setFields(parsed.error.flatten().fieldErrors);
      setError("Please check the highlighted fields.");
      return;
    }
    const labels: Record<string, string> = { fullName: "Full name", email: "Email", phone: "Phone", company: "Organisation", membershipType: "Membership type", businessCategory: "Business category", contactPerson: "Person in charge", address: "Address", memberId: "Membership number", venue: "Meeting space", eventDate: "Preferred date", duration: "Duration", capacity: "Attendees", message: "Message" };
    const body = Object.entries(parsed.data).filter(([key, value]) => labels[key] && value).map(([key, value]) => `${labels[key]}: ${value}`).join("\n\n");
    setEmailDraft(`${title}\n\n${body}\n\nEnquiry page: ${sourcePage}`);
    requestAnimationFrame(() => feedback.current?.focus());
  }
  const field = (name: string, label: string, type = "text", required = true, autoComplete?: string) => (
    <label key={name}>
      {label}{required && " *"}
      <Input name={name} type={type} required={required} autoComplete={autoComplete} maxLength={type === "email" ? 254 : type === "tel" ? 25 : 160}
        min={type === "number" ? 1 : type === "date" ? todayInVizag() : undefined} max={type === "number" ? 10000 : undefined}
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
        <p className="form-note">* Required fields. This form prepares an email for you to send to the Chamber. Your details are not saved on this website.</p>
      </div>
      <div>
      {emailDraft && (
        <div className="enquiry-success" role="status" tabIndex={-1} ref={feedback}>
          <CheckCircle2 size={44} />
          <h3>Your email draft is ready</h3>
          <p>Nothing has been sent yet. Open your email app, review the details and send your enquiry to vizagchamber@gmail.com.</p>
          <a href={`mailto:vizagchamber@gmail.com?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailDraft)}`} className="button button-gold">Open email app <ArrowUpRight size={18} /></a>
          <label>Or copy this draft into your email<Textarea aria-label="Email draft" value={emailDraft} readOnly rows={10} /></label>
          <p>{membership ? "Membership confirmation and any applicable fees are handled separately." : booking ? "Your venue is not reserved until availability is confirmed." : "The Chamber will respond by email."}</p>
        </div>
      )}
        <form className="enquiry-form" onSubmit={submit} onChange={() => setEmailDraft("")}>
          <fieldset className="form-grid">
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
            <button type="submit" className="button button-gold wide">
              Prepare email enquiry<ArrowUpRight size={18} />
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

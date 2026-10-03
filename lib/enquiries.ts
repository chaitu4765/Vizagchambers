import { z } from "zod";

export const membershipTypes = ["Business Membership", "Association Membership"] as const;
export const businessCategories = ["Textiles", "Exporter", "Hotel", "Manufacturer & Exporter", "Jewellery", "Other"] as const;
export const requestPages = {
  "/join": "membership",
  "/join/renewal": "renewal",
  "/host_event": "event",
  "/conference_hall_booking": "booking",
  "/services/helpdesk": "helpdesk",
  "/services/visa": "visa",
  "/women_wing": "membership",
  "/youth_wing": "membership",
  "/alumni_forum": "membership",
  "/member_of_week/advertise": "advertising",
  "/contact-us": "contact",
} as const;

const shortText = z.string().trim().max(160);
export const todayInVizag = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
export const enquirySchema = z.object({
  sourcePage: z.string().refine((v) => Object.hasOwn(requestPages, v), "Choose a valid enquiry page."),
  fullName: shortText.min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address.").max(254).transform(v => v.toLowerCase()),
  phone: z.string().trim().regex(/^[+\d()\s.-]{7,25}$/, "Enter a valid phone number.").refine(v => v.replace(/\D/g, "").length >= 7, "Enter a valid phone number."),
  company: shortText,
  membershipType: z.string().max(80).optional(),
  businessCategory: z.string().max(80).optional(),
  contactPerson: shortText.optional(),
  address: z.string().trim().max(1000).optional(),
  memberId: shortText.optional(),
  venue: z.string().max(80).optional(),
  eventDate: z.string().max(10).optional(),
  duration: z.string().max(40).optional(),
  capacity: z.string().max(6).optional(),
  message: z.string().trim().max(3000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to be contacted about your request." }) }),
  website: z.string().max(0).optional(),
}).superRefine((v, ctx) => {
  const issue = (path: string, message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
  const kind = requestPages[v.sourcePage as keyof typeof requestPages];
  if (kind === "membership") {
    if (!membershipTypes.includes(v.membershipType as typeof membershipTypes[number])) issue("membershipType", "Choose a membership type.");
    if (!businessCategories.includes(v.businessCategory as typeof businessCategories[number])) issue("businessCategory", "Choose a business category.");
    if (!v.company) issue("company", "Enter your organisation name.");
    if (!v.contactPerson) issue("contactPerson", "Enter the person in charge.");
    if (!v.address) issue("address", "Enter your address.");
  }
  if (kind === "booking") {
    if (!["VCCI Conference Hall", "Board Room"].includes(v.venue ?? "")) issue("venue", "Choose a meeting space.");
    const date = v.eventDate ?? "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date || date < todayInVizag()) issue("eventDate", "Choose today or a future date.");
    if (!["3 Hours", "4 Hours", "Full Day"].includes(v.duration ?? "")) issue("duration", "Choose a duration.");
    if (!/^\d+$/.test(v.capacity ?? "") || Number(v.capacity) < 1 || Number(v.capacity) > 10000) issue("capacity", "Enter the number of attendees.");
  }
  if (kind !== "membership" && !v.message) issue("message", "Tell us about your request.");
});

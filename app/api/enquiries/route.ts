import { getD1 } from "@/db";
import { enquirySchema, requestPages } from "@/lib/enquiries";

const headers = { "Cache-Control": "no-store" };
const reply = (body: unknown, status = 200) => Response.json(body, { status, headers });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply({ error: "Please submit the form from this website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return reply({ error: "Send a JSON form submission." }, 415);
  if (Number(request.headers.get("content-length")) > 20000) return reply({ error: "Your submission is too long." }, 413);
  let raw: unknown;
  try {
    // Bound the stream as well as Content-Length, which can be omitted.
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Your form is empty." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 20000) { await reader.cancel(); return reply({ error: "Your submission is too long." }, 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    raw = JSON.parse(new TextDecoder().decode(bytes));
  } catch { return reply({ error: "We couldn’t read your form. Please try again." }, 400); }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return reply({ error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors }, 400);
  }
  const { id, fullName, email, phone, company, sourcePage, website: _website, ...details } = parsed.data;
  const kind = requestPages[sourcePage as keyof typeof requestPages];
  const normalized = JSON.stringify({ fullName, email, phone, company, sourcePage, ...details });
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  try {
    const db = getD1();
    const results = await db.batch([
      db.prepare(`INSERT INTO enquiries (id, kind, source_page, full_name, email, phone, company, details, payload_hash, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?) ON CONFLICT(id) DO NOTHING`).bind(id, kind, sourcePage, fullName, email, phone, company, JSON.stringify(details), hash, new Date().toISOString()),
      db.prepare("SELECT payload_hash FROM enquiries WHERE id = ?").bind(id),
    ]);
    if (results[1].results[0]?.payload_hash !== hash) return reply({ error: "This request was already submitted with different details. Please start a new form." }, 409);
    return reply({ reference: `VCCI-${id.toUpperCase()}`, status: "pending" }, results[0].meta.changes ? 201 : 200);
  } catch (error) {
    console.error("Enquiry storage unavailable", error instanceof Error ? error.message : "Unknown database error");
    return reply({ error: "We couldn’t save your request right now. Your details are still here — please try again." }, 503);
  }
}

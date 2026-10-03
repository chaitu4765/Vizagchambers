import { neon } from "@neondatabase/serverless";
import type { EnquiryRecord, EnquirySaveResult } from "./enquiry-record";

export async function saveEnquiry(record: EnquiryRecord): Promise<EnquirySaveResult> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Membership storage requires a Neon DATABASE_URL in the Vercel project.");
  // Initialize only during a request, so deployments can build before storage is connected.
  const sql = neon(connectionString);
  const [inserted, saved] = await sql.transaction([
    sql`INSERT INTO enquiries (id, kind, source_page, full_name, email, phone, company, details, payload_hash, status, created_at)
      VALUES (${record.id}, ${record.kind}, ${record.sourcePage}, ${record.fullName}, ${record.email}, ${record.phone}, ${record.company}, ${record.details}, ${record.payloadHash}, 'pending', ${record.createdAt})
      ON CONFLICT(id) DO NOTHING RETURNING id`,
    sql`SELECT payload_hash FROM enquiries WHERE id = ${record.id}`,
  ]);
  return { created: inserted.length > 0, payloadHash: saved[0]?.payload_hash as string | undefined };
}

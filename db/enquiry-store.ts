import { getD1 } from "./index";
import type { EnquiryRecord, EnquirySaveResult } from "./enquiry-record";

export async function saveEnquiry(record: EnquiryRecord): Promise<EnquirySaveResult> {
  const db = getD1();
  const results = await db.batch([
    db.prepare(`INSERT INTO enquiries (id, kind, source_page, full_name, email, phone, company, details, payload_hash, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?) ON CONFLICT(id) DO NOTHING`)
      .bind(record.id, record.kind, record.sourcePage, record.fullName, record.email, record.phone, record.company, record.details, record.payloadHash, record.createdAt),
    db.prepare("SELECT payload_hash FROM enquiries WHERE id = ?").bind(record.id),
  ]);
  const saved = results[1].results[0] as { payload_hash: string } | undefined;
  return { created: !!results[0].meta.changes, payloadHash: saved?.payload_hash };
}

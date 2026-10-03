export type EnquiryRecord = {
  id: string;
  kind: string;
  sourcePage: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  details: string;
  payloadHash: string;
  createdAt: string;
};
export type EnquirySaveResult = { created: boolean; payloadHash?: string };

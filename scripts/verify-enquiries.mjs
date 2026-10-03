import assert from "node:assert/strict";
const origin = process.argv[2] || "http://127.0.0.1:5173";
// Synthetic submissions are for the local preview only.
assert.match(origin, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const submission = {
  id: crypto.randomUUID(), sourcePage: "/join", fullName: "Local Form Test", email: "membership-test@example.com",
  phone: "+91 9999999999", company: "Local Test Organisation", membershipType: "Business Membership", businessCategory: "Other",
  contactPerson: "Local Test Contact", address: "Test address, Visakhapatnam", message: "Local validation only", consent: true,
};
let previewRestarts = 0;
const post = async (body, extraHeaders = {}) => {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(origin + "/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json", Origin: origin, ...extraHeaders }, body: JSON.stringify(body) });
    // Wrangler can reload its local Worker between requests. Retry only that
    // explicit infrastructure response, using the same idempotency key.
    if (attempt >= 2 || response.status !== 503 || !(await response.clone().text()).startsWith("Your worker restarted mid-request.")) return response;
    previewRestarts++;
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};
let r = await post({ ...submission, email: "not-an-email", company: "" });
assert.equal(r.status,400); const invalid = await r.json(); assert.ok(invalid.fields.email);
r = await post({ ...submission, company:"" }); assert.equal(r.status,400); assert.ok((await r.json()).fields.company);
r = await post({ ...submission, consent:false }); assert.equal(r.status,400);
r = await post({ ...submission, sourcePage:"constructor" }); assert.equal(r.status,400);
r = await post(submission, { Origin: "https://unrelated.example.com" }); assert.equal(r.status,403);
r = await post({ ...submission, message: "x".repeat(21000) }); assert.equal(r.status,413);
r = await post(submission); assert.equal(r.status,201); const saved = await r.json(); assert.equal(saved.status,"pending"); assert.equal(saved.reference,"VCCI-" + submission.id.toUpperCase());
r = await post(submission); assert.equal(r.status,200); assert.equal((await r.json()).reference,saved.reference);
r = await post({ ...submission, company:"Different Organisation" }); assert.equal(r.status,409);
r = await fetch(origin + "/api/enquiries"); assert.equal(r.status,405);
console.log(JSON.stringify({ checks:10, status:"passed", previewRestarts, localSubmissionId:submission.id }));

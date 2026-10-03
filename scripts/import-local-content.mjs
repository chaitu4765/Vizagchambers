import fs from "node:fs";
import path from "node:path";
const research = path.resolve("../research");
const read = file => JSON.parse(fs.readFileSync(path.join(research, file), "utf8"));
const escape = s => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const base = p => ({ route: p.route, url: p.url, title: p.title, status: 200, contentHtml: "", tabs: [], eventCards: [], forms: [] });
const docs = read("document-manifest.json").documents;
const links = {};
const extraPages = [];
fs.mkdirSync("public/documents", { recursive: true });
for (const d of docs) {
  const pathname = decodeURIComponent(new URL(d.sourceURL).pathname);
  if (d.status === "downloaded") {
    fs.copyFileSync(path.join(research, "documents", d.filename), path.join("public/documents", d.filename));
    links[pathname] = d.localPath;
  } else {
    const route = "/publications/" + d.filename.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    links[pathname] = route;
    extraPages.push({ ...base({ route, title: d.title || "Publication", url: d.sourceURL }), contentHtml: `<div class="empty-state"><h2>This publication is currently unavailable</h2><p>The original archive does not currently provide a downloadable copy of ${escape(d.title || "this publication")}. Its cover and listing have been retained.</p><p><a href="/contact-us#request">Request a copy from the Chamber</a></p><p><a href="/#publications">Browse other publications</a></p></div>` });
  }
}
const events = read("event-details.json");
for (const e of events) {
  const photos = e.images.length ? e.images : e.thumbnail && !e.thumbnail.endsWith("/uploads/") ? [e.thumbnail] : [];
  extraPages.push({ ...base(e), contentHtml: e.descriptionHtml || "<p>The original archive contains this event listing without further details.</p>", detailDate: e.date, detailImages: photos, backHref: e.route.startsWith("/csr_events/") ? "/csr_events" : e.route.startsWith("/women_wing/") ? "/women_wing" : e.route.startsWith("/youth_wing/") ? "/youth_wing" : "/events/past-events" });
}
if (fs.existsSync(path.join(research, "city-details.json"))) {
  const cities = read("city-details.json");
  for (const c of Array.isArray(cities) ? cities : cities.pages) extraPages.push({ ...base(c), contentHtml: c.contentHtml, backHref: "/city_network" });
}
fs.writeFileSync("data/document-links.json", JSON.stringify(links));
fs.writeFileSync("data/detail-pages.json", JSON.stringify(extraPages));
console.log(`Imported ${events.length} event details, ${extraPages.length - events.length - 2} city details and ${docs.filter(d => d.status === "downloaded").length} documents.`);

import fs from "node:fs/promises";
const origin = process.argv[2] || "http://127.0.0.1:5173";
const routes = [...new Set([
  "/",
  ...JSON.parse(await fs.readFile("data/routes.json", "utf8")),
  ...JSON.parse(await fs.readFile("data/detail-pages.json", "utf8")).map(p => p.route),
])];
const results = [];
for (let i = 0; i < routes.length; i += 3) {
  await Promise.all(
    routes.slice(i, i + 3).map(async (route) => {
      const response = await fetch(origin + route, {
        signal: AbortSignal.timeout(20000),
      });
      const html = await response.text();
      results.push({
        route,
        status: response.status,
        main: html.includes('id="main-content"'),
        footer: html.includes("site-footer"),
        legacyLinks: [...html.matchAll(/<a\s[^>]*href="([^"]+)"/g)].map(m => m[1]).filter(href => /^https?:\/\/(www\.)?vizagchamber\.com(?:\/|$)/i.test(href)),
      });
    }),
  );
}
const missing = await fetch(origin + "/definitely-not-a-chamber-page", {
  signal: AbortSignal.timeout(20000),
});
const failures = results.filter(
  (r) => r.status !== 200 || !r.main || !r.footer || r.legacyLinks.length,
);
console.log(
  JSON.stringify({
    routes: results.length,
    failures,
    notFoundStatus: missing.status,
  }),
);
await fs.writeFile(
  "../research/route-verification.json",
  JSON.stringify(results, null, 2),
);
if (failures.length || missing.status !== 404) process.exitCode = 1;

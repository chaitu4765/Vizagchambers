import { readFile, writeFile, mkdir } from "node:fs/promises";

const origin = process.argv[2] || "http://127.0.0.1:5173";
const data = await Promise.all(["pages", "detail-pages", "gallery-details"].map(async name => JSON.parse(await readFile(new URL(`../data/${name}.json`, import.meta.url), "utf8"))));
const routes = [...new Set(["/", "/dashboard", "/demo", "/login", ...data.flat().map(page => page.route)])];
async function batch(items, action) {
  const result = [];
  for (let i = 0; i < items.length; i += 4) result.push(...await Promise.all(items.slice(i, i + 4).map(action)));
  return result;
}
const pages = await batch(routes, async route => {
  try {
    const response = await fetch(origin + route, { signal: AbortSignal.timeout(20000) });
    return { route, status: response.status, finalUrl: response.url, html: await response.text() };
  } catch (error) { return { route, error: error.message, html: "" }; }
});
const targets = new Set();
const fragments = [];
for (const page of pages) {
  // HTML attributes only: RSC payload snapshots contain historical source links.
  for (const [, attribute, raw] of page.html.matchAll(/\b(href|src)="([^"<>]*)"/g)) {
    if (!raw || raw.startsWith("data:") || raw.startsWith("mailto:") || raw.startsWith("tel:")) continue;
    try {
      const url = new URL(raw.replaceAll("&amp;", "&"), origin + page.route);
      if (url.origin !== origin || url.pathname.startsWith("/@") || url.pathname.startsWith("/node_modules/") || url.pathname.startsWith("/_next/") || url.pathname.startsWith("/app/") || url.pathname.startsWith("/components/")) continue;
      targets.add(url.pathname);
      if (attribute === "href" && url.hash) fragments.push({ from: page.route, to: url.pathname, hash: decodeURIComponent(url.hash.slice(1)) });
    } catch { /* Non-URL browser import paths are outside the navigation audit. */ }
  }
}
const known = new Map(pages.map(page => [page.route, page]));
const extra = await batch([...targets].filter(path => !known.has(path)), async path => {
  try { const response = await fetch(origin + path, { method: "HEAD", signal: AbortSignal.timeout(20000) }); return { path, status: response.status }; }
  catch (error) { return { path, error: error.message }; }
});
const missingFragments = fragments.filter(link => {
  const page = known.get(link.to);
  return page && !page.html.includes(`id="${link.hash}"`) && !page.html.includes(`name="${link.hash}"`);
}).filter((link, index, all) => all.findIndex(x => x.to === link.to && x.hash === link.hash && x.from === link.from) === index);
const report = {
  checkedAt: new Date().toISOString(), origin,
  routes: pages.map(({ html, ...page }) => page),
  linkedTargets: extra,
  missingServerRenderedFragments: missingFragments,
  summary: { routes: pages.length, routeFailures: pages.filter(page => page.status !== 200).length, extraTargets: extra.length, targetFailures: extra.filter(target => target.status !== 200).length },
};
await mkdir(new URL("../outputs/", import.meta.url), { recursive: true });
await writeFile(new URL("../outputs/qa-fix-verification.json", import.meta.url), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report.summary, failures: [...pages.filter(page => page.status !== 200).map(({ html, ...page }) => page), ...extra.filter(target => target.status !== 200)], missingFragments }, null, 2));
if (report.summary.routeFailures || report.summary.targetFailures) process.exitCode = 1;

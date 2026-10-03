import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const pages = JSON.parse(await fs.readFile("data/pages.json", "utf8"));
const galleries = JSON.parse(
  await fs.readFile("data/gallery-details.json", "utf8"),
);
const assets = new Set(await fs.readdir("public/assets"));
const routes = new Set([
  ...pages.map((p) => p.route),
  ...galleries.map((g) => g.route),
]);
const base = "https://www.vizagchamber.com";
function enhance(html) {
  html = html.replace(/href="([^"]+)"/g, (match, url) => {
    if (url.startsWith(base)) {
      try {
        const u = new URL(url);
        if (routes.has(u.pathname)) return `href="${u.pathname}${u.hash}"`;
        if (u.pathname === "/") return 'href="/"';
        if (u.hash && u.pathname === "") return `href="${u.hash}"`;
      } catch {}
    }
    if (url === "#join-form" || url.startsWith("#nav-"))
      return 'href="#request"';
    if (/^https?:/.test(url))
      return `href="${url}" target="_blank" rel="noopener noreferrer"`;
    return match;
  });
  html = html.replace(/src="([^"]+)"/g, (match, url) =>
    assets.has(url.split("/").pop())
      ? `src="/assets/${url.split("/").pop()}"`
      : match,
  );
  html = html.replace(/alt="(?:\.\.\.|)"/g, 'alt="Chamber photograph"');
  html = html.replace(
    /<button\b[^>]*>([\s\S]*?)<\/button>/gi,
    '<a href="#request">$1</a>',
  );
  return html.trim();
}
for (const p of pages) {
  p.contentHtml = enhance(p.contentHtml || "");
  for (const t of p.tabs || []) t.contentHtml = enhance(t.contentHtml);
}
await fs.writeFile("data/pages.json", JSON.stringify(pages));
await fs.writeFile("data/routes.json", JSON.stringify([...routes]));
// Keep every original photograph; resize only oversized files for practical page loads.
let before = 0,
  after = 0;
for (const file of assets) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const target = path.join("public/assets", file);
  const input = await fs.readFile(target);
  before += input.length;
  const meta = await sharp(input).metadata();
  if (input.length > 250000 || meta.width > 2000) {
    const output = await sharp(input)
      .rotate()
      .resize({
        width: 1800,
        height: 1500,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat(/png$/i.test(file) ? "png" : "jpeg", { quality: 82 })
      .toBuffer();
    if (output.length < input.length) {
      await fs.writeFile(target, output);
      after += output.length;
    } else after += input.length;
  } else after += input.length;
}
console.log(
  JSON.stringify({
    pages: pages.length,
    galleries: galleries.length,
    assets: assets.size,
    originalImageBytes: before,
    optimizedImageBytes: after,
  }),
);

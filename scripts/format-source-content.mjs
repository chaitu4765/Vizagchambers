import fs from "node:fs/promises";
const pages = JSON.parse(await fs.readFile("data/pages.json", "utf8"));
const voids = new Set([
  "img",
  "br",
  "hr",
  "input",
  "meta",
  "link",
  "source",
  "wbr",
]);
function format(html) {
  const root = { tag: "root", attrs: "", children: [] };
  const stack = [root];
  for (const m of html.matchAll(/<\/?([a-z][\w:-]*)\b([^>]*?)>|([^<]+)/gi)) {
    if (m[3]) {
      stack.at(-1).children.push({ text: m[3] });
      continue;
    }
    const tag = m[1].toLowerCase();
    if (m[0].startsWith("</")) {
      for (let i = stack.length - 1; i > 0; i--)
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      continue;
    }
    const el = { tag, attrs: m[2], children: [] };
    stack.at(-1).children.push(el);
    if (!voids.has(tag) && !m[0].endsWith("/>")) stack.push(el);
  }
  const count = (n, fn) =>
    (fn(n) ? 1 : 0) + (n.children || []).reduce((s, c) => s + count(c, fn), 0);
  function mark(n) {
    if (!n.children) return;
    const kids = n.children.filter((c) => c.tag);
    if (
      kids.length >= 2 &&
      kids.every(
        (c) =>
          c.tag === "div" &&
          count(c, (x) => x.tag === "img") === 1 &&
          count(c, (x) => /^h[2-6]$/.test(x.tag)) >= 1,
      )
    ) {
      n.attrs += ' class="source-card-grid"';
      for (const c of kids) c.attrs += ' class="source-card"';
    }
    n.children.forEach(mark);
  }
  const serialize = (n) =>
    n.text !== undefined
      ? n.text
      : n.tag === "root"
        ? n.children.map(serialize).join("")
        : `<${n.tag}${n.attrs}>${voids.has(n.tag) ? "" : n.children.map(serialize).join("") + `</${n.tag}>`}`;
  mark(root);
  return serialize(root)
    .replace(
      /<a href="\/">(\s*(?:Book Now|join now)\s*)<\/a>/gi,
      '<a href="#request">$1</a>',
    )
    .replace(
      /<h2>Enquiry form<\/h2>/g,
      "<h2>Membership enquiries</h2><p>Contact the Chamber or use its official form to enquire about membership.</p>",
    );
}
for (const p of pages) {
  if (p.route === "/conference_hall_booking") {
    const index = p.contentHtml.indexOf("<h4>Function Halls");
    if (index >= 0)
      p.contentHtml = p.contentHtml.slice(
        0,
        p.contentHtml.lastIndexOf("<section>", index),
      );
  }
  p.contentHtml = format(p.contentHtml);
  for (const t of p.tabs) t.contentHtml = format(t.contentHtml);
}
await fs.writeFile("data/pages.json", JSON.stringify(pages));
console.log(
  "Styled source card collections and corrected original form links.",
);

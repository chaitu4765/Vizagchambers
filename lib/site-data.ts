import content from "@/data/content.json";
import documents from "@/data/document-links.json";
export { content };
export const source = "https://www.vizagchamber.com";
export const localLink = (href: string) => {
  if (/^https?:\/\/vccieco\.fdpconnect\.com/i.test(href)) return "/join#request";
  if (!/^https?:\/\/(www\.)?vizagchamber\.com(?:\/|$)/i.test(href) && !href.startsWith("/uploads/")) return href;
  const u = new URL(href, source);
  const path = decodeURIComponent(u.pathname);
  const document = (documents as Record<string, string>)[path];
  if (document) return document;
  if (["/-", "/MEMBER 2"].includes(path)) return "/member_of_week/advertise#request";
  if (path.startsWith("/uploads/")) return "/gallery";
  return u.pathname + u.search + u.hash;
};
export const localizeHtml = (html: string) => html.replace(/href="([^"]*)"/g, (_, href: string) => `href="${localLink(href)}"`);
export const asset = (src: string) => `/assets/${src.split("/").pop()}`;

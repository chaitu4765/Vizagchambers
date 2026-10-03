import content from "@/data/content.json";
import routeList from "@/data/routes.json";
export { content };
export const source = "https://www.vizagchamber.com";
const routes = new Set(routeList);
export const localLink = (href: string) => {
  if (href === source || href === `${source}/`) return "/";
  if (href.startsWith(source)) {
    const u = new URL(href);
    if (routes.has(u.pathname)) return u.pathname + u.search + u.hash;
  }
  return href;
};
export const asset = (src: string) => `/assets/${src.split("/").pop()}`;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage, { type ContentPageData } from "@/components/content-page";
import pages from "@/data/pages.json";
import directories from "@/data/directories.json";
import galleries from "@/data/gallery-details.json";
export function generateStaticParams() {
  return [...pages.map((p) => p.route), ...galleries.map((g) => g.route)].map(
    (route) => ({ slug: route.split("/").filter(Boolean) }),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const route = "/" + (await params).slug.join("/");
  const page =
    pages.find((p) => p.route === route) ||
    galleries.find((g) => g.route === route);
  return {
    title: `${page?.title || "Page"} | Vizag Chamber`,
    description: `Explore ${page?.title || "the Chamber"} at the Vizagapatam Chamber of Commerce and Industry.`,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const route = "/" + (await params).slug.join("/");
  const gallery = galleries.find((g) => g.route === route);
  const page = pages.find((p) => p.route === route);
  if (!page && !gallery) notFound();
  const directory = directories[route as keyof typeof directories];
  const data: ContentPageData = page
    ? {
        route: page.route,
        title: page.title,
        url: page.url,
        status: page.status,
        contentHtml:
          (page.tabs.length && route !== "/join") ||
          route === "/join/members_directory"
            ? ""
            : page.contentHtml,
        tabs: page.tabs.map((t) => ({
          ...t,
          contentHtml: /directory/i.test(t.title) ? "" : t.contentHtml,
        })),
        eventCards: page.eventCards,
        forms: page.forms.map((f) => ({ action: f.action })),
      }
    : {
        route,
        title: gallery!.title,
        url: gallery!.href,
        status: 200,
        contentHtml: "",
        tabs: [],
        eventCards: [],
        forms: [],
      };
  return (
    <ContentPage
      page={data}
      members={directory?.members as never}
      gallery={gallery}
      galleries={route === "/gallery" ? galleries : []}
    />
  );
}

"use client";
import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { ChamberMotion } from "@/components/ui/chamber-motion";
import { Leadership } from "@/components/home-sections";
import { localLink, localizeHtml } from "@/lib/site-data";
import { EnquiryForm } from "@/components/enquiry-form";
import { requestPages } from "@/lib/enquiries";
import { AboutUsView } from "@/components/about-us-view";
type Event = { title: string; date?: string; image: string; href: string };
type Member = {
  id: string;
  name: string;
  company: string;
  membershipLevel: string;
  activity: string;
  phone: string;
  phoneHref: string | null;
  website: string | null;
  image: string;
};
export type ContentPageData = {
  route: string;
  title: string;
  url: string;
  status: number;
  contentHtml: string;
  tabs: { id: string; title: string; contentHtml: string }[];
  eventCards: Event[];
  forms: { action: string }[];
  detailImages?: string[];
  detailDate?: string;
  backHref?: string;
};
type Gallery = {
  title: string;
  href: string;
  route: string;
  image: string;
  images?: string[];
};
function SourceContent({ html }: { html: string }) {
  return (
    <div
      className="source-content"
      dangerouslySetInnerHTML={{ __html: localizeHtml(html) }}
    />
  );
}
export function Directory({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(24);
  const result = useMemo(
    () =>
      members.filter((m) =>
        `${m.name} ${m.company} ${m.membershipLevel} ${m.activity}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [members, query],
  );
  return (
    <>
      <label className="search-box">
        <Search size={20} />
        <input
          aria-label="Search member directory"
          placeholder="Search by member, company or business activity…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(24);
          }}
        />
      </label>
      <p className="results-count" role="status">
        {result.length} {result.length === 1 ? "member" : "members"}
        {query && ` matching “${query}”`}
      </p>
      {result.length === 0 ? (
        <div className="empty-state">
          <h2>
            {members.length ? "No matching members" : "Members Directory"}
          </h2>
          <p>
            {members.length
              ? "Try a different name, company or business activity."
              : "Contact the Chamber for information about this forum’s members."}
          </p>
        </div>
      ) : (
        <div className="directory-grid">
          {result.slice(0, limit).map((m, i) => (
            <article key={`${m.id}-${i}`} className="directory-card">
              <img
                src={m.image}
                alt={m.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png";
                }}
              />
              <div className="membership-level">{m.membershipLevel}</div>
              <h3>{m.name}</h3>
              {m.company && m.company !== m.membershipLevel && (
                <p>{m.company}</p>
              )}
              <p>{m.activity}</p>
              <div className="directory-links">
                {m.phoneHref && <a href={m.phoneHref}>{m.phone}</a>}
                {m.website && (
                  <a href={localLink(m.website)} target="_blank" rel="noreferrer">
                    Visit website
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      {limit < result.length && (
        <button
          className="button button-gold load-more"
          onClick={() => setLimit(limit + 24)}
        >
          Show more members ({result.length - limit} remaining)
        </button>
      )}
    </>
  );
}
function EventGrid({ events }: { events: Event[] }) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(12);
  const list = events.filter((e) =>
    `${e.title} ${e.date}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      {events.length > 10 && (
        <label className="search-box">
          <Search size={20} />
          <input
            placeholder="Search events or dates…"
            aria-label="Search events"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(12);
            }}
          />
        </label>
      )}
      <p className="results-count" role="status">
        {list.length} events in the archive
      </p>
      <div className="event-grid">
        {list.slice(0, limit).map((e, i) => (
          <a
            href={localLink(e.href)}
            className="event-card"
            key={`${e.href}-${i}`}
            target={localLink(e.href).startsWith("https:") ? "_blank" : undefined}
            rel="noreferrer"
          >
            <img src={e.image} alt={e.title} loading="lazy" />
            <div>
              <p>{e.date}</p>
              <h3>{e.title}</h3>
              <span>Explore event</span>
            </div>
          </a>
        ))}
      </div>
      {list.length === 0 && <p>No events match your search.</p>}
      {limit < list.length && (
        <button
          className="button button-gold load-more"
          onClick={() => setLimit(limit + 12)}
        >
          Show more events ({list.length - limit} remaining)
        </button>
      )}
    </>
  );
}
function GalleryAlbum({ gallery }: { gallery: Gallery }) {
  const photos = gallery.images?.length ? gallery.images : [gallery.image];
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <div className="gallery-grid">
        {photos.map((src, i) => (
          <button
            className="gallery-photo-button"
            onClick={() => setSelected(i)}
            key={src}
            aria-label={`View ${gallery.title} photo ${i + 1}`}
          >
            <img
              src={src}
              alt={`${gallery.title} photograph ${i + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {!gallery.images?.length && (
        <p className="results-count" style={{ marginTop: 24 }}>
          Album cover. Additional photographs are not available in the original
          gallery.
        </p>
      )}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="gallery-lightbox">
          <DialogTitle>{gallery.title}</DialogTitle>
          <DialogDescription>
            Photograph {(selected ?? 0) + 1} of {photos.length}
          </DialogDescription>
          {selected !== null && (
            <img
              src={photos[selected]}
              alt={`${gallery.title} photograph ${selected + 1}`}
            />
          )}
          <div className="round-controls">
            <button
              aria-label="Previous photograph"
              onClick={() =>
                setSelected(
                  ((selected ?? 0) + photos.length - 1) % photos.length,
                )
              }
            >
              <ChevronLeft />
            </button>
            <button
              aria-label="Next photograph"
              onClick={() => setSelected(((selected ?? 0) + 1) % photos.length)}
            >
              <ChevronRight />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default function ContentPage({
  page,
  members = [],
  gallery,
  galleries = [],
}: {
  page: ContentPageData;
  members?: Member[];
  gallery?: Gallery;
  galleries?: Gallery[];
}) {
  const isDirectory = page.route === "/join/members_directory";
  const isLeadership = page.route === "/executive_committee";
  const isAboutUs = page.route === "/about-us";
  const useTabs = page.tabs.length > 0 && page.route !== "/join";
  const formPage = Object.hasOwn(requestPages, page.route);
  const tabBody = (t: ContentPageData["tabs"][number]) =>
    /directory/i.test(t.title) ? (
      <Directory members={members} />
    ) : t.title === "Events" && page.eventCards.length ? (
      <EventGrid events={page.eventCards} />
    ) : (
      <SourceContent html={t.contentHtml} />
    );
  return (
    <>
      <ChamberMotion />
      <SiteHeader />
      <main id="main-content">
        <section className="page-banner">
          <img src="/assets/breadcrumb.jpg" alt="" />
          <p className="eyebrow">
            <a href="/">HOME</a>
            <span /> VIZAG CHAMBER
          </p>
          <h1>{page.title}</h1>
        </section>
        <section className="page-body">
          {page.backHref && <a className="underlined-link detail-back" href={page.backHref}>← Back to {page.backHref.includes("city_network") ? "City Network" : "events"}</a>}
          {page.detailDate && <p className="detail-date">{page.detailDate}</p>}
          {page.route === "/join" ? <>
            <EnquiryForm sourcePage="/join" />
            <details className="membership-details"><summary>About membership at the Chamber</summary><SourceContent html={page.contentHtml} /></details>
          </> : gallery ? (
            <GalleryAlbum gallery={gallery} />
          ) : page.route === "/gallery" ? (
            <div className="gallery-grid">
              {galleries.map((g) => (
                <a className="event-card" key={g.route} href={g.route}>
                  <img src={g.image} alt={g.title} loading="lazy" />
                  <div>
                    <h3>{g.title}</h3>
                    <span>View album</span>
                  </div>
                </a>
              ))}
            </div>
          ) : isDirectory ? (
            <Directory members={members} />
          ) : isLeadership ? (
            <Leadership full />
          ) : isAboutUs ? (
            <AboutUsView />
          ) : page.status !== 200 ? (
            <div className="empty-state">
              <h2>Upcoming Events</h2>
              <p>
                The Chamber’s upcoming-events page is currently unavailable.
                <br />
                Explore previous gatherings or contact the Chamber for the next
                event.
              </p>
              <div
                className="hero-actions"
                style={{ justifyContent: "center" }}
              >
                <a className="button button-gold" href="/events/past-events">
                  Explore past events
                </a>
                <a className="underlined-link" href="/contact-us">
                  Contact the Chamber
                </a>
              </div>
            </div>
          ) : useTabs ? (
            <Tabs defaultValue={page.tabs[0].id}>
              <TabsList className="page-tabs-list">
                {page.tabs.map((t) => (
                  <TabsTrigger value={t.id} key={t.id}>
                    {t.title.replace("nav-", "").replace("Vcci", "VCCI")}
                  </TabsTrigger>
                ))}
              </TabsList>
              {page.tabs.map((t) => (
                <TabsContent value={t.id} key={t.id}>
                  {tabBody(t)}
                </TabsContent>
              ))}
            </Tabs>
          ) : page.eventCards.length > 1 ? (
            <EventGrid events={page.eventCards} />
          ) : (
            <SourceContent html={page.contentHtml} />
          )}
          {!!page.detailImages?.length && <GalleryAlbum gallery={{ title: page.title, route: page.route, href: page.route, image: page.detailImages[0], images: page.detailImages }} />}
          {formPage && page.route !== "/join" && <EnquiryForm sourcePage={page.route as keyof typeof requestPages} />}
          {page.route === "/contact-us" && (
            <div className="hero-actions">
              <a
                className="button button-gold"
                href="mailto:info@vizagchamber.com"
              >
                <Mail size={16} style={{ marginRight: 12 }} /> Email the Chamber
              </a>
              <a className="underlined-link" href="tel:+917093332606">
                +91 70933 32606
              </a>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

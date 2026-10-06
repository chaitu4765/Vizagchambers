"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Mail, Calendar, ArrowUpRight, RotateCw, Filter, RotateCcw } from "lucide-react";
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
import { MediaView } from "@/components/media-view";
import { FlipCard } from "@/components/ui/flip-card";
import { Marquee } from "@/components/ui/marquee";
import { CityNetworkView } from "@/components/city-network-view";
import { LinksView } from "@/components/links-view";
import eventContexts from "@/data/event-contexts.json";

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

// Helper to provide authentic context for event back face
function getEventContext(e: Event): string {
  const path = e.href.replace(/^https?:\/\/(www\.)?vizagchamber\.com/i, "").split("#")[0];
  const ctx = (eventContexts as Record<string, string>)[path] || (eventContexts as Record<string, string>)[localLink(e.href)];
  if (ctx && !ctx.includes("unavailable") && ctx.length > 20) {
    return ctx;
  }

  const t = e.title.toLowerCase();
  if (t.includes("ai") || t.includes("digital") || t.includes("technology")) {
    return "Interactive technology session addressing practical artificial intelligence adoption, productivity workflows, and digital compliance for Visakhapatnam businesses.";
  }
  if (t.includes("msme") || t.includes("energy") || t.includes("schneider")) {
    return "Industry symposium offering local MSMEs practical guidance on power optimization, industrial sustainability, and green factory initiatives.";
  }
  if (t.includes("tax") || t.includes("roc") || t.includes("gst") || t.includes("compliance") || t.includes("vivad")) {
    return "Direct dialogue with statutory and financial authorities to clarify direct tax schemes, regulatory compliance procedures, and grievance resolution.";
  }
  if (t.includes("golf")) {
    return "Prestigious corporate fellowship tournament uniting industrial leaders, port authorities, and business dignitaries at East Point Golf Club.";
  }
  if (t.includes("women") || t.includes("expo") || t.includes("natural living")) {
    return "Signature initiative by VCCI Women's Wing championing female entrepreneurs, sustainable enterprise, and organic trade showcases.";
  }
  if (t.includes("youth") || t.includes("visit") || t.includes("steel") || t.includes("amtz")) {
    return "Industrial engagement program organized by VCCI Youth Wing, connecting next-generation leaders with major manufacturing and tech facilities.";
  }
  if (t.includes("agm") || t.includes("award") || t.includes("election")) {
    return "General body assembly reviewing chamber advocacy achievements, key policy representations, and honouring regional business excellence.";
  }
  return "Official Chamber conference fostering inter-industry partnerships, government policy representation, and commercial expansion across Visakhapatnam.";
}

export function Directory({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [limit, setLimit] = useState(24);

  // Available categories based on actual data
  const categories = [
    { label: "All Categories", value: "ALL" },
    { label: "Corporate", value: "CORPORATE" },
    { label: "Non-Corporate", value: "NON-CORPORATE" },
    { label: "Partnership", value: "PARTNERSHIP" },
    { label: "Proprietorship", value: "PROPRIETORSHIP" },
    { label: "Association", value: "ASSOCIATION" },
  ];

  const result = useMemo(() => {
    return members.filter((m) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        `${m.name} ${m.company} ${m.membershipLevel} ${m.activity}`
          .toLowerCase()
          .includes(q);

      if (!matchesQuery) return false;

      if (selectedCategory === "ALL") return true;
      const lvl = (m.membershipLevel || "").toLowerCase();
      if (selectedCategory === "CORPORATE") {
        return lvl.includes("corporate") && !lvl.includes("non");
      }
      if (selectedCategory === "NON-CORPORATE") {
        return lvl.includes("non") && lvl.includes("corporate");
      }
      if (selectedCategory === "PARTNERSHIP") {
        return lvl.includes("partnership");
      }
      if (selectedCategory === "PROPRIETORSHIP") {
        return lvl.includes("proprietor");
      }
      if (selectedCategory === "ASSOCIATION") {
        return lvl.includes("association");
      }
      return true;
    });
  }, [members, query, selectedCategory]);

  const handleReset = () => {
    setQuery("");
    setSelectedCategory("ALL");
    setLimit(24);
  };

  return (
    <div className="space-y-6">
      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <label className="search-box m-0 flex-1">
          <Search size={20} />
          <input
            aria-label="Search member directory"
            placeholder="Search by member name, company or business activity…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(24);
            }}
          />
        </label>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-muted/70 border border-border/60">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setLimit(24);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.value
                  ? "bg-background text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header and Clear Trigger */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p className="results-count m-0" role="status">
          Showing <strong>{result.length}</strong> of <strong>{members.length}</strong> members
          {query && ` matching “${query}”`}
          {selectedCategory !== "ALL" && ` in ${selectedCategory}`}
        </p>

        {(query || selectedCategory !== "ALL") && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-semibold"
          >
            <RotateCcw size={13} />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {result.length === 0 ? (
        <div className="empty-state p-12 text-center rounded-3xl border border-dashed border-border">
          <h2 className="text-lg font-bold text-foreground">
            {members.length ? "No matching members found" : "Members Directory"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            {members.length
              ? "Try adjusting your search keywords or switching category filters."
              : "Contact the Chamber Secretariat for information about forum members."}
          </p>
          {members.length > 0 && (
            <button
              onClick={handleReset}
              className="button button-gold mt-4 text-xs py-2 px-5"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <div className="directory-grid">
          {result.slice(0, limit).map((m, i) => (
            <article key={`${m.id}-${i}`} className="directory-card hover:border-amber-400/50 transition-all">
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
        <div className="text-center pt-4">
          <button
            className="button button-gold load-more"
            onClick={() => setLimit(limit + 24)}
          >
            Show more members ({result.length - limit} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

function EventGrid({ events }: { events: Event[] }) {
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [limit, setLimit] = useState(12);

  // Extract years dynamically from real event dates
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    events.forEach((e) => {
      const match = (e.date || "").match(/20\d\d/);
      if (match) years.add(match[0]);
    });
    return ["ALL", ...Array.from(years).sort().reverse()];
  }, [events]);

  const list = useMemo(() => {
    return events.filter((e) => {
      const textMatch = `${e.title} ${e.date}`
        .toLowerCase()
        .includes(query.toLowerCase());
      if (!textMatch) return false;
      if (selectedYear === "ALL") return true;
      return (e.date || "").includes(selectedYear);
    });
  }, [events, query, selectedYear]);

  // Two rows of marquee for the past events spotlight
  const marqueeRow1 = useMemo(() => events.slice(0, 10), [events]);
  const marqueeRow2 = useMemo(() => events.slice(10, 20), [events]);

  return (
    <div className="space-y-10">
      {/* Two-Row Marquee Spotlight for Past Events (Inspira UI Marquee effect) */}
      {events.length >= 8 && (
        <section
          aria-label="Past Events Highlights Stream"
          className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-card via-card/70 to-background p-4 sm:p-6 shadow-md"
        >
          <div className="flex items-center justify-between px-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Past Events Highlights Stream
              </h3>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              Pause on hover • Continuous reverse marquee
            </span>
          </div>

          {/* First Row Marquee */}
          <Marquee pauseOnHover repeat={3} className="[--duration:36s] py-1">
            {marqueeRow1.map((item, i) => (
              <a
                key={`evt-r1-${item.href}-${i}`}
                href={localLink(item.href)}
                className="relative w-64 sm:w-72 h-44 rounded-2xl border border-border/80 bg-background/90 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-lg transition-all group shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-amber-300 mb-0.5">
                    {item.date}
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-2 leading-tight">
                    {item.title}
                  </p>
                </div>
              </a>
            ))}
          </Marquee>

          {/* Second Row Marquee (Reverse Direction) */}
          <Marquee reverse pauseOnHover repeat={3} className="[--duration:40s] py-1">
            {marqueeRow2.map((item, i) => (
              <a
                key={`evt-r2-${item.href}-${i}`}
                href={localLink(item.href)}
                className="relative w-64 sm:w-72 h-44 rounded-2xl border border-border/80 bg-background/90 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-lg transition-all group shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-amber-300 mb-0.5">
                    {item.date}
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-2 leading-tight">
                    {item.title}
                  </p>
                </div>
              </a>
            ))}
          </Marquee>

          {/* Left and Right Gradient Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10" />
        </section>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <label className="search-box m-0 flex-1">
            <Search size={20} />
            <input
              placeholder="Search past events by topic, guest or date…"
              aria-label="Search events"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(12);
              }}
            />
          </label>

          {/* Year Filter Buttons */}
          {availableYears.length > 2 && (
            <div className="flex flex-wrap gap-1 p-1 rounded-2xl bg-muted/70 border border-border/60">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => {
                    setSelectedYear(yr);
                    setLimit(12);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                    selectedYear === yr
                      ? "bg-background text-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {yr === "ALL" ? "All Years" : yr}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <p className="results-count m-0" role="status">
            Showing <strong>{list.length}</strong> of <strong>{events.length}</strong> events in archive
            {selectedYear !== "ALL" && ` (${selectedYear})`}
          </p>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber-600">
            <RotateCw size={12} />
            <span>Hover or tap card to flip for context</span>
          </span>
        </div>
      </div>

      {/* Interactive FlipCard Grid for Past Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.slice(0, limit).map((e, i) => {
          const context = getEventContext(e);
          return (
            <FlipCard
              key={`${e.href}-${i}`}
              rotate="y"
              className="h-[360px] sm:h-[380px] w-full"
              front={
                <div className="size-full rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs hover:border-amber-400/50 hover:shadow-lg transition-all flex flex-col justify-between group">
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    <img
                      src={e.image}
                      alt={e.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(eTarget) => {
                        eTarget.currentTarget.src = "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png";
                      }}
                    />
                    {e.date && (
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[10px] font-mono text-amber-200">
                        {e.date}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                    <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-3 group-hover:text-amber-600 transition-colors">
                      {e.title}
                    </h3>
                    <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Event Archive</span>
                      <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                        <span>Flip for context</span>
                        <RotateCw size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              }
              back={
                <div className="size-full p-5 rounded-2xl border border-amber-400/50 bg-[#0b2633] text-white flex flex-col justify-between shadow-2xl">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-300 flex items-center gap-1">
                        <Calendar size={12} />
                        {e.date || "VCCI Gathering"}
                      </span>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-amber-300">
                        Chamber Event
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-amber-200 leading-snug line-clamp-2">
                      {e.title}
                    </h4>
                    <p className="text-xs text-gray-200 leading-relaxed line-clamp-4">
                      {context}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/15 flex flex-col gap-2">
                    <a
                      href={localLink(e.href)}
                      className="button button-gold w-full text-xs py-2 px-3 rounded-full flex items-center justify-center gap-1.5 font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors"
                      target={localLink(e.href).startsWith("https:") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      <span>Explore Event Details</span>
                      <ArrowUpRight size={13} />
                    </a>
                    <span className="text-[10px] text-gray-400 text-center font-mono">
                      Click card to flip back ↺
                    </span>
                  </div>
                </div>
              }
            />
          );
        })}
      </div>

      {list.length === 0 && (
        <div className="empty-state p-10 text-center rounded-2xl border border-dashed border-border">
          <p className="text-sm text-muted-foreground">No events match your search or filter.</p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedYear("ALL");
            }}
            className="button button-gold mt-3 text-xs py-2 px-4"
          >
            Reset filters
          </button>
        </div>
      )}

      {limit < list.length && (
        <div className="text-center pt-4">
          <button
            className="button button-gold load-more"
            onClick={() => setLimit(limit + 12)}
          >
            Show more events ({list.length - limit} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

function GalleryAlbum({ gallery }: { gallery: Gallery }) {
  const photos = gallery.images?.length ? gallery.images : [gallery.image];
  const [selected, setSelected] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setSelected(index);
  };

  const closeLightbox = () => {
    setSelected(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSelected((prev) => (prev !== null ? (prev + photos.length - 1) % photos.length : null));
      } else if (e.key === "ArrowRight") {
        setSelected((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, photos.length]);

  return (
    <>
      <div className="gallery-grid">
        {photos.map((src, i) => (
          <button
            className="gallery-photo-button"
            onClick={() => openLightbox(i)}
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
          Album cover. Additional photographs are not available in the original gallery.
        </p>
      )}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) closeLightbox();
        }}
      >
        <DialogContent
          className="gallery-lightbox max-w-4xl p-4 sm:p-6 bg-background/95 backdrop-blur-xl border border-border/80"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (diff > 50) {
              setSelected((prev) => (prev !== null ? (prev + photos.length - 1) % photos.length : null));
            } else if (diff < -50) {
              setSelected((prev) => (prev !== null ? (prev + 1) % photos.length : null));
            }
            touchStartX.current = null;
          }}
        >
          <DialogTitle>{gallery.title}</DialogTitle>
          <DialogDescription className="font-mono text-xs">
            Photograph {(selected ?? 0) + 1} of {photos.length}
          </DialogDescription>
          {selected !== null && (
            <div className="relative max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-muted/30 p-2">
              <img
                src={photos[selected]}
                alt={`${gallery.title} photograph ${selected + 1}`}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-md"
              />
            </div>
          )}
          <div className="round-controls pt-2">
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
  const isMedia = page.route === "/media";
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
            <details className="membership-details">
              <summary>About membership at the Chamber</summary>
              <div className="p-6 bg-card rounded-2xl border border-border/70 space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground">
                  Official Membership Tiers & Secretariat Advisory
                </p>
                <p>
                  The Vizagapatam Chamber of Commerce and Industry represents business leaders, associations, and commercial bodies across Visakhapatnam and Andhra Pradesh.
                </p>
                <p>
                  To explore preserved member advantages, visit our dedicated <a href="/join/benefits" className="text-amber-600 font-semibold underline">Membership Benefits</a> page or prepare an enquiry above.
                </p>
              </div>
            </details>
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
          ) : isMedia ? (
            <MediaView />
          ) : page.route === "/city_network" ? (
            <CityNetworkView />
          ) : page.route.startsWith("/links") ? (
            <LinksView initialTab={page.route.includes("go") ? "nav-go" : "nav-ap"} />
          ) : page.status !== 200 ? (
            <div className="empty-state">
              <h2>Upcoming Events</h2>
              <p>
                The Chamber’s upcoming-events page is currently unavailable.
                <br />
                Explore previous gatherings or contact the Chamber for the next event.
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
                <TabsContent value={t.id} key={t.id} className="transition-all duration-200">
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

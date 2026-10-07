"use client";

import * as React from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { Marquee } from "@/components/ui/marquee";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search, ChevronLeft, ChevronRight, Newspaper, Calendar, ArrowUpRight, RotateCcw } from "lucide-react";
import mediaData from "@/data/media-items.json";

interface MediaItem {
  title: string;
  image: string;
  date: string;
  href?: string;
}

export function MediaView() {
  const [selectedPhoto, setSelectedPhoto] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"wheel" | "grid" | "both">("both");
  const lastFocusedEl = React.useRef<HTMLElement | null>(null);

  const allItems: MediaItem[] = mediaData;

  // Split items for two marquee rows
  const marqueeRow1 = React.useMemo(() => allItems.slice(0, 10), [allItems]);
  const marqueeRow2 = React.useMemo(() => allItems.slice(10, 20), [allItems]);

  // Filter items for grid view
  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q)
    );
  }, [allItems, searchQuery]);

  // Convert media items to WorksWheel items
  const wheelItems: WorksWheelItem[] = React.useMemo(() => {
    return allItems.slice(0, 12).map((item) => ({
      title: item.title,
      image: item.image,
      href: item.href || `#view-${encodeURIComponent(item.title)}`,
    }));
  }, [allItems]);

  // Handle lightbox open with focus restoration
  const openLightbox = (index: number) => {
    lastFocusedEl.current = document.activeElement as HTMLElement;
    setSelectedPhoto(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    requestAnimationFrame(() => {
      lastFocusedEl.current?.focus();
    });
  };

  // Keyboard controls for lightbox
  React.useEffect(() => {
    if (selectedPhoto === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSelectedPhoto((prev) =>
          prev !== null ? (prev + allItems.length - 1) % allItems.length : null
        );
      } else if (e.key === "ArrowRight") {
        setSelectedPhoto((prev) =>
          prev !== null ? (prev + 1) % allItems.length : null
        );
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, allItems.length]);

  return (
    <div className="flex flex-col gap-10 py-2">
      {/* Media Header Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 border border-amber-500/30 mb-2">
            <Newspaper size={13} />
            <span>PRESS COVERAGE & NEWS ARCHIVE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Chamber in the News
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Explore regional newspaper reports, high-profile delegation meetings,
            and media features documenting VCCI’s ongoing commercial advocacy.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-muted/80 border border-border/60 self-start md:self-auto text-xs font-medium">
          <button
            onClick={() => setViewMode("both")}
            className={`px-3 py-1.5 rounded-full transition-all ${
              viewMode === "both"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Views
          </button>
          <button
            onClick={() => setViewMode("wheel")}
            className={`px-3 py-1.5 rounded-full transition-all ${
              viewMode === "wheel"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            3D Wheel
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-full transition-all ${
              viewMode === "grid"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Archive Grid
          </button>
        </div>
      </div>

      {/* Two-Row Marquee Carousel of Press Clippings */}
      <section
        aria-label="Press Clippings Stream"
        className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-card via-card/70 to-background p-4 sm:p-6 shadow-md"
      >
        <div className="flex items-center justify-between px-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              Live Press Stream
            </h3>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Pause on hover • Click clipping to expand
          </span>
        </div>

        {/* First Row Marquee */}
        <Marquee pauseOnHover repeat={3} className="[--duration:32s] py-1">
          {marqueeRow1.map((item, i) => (
            <div
              key={`row1-${item.title}-${i}`}
              onClick={() => openLightbox(i)}
              className="relative w-64 sm:w-72 h-44 rounded-2xl border border-border/80 bg-background/90 overflow-hidden cursor-pointer shadow-xs hover:border-amber-400 hover:shadow-lg transition-all group shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
            </div>
          ))}
        </Marquee>

        {/* Second Row Marquee (Reverse Direction) */}
        <Marquee reverse pauseOnHover repeat={3} className="[--duration:35s] py-1">
          {marqueeRow2.map((item, i) => (
            <div
              key={`row2-${item.title}-${i}`}
              onClick={() => openLightbox(i + 10)}
              className="relative w-64 sm:w-72 h-44 rounded-2xl border border-border/80 bg-background/90 overflow-hidden cursor-pointer shadow-xs hover:border-amber-400 hover:shadow-lg transition-all group shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
            </div>
          ))}
        </Marquee>

        {/* Left and Right Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10" />
      </section>

      {/* Interactive 3D WorksWheel Component */}
      {(viewMode === "wheel" || viewMode === "both") && (
        <section
          aria-label="Interactive 3D Media Wheel"
          className="relative rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card/90 to-background overflow-hidden shadow-xl"
        >
          <div className="p-4 sm:p-6 pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-500 font-mono">
                Interactive 3D Spotlight
              </p>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Turn the Drum to Browse Press Clippings
              </h3>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              Drag or use arrows • Shift + Scroll
            </span>
          </div>

          <div className="h-[28rem] sm:h-[32rem] md:h-[36rem] w-full relative">
            <WorksWheel
              items={wheelItems}
              label="VCCI Media"
              action="View"
              className="h-full bg-transparent"
            />
          </div>
        </section>
      )}

      {/* Searchable Press Clippings Grid */}
      {(viewMode === "grid" || viewMode === "both") && (
        <section className="space-y-6 pt-4" aria-labelledby="all-clippings-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 id="all-clippings-heading" className="text-xl font-bold text-foreground">
                All Press Clippings & News Stories
              </h3>
              <p className="text-xs text-muted-foreground">
                Showing {filteredItems.length} of {allItems.length} coverage items
              </p>
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2">
              <label className="search-box m-0 max-w-xs flex-1">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search headlines or dates…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search press clippings"
                  className="text-xs py-2"
                />
              </label>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 rounded-full border border-border/60 hover:bg-muted text-xs text-muted-foreground"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state p-10 text-center rounded-2xl border border-dashed border-border">
              <h4 className="text-base font-bold text-foreground">No clippings found</h4>
              <p className="text-xs text-muted-foreground mt-1">
                No press stories match “{searchQuery}”.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="button button-gold mt-4 text-xs py-2 px-4"
              >
                Reset search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, i) => {
                const globalIndex = allItems.findIndex((a) => a.title === item.title);
                return (
                  <article
                    key={`${item.title}-${i}`}
                    className="flex flex-col rounded-2xl border border-border/70 bg-card overflow-hidden shadow-xs hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Newspaper Clipping Image */}
                    <div
                      className="relative aspect-[4/3] bg-muted overflow-hidden cursor-pointer"
                      onClick={() => openLightbox(globalIndex >= 0 ? globalIndex : i)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View full newspaper clipping for ${item.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          openLightbox(globalIndex >= 0 ? globalIndex : i);
                        }
                      }}
                    >
                      <img
                        src={item.image}
                        alt={`Press clipping: ${item.title}`}
                        loading="lazy"
                        className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-xs text-xs font-semibold text-foreground shadow-md">
                          Enlarge clipping ↗
                        </span>
                      </div>
                      {item.date && (
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono text-amber-200">
                          {item.date}
                        </div>
                      )}
                    </div>

                    {/* Headline & Details */}
                    <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-amber-600 transition-colors">
                          {item.href ? (
                            <a
                              href={item.href}
                              className="hover:underline focus-visible:outline-amber-500"
                            >
                              {item.title}
                            </a>
                          ) : (
                            <button
                              onClick={() => openLightbox(globalIndex >= 0 ? globalIndex : i)}
                              className="text-left font-bold hover:underline"
                            >
                              {item.title}
                            </button>
                          )}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Calendar size={12} />
                          {item.date || "VCCI Archive"}
                        </span>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
                          >
                            <span>Event detail</span>
                            <ArrowUpRight size={13} />
                          </a>
                        ) : (
                          <button
                            onClick={() => openLightbox(globalIndex >= 0 ? globalIndex : i)}
                            className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
                          >
                            <span>Read clipping</span>
                            <ArrowUpRight size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Accessible Press Clipping Lightbox */}
      <Dialog
        open={selectedPhoto !== null}
        onOpenChange={(open) => {
          if (!open) closeLightbox();
        }}
      >
        <DialogContent className="gallery-lightbox max-w-4xl p-4 sm:p-6 bg-background/95 backdrop-blur-xl border border-border/80">
          {selectedPhoto !== null && (
            <>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <DialogTitle className="text-base sm:text-lg font-bold text-foreground">
                    {allItems[selectedPhoto].title}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground font-mono mt-0.5">
                    {allItems[selectedPhoto].date} • Press clipping {selectedPhoto + 1} of{" "}
                    {allItems.length}
                  </DialogDescription>
                </div>
              </div>

              <div className="relative max-h-[70vh] flex items-center justify-center overflow-auto rounded-xl bg-muted/40 p-2">
                <img
                  src={allItems[selectedPhoto].image}
                  alt={`Full press clipping: ${allItems[selectedPhoto].title}`}
                  className="max-h-[65vh] w-auto object-contain rounded-lg shadow-md"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div className="round-controls m-0">
                  <button
                    aria-label="Previous clipping"
                    onClick={() =>
                      setSelectedPhoto(
                        (selectedPhoto + allItems.length - 1) % allItems.length
                      )
                    }
                    className="p-2 rounded-full border border-border hover:bg-muted"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    aria-label="Next clipping"
                    onClick={() =>
                      setSelectedPhoto((selectedPhoto + 1) % allItems.length)
                    }
                    className="p-2 rounded-full border border-border hover:bg-muted"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {allItems[selectedPhoto].href && (
                  <a
                    href={allItems[selectedPhoto].href}
                    className="button button-gold text-xs py-2 px-4 inline-flex items-center gap-1.5"
                  >
                    <span>View associated event</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

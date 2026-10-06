"use client";

import React, { useState } from "react";
import StaircaseCarousel, { type StaircaseItem } from "@/components/ui/staircase-carousel";
import { ArrowUpRight, Grid3X3, Layers, Building2, MapPin } from "lucide-react";
import { localLink } from "@/lib/site-data";

export interface CityNetworkItem {
  title: string;
  image: string;
  href: string;
  category?: string;
}

export const defaultCityNetworkItems: CityNetworkItem[] = [
  {
    title: "Industries",
    image: "https://www.vizagchamber.com/uploads/fa7f3f7185f803bff7fb651e19f97464.jpg",
    href: "/city_network/network_view/industries",
    category: "Heavy Industry & Manufacturing",
  },
  {
    title: "Hospitals",
    image: "https://www.vizagchamber.com/uploads/151cf7bb6a2537db68b5ecea230d3857.jpg",
    href: "/city_network/network_view/hospitals",
    category: "Healthcare & Emergency Care",
  },
  {
    title: "Blood Banks",
    image: "https://www.vizagchamber.com/uploads/853f955ef30737a443d70c025c10f980.png",
    href: "/city_network/network_view/blood-banks",
    category: "Civic Life Support Services",
  },
  {
    title: "Hotels",
    image: "https://www.vizagchamber.com/uploads/b9ffe91a0a01aca9d58b500c2118eb76.jpg",
    href: "/city_network/network_view/hotels",
    category: "Hospitality & Convention Stays",
  },
  {
    title: "Shopping Malls",
    image: "https://www.vizagchamber.com/uploads/184b78d166647905d93a9e74c9517038.jpg",
    href: "/city_network/network_view/shopping-malls",
    category: "Retail Hubs & Commerce",
  },
  {
    title: "Theaters",
    image: "https://www.vizagchamber.com/uploads/e167973d1810c2327b3f21520984a427.jpg",
    href: "/city_network/network_view/theaters",
    category: "Culture & Entertainment",
  },
  {
    title: "Resorts & Clubs",
    image: "https://www.vizagchamber.com/uploads/a178e454111bd9c1ea2f3e868e1bd84a.jpg",
    href: "/city_network/network_view/resorts--clubs",
    category: "Coastal Tourism & Leisure",
  },
  {
    title: "Function Halls",
    image: "https://www.vizagchamber.com/uploads/7540b9e1d257005fcce7e3388ce978ee.jpg",
    href: "/city_network/network_view/function-halls",
    category: "Event Banquets & Conventions",
  },
  {
    title: "Packers & Movers",
    image: "https://www.vizagchamber.com/uploads/8f15c59b675694850f43cdec634a213b.jpg",
    href: "/city_network/network_view/packers-and-movers",
    category: "Logistics & Relocation",
  },
  {
    title: "Tourism",
    image: "https://www.vizagchamber.com/uploads/c844c0dcf3f3e77efaa1b0a797785213.jpg",
    href: "/city_network/network_view/tourism",
    category: "Vizag Coast & Heritage",
  },
  {
    title: "Educational Institutes",
    image: "https://www.vizagchamber.com/uploads/b32faf5c05b081d527e256d5e9858e9c.jpg",
    href: "/city_network/network_view/educatinonal-institutes",
    category: "Universities & Research",
  },
  {
    title: "ATM Locations",
    image: "https://www.vizagchamber.com/uploads/aa4541056f4d06a09ada7be88777bbb0.jpg",
    href: "/city_network/network_view/atm-locations",
    category: "Banking & Financial Services",
  },
  {
    title: "Train Numbers",
    image: "https://www.vizagchamber.com/uploads/6c9df4ce4e552a6b1121763fc3724f18.jpg",
    href: "/city_network/network_view/train-nos",
    category: "East Coast Railways Transit",
  },
  {
    title: "Toll-Free Numbers",
    image: "https://www.vizagchamber.com/uploads/46541a7dcf9d662f7176f66c778661a8.png",
    href: "/city_network/network_view/toll-free-numbers",
    category: "Emergency & Civic Helplines",
  },
];

export function CityNetworkView() {
  const [viewMode, setViewMode] = useState<"staircase" | "grid">("staircase");

  const carouselItems: StaircaseItem[] = defaultCityNetworkItems.map((item) => ({
    title: item.title,
    src: item.image,
    alt: item.title,
    href: localLink(item.href),
    subtitle: item.category,
  }));

  return (
    <div className="space-y-10 py-6">
      {/* Intro Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-border/60">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/20">
            <Building2 size={13} />
            <span>VISAKHAPATNAM CIVIC & COMMERCIAL INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground font-normal">
            City Network Directory
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Essential public utilities, major commercial sectors, emergency lifelines,
            and transport links verified across Visakhapatnam.
          </p>
        </div>

        {/* View Toggle Button */}
        <div className="flex items-center p-1 rounded-full bg-muted/80 border border-border shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("staircase")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "staircase"
                ? "bg-slate-900 text-amber-300 shadow-md scale-102"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers size={14} />
            <span>Staircase View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-slate-900 text-amber-300 shadow-md scale-102"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid3X3 size={14} />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* Main Display */}
      {viewMode === "staircase" ? (
        <div className="space-y-8">
          <div className="rounded-3xl overflow-hidden border border-border/80 bg-slate-950/90 shadow-2xl relative p-4 sm:p-8">
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-amber-300">
              <MapPin size={12} className="text-amber-400" />
              <span>Scroll or Click Slides to Step Through Network</span>
            </div>

            <StaircaseCarousel
              items={carouselItems}
              defaultIndex={0}
              height="min(560px, 70svh)"
              slideWidth="clamp(160px, 22vw, 280px)"
              step={0.5}
              inactiveScale={0.72}
              radius={18}
              titleSize="clamp(22px, 3vw, 36px)"
              background="transparent"
              color="#f8fafc"
              onSelect={(item) => {
                if (item.href) window.location.href = item.href;
              }}
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Tip: Click on any active slide to view contact details, addresses, and directory listings.
            </p>
          </div>
        </div>
      ) : null}

      {/* Grid Directory Display */}
      <div className={viewMode === "staircase" ? "pt-8" : ""}>
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-lg font-bold text-foreground">
            All Sectors ({defaultCityNetworkItems.length})
          </h3>
          <span className="text-xs text-muted-foreground font-mono">14 Active Categories</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultCityNetworkItems.map((item) => (
            <a
              key={item.title}
              href={localLink(item.href)}
              className="group flex flex-col rounded-2xl overflow-hidden border border-border/70 bg-card hover:bg-card/80 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-950/70 backdrop-blur-md text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-foreground group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.category}
                  </p>
                </div>
                <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-amber-600 font-semibold font-mono">
                  <span>Explore Directory</span>
                  <span>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

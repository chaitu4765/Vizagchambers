"use client";

import React, { useState } from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search,
  ExternalLink,
  Landmark,
  Check,
  Copy,
} from "lucide-react";
import extractedLinks from "@/data/extracted-links.json";

interface LinkItem {
  name: string;
  url: string;
}

interface LinkCategory {
  id: string;
  title: string;
  links: LinkItem[];
}

export function LinksView({ initialTab }: { initialTab?: string }) {
  const categories = extractedLinks as LinkCategory[];
  const [activeTab, setActiveTab] = useState(
    initialTab || categories[0]?.id || "nav-ap"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const currentCategory =
    categories.find((c) => c.id === activeTab) || categories[0];

  const filteredLinks = currentCategory
    ? currentCategory.links.filter(
        (l) =>
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Official Chamber Links Section */}
      <section
        aria-label="Government and Civic Links Network"
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/30 mb-2">
              <Landmark size={12} />
              <span>Official Portals & Public Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-foreground font-semibold">
              Government & Civic Network Directory
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Hover over any portal address to launch an instant live{" "}
              <strong className="text-foreground">LinkPreview</strong> card.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search departments or domains…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Tabs & Table */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-6"
        >
          {/* Tabs Navigation Strip */}
          <div className="overflow-x-auto pb-1">
            <TabsList className="inline-flex h-auto p-1.5 gap-1.5 bg-muted/80 rounded-2xl border border-border/60">
              {categories.map((c) => (
                <TabsTrigger
                  key={c.id}
                  value={c.id}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-[#071b26] data-[state=active]:text-white data-[state=active]:shadow-md text-foreground/80 hover:text-foreground transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>{c.title}</span>
                  <span className="ml-1.5 text-[10px] opacity-75 font-mono px-1.5 py-0.5 rounded-md bg-white/10">
                    {c.links.length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content Table */}
          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border/70 bg-muted/50 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                        <th className="py-3.5 px-6 font-semibold w-12 text-center">
                          #
                        </th>
                        <th className="py-3.5 px-6 font-semibold">
                          Department / Organisation
                        </th>
                        <th className="py-3.5 px-6 font-semibold">
                          Live Portal Link & Interactive Preview
                        </th>
                        <th className="py-3.5 px-6 font-semibold text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {filteredLinks.length > 0 ? (
                        filteredLinks.map((link, idx) => (
                          <tr
                            key={`${link.url}-${idx}`}
                            className="hover:bg-muted/40 transition-colors group"
                          >
                            <td className="py-3.5 px-6 text-xs text-muted-foreground font-mono text-center">
                              {idx + 1}
                            </td>
                            <td className="py-3.5 px-6 font-medium text-foreground text-xs sm:text-sm">
                              <span>{link.name}</span>
                            </td>
                            <td className="py-3.5 px-6 text-xs sm:text-sm">
                              <LinkPreview
                                url={link.url}
                                width={360}
                                height={200}
                                className="text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 font-mono text-xs break-all underline decoration-amber-500/30 hover:decoration-amber-500 underline-offset-4"
                              >
                                {link.url.replace(/^https?:\/\//, "")}
                              </LinkPreview>
                            </td>
                            <td className="py-3.5 px-6 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => handleCopy(link.url)}
                                  title="Copy URL"
                                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                >
                                  {copiedUrl === link.url ? (
                                    <Check
                                      size={13}
                                      className="text-emerald-500"
                                    />
                                  ) : (
                                    <Copy size={13} />
                                  )}
                                </button>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open in new tab"
                                  className="p-1.5 rounded-lg text-muted-foreground hover:text-amber-600 hover:bg-muted transition-colors"
                                >
                                  <ExternalLink size={13} />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-12 text-center text-muted-foreground text-sm"
                          >
                            No portals match &ldquo;{searchQuery}&rdquo; in this
                            section.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}

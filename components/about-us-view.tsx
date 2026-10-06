"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/components/ui/hero-01-utils/motion";
import {
  Building2,
  Landmark,
  Compass,
  TrendingUp,
  Anchor,
  Factory,
  Ship,
  Cpu,
  Gem,
  Fish,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  History,
  Target,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  RotateCw,
} from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { NumberCounter } from "@/components/ui/number-counter";
import { FlipCard } from "@/components/ui/flip-card";

export function AboutUsView() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  const stats = [
    {
      label: "Founded In",
      value: "1931",
      detail: "9+ decades of advocacy & leadership",
      icon: History,
    },
    {
      label: "City GDP",
      value: "$43.5B",
      detail: "9th wealthiest city in India",
      icon: TrendingUp,
    },
    {
      label: "Services Share",
      value: "55%",
      detail: "Dominant economic driver",
      icon: Briefcase,
    },
    {
      label: "Industry Share",
      value: "35%",
      detail: "Port, Steel, Pharma & Heavy Mfg",
      icon: Factory,
    },
  ];

  const milestones = [
    {
      year: "1931",
      title: "The Genesis",
      desc: "Founded in the Viziya building near the Cathedral in old town Visakhapatnam to voice business community concerns with the State and Central Governments. The 9-member founding committee was led by Rao Saheb C. Sanjiva Rao Naidu (President), Sri Kancharla Ramabrahmam (Vice-President), and Mr. V. J. Gupta (Secretary).",
    },
    {
      year: "1940s – 1956",
      title: "Wartime & Independence",
      desc: "Navigated the upheavals of World War II, Indian Independence in 1947, and the formation of Andhra Pradesh in 1956, championing local commerce and port activities.",
    },
    {
      year: "1970s – 1980s",
      title: "Industrial Transformation",
      desc: "Expanded from pure trade representation into industrial development as heavy public sector undertakings, including the Visakhapatnam Steel Plant and Hindustan Shipyard, took root.",
    },
    {
      year: "1991",
      title: "Economic Liberalisation",
      desc: "Spearheaded by former Prime Minister Sri P. V. Narasimha Rao, economic reforms broadened the Chamber's mission towards international trade, private capital, SEZs, and global outreach.",
    },
    {
      year: "Present & Ahead",
      title: "A Limitless Future",
      desc: "Empowering 1,000+ member businesses across Pharma, IT, Maritime, Steel, MSMEs, Women's Wing, and Youth Wing, positioning Visakhapatnam as the premier commercial capital of Andhra Pradesh.",
    },
  ];

  const keySectors = [
    {
      title: "Jawaharlal Nehru Pharma City",
      icon: Factory,
      badge: "India's First Bulk Drug Township",
      description:
        "A 2,400-acre public-private partnership between the Govt of AP and Ramky Group. Hosts 102 pharmaceutical giants with 8,698 active professionals.",
      stat: "2,400 Acres • 102 Units",
      context:
        "Home to leading global active pharmaceutical ingredient (API) and bulk drug manufacturers. Operates with dedicated marine outfall, zero liquid discharge (ZLD) systems, and specialized Common Effluent Treatment Plants (CETP).",
      highlights: ["102 Active Pharma Units", "ZLD Eco-Compliance", "8,700+ Specialists"],
    },
    {
      title: "Shipbuilding & Marine Engineering",
      icon: Ship,
      badge: "Hindustan Shipyard Heritage",
      description:
        "Home to Hindustan Shipyard, which built India's first indigenous ship 'Jala Usha' in 1948 and has built and delivered over 167 major ocean vessels.",
      stat: "167+ Vessels Delivered",
      context:
        "Strategic shipyard facility with covered dry docks and building berths. Crucial defence contributor executing Fleet Support Ships (FSS), offshore patrol vessels, and complex submarine refits for the Indian Navy.",
      highlights: ["Built 'Jala Usha' (1948)", "Indian Navy Supplier", "Submarine Refit Facility"],
    },
    {
      title: "Visakhapatnam Steel Plant (RINL)",
      icon: Building2,
      badge: "State-Run Steel Titan",
      description:
        "India's 2nd-largest state-run steel producer with an operating capacity of 6.3 MT spread over a massive 20,000-acre industrial expanse.",
      stat: "6.3 MT Capacity • 20,000 Acres",
      context:
        "India's sole shore-based integrated steel plant producing premium long products, wire rods, and structural steel, integrated with Gangavaram Port for automated raw material handling.",
      highlights: ["6.3 MT Operating Capacity", "Shore-Based Logistics", "20,000-Acre Footprint"],
    },
    {
      title: "Visakhapatnam Port Authority",
      icon: Anchor,
      badge: "Premier Natural Deep-Water Port",
      description:
        "One of India's largest and most efficient cargo ports, capable of berthing capesize vessels up to 150,000 DWT with a natural 17-metre draft.",
      stat: "150,000 DWT • 17m Draft",
      context:
        "Apex eastern gateway handling over 70 MTPA of iron ore, coal, POL, and container cargo. Directly connected to national freight corridors and Asian trade corridors.",
      highlights: ["Capesize Berthing (150k DWT)", "17m Natural Draft", "Mechanized Coal & Ore"],
    },
    {
      title: "Fisheries & Marine Exports",
      icon: Fish,
      badge: "East Coast Gateway",
      description:
        "The port's fishing harbour is among the largest on the Andhra Pradesh coast, acting as a global export epicenter for premium tuna and seafood.",
      stat: "Major Seafood Hub",
      context:
        "Leading seafood export center on India's east coast, equipped with state-of-the-art cold chains, processing units, and air cargo connectivity to US, EU, and Japanese markets.",
      highlights: ["State-of-Art Cold Chain", "Global Tuna Exports", "AP Maritime Fishery Hub"],
    },
    {
      title: "IT, ITES & Coastal Innovation",
      icon: Cpu,
      badge: "Fast-Growing Tech Corridor",
      description:
        "Steadily expanding technology parks and startups contributing substantially to software exports, regional tech employment, and digital commerce.",
      stat: "High-Growth Sector",
      context:
        "Rushikonda IT SEZ, Fintech Valley Vizag, and Millennium Towers hosting IT leaders, digital product engineering centers, and incubation hubs for coastal Andhra tech talent.",
      highlights: ["Rushikonda IT SEZ", "Fintech Valley Epicenter", "AI & Cloud Clusters"],
    },
    {
      title: "Hinterland Mineral Wealth",
      icon: Gem,
      badge: "Abundant Natural Resources",
      description:
        "Rich hinterland deposits of quartzite, bauxite (~1,000 MT reserves), graphite, manganese, titanium, and silica sand feeding core industries.",
      stat: "~1,000 MT Bauxite Reserves",
      context:
        "Supplies heavy metallurgy, alumina refineries, silicon carbide plants, and port-based mineral processing clusters across eastern India and international buyers.",
      highlights: ["~1,000 MT Bauxite", "Manganese & Titanium", "Heavy Smelting Supply"],
    },
    {
      title: "Special Economic Zones",
      icon: Landmark,
      badge: "Corridors of Enterprise",
      description:
        "Multi-product corridors including VSEZ, APSEZ, APIIC, Aganampudi Industrial Park, and Visakha Dairy driving sustainable manufacturing.",
      stat: "VSEZ, APSEZ & APIIC",
      context:
        "Special economic zones offering single-window clearances, export exemptions, dedicated power infrastructure, and multimodal logistics links directly to the port.",
      highlights: ["Single-Window Approvals", "Multi-Product Corridors", "Duty-Free Export Hubs"],
    },
  ];

  const values = [
    { title: "Excellence", desc: "Setting the highest standards in trade advocacy and member services." },
    { title: "Innovation", desc: "Empowering startups, modern tech, and forward-looking economic policies." },
    { title: "Integrity", desc: "Unwavering ethical commitment in all government and business dialogues." },
    { title: "Passion", desc: "Deep dedication to Visakhapatnam's social, physical, and economic growth." },
    { title: "Teamwork", desc: "Fostering unity across trade bodies, sister chambers, and international delegations." },
  ];

  const currentMilestone = milestones[activeMilestone];

  return (
    <div className="flex flex-col gap-12 sm:gap-16 py-4">
      {/* Intro Heritage Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card/90 to-background p-6 sm:p-10 md:p-12 shadow-xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 border border-amber-500/30">
            <Sparkles size={13} />
            <span>ESTABLISHED 1931 • <NumberCounter value="95" /> YEARS OF EXCELLENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            The Premier Voice of Trade, Industry & Progress in Visakhapatnam
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Founded in 1931, the Vizagapatam Chamber of Commerce & Industry (VCCI) was established
            to represent the collective aspirations of the regional business fraternity and resolve
            critical commercial concerns in direct partnership with State and Central Governments.
            From a 9-member founding committee in old town Vizag to an apex body of over 1,000+
            enterprises, VCCI continues to power the city’s economic ascent.
          </p>
        </div>

        {/* Quick Highlights / Stats Grid with Animated Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border/50">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-2xl bg-muted/40 border border-border/40 backdrop-blur-xs flex flex-col gap-1"
            >
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs uppercase tracking-wider font-semibold">{s.label}</span>
                <s.icon size={16} className="text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                <NumberCounter value={s.value} />
              </div>
              <div className="text-[11px] text-muted-foreground leading-tight">{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingCard className="h-full">
          <div className="h-full p-6 sm:p-8 rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/25">
                <Target size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                To be the leading business organisation of Vizag, helping build a thriving, sustainable,
                and prosperous city in which to do business, work, innovate, and live.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-semibold text-amber-500">
              <CheckCircle2 size={15} />
              <span>Catalyzing Sustainable Regional Prosperity</span>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className="h-full">
          <div className="h-full p-6 sm:p-8 rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/25">
                <Compass size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                As Visakhapatnam expands rapidly, VCCI is committed to strengthening the city's
                physical, social, and economic infrastructure to keep pace with a changing India.
                Partnering with business leaders, sister chambers, trade bodies, government agencies,
                and international delegations to act as the community's premier information gateway.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-semibold text-amber-500">
              <CheckCircle2 size={15} />
              <span>Information Gateway • Policy Representation • Global Bridges</span>
            </div>
          </div>
        </FloatingCard>
      </section>

      {/* Core Values */}
      <section className="p-6 sm:p-8 rounded-3xl border border-border/60 bg-muted/30">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Core Values Guiding VCCI</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-4 rounded-2xl bg-background/80 border border-border/50 shadow-xs flex flex-col gap-1.5"
            >
              <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                {v.title}
              </span>
              <p className="text-xs text-muted-foreground leading-normal">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Historical Milestones Timeline */}
      <section className="space-y-6" aria-labelledby="milestones-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-500">Decades of Legacy</p>
            <h3 id="milestones-heading" className="text-2xl font-bold text-foreground">
              A Journey Through 95 Years
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl">
              From pre-independence maritime trade to high-tech manufacturing, explore how the Chamber
              adapted and grew alongside Visakhapatnam.
            </p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto" role="toolbar" aria-label="Timeline navigation">
            <button
              onClick={() => setActiveMilestone((prev) => Math.max(0, prev - 1))}
              disabled={activeMilestone === 0}
              aria-label="Previous milestone"
              className="p-2 rounded-full border border-border/80 bg-background/80 hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-mono text-muted-foreground px-1">
              {activeMilestone + 1} / {milestones.length}
            </span>
            <button
              onClick={() => setActiveMilestone((prev) => Math.min(milestones.length - 1, prev + 1))}
              disabled={activeMilestone === milestones.length - 1}
              aria-label="Next milestone"
              className="p-2 rounded-full border border-border/80 bg-background/80 hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Milestone Steps Scrubber */}
        <div
          className="relative pt-4 pb-2 overflow-x-auto no-scrollbar"
          role="tablist"
          aria-label="Historical milestones"
        >
          {/* Track line behind steps */}
          <div className="absolute top-8 left-4 right-4 h-0.5 bg-border/70 hidden sm:block">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
              style={{
                width: `${(activeMilestone / (milestones.length - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10 min-w-[560px] sm:min-w-0">
            {milestones.map((m, i) => {
              const isActive = activeMilestone === i;
              return (
                <button
                  key={m.year}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`milestone-panel-${i}`}
                  id={`milestone-tab-${i}`}
                  onClick={() => setActiveMilestone(i)}
                  className={`flex flex-col items-start sm:items-center text-left sm:text-center p-3 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-amber-500/10 border-amber-500/50 shadow-md scale-[1.02]"
                      : "bg-background/80 border-border/60 hover:border-amber-400/40 hover:bg-muted/40"
                  }`}
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${
                      isActive
                        ? "bg-amber-500 text-slate-950 font-black shadow-xs ring-4 ring-amber-400/20"
                        : "bg-muted text-muted-foreground border border-border/60"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-xs font-bold transition-colors ${
                      isActive ? "text-amber-600 font-extrabold" : "text-muted-foreground"
                    }`}
                  >
                    {m.year}
                  </span>
                  <span className="text-[11px] font-medium text-foreground line-clamp-1 mt-0.5">
                    {m.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Card (Interactive Spotlight) */}
        <div
          role="tabpanel"
          id={`milestone-panel-${activeMilestone}`}
          aria-labelledby={`milestone-tab-${activeMilestone}`}
          className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-500/5 p-6 sm:p-8 shadow-lg"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-amber-600" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3 pl-2 sm:pl-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 border border-amber-500/30">
                  <Calendar size={13} />
                  <span>{currentMilestone.year}</span>
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  Milestone {activeMilestone + 1} of {milestones.length}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-foreground">
                {currentMilestone.title}
              </h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                {currentMilestone.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Collapsible Complete Chronology View for Full Context */}
        <details className="p-4 sm:p-6 rounded-2xl border border-border/60 bg-muted/20">
          <summary className="cursor-pointer text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between">
            <span>View Full Chronological Timeline (All 5 Milestones)</span>
            <span className="text-xs text-amber-500">Expand ↓</span>
          </summary>
          <div className="relative border-l-2 border-border/70 ml-3 sm:ml-4 pl-5 sm:pl-7 space-y-6 mt-6">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                onClick={() => setActiveMilestone(i)}
                className={`relative group cursor-pointer transition-all ${
                  activeMilestone === i ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
              >
                <div
                  className={`absolute -left-[27px] sm:-left-[35px] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all ${
                    activeMilestone === i
                      ? "border-amber-500 bg-amber-500 scale-125"
                      : "border-border/80 bg-background group-hover:border-amber-400 group-hover:scale-110"
                  }`}
                />
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-muted text-muted-foreground">
                    {m.year}
                  </span>
                  <h5 className="text-sm sm:text-base font-bold text-foreground">{m.title}</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </details>
      </section>

      {/* Visakhapatnam at a Glance: Strategic Sectors with Interactive FlipCard Effect */}
      <section className="space-y-6" aria-labelledby="sectors-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-500">Economic Engine</p>
            <h3 id="sectors-heading" className="text-2xl font-bold text-foreground">
              Visakhapatnam at a Glance
            </h3>
            <p className="text-sm text-muted-foreground max-w-3xl">
              Visakhapatnam is Andhra Pradesh's largest city and India's 9th wealthiest by GDP ($43.5B).
              Anchored by a deep-water natural harbour, strategic sea corridors, and colossal public and
              private industrial complexes.
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1.5">
            <RotateCw size={13} className="text-amber-500" />
            <span>Hover or tap card to flip for details</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keySectors.map((sec) => (
            <FlipCard
              key={sec.title}
              rotate="y"
              className="h-[280px]"
              front={
                <div className="size-full p-5 rounded-2xl border border-border/70 bg-card hover:border-amber-400/50 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-foreground group-hover:bg-amber-500/20 group-hover:text-amber-600 transition-colors">
                        <sec.icon size={18} />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground">
                        {sec.stat}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-amber-600 transition-colors">
                      {sec.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {sec.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/40 text-[11px] font-medium text-amber-600 flex items-center justify-between">
                    <span>{sec.badge}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <span>Flip</span>
                      <RotateCw size={11} />
                    </span>
                  </div>
                </div>
              }
              back={
                <div className="size-full p-5 rounded-2xl border border-amber-400/50 bg-[#0b2633] text-white flex flex-col justify-between shadow-2xl">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                        <sec.icon size={15} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300 px-2 py-0.5 rounded-full bg-white/10">
                        {sec.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-amber-200">
                      {sec.title}
                    </h4>
                    <p className="text-[11px] text-gray-200 leading-relaxed">
                      {sec.context}
                    </p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-white/15">
                    <div className="flex flex-wrap gap-1">
                      {sec.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/10 text-amber-200 font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                      <span>VCCI Industrial Focus</span>
                      <span className="text-amber-300 flex items-center gap-1">
                        <span>Flip back</span> ↺
                      </span>
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </section>

      {/* Leadership & Founding Tribute */}
      <section className="p-6 sm:p-8 rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
            <Award size={15} />
            <span>Honouring Our Pioneers</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-foreground">
            Led by Rao Saheb C. Sanjiva Rao Naidu & Visionary Founders
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The foundation laid by our early leaders—Sri Kancharla Ramabrahmam, Mr. V. J. Gupta, and
            fellow founding committee members—continues to inspire current office bearers, the Women's
            Wing, and the Youth Wing.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="/executive_committee"
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-border/80 hover:bg-muted text-foreground transition-colors flex items-center gap-1.5"
          >
            <Users size={14} />
            <span>Executive Committee</span>
          </a>
          <a
            href="/join"
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-900 shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Become a Member</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}

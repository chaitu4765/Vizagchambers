"use client";

import { motion } from "@/components/ui/hero-01-utils/motion";
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
  ShieldCheck,
  Briefcase,
  History,
  Target,
  Sparkles,
} from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";

export function AboutUsView() {
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
    },
    {
      title: "Shipbuilding & Marine Engineering",
      icon: Ship,
      badge: "Hindustan Shipyard Heritage",
      description:
        "Home to Hindustan Shipyard, which built India's first indigenous ship 'Jala Usha' in 1948 and has built and delivered over 167 major ocean vessels.",
      stat: "167+ Vessels Delivered",
    },
    {
      title: "Visakhapatnam Steel Plant (RINL)",
      icon: Building2,
      badge: "State-Run Steel Titan",
      description:
        "India's 2nd-largest state-run steel producer with an operating capacity of 6.3 MT spread over a massive 20,000-acre industrial expanse.",
      stat: "6.3 MT Capacity • 20,000 Acres",
    },
    {
      title: "Visakhapatnam Port Authority",
      icon: Anchor,
      badge: "Premier Natural Deep-Water Port",
      description:
        "One of India's largest and most efficient cargo ports, capable of berthing capesize vessels up to 150,000 DWT with a natural 17-metre draft.",
      stat: "150,000 DWT • 17m Draft",
    },
    {
      title: "Fisheries & Marine Exports",
      icon: Fish,
      badge: "East Coast Gateway",
      description:
        "The port's fishing harbour is among the largest on the Andhra Pradesh coast, acting as a global export epicenter for premium tuna and seafood.",
      stat: "Major Seafood Hub",
    },
    {
      title: "IT, ITES & Coastal Innovation",
      icon: Cpu,
      badge: "Fast-Growing Tech Corridor",
      description:
        "Steadily expanding technology parks and startups contributing substantially to software exports, regional tech employment, and digital commerce.",
      stat: "High-Growth Sector",
    },
    {
      title: "Hinterland Mineral Wealth",
      icon: Gem,
      badge: "Abundant Natural Resources",
      description:
        "Rich hinterland deposits of quartzite, bauxite (~1,000 MT reserves), graphite, manganese, titanium, and silica sand feeding core industries.",
      stat: "~1,000 MT Bauxite Reserves",
    },
    {
      title: "Special Economic Zones",
      icon: Landmark,
      badge: "Corridors of Enterprise",
      description:
        "Multi-product corridors including VSEZ, APSEZ, APIIC, Aganampudi Industrial Park, and Visakha Dairy driving sustainable manufacturing.",
      stat: "VSEZ, APSEZ & APIIC",
    },
  ];

  const values = [
    { title: "Excellence", desc: "Setting the highest standards in trade advocacy and member services." },
    { title: "Innovation", desc: "Empowering startups, modern tech, and forward-looking economic policies." },
    { title: "Integrity", desc: "Unwavering ethical commitment in all government and business dialogues." },
    { title: "Passion", desc: "Deep dedication to Visakhapatnam's social, physical, and economic growth." },
    { title: "Teamwork", desc: "Fostering unity across trade bodies, sister chambers, and international delegations." },
  ];

  return (
    <div className="flex flex-col gap-12 sm:gap-16 py-4">
      {/* Intro Heritage Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card/90 to-background p-6 sm:p-10 md:p-12 shadow-xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <Sparkles size={13} />
            <span>ESTABLISHED 1931 • 95 YEARS OF EXCELLENCE</span>
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

        {/* Quick Highlights / Stats Grid */}
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
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{s.value}</div>
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

      {/* Historical Milestones */}
      <section className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-500">Decades of Legacy</p>
          <h3 className="text-2xl font-bold text-foreground">A Journey Through 95 Years</h3>
          <p className="text-sm text-muted-foreground max-w-2xl">
            From pre-independence maritime trade to high-tech manufacturing, explore how the Chamber
            adapted and grew alongside Visakhapatnam.
          </p>
        </div>

        <div className="relative border-l-2 border-border/70 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-amber-400 bg-background group-hover:scale-125 group-hover:bg-amber-400 transition-all duration-300" />
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/20">
                  {m.year}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-foreground">{m.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visakhapatnam at a Glance: Strategic Sectors */}
      <section className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-500">Economic Engine</p>
          <h3 className="text-2xl font-bold text-foreground">Visakhapatnam at a Glance</h3>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Visakhapatnam is Andhra Pradesh's largest city and India's 9th wealthiest by GDP ($43.5B).
            Anchored by a deep-water natural harbour, strategic sea corridors, and colossal public and
            private industrial complexes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keySectors.map((sec) => (
            <div
              key={sec.title}
              className="p-5 rounded-2xl border border-border/60 bg-card hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-foreground group-hover:bg-amber-500/20 group-hover:text-amber-500 transition-colors">
                    <sec.icon size={18} />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground">
                    {sec.stat}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-amber-500 transition-colors">
                  {sec.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sec.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/40 text-[11px] font-medium text-amber-500 flex items-center justify-between">
                <span>{sec.badge}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </div>
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

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Sparkles,
  CheckCircle2,
  Hotel,
  ShieldCheck,
  Download,
  Share2,
  ExternalLink,
  Phone,
  Mail,
  QrCode,
  FileText,
  Award,
  ChevronRight,
  Copy,
  Check,
  LogOut,
  Filter,
  Search,
  Users,
  CreditCard,
  ArrowUpRight,
  Utensils,
  Wifi,
  Car,
  Coffee,
  X,
  BadgeCheck,
} from "lucide-react";
import { useMemberModal, type MemberUser } from "@/components/member-modal-context";
import { LinkPreview } from "@/components/ui/link-preview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EngravedTicket } from "@/components/ui/engraved-ticket";
import { LanyardBadge } from "@/components/ui/lanyard-badge";
import { cn } from "@/lib/utils";

interface EventItem {
  id: string;
  title: string;
  dateStr: string;
  day: string;
  month: string;
  year: string;
  time: string;
  category: "Summits & Conclaves" | "MSME & Policy" | "Technology & Innovation" | "Youth & Fellowship" | "Statutory & AGM";
  venue: string;
  address: string;
  keynote: string;
  summary: string;
  capacity: string;
  dressCode: string;
}

interface HotelPartner {
  id: string;
  name: string;
  area: string;
  stars: number;
  image: string;
  discountBadge: string;
  tariffCode: string;
  description: string;
  amenities: string[];
  contactPhone: string;
  address: string;
  websiteUrl: string;
}

const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "vcci-summit-2026",
    title: "VCCI Annual Industrial Leadership Summit & Maritime Conclave 2026",
    dateStr: "Saturday, 24 October 2026",
    day: "24",
    month: "OCT",
    year: "2026",
    time: "09:30 AM – 02:00 PM IST",
    category: "Summits & Conclaves",
    venue: "East Point Golf Club & Convention Pavilion",
    address: "Mudda Gardens, Beach Road, Visakhapatnam",
    keynote: "Hon'ble Minister for Industries & Commerce, GoAP; Chairman, Visakhapatnam Port Authority",
    summary:
      "Signature annual flagship conference focusing on port infrastructure expansion, green hydrogen corridors, maritime logistics synergy, and capital subsidy roadmaps for Visakhapatnam's heavy industries.",
    capacity: "350 Delegates (VCCI Executive Members Only)",
    dressCode: "Business Formal / Formal Lounge Suit",
  },
  {
    id: "ap-msme-linkage-2026",
    title: "Andhra Pradesh MSME & Global Export Market Linkage Forum",
    dateStr: "Thursday, 12 November 2026",
    day: "12",
    month: "NOV",
    year: "2026",
    time: "02:00 PM – 06:30 PM IST",
    category: "MSME & Policy",
    venue: "Grand Ballroom, Novotel Visakhapatnam Varun Beach",
    address: "Beach Road, Maharani Peta, Visakhapatnam",
    keynote: "Special Chief Secretary, Industries & Commerce, GoAP; President, VCCI",
    summary:
      "High-impact vendor development meet bridging regional MSME manufacturing units with major public sector anchors including RINL Vizag Steel, HPCL Refinery, and NTPC Simhadri.",
    capacity: "250 Registered Enterprises",
    dressCode: "Smart Casual / Business Formal",
  },
  {
    id: "vcci-ai-tech-2026",
    title: "Interactive Artificial Intelligence & Enterprise Automation Masterclass",
    dateStr: "Saturday, 28 November 2026",
    day: "28",
    month: "NOV",
    year: "2026",
    time: "10:30 AM – 01:30 PM IST",
    category: "Technology & Innovation",
    venue: "Sir A.V. Bhanoji Rao Conference Hall, VCCI Secretariat",
    address: "Chamber House, Waltair Uplands, Visakhapatnam",
    keynote: "Advisory Panel on Enterprise AI Architecture & Cyber Law",
    summary:
      "Hands-on executive clinic demonstrating autonomous agentic workflows, tax & legal automation, ERP intelligence, and cyber risk mitigation for Andhra Pradesh enterprises.",
    capacity: "80 Corporate Leaders",
    dressCode: "Business Casual",
  },
  {
    id: "youth-fellowship-2026",
    title: "VCCI Youth Wing Industrial Fellowship & Deepwater Terminal Visit",
    dateStr: "Saturday, 05 December 2026",
    day: "05",
    month: "DEC",
    year: "2026",
    time: "09:00 AM – 01:00 PM IST",
    category: "Youth & Fellowship",
    venue: "Visakhapatnam Port Authority Outer Terminal Complex",
    address: "Port Area, Visakhapatnam",
    keynote: "Chief Mechanical Engineer & Traffic Manager, VPA",
    summary:
      "Exclusive guided tour and high-level interaction with container terminal operators, mechanical coal handling systems, and green port zero-carbon initiatives.",
    capacity: "60 Next-Gen Chamber Leaders",
    dressCode: "Industrial Safety Compliant (Closed Shoes)",
  },
  {
    id: "vcci-agm-gala-2027",
    title: "Annual General Body Assembly & Business Excellence Awards Gala 2027",
    dateStr: "Monday, 18 January 2027",
    day: "18",
    month: "JAN",
    year: "2027",
    time: "06:30 PM – 10:00 PM IST",
    category: "Statutory & AGM",
    venue: "Hotel Daspalla Grand Arena & Banquet Lawn",
    address: "Suryabagh, Asilmetta Junction, Visakhapatnam",
    keynote: "Past Presidents of VCCI & Chief Guest Dignitary",
    summary:
      "Chamber constitutional statutory assembly, presentation of annual audited accounts, policy advocacy representations, followed by the prestigious VCCI Business Excellence Awards and Fellowship Dinner.",
    capacity: "500 Members & Spouses",
    dressCode: "Formal Traditional / Black Tie Optional",
  },
];

const PARTNER_HOTELS: HotelPartner[] = [
  {
    id: "novotel-varun-beach",
    name: "Novotel Visakhapatnam Varun Beach",
    area: "Beach Road",
    stars: 5,
    image: "https://www.vizagchamber.com/uploads/b9ffe91a0a01aca9d58b500c2118eb76.jpg",
    discountBadge: "20% Corporate Concession & Oceanfront Lounge",
    tariffCode: "VCCI-NOVOTEL-VIP",
    description:
      "Premier 5-star oceanfront hotel offering unobstructed Bay of Bengal views. VCCI members receive priority executive room upgrades, 20% discount on Grand Ballroom banquets, and 15% dining savings at The Square and Vue Lounge.",
    amenities: ["Ocean View Suites", "Infinity Pool", "Banquet Pavilion", "Executive Lounge", "24/7 Concierge"],
    contactPhone: "+91 891 282 2222",
    address: "Beach Road, Maharani Peta, Visakhapatnam – 530002",
    websiteUrl: "https://all.accor.com",
  },
  {
    id: "hotel-daspalla",
    name: "Hotel Daspalla",
    area: "Suryabagh / Asilmetta",
    stars: 4,
    image: "https://www.vizagchamber.com/uploads/151cf7bb6a2537db68b5ecea230d3857.jpg",
    discountBadge: "30% Corporate Tariff & Free 2h Boardroom",
    tariffCode: "VCCI-DASPALLA-CORP",
    description:
      "Historic Chamber hospitality partner in central commercial Visakhapatnam. Members enjoy a guaranteed 30% reduction on Executive Club and Deluxe suites, plus complimentary 2-hour use of private discussion salons.",
    amenities: ["Heritage Partner", "Dimple Banquet", "Vaisakhi Dining", "Conference Suite", "Airport Shuttle"],
    contactPhone: "+91 891 256 4825",
    address: "Suryabagh, Asilmetta Junction, Visakhapatnam – 530020",
    websiteUrl: "https://daspallahotels.com",
  },
  {
    id: "dolphin-international",
    name: "Dolphin International Hotel",
    area: "Dabagardens",
    stars: 4,
    image: "https://www.vizagchamber.com/uploads/fa7f3f7185f803bff7fb651e19f97464.jpg",
    discountBadge: "25% Room & Banquet Corporate Package",
    tariffCode: "VCCI-DOLPHIN-EXEC",
    description:
      "Long-standing landmark hotel in Visakhapatnam's financial sector. Features preferential member corporate rates, complimentary multi-cuisine buffet breakfasts, and special banquet pricing for enterprise meetings.",
    amenities: ["Horizon Restaurant", "Central Commercial Hub", "Fast WiFi", "Business Center", "Valet Parking"],
    contactPhone: "+91 891 256 7000",
    address: "Dabagardens, Visakhapatnam – 530020",
    websiteUrl: "https://dolphinhotelsvizag.com",
  },
  {
    id: "the-gateway-hotel",
    name: "The Gateway Hotel Beach Road",
    area: "Pandurangapuram",
    stars: 5,
    image: "https://www.vizagchamber.com/uploads/a178e454111bd9c1ea2f3e868e1bd84a.jpg",
    discountBadge: "25% Taj Hospitality Corporate Concession",
    tariffCode: "VCCI-TAJ-GATEWAY",
    description:
      "IHCL / Taj Group property set against Lawson's Bay. VCCI corporate cardholders unlock discounted room rates, customized corporate catering, and complimentary access to the modern fitness and wellness centre.",
    amenities: ["Lawson's Bay Vista", "Ming Garden Chinese", "Taj Club Level", "Fitness Centre", "Spa"],
    contactPhone: "+91 891 662 3000",
    address: "Beach Road, Pandurangapuram, Visakhapatnam – 530002",
    websiteUrl: "https://www.ihcltata.com",
  },
  {
    id: "green-park-hotel",
    name: "Green Park Hotel",
    area: "Waltair Uplands",
    stars: 4,
    image: "https://www.vizagchamber.com/uploads/184b78d166647905d93a9e74c9517038.jpg",
    discountBadge: "25% Corporate Package & Free Airport Transfer",
    tariffCode: "VCCI-GREENPARK-BIZ",
    description:
      "Prime executive stay in Waltair Uplands adjacent to elite commercial offices. Members receive 25% off room rack rates, priority check-in, complimentary airport pick-up, and 24-hour business centre assistance.",
    amenities: ["Tulips 24h Cafe", "Mustang Bar", "Airport Transfers", "Meeting Rooms", "Fiber WiFi"],
    contactPhone: "+91 891 256 4444",
    address: "#12-1-17 Waltair Main Rd, Visakhapatnam – 530002",
    websiteUrl: "https://hotelgreenpark.com",
  },
  {
    id: "fortune-inn-sreekanya",
    name: "Fortune Inn Sreekanya (ITC Hotels Group)",
    area: "Dwaraknagar",
    stars: 4,
    image: "https://www.vizagchamber.com/uploads/7540b9e1d257005fcce7e3388ce978ee.jpg",
    discountBadge: "20% Member Tariff & ITC Dining Concession",
    tariffCode: "VCCI-FORTUNE-CORP",
    description:
      "Conveniently positioned near RTC Complex and commercial hubs. Provides business travellers with comfortable modern rooms, 20% member dining discount at Zodiac, and discounted conference hall rentals.",
    amenities: ["Zodiac Restaurant", "Nostradamus Lounge", "Boardroom", "Central Location", "Laundry Express"],
    contactPhone: "+91 891 398 8444",
    address: "47-10-34 Diamond Park, Dwaraknagar, Visakhapatnam – 530016",
    websiteUrl: "https://www.fortunehotels.in",
  },
  {
    id: "four-points-sheraton",
    name: "Four Points by Sheraton",
    area: "Waltair Main Road",
    stars: 5,
    image: "https://www.vizagchamber.com/uploads/c844c0dcf3f3e77efaa1b0a797785213.jpg",
    discountBadge: "Marriott Corporate Linkage & 20% Banquet Rate",
    tariffCode: "VCCI-SHERATON-MEMBER",
    description:
      "Renowned Marriott brand in Waltair. Offers customized banquet packages for Chamber member corporate celebrations, high-tech audiovisual equipment, and preferential corporate room allotments.",
    amenities: ["The Eatery", "Best Brews", "Marriott Bonvoy Points", "Poolside Lawn", "Grand Ballroom"],
    contactPhone: "+91 891 305 1111",
    address: "10-28-3 Uplands, Waltair Main Rd, Visakhapatnam – 530003",
    websiteUrl: "https://www.marriott.com",
  },
  {
    id: "welcomhotel-devee-grand-bay",
    name: "Welcomhotel by ITC Hotels Devee Grand Bay",
    area: "Beach Road",
    stars: 5,
    image: "https://www.vizagchamber.com/uploads/e167973d1810c2327b3f21520984a427.jpg",
    discountBadge: "Luxury Corporate Dining & Stay Concession",
    tariffCode: "VCCI-ITC-GRANDBAY",
    description:
      "Iconic seaside luxury property celebrated for Dakshin South Indian fine dining and regal banqueting. VCCI members enjoy corporate reservation desk priority and 20% conference delegate packages.",
    amenities: ["Dakshin Dining", "Bay View Suites", "Executive Lounge", "Ballroom Grand", "Spa & Wellness"],
    contactPhone: "+91 891 660 0101",
    address: "Beach Road, Visakhapatnam – 530002",
    websiteUrl: "https://www.itchotels.com",
  },
];

export function MemberDashboardView() {
  const { user, isLoggedIn, login, logout, toggleRsvp, openModal } = useMemberModal();
  const [activeTab, setActiveTab] = useState("events");
  const [eventFilter, setEventFilter] = useState<string>("ALL");
  const [hotelFilter, setHotelFilter] = useState<string>("ALL");
  const [searchHotel, setSearchHotel] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<HotelPartner | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [icsDownloaded, setIcsDownloaded] = useState<string | null>(null);
  const [ticketVariant, setTicketVariant] = useState<"crimson" | "paper">("crimson");

  // If user is not logged in, show an inviting login prompt card
  if (!isLoggedIn || !user) {
    return (
      <div className="py-12 sm:py-20 px-4 max-w-4xl mx-auto text-center space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-amber-400/35 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(circle at 10% 20%, rgba(217,119,6,0.25), transparent 45%), radial-gradient(circle at 90% 80%, rgba(56,189,248,0.2), transparent 45%)",
            }}
          />

          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30">
              <ShieldCheck size={14} />
              <span>VCCI EXECUTIVE CHAMBER PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight">
              Sign In to Access Your Member Dashboard
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              The Member Dashboard offers real-time access to executive summits, B2B meets, exclusive partner hotel corporate rates (up to 30% off), boardroom reservations, and export certification services.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => login()}
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #D97706 100%)",
                  color: "#071B26",
                  boxShadow: "0 8px 24px -4px rgba(245, 158, 11, 0.45)",
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                1-Click Sign In as Executive Member
              </button>

              <button
                type="button"
                onClick={() => openModal("login")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
              >
                Open Member Sign In Modal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleDownloadIcs = (event: EventItem) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vizag Chamber//Member Events//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.summary}\\n\\nKeynote: ${event.keynote}
LOCATION:${event.venue}, ${event.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIcsDownloaded(event.id);
    setTimeout(() => setIcsDownloaded(null), 3000);
  };

  const filteredEvents = UPCOMING_EVENTS.filter((e) => {
    if (eventFilter === "ALL") return true;
    return e.category === eventFilter;
  });

  const filteredHotels = PARTNER_HOTELS.filter((h) => {
    const matchesArea = hotelFilter === "ALL" || h.area.includes(hotelFilter);
    const matchesSearch =
      !searchHotel ||
      h.name.toLowerCase().includes(searchHotel.toLowerCase()) ||
      h.area.toLowerCase().includes(searchHotel.toLowerCase()) ||
      h.description.toLowerCase().includes(searchHotel.toLowerCase());
    return matchesArea && matchesSearch;
  });

  const rsvpCount = user.rsvps?.length || 0;

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. Executive Engraved Ticket Profile Element */}
      <div className="space-y-4">
        {/* Executive Meta & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative size-12 rounded-xl overflow-hidden border border-amber-400/50 bg-slate-900 shrink-0">
              <img
                src={user.avatar || "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png"}
                alt={user.name}
                className="size-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png";
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-base text-foreground">{user.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/30">
                  ✦ {user.membershipLevel}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <BadgeCheck size={11} />
                  <span>Validated {user.validThru}</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user.company} • <span className="font-mono text-amber-600 dark:text-amber-400">ID: {user.memberId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:shrink-0">
            {/* Ticket style toggle */}
            <div className="inline-flex rounded-xl bg-muted p-1 border border-border/70 text-xs">
              <button
                type="button"
                onClick={() => setTicketVariant("crimson")}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  ticketVariant === "crimson"
                    ? "bg-slate-900 text-amber-300 shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Crimson Plate
              </button>
              <button
                type="button"
                onClick={() => setTicketVariant("paper")}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  ticketVariant === "paper"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Paper Print
              </button>
            </div>

            <button
              onClick={() => setActiveTab("card")}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <QrCode size={13} className="text-amber-500" />
              <span>Lanyard Pass</span>
            </button>

            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1 cursor-pointer"
            >
              <LogOut size={12} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* The Die-Cut Engraved Ticket Element */}
        <div className="flex justify-center w-full overflow-hidden py-2">
          <EngravedTicket
            word="VCCI"
            variant={ticketVariant}
            tagline={`VIZAGAPATAM CHAMBER\nESTD. 1931`}
            quote={`“${user.name}”`}
            body={`This certifies that ${user.company} is an accredited ${user.membershipLevel} in good standing with the Visakhapatnam Chamber of Commerce & Industry (Member ID: ${user.memberId}). Valid through ${user.validThru}. Entitled to statutory export certification, partner hotel concessions, and executive summit representation.`}
            notes={`Admit Member\n${user.memberId}\n${user.membershipLevel}\nWaltair Uplands\nVisakhapatnam`}
            code={user.memberId}
            dot={2}
            width="min(100%, 1160px)"
            tilt={8}
            accent={ticketVariant === "crimson" ? "#F59E0B" : "#d9241c"}
          />
        </div>

        {/* Executive Stat Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 rounded-2xl bg-card border border-border/80 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Upcoming Meets</span>
              <Calendar size={14} className="text-amber-500" />
            </div>
            <p className="text-xl font-bold text-foreground font-mono">
              {UPCOMING_EVENTS.length}{" "}
              <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">
                ({rsvpCount} RSVP&apos;d)
              </span>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-card border border-border/80 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Partner Hotels</span>
              <Hotel size={14} className="text-amber-500" />
            </div>
            <p className="text-xl font-bold text-foreground font-mono">
              {PARTNER_HOTELS.length}{" "}
              <span className="text-xs font-normal text-amber-600 dark:text-amber-400">
                (Up to 30% off)
              </span>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-card border border-border/80 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Export eCOO Status</span>
              <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              Active <span className="text-xs font-normal text-muted-foreground">Fast-track</span>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-card border border-border/80 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Boardroom Credit</span>
              <Building2 size={14} className="text-amber-500" />
            </div>
            <p className="text-xl font-bold text-foreground font-mono">
              10 hrs <span className="text-xs font-normal text-muted-foreground">/ Month</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
        <div className="flex overflow-x-auto pb-1 border-b border-border/60">
          <TabsList className="inline-flex h-auto p-1.5 gap-1.5 bg-muted/80 rounded-2xl border border-border/60">
            <TabsTrigger
              value="events"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-[#071b26] data-[state=active]:text-white data-[state=active]:shadow-md text-foreground/80 hover:text-foreground transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar size={14} />
              <span>Upcoming Events & Meets</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-500 font-mono font-bold">
                {UPCOMING_EVENTS.length}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="hotels"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-[#071b26] data-[state=active]:text-white data-[state=active]:shadow-md text-foreground/80 hover:text-foreground transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <Hotel size={14} />
              <span>Avail Hotel Services</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                8 Partner Hotels
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="services"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-[#071b26] data-[state=active]:text-white data-[state=active]:shadow-md text-foreground/80 hover:text-foreground transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <Building2 size={14} />
              <span>Chamber Services</span>
            </TabsTrigger>

            <TabsTrigger
              value="card"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-[#071b26] data-[state=active]:text-white data-[state=active]:shadow-md text-foreground/80 hover:text-foreground transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <QrCode size={14} />
              <span>Digital Member Pass</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB 1: UPCOMING EVENTS & MEETS */}
        <TabsContent value="events" className="space-y-6 mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                Upcoming Executive Meets & Summits
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Confirm your delegate attendance, download calendar invites, and review keynote agendas.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-muted border border-border">
              {["ALL", "Summits & Conclaves", "MSME & Policy", "Technology & Innovation"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setEventFilter(cat)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                      eventFilter === cat
                        ? "bg-background text-foreground shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat === "ALL" ? "All Meets" : cat.split(" ")[0]}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {filteredEvents.map((event) => {
              const isRsvpd = user.rsvps?.includes(event.id);

              return (
                <div
                  key={event.id}
                  className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs hover:border-amber-400/50 hover:shadow-lg transition-all flex flex-col lg:flex-row gap-6 justify-between"
                >
                  {/* Left: Date Box & Info */}
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    {/* Date Block */}
                    <div className="size-20 sm:size-24 rounded-2xl bg-gradient-to-br from-[#071b26] to-slate-900 border border-amber-400/40 p-2 flex flex-col items-center justify-center text-center shrink-0 shadow-md">
                      <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                        {event.month}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono leading-none">
                        {event.day}
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono mt-0.5">
                        {event.year}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/30">
                          {event.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                          <Clock size={12} />
                          {event.time}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                        {event.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {event.summary}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 text-foreground font-medium">
                          <MapPin size={13} className="text-amber-500" />
                          <span>{event.venue}</span>
                        </span>
                        <span>•</span>
                        <span className="text-[11px] font-mono">{event.capacity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & RSVP */}
                  <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-border/60 shrink-0 min-w-[200px]">
                    <div className="w-full space-y-2">
                      <button
                        type="button"
                        onClick={() => toggleRsvp(event.id)}
                        className={cn(
                          "w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs",
                          isRsvpd
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30"
                            : "bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold shadow-amber-400/30"
                        )}
                      >
                        {isRsvpd ? (
                          <>
                            <CheckCircle2 size={15} />
                            <span>RSVP Confirmed</span>
                          </>
                        ) : (
                          <>
                            <Calendar size={15} />
                            <span>RSVP Delegate Pass</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadIcs(event)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-medium text-foreground/80 hover:text-foreground bg-muted hover:bg-muted/80 border border-border transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {icsDownloaded === event.id ? (
                          <>
                            <Check size={13} className="text-emerald-500" />
                            <span className="text-emerald-600 font-bold">Added to Calendar!</span>
                          </>
                        ) : (
                          <>
                            <Download size={13} />
                            <span>Add to Outlook / iCal</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-muted-foreground font-mono text-right w-full">
                      Dress: {event.dressCode}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* TAB 2: AVAIL HOTEL SERVICES */}
        <TabsContent value="hotels" className="space-y-6 mt-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-2">
                <Hotel size={12} />
                <span>CHAMBER CORPORATE HOSPITALITY CONCESSIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                Partner Hotels & Executive Privileges
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                As a validated Chamber Member, avail exclusive corporate tariffs, boardroom credits, and dining concessions across Visakhapatnam.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search hotel or area…"
                value={searchHotel}
                onChange={(e) => setSearchHotel(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Area Filters */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-muted/70 border border-border/60">
            {["ALL", "Beach Road", "Waltair", "Dabagardens", "Suryabagh", "Dwaraknagar"].map(
              (area) => (
                <button
                  key={area}
                  onClick={() => setHotelFilter(area)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                    hotelFilter === area
                      ? "bg-background text-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {area === "ALL" ? "All Locations (8)" : area}
                </button>
              )
            )}
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs hover:border-amber-400/50 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & Badge */}
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/b9ffe91a0a01aca9d58b500c2118eb76.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono font-bold text-amber-300 border border-amber-400/30">
                      ★ {hotel.stars}-STAR LUXURY
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                        {hotel.area}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight mt-1">
                        {hotel.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/25 space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1">
                        <Sparkles size={12} />
                        <span>Chamber Member Concession</span>
                      </span>
                      <p className="text-xs font-bold text-foreground">
                        {hotel.discountBadge}
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {hotel.description}
                    </p>

                    {/* Amenities pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hotel.amenities.slice(0, 4).map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium text-foreground/80 border border-border/50"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0 border-t border-border/50 mt-4 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-muted-foreground font-mono block">
                      Corporate Code:
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                      {hotel.tariffCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedHotel(hotel)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#071b26] hover:bg-slate-900 text-white border border-amber-400/40 shadow-xs hover:border-amber-400 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Avail Rate</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* TAB 3: CHAMBER COMMERCIAL & ADVISORY SERVICES */}
        <TabsContent value="services" className="space-y-6 mt-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Official Chamber Corporate Services
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Fast-track statutory certifications, boardroom reservations, and weekly commercial broadcasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4 hover:border-amber-400/50 transition-all shadow-xs">
              <div className="size-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <FileText size={22} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">
                  Certificate of Origin (eCOO)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Concessional export certification endorsed within 2 hours. Required for marine cargo, steel, and pharma exports from Visakhapatnam port.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="/services#request"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  <span>Initiate Verification</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4 hover:border-amber-400/50 transition-all shadow-xs">
              <div className="size-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Building2 size={22} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">
                  Chamber Boardroom Reservation
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Reserve the Sir A.V. Bhanoji Rao Conference Hall at Chamber House. Fully air-conditioned with 4K projection and delegate seating for 40.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="/contact-us"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <span>Check Hall Availability</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4 hover:border-amber-400/50 transition-all shadow-xs">
              <div className="size-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Sparkles size={22} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">
                  Monday Magic Commercial Broadcast
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Distribute your company&apos;s special offers, commercial announcements, or product launches to 1,000+ chamber members via weekly broadcast.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="/member_of_week/advertise#request"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400"
                >
                  <span>Submit Broadcast Content</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 4: DIGITAL MEMBER PASS (INTERACTIVE LANYARD BADGE) */}
        <TabsContent value="card" className="space-y-6 mt-0">
          <div className="max-w-2xl mx-auto space-y-4 text-center">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Official Interactive Lanyard Pass
            </h2>
            <p className="text-xs text-muted-foreground max-w-lg mx-auto">
              Real-time physics-driven event badge. Drag the card to pull the strap taut, flick sideways to spin, or click &ldquo;Show back&rdquo; to flip over.
            </p>

            {/* Interactive Lanyard Badge Stage */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-950/95 border-2 border-amber-400/40 shadow-2xl p-2 sm:p-4">
              <LanyardBadge
                title="VIZAG CHAMBER"
                subtitle="Executive Pass · Est. 1931 · Visakhapatnam"
                name={user.name}
                role={`${user.membershipLevel} · ${user.company}`}
                strapText="vizagapatam chamber of commerce & industry"
                strapLabel={`MEMBER ${user.memberId}`}
                strapColor="#071B26"
                inkColor="#F59E0B"
                cardColor="#0B2633"
                height="560px"
                cardWidth={260}
                flipButton={true}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => alert(`Official Chamber Pass for ${user.name} (${user.memberId}) saved to your device wallet.`)}
                className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-xs bg-slate-900 text-white border border-amber-400/50 hover:border-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download size={14} className="text-amber-400" />
                <span>Save Pass to Wallet / Download PDF</span>
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Hotel Reservation Voucher Dialog */}
      <AnimatePresence>
        {selectedHotel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHotel(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-400/40 shadow-2xl p-6 sm:p-8 text-white z-10 space-y-6"
            >
              <button
                type="button"
                onClick={() => setSelectedHotel(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="size-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                  <Hotel size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedHotel.name}
                  </h3>
                  <span className="text-xs text-amber-300 font-mono">
                    Official VCCI Hospitality Privilege
                  </span>
                </div>
              </div>

              {/* Privilege Box */}
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-400/35 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-amber-300">
                  Guaranteed Member Concession
                </span>
                <p className="text-sm font-bold text-white">
                  {selectedHotel.discountBadge}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Provide your Corporate Tariff Code and show your VCCI Member Pass at check-in or when booking via telephone.
                </p>
              </div>

              {/* Tariff Code Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Corporate Tariff Booking Code:
                  </span>
                  <span className="text-base font-mono font-extrabold text-amber-400">
                    {selectedHotel.tariffCode}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyCode(selectedHotel.tariffCode)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode === selectedHotel.tariffCode ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reservation Contact */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-amber-400" />
                  <span>Reservation Desk: </span>
                  <a
                    href={`tel:${selectedHotel.contactPhone.replace(/\s+/g, "")}`}
                    className="font-bold text-white hover:text-amber-300 underline"
                  >
                    {selectedHotel.contactPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-amber-400" />
                  <span>{selectedHotel.address}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${selectedHotel.contactPhone.replace(/\s+/g, "")}`}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-center bg-amber-400 hover:bg-amber-300 text-slate-950 transition cursor-pointer"
                >
                  Call Reservation Desk Now
                </a>
                <a
                  href={selectedHotel.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl font-semibold text-xs text-center bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center justify-center gap-1.5"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

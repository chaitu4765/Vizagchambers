"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "@/components/ui/hero-01-utils/motion";
import {
  ArrowUpRight,
  ArrowDown,
  ShieldCheck,
} from "lucide-react";

// ============================================================================
// STAGES DATA
// ============================================================================
export interface StageData {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  titleItalic: string;
  body: string;
  stats?: { label: string; value: string; detail: string }[];
  pills?: { label: string; icon: string }[];
  cards?: {
    title: string;
    sub: string;
    href: string;
    tag: string;
  }[];
  cta?: {
    primaryText: string;
    primaryHref: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
}

const STAGES: StageData[] = [
  {
    id: "discover",
    number: "01",
    eyebrow: "01 / DISCOVER VIZAG",
    title: "A legacy of enterprise.",
    titleItalic: "A limitless future.",
    body: "The Vizagapatam Chamber of Commerce and Industry. Bringing businesses, people and possibilities together — fostering trade, industry advocacy, and economic progress in Visakhapatnam since 1931.",
    stats: [
      { label: "Apex Voice", value: "1931", detail: "9+ decades of advocacy" },
      { label: "Community", value: "1,000+", detail: "Member enterprises" },
      { label: "City GDP", value: "$43.5B", detail: "9th wealthiest city in India" },
    ],
    cta: {
      primaryText: "Scroll to trace the network",
      primaryHref: "#connected-vizag",
    },
  },
  {
    id: "connect",
    number: "02",
    eyebrow: "02 / CONNECT THE BUSINESS COMMUNITY",
    title: "Where maritime trade and",
    titleItalic: "modern industry converge.",
    body: "From the natural deepwater harbour of Visakhapatnam Port to heavy engineering, pharmaceutical corridors and digital clusters, the city’s enterprise network thrives through collective dialogue.",
    pills: [
      { label: "East Coast Gateway · Port & Maritime", icon: "⚓" },
      { label: "Industrial Core · Steel, Energy & Mining", icon: "🏭" },
      { label: "Pharma City · APSEZ & Global Life Sciences", icon: "🧪" },
      { label: "Digital Corridor · IT SEZ, FinTech & Services", icon: "💻" },
    ],
  },
  {
    id: "explore",
    number: "03",
    eyebrow: "03 / EXPLORE THE CHAMBER",
    title: "The vital connecting point",
    titleItalic: "of regional enterprise.",
    body: "For over 90 years, VCCI acts as the unified bridge connecting local commerce with state policymaking, providing tangible platforms and export infrastructure for every enterprise tier.",
    cards: [
      {
        title: "eCOO Export Certification",
        sub: "Digital Certificates of Origin for international shipments",
        href: "/services",
        tag: "Trade Facilitation",
      },
      {
        title: "Enterprise Helpdesk",
        sub: "Direct policy advisory, GST, ROC and regulatory guidance",
        href: "/services/helpdesk",
        tag: "Advisory",
      },
      {
        title: "VCCI Women's Wing",
        sub: "Empowering women entrepreneurs and executive leaders",
        href: "/women_wing",
        tag: "Leadership",
      },
      {
        title: "VCCI Youth Wing",
        sub: "Nurturing the next generation of industrial leadership",
        href: "/youth_wing",
        tag: "Innovation",
      },
    ],
  },
  {
    id: "network",
    number: "04",
    eyebrow: "04 / BECOME PART OF THE NETWORK",
    title: "Your seat at the table.",
    titleItalic: "Your voice in the future.",
    body: "The Vizagapatam Chamber of Commerce and Industry welcomes new members to be part of a network that’s committed to a simple goal: helping businesses succeed and our families, communities and country flourish.",
    cta: {
      primaryText: "Join the Chamber",
      primaryHref: "/join",
      secondaryText: "Explore Member Benefits",
      secondaryHref: "/join/benefits",
    },
  },
];

// ============================================================================
// STYLISED ARTISTIC SVG ILLUSTRATION
// ============================================================================
function ConnectedVizagIllustration({
  progress,
  activeStage,
  reducedMotion,
}: {
  progress: number;
  activeStage: number;
  reducedMotion: boolean;
}) {
  // Path progress computations
  // Stage 2 (0.25 -> 0.52): outer ring paths draw
  const stage2Ratio = reducedMotion
    ? 1
    : Math.max(0, Math.min(1, (progress - 0.22) / 0.25));
  // Stage 3 (0.50 -> 0.76): radial nexus paths draw
  const stage3Ratio = reducedMotion
    ? 1
    : Math.max(0, Math.min(1, (progress - 0.48) / 0.25));
  // Stage 4 (0.75 -> 1.0): full network golden aura
  const stage4Ratio = reducedMotion
    ? 1
    : Math.max(0, Math.min(1, (progress - 0.72) / 0.25));

  // Node highlight states
  const showNodes = reducedMotion || progress > 0.2;
  const showNexus = reducedMotion || progress > 0.45;
  const isComplete = reducedMotion || progress > 0.75;

  return (
    <div className="relative w-full aspect-[4/3] max-w-[680px] mx-auto select-none overflow-hidden rounded-3xl border border-amber-900/15 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#E9EFF4] shadow-2xl p-2 sm:p-4">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(245, 158, 11, ${0.05 + stage4Ratio * 0.12
            }) 0%, rgba(11, 38, 51, 0.02) 70%, transparent 100%)`,
        }}
      />

      <svg
        viewBox="0 0 880 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#EBF2F7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DFECF5" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="bayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#102A3A" />
            <stop offset="50%" stopColor="#16394F" />
            <stop offset="100%" stopColor="#1E4D69" />
          </linearGradient>

          <linearGradient id="goldBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="goldPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 1: SKY, HORIZON SUN GLOW & BACKGROUND HILLS (Kailasagiri) */}
        {/* ------------------------------------------------------------- */}
        <rect width="880" height="640" rx="20" fill="url(#skyGrad)" />

        {/* Rising sun / eastern horizon aura */}
        <circle
          cx="440"
          cy="260"
          r="160"
          fill="#FDE68A"
          fillOpacity={0.25 + stage4Ratio * 0.2}
          filter="blur(40px)"
        />

        {/* Distant Hills / Eastern Ghats silhouette */}
        <path
          d="M0 310 Q 110 260 240 285 T 510 270 T 720 290 T 880 275 L 880 430 L 0 430 Z"
          fill="#BACFD9"
          fillOpacity="0.45"
        />
        <path
          d="M0 340 Q 150 305 320 325 T 640 310 T 880 320 L 880 440 L 0 440 Z"
          fill="#8BAEBF"
          fillOpacity="0.5"
        />

        {/* ------------------------------------------------------------- */}
        {/* LAYER 2: DOLPHIN'S NOSE HEADLAND & OUTER HARBOUR BREAKWATER   */}
        {/* ------------------------------------------------------------- */}
        {/* Dolphin's Nose prominent cliff promontory curving into the sea */}
        <path
          d="M 0 420 Q 90 380 160 360 C 230 340 270 385 240 435 C 220 465 140 480 0 495 Z"
          fill="#1E3847"
        />
        {/* Rocky geological facets on Dolphin's Nose */}
        <path
          d="M 40 415 Q 120 385 180 375 C 220 370 235 410 215 440 C 180 460 100 470 40 480 Z"
          fill="#162D3B"
          fillOpacity="0.75"
        />

        {/* Dolphin's Nose Lighthouse tower */}
        <g transform="translate(190, 335)">
          <rect x="-4" y="-22" width="8" height="22" rx="1.5" fill="#FAF8F5" />
          <polygon points="-5,-22 5,-22 0,-30" fill="#DC2626" />
          {/* Lighthouse lantern room */}
          <rect x="-3" y="-21" width="6" height="5" fill="#F59E0B" />
          {/* Lighthouse beam sweeping towards the bay */}
          <polygon
            points="0,-18 190,60 180,95"
            fill="url(#goldBeam)"
            opacity={0.5 + Math.sin(progress * 10) * 0.15}
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 3: BAY OF BENGAL MARITIME WATER & WAVES                 */}
        {/* ------------------------------------------------------------- */}
        <path
          d="M 0 460 C 180 445 280 470 440 460 C 600 450 740 465 880 455 L 880 640 L 0 640 Z"
          fill="url(#bayGrad)"
        />

        {/* Stylized wave accents */}
        <path
          d="M 280 490 Q 340 485 400 492 T 520 490 T 640 494"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M 330 530 Q 410 522 490 531 T 670 526 T 820 534"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.25"
        />
        <path
          d="M 120 550 Q 220 545 320 553 T 500 548"
          stroke="#FDE68A"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.2"
        />

        {/* ------------------------------------------------------------- */}
        {/* LAYER 4: PORT GANTRY CRANES, CARGO VESSEL & CITY SKYLINE      */}
        {/* ------------------------------------------------------------- */}
        {/* Port Breakwater Jetty */}
        <path
          d="M 210 470 L 290 465 L 305 485 L 210 495 Z"
          fill="#334E60"
        />

        {/* Stylized Port Container Vessel */}
        <g transform="translate(350, 485)">
          {/* Ship hull */}
          <path
            d="M 0 16 L 90 16 L 80 32 L 12 32 Z"
            fill="#0B2633"
            stroke="#F59E0B"
            strokeWidth="1"
          />
          {/* Bridge / superstructure */}
          <rect x="62" y="3" width="14" height="13" fill="#E2E8F0" rx="1" />
          <rect x="66" y="-3" width="3" height="6" fill="#DC2626" />
          {/* Container boxes on deck */}
          <rect x="18" y="7" width="12" height="9" fill="#F59E0B" rx="1" />
          <rect x="32" y="7" width="12" height="9" fill="#0284C7" rx="1" />
          <rect x="46" y="7" width="12" height="9" fill="#10B981" rx="1" />
          {/* Water reflection */}
          <path
            d="M 10 34 L 82 34"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </g>

        {/* Port Gantry Crane 1 */}
        <g transform="translate(235, 415)">
          {/* Legs */}
          <line x1="0" y1="50" x2="16" y2="10" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="36" y1="50" x2="20" y2="10" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Horizontal boom */}
          <line x1="-15" y1="10" x2="65" y2="10" stroke="#D97706" strokeWidth="3" />
          <line x1="10" y1="0" x2="30" y2="0" stroke="#0B2633" strokeWidth="2" />
          {/* Trolley wire */}
          <line x1="45" y1="10" x2="45" y2="28" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 2" />
          <rect x="40" y="28" width="10" height="7" fill="#0284C7" />
        </g>

        {/* Commercial City Skyline & Towers (Top Right & Center) */}
        <g transform="translate(480, 240)">
          {/* Background buildings */}
          <rect x="10" y="55" width="22" height="65" fill="#476577" rx="1" />
          <rect x="36" y="45" width="28" height="75" fill="#3A5364" rx="1" />
          <rect x="68" y="30" width="25" height="90" fill="#2E4352" rx="1" />
          <rect x="97" y="60" width="30" height="60" fill="#476577" rx="1" />
          <rect x="131" y="40" width="26" height="80" fill="#253A47" rx="1" />
          <rect x="161" y="20" width="34" height="100" fill="#1C303D" rx="2" />
          <line x1="178" y1="20" x2="178" y2="5" stroke="#F59E0B" strokeWidth="1.5" />
          <rect x="199" y="50" width="24" height="70" fill="#3A5364" rx="1" />
          <rect x="227" y="35" width="32" height="85" fill="#2E4352" rx="1" />

          {/* Glowing window matrices on premier towers */}
          <circle cx="75" cy="45" r="1.5" fill="#FDE68A" />
          <circle cx="85" cy="45" r="1.5" fill="#FDE68A" />
          <circle cx="75" cy="55" r="1.5" fill="#FDE68A" />
          <circle cx="85" cy="55" r="1.5" fill="#FDE68A" />
          <circle cx="170" cy="35" r="1.5" fill="#FDE68A" />
          <circle cx="180" cy="35" r="1.5" fill="#FDE68A" />
          <circle cx="170" cy="50" r="1.5" fill="#FDE68A" />
          <circle cx="180" cy="50" r="1.5" fill="#FDE68A" />
          <circle cx="170" cy="65" r="1.5" fill="#FDE68A" />
          <circle cx="180" cy="65" r="1.5" fill="#FDE68A" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 5: THE CONNECTED NETWORK PATHS (Stages 2, 3 & 4)        */}
        {/* Coordinates:                                                 */}
        {/* Node A (Port):       (200, 460)                              */}
        {/* Node B (Industry):   (170, 220)                              */}
        {/* Node C (Digital):    (720, 210)                              */}
        {/* Node D (Pharma):     (730, 470)                              */}
        {/* Node Hub (Chamber):  (440, 330)                              */}
        {/* ------------------------------------------------------------- */}

        {/* Peripheral Loop: Port -> Industry -> Digital -> Pharma -> Port */}
        {/* Path 1: Port to Industry */}
        <path
          d="M 200 460 C 160 380 140 300 170 220"
          stroke="url(#goldPathGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="400"
          strokeDashoffset={400 * (1 - stage2Ratio)}
          className="transition-all duration-300"
          filter={stage4Ratio > 0.5 ? "url(#glowGold)" : undefined}
        />
        {/* Path 2: Industry to Digital */}
        <path
          d="M 170 220 C 320 160 560 150 720 210"
          stroke="url(#goldPathGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="600"
          strokeDashoffset={600 * (1 - stage2Ratio)}
          className="transition-all duration-300"
          filter={stage4Ratio > 0.5 ? "url(#glowGold)" : undefined}
        />
        {/* Path 3: Digital to Pharma */}
        <path
          d="M 720 210 C 760 290 770 380 730 470"
          stroke="url(#goldPathGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="400"
          strokeDashoffset={400 * (1 - stage2Ratio)}
          className="transition-all duration-300"
          filter={stage4Ratio > 0.5 ? "url(#glowGold)" : undefined}
        />
        {/* Path 4: Pharma to Port */}
        <path
          d="M 730 470 C 580 540 360 530 200 460"
          stroke="url(#goldPathGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="600"
          strokeDashoffset={600 * (1 - stage2Ratio)}
          className="transition-all duration-300"
          filter={stage4Ratio > 0.5 ? "url(#glowGold)" : undefined}
        />

        {/* Radial Convergence: Spokes connecting all 4 nodes to Chamber Nexus (440, 330) */}
        {/* Spoke 1: Hub to Port */}
        <path
          d="M 440 330 C 350 370 280 410 200 460"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="320"
          strokeDashoffset={320 * (1 - stage3Ratio)}
          className="transition-all duration-300"
        />
        {/* Spoke 2: Hub to Industry */}
        <path
          d="M 440 330 C 330 280 250 250 170 220"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset={300 * (1 - stage3Ratio)}
          className="transition-all duration-300"
        />
        {/* Spoke 3: Hub to Digital */}
        <path
          d="M 440 330 C 540 280 630 250 720 210"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset={300 * (1 - stage3Ratio)}
          className="transition-all duration-300"
        />
        {/* Spoke 4: Hub to Pharma */}
        <path
          d="M 440 330 C 550 375 640 420 730 470"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="320"
          strokeDashoffset={320 * (1 - stage3Ratio)}
          className="transition-all duration-300"
        />

        {/* ------------------------------------------------------------- */}
        {/* LAYER 6: THE 4 BUSINESS NODES (Interactive badges)           */}
        {/* ------------------------------------------------------------- */}

        {/* NODE 1: PORT & LOGISTICS (200, 460) */}
        <g
          transform="translate(200, 460)"
          className="transition-all duration-500"
          opacity={showNodes ? 1 : 0.2}
          style={{ transformOrigin: "200px 460px" }}
        >
          {/* Subtle pulse ring */}
          <circle
            r={activeStage === 1 ? "30" : "24"}
            fill="#F59E0B"
            fillOpacity={activeStage === 1 ? 0.35 : 0.15}
          />
          <circle
            r="18"
            fill="#0B2633"
            stroke="#F59E0B"
            strokeWidth={activeStage === 1 ? "3" : "2"}
          />
          {/* Anchor Symbol */}
          <path
            d="M -6 -4 L 6 -4 M 0 -7 L 0 7 M -6 4 C -4 8 4 8 6 4"
            stroke="#FDE68A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <text
            x="0"
            y="32"
            textAnchor="middle"
            fill="#0B2633"
            className="text-[11px] font-bold tracking-wider uppercase font-sans select-none"
          >
            PORT & MARITIME
          </text>
        </g>

        {/* NODE 2: INDUSTRIAL CORE (170, 220) */}
        <g
          transform="translate(170, 220)"
          className="transition-all duration-500"
          opacity={showNodes ? 1 : 0.2}
        >
          <circle
            r={activeStage === 1 ? "30" : "24"}
            fill="#F59E0B"
            fillOpacity={activeStage === 1 ? 0.35 : 0.15}
          />
          <circle
            r="18"
            fill="#0B2633"
            stroke="#F59E0B"
            strokeWidth={activeStage === 1 ? "3" : "2"}
          />
          {/* Factory / Gear Symbol */}
          <path
            d="M -7 5 L -7 -2 L -2 1 L -2 -4 L 3 -1 L 3 -6 L 7 -3 L 7 5 Z"
            fill="#FDE68A"
          />
          <text
            x="0"
            y="-26"
            textAnchor="middle"
            fill="#0B2633"
            className="text-[11px] font-bold tracking-wider uppercase font-sans select-none"
          >
            STEEL & INDUSTRY
          </text>
        </g>

        {/* NODE 3: DIGITAL FRONTIER (720, 210) */}
        <g
          transform="translate(720, 210)"
          className="transition-all duration-500"
          opacity={showNodes ? 1 : 0.2}
        >
          <circle
            r={activeStage === 1 ? "30" : "24"}
            fill="#F59E0B"
            fillOpacity={activeStage === 1 ? 0.35 : 0.15}
          />
          <circle
            r="18"
            fill="#0B2633"
            stroke="#F59E0B"
            strokeWidth={activeStage === 1 ? "3" : "2"}
          />
          {/* Circuit Symbol */}
          <rect x="-5" y="-5" width="10" height="10" rx="1.5" stroke="#FDE68A" strokeWidth="1.6" />
          <circle cx="0" cy="0" r="2" fill="#FDE68A" />
          <line x1="-8" y1="0" x2="-5" y2="0" stroke="#FDE68A" strokeWidth="1.5" />
          <line x1="5" y1="0" x2="8" y2="0" stroke="#FDE68A" strokeWidth="1.5" />
          <text
            x="0"
            y="-26"
            textAnchor="middle"
            fill="#0B2633"
            className="text-[11px] font-bold tracking-wider uppercase font-sans select-none"
          >
            IT & FINTECH SEZ
          </text>
        </g>

        {/* NODE 4: PHARMA CITY (730, 470) */}
        <g
          transform="translate(730, 470)"
          className="transition-all duration-500"
          opacity={showNodes ? 1 : 0.2}
        >
          <circle
            r={activeStage === 1 ? "30" : "24"}
            fill="#F59E0B"
            fillOpacity={activeStage === 1 ? 0.35 : 0.15}
          />
          <circle
            r="18"
            fill="#0B2633"
            stroke="#F59E0B"
            strokeWidth={activeStage === 1 ? "3" : "2"}
          />
          {/* Flask / Chemistry symbol */}
          <path
            d="M -3 -6 L 3 -6 M 0 -6 L 0 -1 L 5 6 C 6 7 4 8 3 8 L -3 8 C -4 8 -6 7 -5 6 L 0 -1"
            stroke="#FDE68A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <text
            x="0"
            y="32"
            textAnchor="middle"
            fill="#0B2633"
            className="text-[11px] font-bold tracking-wider uppercase font-sans select-none"
          >
            PHARMA CITY & APSEZ
          </text>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 7: CENTRAL CHAMBER NEXUS HUB (440, 330)                  */}
        {/* ------------------------------------------------------------- */}
        <g
          transform="translate(440, 330)"
          className="transition-all duration-700"
          opacity={showNexus ? 1 : 0.3}
          style={{ transformOrigin: "440px 330px" }}
        >
          {/* Golden radial halo */}
          <circle
            r={isComplete ? "58" : activeStage === 2 ? "52" : "44"}
            fill="#F59E0B"
            fillOpacity={isComplete ? 0.28 : activeStage === 2 ? 0.35 : 0.15}
            filter="url(#glowGold)"
          />
          {/* Outer ring */}
          <circle
            r="38"
            fill="#FAF8F5"
            stroke="#D97706"
            strokeWidth="2.5"
            strokeDasharray={isComplete ? "none" : "6 3"}
          />
          {/* Inner Navy Badge */}
          <circle
            r="28"
            fill="#0B2633"
            stroke="#F59E0B"
            strokeWidth="2.5"
          />

          {/* VCCI Monogram / Crest */}
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            fill="#FDE68A"
            className="text-[12px] font-extrabold tracking-widest font-serif"
          >
            VCCI
          </text>
          <text
            x="0"
            y="9"
            textAnchor="middle"
            fill="#F59E0B"
            className="text-[7.5px] font-bold tracking-wider font-mono"
          >
            ESTD 1931
          </text>

          {/* Center Nexus Label Badge */}
          <g transform="translate(0, 52)">
            <rect
              x="-68"
              y="-10"
              width="136"
              height="20"
              rx="10"
              fill="#0B2633"
              stroke="#F59E0B"
              strokeWidth="1.2"
              className="shadow-md"
            />
            <text
              x="0"
              y="3.5"
              textAnchor="middle"
              fill="#FDE68A"
              className="text-[9.5px] font-bold tracking-wider uppercase font-sans select-none"
            >
              CHAMBER NEXUS
            </text>
          </g>
        </g>
      </svg>

      {/* Floating status badge in corner */}
      <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border/70 text-[11px] font-mono text-muted-foreground shadow-sm">
        <span
          className={`size-2 rounded-full ${activeStage === 3
              ? "bg-emerald-500 animate-pulse"
              : activeStage > 0
                ? "bg-amber-500"
                : "bg-sky-500"
            }`}
        />
        <span>
          {activeStage === 0 && "1/4 Coastal Foundation"}
          {activeStage === 1 && "2/4 Business Nodes Active"}
          {activeStage === 2 && "3/4 Chamber Nexus Linked"}
          {activeStage === 3 && "4/4 Complete Connected Network"}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN CONNECTED VIZAG COMPONENT
// ============================================================================
export function ConnectedVizag() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);
  const reducedMotion = useReducedMotion() ?? true;

  // Motion scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress spring for fluid motion without stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.2,
  });

  // Synchronize state with scroll without re-rendering entire page continuously
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    let stage = 0;
    if (latest >= 0.72) stage = 3;
    else if (latest >= 0.46) stage = 2;
    else if (latest >= 0.20) stage = 1;
    else stage = 0;

    if (stage !== activeStageRef.current) {
      activeStageRef.current = stage;
      setActiveStage(stage);
    }
  });

  // Scroll to stage helper for progress indicator buttons
  const scrollToStage = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const targetScroll = containerTop + (index / 3.3) * (containerHeight - window.innerHeight);
    window.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "smooth",
    });
  };

  const currentStage = STAGES[activeStage] || STAGES[0];

  return (
    <section
      id="connected-vizag"
      ref={containerRef}
      className="relative w-full"
      aria-label="Connected Vizag — The Living Story of Commerce and Opportunity"
    >
      {/* ================================================================= */}
      {/* DESKTOP LAYOUT (Sticky Pin Track: ~320vh height, ~3 viewports)   */}
      {/* ================================================================= */}
      <div className="hidden lg:block relative min-h-[340vh]">
        {/* Sticky Visual Stage Panel (respects top header height 72px) */}
        <div className="sticky top-[72px] h-[calc(100vh-76px)] min-h-[600px] max-h-[860px] flex items-center overflow-hidden">
          <div className="container mx-auto px-6 h-full flex flex-col justify-between py-6">

            {/* Top Stage Bar & Accessible Progress Rail */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-border/50">
              <div className="flex items-center gap-3">
                <span className="font-serif italic text-amber-700 font-medium text-lg">
                  Connected Vizag
                </span>
                <span className="text-border">/</span>
                <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                  A Scroll-Driven Visual Chronicle
                </span>
              </div>

              {/* 4-Stage Progress Tabs */}
              <nav
                className="flex items-center gap-2"
                aria-label="Story stages"
              >
                {STAGES.map((s, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToStage(idx)}
                      className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${isActive
                          ? "bg-slate-900 text-amber-200 shadow-md border border-amber-400/40"
                          : "bg-background/80 text-muted-foreground hover:text-foreground border border-border/60 hover:border-amber-400/50"
                        }`}
                      aria-label={`Jump to stage ${idx + 1}: ${s.title}`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span className="font-mono text-[10px] opacity-75">
                        0{idx + 1}
                      </span>
                      <span>
                        {idx === 0 && "Discover"}
                        {idx === 1 && "Connect"}
                        {idx === 2 && "Explore"}
                        {idx === 3 && "Join"}
                      </span>
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Split Screen Area: Left (Narrative Card) | Right (Evolving SVG) */}
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">

              {/* LEFT COLUMN: Stable Editorial Text Card */}
              <div className="col-span-5 flex flex-col justify-center pr-2">
                <div
                  key={currentStage.id}
                  className="space-y-5 transition-all duration-300"
                >
                  {/* Stage Eyebrow */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/20 w-fit">
                    <span>✦</span>
                    <span>{currentStage.eyebrow}</span>
                  </div>

                  {/* Headline */}
                  <h2 className="text-4xl xl:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
                    {currentStage.title}{" "}
                    <span className="font-serif italic font-normal text-amber-700 block">
                      {currentStage.titleItalic}
                    </span>
                  </h2>

                  {/* Body Copy */}
                  <p className="text-sm xl:text-base text-muted-foreground leading-relaxed">
                    {currentStage.body}
                  </p>

                  {/* STAGE 1: Verified Stats Strip */}
                  {currentStage.stats && (
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/60">
                      {currentStage.stats.map((stat) => (
                        <div key={stat.label} className="space-y-0.5">
                          <p className="text-2xl font-black text-foreground font-mono">
                            {stat.value}
                          </p>
                          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                            {stat.label}
                          </p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            {stat.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* STAGE 2: Four Sector Nodes Highlights */}
                  {currentStage.pills && (
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {currentStage.pills.map((pill) => (
                        <div
                          key={pill.label}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-card border border-border/70 text-xs font-medium text-foreground shadow-xs"
                        >
                          <span className="text-base">{pill.icon}</span>
                          <span>{pill.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* STAGE 3: Four Chamber Real Service Cards */}
                  {currentStage.cards && (
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {currentStage.cards.map((card) => (
                        <a
                          key={card.title}
                          href={card.href}
                          className="group p-3 rounded-xl bg-card hover:bg-amber-500/5 border border-border/80 hover:border-amber-400 transition-all flex flex-col justify-between gap-1 shadow-xs"
                        >
                          <div>
                            <span className="text-[9px] font-mono uppercase text-amber-700 block mb-0.5">
                              {card.tag}
                            </span>
                            <h4 className="text-xs font-bold text-foreground group-hover:text-amber-800 transition-colors leading-tight">
                              {card.title}
                            </h4>
                            <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                              {card.sub}
                            </p>
                          </div>
                          <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-0.5 pt-1">
                            <span>Open</span>
                            <ArrowUpRight size={11} />
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* STAGE 4: Final Membership CTA Action */}
                  {currentStage.cta && activeStage === 3 && (
                    <div className="space-y-3 pt-3 border-t border-border/60">
                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={currentStage.cta.primaryHref}
                          className="button button-gold inline-flex items-center gap-2 text-sm font-semibold py-3 px-6 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 transition-colors shadow-md"
                        >
                          <span>{currentStage.cta.primaryText}</span>
                          <ArrowUpRight size={16} />
                        </a>
                        {currentStage.cta.secondaryHref && (
                          <a
                            href={currentStage.cta.secondaryHref}
                            className="underlined-link text-sm font-medium text-foreground hover:text-amber-700 transition-colors"
                          >
                            {currentStage.cta.secondaryText}
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-mono">
                        <ShieldCheck size={14} className="text-emerald-600" />
                        <span>Official Chamber Secretariat · Open for New Enrolments</span>
                      </p>
                    </div>
                  )}

                  {/* Stage 1 Scroll cue */}
                  {activeStage === 0 && (
                    <div className="pt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <button
                        onClick={() => scrollToStage(1)}
                        className="inline-flex items-center gap-2 font-medium text-amber-800 hover:text-amber-900 transition-colors group cursor-pointer"
                      >
                        <span className="size-7 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-800 group-hover:translate-y-0.5 transition-transform">
                          <ArrowDown size={14} />
                        </span>
                        <span>Scroll down to trace the network</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: The Evolving Stylised SVG Illustration */}
              <div className="col-span-7 flex items-center justify-center">
                <ConnectedVizagIllustration
                  progress={activeStage / 3}
                  activeStage={activeStage}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>

            {/* Bottom Section Foot / Natural Release Cue */}
            <div className="w-full flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-2">
                <span>STAGE 0{activeStage + 1} OF 04</span>
                <span className="text-border">·</span>
                <span className="text-foreground font-medium">
                  {activeStage === 3
                    ? "Story Resolved into Chamber Core"
                    : "Scroll to continue narrative"}
                </span>
              </span>
              <a
                href="#chamber"
                className="hover:text-amber-700 transition-colors flex items-center gap-1"
              >
                <span>Explore Chamber Services</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MOBILE & ACCESSIBLE STACKED LAYOUT (< lg breakpoints)             */}
      {/* ================================================================= */}
      <div className="block lg:hidden container mx-auto px-4 py-8 space-y-12">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/20">
            <span>✦</span>
            <span>CONNECTED VIZAG</span>
            <span>✦</span>
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-foreground">
            A legacy of enterprise.{" "}
            <span className="font-serif italic text-amber-700 block">
              A limitless future.
            </span>
          </h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Visakhapatnam’s apex trade network — from deepwater harbour to industrial corridors.
          </p>
        </div>

        {/* Compact Illustration for Mobile */}
        <div className="sticky top-[76px] z-20 bg-background/95 backdrop-blur-md p-2 rounded-2xl border border-border shadow-md">
          <ConnectedVizagIllustration
            progress={activeStage / 3}
            activeStage={activeStage}
            reducedMotion={true}
          />
        </div>

        {/* Stacked Stage Cards in Natural Document Flow */}
        <div className="space-y-8">
          {STAGES.map((stage, idx) => (
            <article
              key={stage.id}
              className="p-5 rounded-2xl border border-border/80 bg-card shadow-sm space-y-4"
              id={`mobile-stage-${stage.id}`}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="text-[11px] font-mono font-bold text-amber-700">
                  {stage.eyebrow}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  STAGE 0{idx + 1}/04
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground">
                {stage.title}{" "}
                <span className="font-serif italic text-amber-700">
                  {stage.titleItalic}
                </span>
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {stage.body}
              </p>

              {/* Stage 1 Stats */}
              {stage.stats && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-center">
                  {stage.stats.map((st) => (
                    <div key={st.label} className="p-2 rounded-lg bg-muted/40">
                      <p className="text-base font-bold font-mono text-foreground">{st.value}</p>
                      <p className="text-[10px] text-amber-700 font-semibold">{st.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Stage 2 Sector Nodes */}
              {stage.pills && (
                <div className="space-y-1.5 pt-1">
                  {stage.pills.map((p) => (
                    <div
                      key={p.label}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 text-xs font-medium text-foreground"
                    >
                      <span>{p.icon}</span>
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Stage 3 Services */}
              {stage.cards && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {stage.cards.map((c) => (
                    <a
                      key={c.title}
                      href={c.href}
                      className="p-2.5 rounded-xl border border-border/80 bg-background flex flex-col justify-between gap-1"
                    >
                      <div>
                        <span className="text-[9px] font-mono text-amber-700 uppercase">
                          {c.tag}
                        </span>
                        <h4 className="text-xs font-bold text-foreground">
                          {c.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                          {c.sub}
                        </p>
                      </div>
                      <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1 pt-1">
                        <span>Open page</span>
                        <ArrowUpRight size={11} />
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* Stage 4 CTA */}
              {stage.cta && idx === 3 && (
                <div className="pt-2 space-y-2">
                  <a
                    href={stage.cta.primaryHref}
                    className="button button-gold w-full text-center py-2.5 px-4 rounded-full text-xs font-semibold bg-amber-400 text-slate-900 block"
                  >
                    {stage.cta.primaryText}
                  </a>
                  {stage.cta.secondaryHref && (
                    <a
                      href={stage.cta.secondaryHref}
                      className="text-center w-full block text-xs text-muted-foreground underline"
                    >
                      {stage.cta.secondaryText}
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

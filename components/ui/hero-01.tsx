"use client";
import HeroSection from "@/components/ui/hero-01-utils/hero";
import type { NavigationSection } from "@/components/ui/hero-01-utils/header";
import Header from "@/components/ui/hero-01-utils/header";
import BrandSlider, {
  BrandList,
} from "@/components/ui/hero-01-utils/brand-slider";
import type { AvatarList } from "@/components/ui/hero-01-utils/hero";
import { content, localLink } from "@/lib/site-data";

export default function AgencyHeroSection() {
  const avatarList: AvatarList[] = [
    {
      image: "/assets/18fbf719fde424a68021106365f61ccf.jpg",
    },
    {
      image: "/assets/72e3eeeeac4348e08a86a5560456e749.jpg",
    },
    {
      image: "/assets/4c14c3d92864c0bb08f4264ec0dec55b.jpeg",
    },
    {
      image: "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png",
    },
  ];

  const rawNav: NavigationSection[] = content.navigation
    .filter((g) => g.label !== "Join")
    .map((g) => ({
      title: g.label,
      href: localLink(g.href),
      isActive: g.label === "Home",
      items: g.items.map((i) => ({
        label: i.label,
        href: localLink(i.href),
      })),
    }));

  const navigationData: NavigationSection[] = [
    rawNav[0],
    {
      title: "About Us",
      href: "/about-us",
      items: [],
    },
    ...rawNav.slice(1),
  ];

  const brandList: BrandList[] = [
    {
      name: "VCCI Commerce & Industry",
      sub: "Voice of Enterprise Since 1931",
      tag: "Apex Chamber",
      image: "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png",
    },
    {
      name: "eCOO Digital Export Certification",
      sub: "Trade Beyond Borders",
      tag: "Trade Facilitation",
      image: "/assets/wing1.png",
    },
    {
      name: "VCCI Women's Wing",
      sub: "Empowering Women in Business",
      tag: "Leadership",
      image: "/assets/wing1.png",
    },
    {
      name: "VCCI Youth Wing",
      sub: "Next-Gen Leaders & Innovators",
      tag: "Innovation",
      image: "/assets/wing1.png",
    },
    {
      name: "Enterprise Helpdesk",
      sub: "Direct Business & Policy Advisory",
      tag: "Support",
      image: "/assets/wing1.png",
    },
    {
      name: "Alumni Forum",
      sub: "Experience that Inspires Growth",
      tag: "Mentorship",
      image: "/assets/wing1.png",
    },
    {
      name: "Maritime & Port Logistics",
      sub: "East Coast Gateway of India",
      tag: "Industry",
      image: "/assets/wing1.png",
    },
    {
      name: "CSR & Community Welfare",
      sub: "Sustainable Regional Progress",
      tag: "Community",
      image: "/assets/wing1.png",
    },
  ];

  return (
    <div className="relative">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection avatarList={avatarList} />
        <BrandSlider brandList={brandList} />
      </main>
    </div>
  );
}

export { AgencyHeroSection, AgencyHeroSection as HeroOne };

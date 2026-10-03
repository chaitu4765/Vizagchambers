"use client";
import HeroOne from "@/components/ui/hero-01";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { HomeSections } from "@/components/home-sections";
import { ChamberMotion } from "@/components/ui/chamber-motion";
import {
  Building2,
  FileCheck2,
  Headphones,
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react";
export default function Home() {
  return (
    <>
      <ChamberMotion />
      <SiteHeader animated />
      <main id="main-content">
        <HeroOne />
        <div className="ribbon">
          <div>
            ENTERPRISE <span>✦</span> COMMUNITY <span>✦</span> PROGRESS{" "}
            <span>✦</span> VISAKHAPATNAM <span>✦</span> ENTERPRISE{" "}
            <span>✦</span> COMMUNITY <span>✦</span> PROGRESS <span>✦</span>{" "}
            VISAKHAPATNAM <span>✦</span>
          </div>
        </div>
        <section className="section chamber-section" id="chamber">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">01 / THE CHAMBER</p>
              <h2>
                One community.
                <br />
                <em>Many possibilities.</em>
              </h2>
            </div>
            <p>
              Connecting enterprise with opportunity.
              <br />
              Explore the people and services at the heart
              <br />
              of Vizag’s business community.
            </p>
          </div>
          <div className="service-grid">
            {[
              {
                name: "VCCI",
                sub: "The voice of enterprise",
                icon: Building2,
                href: "/vcci",
              },
              {
                name: "eCOO",
                sub: "Trade beyond borders",
                icon: FileCheck2,
                href: "/services",
              },
              {
                name: "Helpline",
                sub: "Here for your business",
                icon: Headphones,
                href: "/services/helpdesk",
              },
              {
                name: "Women's Wing",
                sub: "Empowering women in business",
                icon: Sparkles,
                href: "/women_wing",
              },
              {
                name: "Youth Wing",
                sub: "The next generation of leaders",
                icon: Users,
                href: "/youth_wing",
              },
              {
                name: "Alumni Forum",
                sub: "Experience that inspires",
                icon: GraduationCap,
                href: "/alumni_forum",
              },
            ].map((item, i) => (
              <a
                className="service-card"
                data-reactive
                key={item.name}
                href={item.href}
              >
                <span className="service-number">0{i + 1}</span>
                <item.icon size={30} strokeWidth={1.25} />
                <h3>{item.name}</h3>
                <p>{item.sub}</p>
                <span className="service-more">
                  Discover more <span>↗</span>
                </span>
              </a>
            ))}
          </div>
        </section>
        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}

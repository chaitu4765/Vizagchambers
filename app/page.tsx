"use client";

import HeroOne from "@/components/ui/hero-01";
import { VcciGlyphSection } from "@/components/vcci-glyph-portal";
import { SiteFooter } from "@/components/site-shell";
import { HomeSections } from "@/components/home-sections";
import { ChamberMotion } from "@/components/ui/chamber-motion";
import { FloatingCard } from "@/components/ui/floating-card";
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
      <main id="main-content">
        {/* Restored Hero section with the 3 original picture cards & brand ticker */}
        <HeroOne />

        {/* Marquee Ribbon */}
        <div className="ribbon" aria-hidden="true">
          <div>
            ENTERPRISE <span>✦</span> COMMUNITY <span>✦</span> PROGRESS{" "}
            <span>✦</span> VISAKHAPATNAM <span>✦</span> ENTERPRISE{" "}
            <span>✦</span> COMMUNITY <span>✦</span> PROGRESS <span>✦</span>{" "}
            VISAKHAPATNAM <span>✦</span>
          </div>
        </div>

        {/* VCCI Scroll-Driven Camera Through Live Type (Glyph Portal) */}
        <VcciGlyphSection />

        {/* Core Chamber Initiatives Grid */}
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
              <FloatingCard
                key={item.name}
                className="h-full"
                maxRotation={9}
                scaleOnHover={1.015}
                glare={true}
              >
                <a
                  className="service-card h-full flex flex-col justify-between"
                  data-reactive
                  href={item.href}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span
                    className="service-number"
                    style={{ transform: "translateZ(18px)" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <item.icon
                      size={30}
                      strokeWidth={1.25}
                      style={{ transform: "translateZ(25px)" }}
                    />
                    <h3 style={{ transform: "translateZ(28px)" }}>{item.name}</h3>
                    <p style={{ transform: "translateZ(18px)" }}>{item.sub}</p>
                  </div>
                  <span
                    className="service-more"
                    style={{ transform: "translateZ(22px)" }}
                  >
                    Discover more <span>↗</span>
                  </span>
                </a>
              </FloatingCard>
            ))}
          </div>
        </section>

        {/* Existing Homepage Sections */}
        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}

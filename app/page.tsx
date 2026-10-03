"use client";
import { useRef, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { HomeSections } from "@/components/home-sections";
import { ChamberMotion } from "@/components/ui/chamber-motion";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Building2,
  FileCheck2,
  Headphones,
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react";
const images = [
  "18fbf719fde424a68021106365f61ccf.jpg",
  "72e3eeeeac4348e08a86a5560456e749.jpg",
  "4c14c3d92864c0bb08f4264ec0dec55b.jpeg",
];
export default function Home() {
  const [slide, setSlide] = useState(0);
  const hero = useRef<HTMLElement>(null);
  return (
    <>
      <ChamberMotion />
      <SiteHeader />
      <main id="main-content">
        <section
          className="hero"
          ref={hero}
          onPointerMove={(e) => {
            hero.current?.style.setProperty(
              "--mx",
              `${(e.clientX / innerWidth - 0.5) * 16}px`,
            );
            hero.current?.style.setProperty(
              "--my",
              `${(e.clientY / innerHeight - 0.5) * 12}px`,
            );
          }}
        >
          <div className="hero-images">
            {images.map((src, i) => (
              <img
                className={slide === i ? "active" : ""}
                src={`/assets/${src}`}
                key={src}
                alt={
                  [
                    "The Vizag Chamber community",
                    "VCCI Women's Wing",
                    "VCCI annual general meeting",
                  ][i]
                }
              />
            ))}
          </div>
          <div className="hero-coordinate">
            <span>VISAKHAPATNAM, INDIA</span>
            <span>17.6868° N &nbsp; 83.2185° E</span>
          </div>
          <div className="hero-content">
            <p className="eyebrow">CONNECTING BUSINESS. BUILDING TOMORROW.</p>
            <h1>
              A legacy.
              <br />A <em>limitless</em> future.
            </h1>
            <p className="hero-description">
              The Vizagapatam Chamber of Commerce and Industry.
              <br />
              Bringing businesses, people and possibilities together.
            </p>
            <div className="hero-actions">
              <a href="#chamber" className="button button-gold">
                Explore the Chamber
              </a>
              <a href="/join" className="text-link">
                Grow with us <span>↗</span>
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#chamber" className="scroll-hint">
              <span className="scroll-circle">
                <ArrowDown size={17} />
              </span>{" "}
              SCROLL TO DISCOVER
            </a>
            <div className="hero-caption">
              <span>A CITY OF POSSIBILITIES</span>
              <p>Rooted in Vizag. Connected to the world.</p>
            </div>
            <div className="slide-controls">
              <span>
                0{slide + 1}
                <i>/ 03</i>
              </span>
              <button
                onClick={() => setSlide((slide + 2) % 3)}
                aria-label="Previous hero image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setSlide((slide + 1) % 3)}
                aria-label="Next hero image"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
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

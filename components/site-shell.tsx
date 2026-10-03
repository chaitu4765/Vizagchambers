"use client";
import { useState } from "react";
import { Menu, Camera, Mail, Phone, MapPin, ChevronUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { content, asset, localLink } from "@/lib/site-data";

const groups = [
  {
    label: "The Chamber",
    items: [
      { label: "About Us", href: "/about-us" },
      ...content.wings
        .filter((w) => !["eCOO", "Helpline"].includes(w.name))
        .map((w) => ({ label: w.name, href: localLink(w.href) })),
      { label: "Executive Committee", href: "/executive_committee" },
    ],
  },
  ...content.navigation
    .filter((g) => ["Membership", "Services", "Events"].includes(g.label))
    .map((g) => ({
      ...g,
      items: g.items.map((i) => ({ ...i, href: localLink(i.href) })),
    })),
  {
    label: "Explore",
    items: [
      { label: "Business News", href: "/#insights" },
      { label: "Publications", href: "/#publications" },
      { label: "Media", href: "/media" },
      { label: "Gallery", href: "/gallery" },
      { label: "CSR", href: "/join/csr" },
      { label: "CSR Events", href: "/csr_events" },
      { label: "CSR Expenditure", href: "/csr_events/expenditure" },
      { label: "City Network", href: "/city_network" },
      { label: "AGM Notice", href: "/agm_notice" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Vizag Chamber home">
          <img
            src={asset(content.logo)}
            alt="VCCI emblem"
            width={64}
            height={66}
          />
          <span>
            VIZAG CHAMBER<small>COMMERCE & INDUSTRY</small>
          </span>
        </a>
        <NavigationMenu
          className="desktop-navigation"
          viewport={false}
          aria-label="Main navigation"
        >
          <NavigationMenuList>
            {groups.map((g) => (
              <NavigationMenuItem key={g.label}>
                <NavigationMenuTrigger className="nav-trigger">
                  {g.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="nav-panel">
                  {g.items.map((i) => (
                    <NavigationMenuLink asChild key={i.href}>
                      <a href={i.href}>{i.label}</a>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <a className="button button-gold header-join" href="/join">
          Become a member
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="mobile-menu" aria-label="Open navigation menu">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent className="menu-sheet">
            <SheetTitle>Explore the Chamber</SheetTitle>
            <div className="menu-groups">
              {groups.map((g) => (
                <div key={g.label}>
                  <h3>{g.label}</h3>
                  {g.items.map((i) => (
                    <a
                      key={i.href}
                      href={i.href}
                      onClick={() => setOpen(false)}
                    >
                      {i.label}
                    </a>
                  ))}
                </div>
              ))}
              <div>
                <h3>Quick links</h3>
                {content.footerGroups[0].links.map((l) => (
                  <a key={l.href} href={localLink(l.href)}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src={asset(content.footerLogo)}
            alt="Vizagapatam Chamber of Commerce and Industry"
            loading="lazy"
          />
          <p>
            Rooted in Vizag.
            <br />
            Connected to the world.
          </p>
          <div className="social-links">
            <a
              href={content.social[0].href}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <span aria-hidden="true">f</span>
            </a>
            <a
              href={content.social[1].href}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Camera size={18} />
            </a>
            <a
              href={content.social[2].href}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
            >
              𝕏
            </a>
          </div>
        </div>
        <div className="footer-links">
          {content.footerGroups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              {g.links.map((l) => (
                <a key={l.href} href={localLink(l.href)}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="contact-strip">
        <a href="/contact-us">
          <MapPin size={16} /> Dutt Island, Siripuram, Visakhapatnam
        </a>
        <a href="tel:+917093332606">
          <Phone size={16} /> +91 70933 32606
        </a>
        <a href="mailto:info@vizagchamber.com">
          <Mail size={16} /> info@vizagchamber.com
        </a>
      </div>
      <div className="footer-bottom">
        <span>Vizag Chamber (P) Ltd 2021</span>
        <span>
          Original website by{" "}
          <a href="https://thecolourmoon.com/" target="_blank" rel="noreferrer">
            Colourmoon
          </a>
        </span>
        <a href="#top" className="back-top" aria-label="Back to top">
          BACK TO TOP <ChevronUp size={16} />
        </a>
      </div>
    </footer>
  );
}

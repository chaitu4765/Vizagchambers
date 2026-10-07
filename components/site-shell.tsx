"use client";
import { Mail, Phone, MapPin, ChevronUp } from "lucide-react";
import { content, asset, localLink } from "@/lib/site-data";
import Header from "@/components/ui/hero-01-utils/header";
import Link from "next/link";

export function SiteHeader({ animated = false }: { animated?: boolean }) {
  return <Header />;
}
export function SiteFooter() {
  return (
    <footer className="site-footer" data-reveal>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-9h3l.5-3h-3.5V8.5c0-.9.3-1.5 1.5-1.5H17V4.2c-.5-.1-1.5-.2-2.7-.2C11.6 4 10 5.6 10 8.2V10H7v3h3v9h3.5Z" /></svg>
            </a>
            <a
              href={content.social[1].href}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
            </a>
            <a
              href={content.social[2].href}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.2-8.3L.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L6.4 4H4.6l13.2 16Z" />
              </svg>
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
        <Link href="/contact-us">
          <MapPin size={16} /> Dutt Island, Siripuram, Visakhapatnam
        </Link>
        <a href="tel:+917093332606">
          <Phone size={16} /> +91 70933 32606
        </a>
        <a href="mailto:info@vizagchamber.com">
          <Mail size={16} /> info@vizagchamber.com
        </a>
      </div>
      <div className="footer-bottom">
        <span>Vizag Chamber (P) Ltd 2021</span>
        <a href="#top" className="back-top" aria-label="Back to top">
          BACK TO TOP <ChevronUp size={16} />
        </a>
      </div>
    </footer>
  );
}

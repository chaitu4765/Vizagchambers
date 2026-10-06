"use client";
import { Camera, Mail, Phone, MapPin, ChevronUp } from "lucide-react";
import { content, asset, localLink } from "@/lib/site-data";
import Header from "@/components/ui/hero-01-utils/header";

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
        <a href="#top" className="back-top" aria-label="Back to top">
          BACK TO TOP <ChevronUp size={16} />
        </a>
      </div>
    </footer>
  );
}

"use client";
import { useRef, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
const images = [
  "18fbf719fde424a68021106365f61ccf.jpg",
  "72e3eeeeac4348e08a86a5560456e749.jpg",
  "4c14c3d92864c0bb08f4264ec0dec55b.jpeg",
];
export default function HeroOne() {
  const [slide, setSlide] = useState(0);
  const hero = useRef<HTMLElement>(null);
  return (
        <section
          className="hero agency-hero"
          ref={hero}
          onPointerLeave={() => { hero.current?.style.setProperty("--mx", "0px"); hero.current?.style.setProperty("--my", "0px"); }}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
              <span className="hero-line"><span>A legacy.</span></span>
              <span className="hero-line"><span>A <em>limitless</em> future.</span></span>
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
              <div className="hero-thumbnails" aria-label="Choose background photo">
                {images.map((src, index) => <button key={src} aria-label={`Show background photo ${index + 1}`} aria-pressed={slide === index} onClick={() => setSlide(index)}><img src={`/assets/${src}`} alt="" /></button>)}
              </div>
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
  );
}

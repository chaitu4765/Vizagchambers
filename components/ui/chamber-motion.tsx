"use client";
import { useEffect, useRef } from "react";
/** Scroll-scrubbed transforms + stagger-reveal + parallax-tilt + magnetic buttons.
 * Native page scrolling remains available; fine-pointer effects never run on touch. */
export function ChamberMotion() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const fine = matchMedia("(pointer: fine)").matches;

    // --- Scroll-reveal with stagger support ---
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((e) => {
      e.classList.add("will-reveal");
      observer.observe(e);
    });

    // --- Stagger children (service cards, leader cards, etc.) ---
    const staggerObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const children = e.target.querySelectorAll<HTMLElement>(
              ".service-card, .leader-card, .publication-card, .news-row, .careers-grid > a, .footer-links > div",
            );
            children.forEach((child, i) => {
              child.style.setProperty("--stagger", String(i));
              child.classList.add("stagger-in");
            });
            staggerObserver.unobserve(e.target);
          }
        }),
      { threshold: 0.05 },
    );
    document
      .querySelectorAll(
        ".service-grid, .leadership-rail, .leadership-grid, .publication-rail, .news-list, .careers-grid, .footer-links",
      )
      .forEach((el) => staggerObserver.observe(el));

    // --- Animated counters for member-meta numbers ---
    const counterObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("counter-visible");
            counterObserver.unobserve(e.target);
          }
        }),
      { threshold: 0.3 },
    );
    document
      .querySelectorAll(".member-meta")
      .forEach((el) => counterObserver.observe(el));

    // --- Scroll progress + hero parallax ---
    let ticking = false;
    const update = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero) {
        const p = Math.min(
          1,
          Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight),
        );
        hero.style.setProperty("--scroll", String(p));
      }
      const progress =
        scrollY /
        Math.max(1, document.documentElement.scrollHeight - innerHeight);
      document.documentElement.style.setProperty(
        "--page-progress",
        String(progress),
      );

      // Section parallax for meeting-photo
      document
        .querySelectorAll<HTMLElement>(".meeting-photo > img")
        .forEach((img) => {
          const rect = img.parentElement!.getBoundingClientRect();
          const visible = rect.top < innerHeight && rect.bottom > 0;
          if (visible) {
            const ratio =
              (innerHeight - rect.top) / (innerHeight + rect.height);
            img.style.transform = `translateY(${(ratio - 0.5) * -40}px) scale(1.08)`;
          }
        });

      ticking = false;
    };
    const scroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // --- Pointer: cursor ring + reactive cards + magnetic buttons ---
    const pointer = (e: PointerEvent) => {
      if (!fine) return;
      const node = cursor.current;
      if (node) {
        node.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        node.style.opacity = "1";
        node.classList.toggle(
          "cursor-active",
          !!(e.target as HTMLElement).closest("a,button"),
        );
      }
      const card = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-reactive]",
      );
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--px", `${e.clientX - r.left}px`);
        card.style.setProperty("--py", `${e.clientY - r.top}px`);
        // 3D tilt
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg)`;
      }

      // Magnetic pull on gold buttons
      const btn = (e.target as HTMLElement).closest<HTMLElement>(
        ".button-gold, .button-outline",
      );
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
      }
    };

    const leave = () => {
      if (cursor.current) cursor.current.style.opacity = "0";
    };

    // Reset tilt / magnetic on pointer leave card/button
    const pointerOut = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-reactive]",
      );
      if (card) card.style.transform = "";
      const btn = (e.target as HTMLElement).closest<HTMLElement>(
        ".button-gold, .button-outline",
      );
      if (btn) btn.style.transform = "";
    };

    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("pointerout", pointerOut, { passive: true });
    document.addEventListener("pointerleave", leave);
    update();
    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("pointerout", pointerOut);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <>
      <div className="reading-progress" aria-hidden="true" />
      <div className="cursor-ring" ref={cursor} aria-hidden="true">
        <span />
      </div>
    </>
  );
}

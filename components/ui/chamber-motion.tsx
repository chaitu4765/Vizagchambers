"use client";
import { useEffect, useRef } from "react";
/** Scroll-scrubbed transforms inspired by the supplied MetroHero and Lycoris specimens.
 * Native page scrolling remains available; fine-pointer effects never run on touch. */
export function ChamberMotion() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const fine = matchMedia("(pointer: fine)").matches;
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
      ticking = false;
    };
    const scroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
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
      }
    };
    const leave = () => {
      if (cursor.current) cursor.current.style.opacity = "0";
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerleave", leave);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", pointer);
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

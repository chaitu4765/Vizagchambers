"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  ...props
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = false;
    const update = () => {
      element.dataset.running = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-100% - var(--gap, 1rem)));
            }
          }

          @keyframes marquee-vertical {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(calc(-100% - var(--gap, 1rem)));
            }
          }

          .animate-marquee {
            animation: marquee var(--duration, 40s) linear infinite;
            animation-play-state: paused;
          }

          .animate-marquee-vertical {
            animation: marquee-vertical var(--duration, 40s) linear infinite;
            animation-play-state: paused;
          }

          [data-marquee][data-running=true] > .animate-marquee,
          [data-marquee][data-running=true] > .animate-marquee-vertical {
            animation-play-state: running;
          }

          .animate-reverse {
            animation-direction: reverse !important;
          }

          .pause-on-hover:hover .animate-marquee,
          .pause-on-hover:hover .animate-marquee-vertical {
            animation-play-state: paused !important;
          }

          [data-marquee]:focus-within > div {
            animation-play-state: paused !important;
          }
          [data-marquee][data-paused=true] > div { animation-play-state: paused !important; }

          @media (prefers-reduced-motion: reduce) {
            [data-marquee] { overflow: auto; }
            [data-marquee] > div { animation: none !important; }
            [data-marquee] > [aria-hidden=true] { display: none; }
          }
        `}
      </style>
      <div
        {...props}
        ref={root}
        data-marquee
        data-paused={paused}
        className={cn(
          "group flex gap-[var(--gap,1rem)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
            "pause-on-hover": pauseOnHover,
          },
          className,
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              aria-hidden={i > 0 ? true : undefined}
              inert={i > 0 ? true : undefined}
              className={cn("flex shrink-0 justify-around gap-[var(--gap,1rem)]", {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "animate-reverse": reverse,
              })}
            >
              {children}
            </div>
          ))}
      </div>
      <div className="flex justify-center pt-2">
        <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} className="min-h-11 px-4 text-xs text-foreground underline underline-offset-4 motion-reduce:hidden">{paused ? "Resume scrolling highlights" : "Pause scrolling highlights"}</button>
      </div>
    </>
  );
}

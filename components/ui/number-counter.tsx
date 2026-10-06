"use client";

import { useEffect, useRef, useState } from "react";

interface NumberCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export function NumberCounter({
  value,
  className,
  duration = 1000,
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If prefers reduced motion, show full value immediately
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    // Parse prefix, number, decimals, and suffix
    // Matches like "$43.5B", "1,000+", "55%", "1931"
    const match = value.match(/^([^0-9]*)([\d,.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const rawNumStr = match[2].replace(/,/g, "");
    const suffix = match[3] || "";
    const target = parseFloat(rawNumStr);

    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const hasComma = match[2].includes(",");
    const decimalParts = rawNumStr.split(".");
    const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = target * easeOut;

            let formattedNumber = current.toFixed(decimals);
            if (hasComma) {
              const parts = formattedNumber.split(".");
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              formattedNumber = parts.join(".");
            }

            setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

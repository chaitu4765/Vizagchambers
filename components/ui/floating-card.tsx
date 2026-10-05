"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // max tilt degrees (default 14)
  perspective?: number; // perspective depth in px (default 1000)
  glare?: boolean; // cursor-following glare effect (default true)
  scaleOnHover?: number; // scale factor on hover (default 1.02)
}

export function FloatingCard({
  children,
  className,
  maxRotation = 14,
  perspective = 1000,
  glare = true,
  scaleOnHover = 1.02,
  ...props
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>("none");
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position from center: -1 to +1
      const xPos = (e.clientX - rect.left) / width;
      const yPos = (e.clientY - rect.top) / height;

      const rotateX = (0.5 - yPos) * (maxRotation * 2);
      const rotateY = (xPos - 0.5) * (maxRotation * 2);

      setTransformStyle(
        `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})`
      );

      if (glare) {
        setGlarePosition({
          x: xPos * 100,
          y: yPos * 100,
          opacity: 0.22,
        });
      }
    },
    [maxRotation, perspective, glare, scaleOnHover]
  );

  const handleMouseLeave = useCallback(() => {
    setTransformStyle(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [perspective, glare]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative transition-transform duration-200 ease-out will-change-transform", className)}
      style={{
        transformStyle: "preserve-3d",
        transform: transformStyle,
      }}
      {...props}
    >
      {children}

      {/* Dynamic Cursor-following Glare overlay */}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}

export default FloatingCard;

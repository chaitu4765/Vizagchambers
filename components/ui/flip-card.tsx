"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rotate?: "x" | "y";
  className?: string;
  front: React.ReactNode;
  back: React.ReactNode;
}

export function FlipCard({
  rotate = "y",
  className,
  front,
  back,
  ...props
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const rotateClass =
    rotate === "x"
      ? "group-hover:[transform:rotateX(180deg)] data-[flipped=true]:[transform:rotateX(180deg)]"
      : "group-hover:[transform:rotateY(180deg)] data-[flipped=true]:[transform:rotateY(180deg)]";

  const backRotateClass =
    rotate === "x" ? "[transform:rotateX(180deg)]" : "[transform:rotateY(180deg)]";

  return (
    <div
      className={cn("group [perspective:1000px] cursor-pointer select-none", className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Flip card for more details"
      aria-pressed={isFlipped}
      {...props}
    >
      <div
        data-flipped={isFlipped}
        className={cn(
          "relative h-full w-full rounded-2xl transition-all duration-500 ease-out [transform-style:preserve-3d]",
          rotateClass
        )}
      >
        {/* Front Face */}
        <div className="size-full h-full [backface-visibility:hidden] [transform:rotateX(0deg)]">
          {front}
        </div>

        {/* Back Face */}
        <div
          className={cn(
            "absolute inset-0 size-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden]",
            backRotateClass
          )}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

export default FlipCard;

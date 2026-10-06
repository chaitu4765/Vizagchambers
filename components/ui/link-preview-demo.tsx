"use client";

import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export interface LinkPreviewDemoProps {
  width?: number;
  height?: number;
}

export function LinkPreviewDemo({
  width = 400,
  height = 200,
}: LinkPreviewDemoProps) {
  return (
    <div className="flex min-h-[300px] sm:h-160 flex-col items-center justify-center px-4 py-8 text-center select-none">
      <p className="mx-auto mb-8 sm:mb-10 max-w-3xl text-xl text-neutral-500 md:text-3xl dark:text-neutral-400 leading-relaxed">
        <LinkPreview
          url="https://tailwindcss.com"
          className="font-bold text-neutral-900 dark:text-white underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-8 hover:decoration-amber-500"
        >
          Tailwind CSS
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview
          url="https://motion.unovue.com/"
          className="font-bold text-neutral-900 dark:text-white underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-8 hover:decoration-amber-500"
        >
          motion-v
        </LinkPreview>{" "}
        are a great way to build modern websites.
      </p>
      <p className="mx-auto max-w-3xl text-xl text-neutral-500 md:text-3xl dark:text-neutral-400 leading-relaxed">
        Visit{" "}
        <LinkPreview
          url="https://inspira-ui.com"
          width={width}
          height={height}
          className="underline decoration-purple-400/50 underline-offset-8 hover:decoration-purple-500"
        >
          <span
            className="bg-linear-to-br from-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Inspira UI
          </span>
        </LinkPreview>{" "}
        for more cool components
      </p>
    </div>
  );
}

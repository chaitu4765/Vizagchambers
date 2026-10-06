"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React, { useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Globe, ShieldCheck, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
  isStatic?: boolean;
  imageSrc?: string;
};

export function LinkPreview({
  children,
  url,
  className,
  width = 300,
  height = 180,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) {
  const [isOpen, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { damping: 15, stiffness: 100 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  // Determine display hostname
  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = url.replace(/^https?:\/\//, "").split("/")[0];
  }

  // Construct preview screenshot URL via Microlink
  let previewSrc = imageSrc;
  if (!isStatic && !previewSrc) {
    const params = new URLSearchParams({
      url,
      screenshot: "true",
      meta: "false",
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": "true",
      "viewport.deviceScaleFactor": "1",
      "viewport.width": (width * 3).toString(),
      "viewport.height": (height * 3).toString(),
    });
    previewSrc = `https://api.microlink.io/?${params.toString()}`;
  }

  return (
    <>
      {isMounted && previewSrc ? (
        <div className="hidden">
          <img
            src={previewSrc}
            width={width}
            height={height}
            alt="preloaded preview"
            loading="lazy"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={120}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn(
            "cursor-pointer transition-colors duration-200 inline-block",
            className
          )}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-[999] pointer-events-auto"
            side="top"
            align="center"
            sideOffset={10}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.88 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 280,
                      damping: 22,
                    },
                  }}
                  exit={{ opacity: 0, y: 12, scale: 0.9 }}
                  className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(217,119,6,0.15)]"
                  style={{
                    x: translateX,
                  }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl border border-amber-400/35 rounded-2xl transition-all hover:border-amber-400 group overflow-hidden"
                    style={{
                      width: width + 16,
                      maxWidth: "90vw",
                    }}
                  >
                    {/* Visual Preview Box */}
                    <div
                      className="relative w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center"
                      style={{ height }}
                    >
                      {!hasError && previewSrc ? (
                        <img
                          src={previewSrc}
                          width={width}
                          height={height}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          alt={`${hostname} preview`}
                          onError={() => setHasError(true)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 bg-gradient-to-br from-slate-900 to-[#071b26] size-full">
                          <Globe size={32} className="text-amber-400" />
                          <p className="text-xs font-semibold text-white truncate max-w-full px-2">
                            {hostname}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Verified Web Gateway
                          </p>
                        </div>
                      )}

                      {/* Verified Badge */}
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 flex items-center gap-1 text-[10px] font-mono text-amber-300 shadow-sm pointer-events-none">
                        <ShieldCheck size={11} className="text-emerald-400" />
                        <span>Live Preview</span>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-2 px-1 pb-0.5 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white truncate">
                          {hostname}
                        </span>
                        <span className="text-[10px] font-semibold text-amber-400 group-hover:text-amber-300 flex items-center gap-0.5 shrink-0">
                          <span>Visit</span>
                          <ArrowUpRight size={11} />
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate font-mono">
                        {url}
                      </p>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
}

"use client";

import React from "react";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";
import { ArrowUpRight, Building2, Anchor, Award, ShieldCheck } from "lucide-react";
import { openMemberModal } from "@/components/member-modal-context";

export function VcciGlyphSection() {
  const customStyle: GlyphPortalStyle = {
    "--gp-paper": "#FAF7F2",
    "--gp-ink": "#0B2633",
    "--gp-field": "#071B26",
    "--gp-foreground": "#FAF7F2",
  };

  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#0B2633]" id="vcci-portal">
      <GlyphPortal
        word="VIZAG"
        focusChar="I"
        fontFamily='"Arial Black", "Arial", sans-serif'
        fontWeight={900}
        scrollLength={3.2}
        interactive={true}
        enterLabel="Step Inside VCCI"
        style={customStyle}
        front={
          <>
            <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-12 top-6 sm:top-10 flex items-center justify-between gap-4 pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-xl sm:text-2xl text-[#0B2633] font-sans">
                  VCCI<span className="text-amber-600">.</span>
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20">
                  ESTD 1931
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-700 text-right">
                The Vizagapatam Chamber of Commerce & Industry
              </span>
            </div>

            <p className="absolute inset-x-4 bottom-[calc(100%-var(--gp-word-top,35%)+24px)] text-center text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-700">
              ✦ Apex Voice of Trade & Industry ✦
            </p>

            <p className="absolute inset-x-4 top-[calc(var(--gp-word-bottom,50%)+28px)] text-center text-sm sm:text-base md:text-lg font-medium text-slate-700 max-w-xl mx-auto">
              Connecting enterprise with opportunity across Visakhapatnam.
            </p>

            <span className="absolute inset-x-4 bottom-6 sm:bottom-8 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-1.5">
              <span>Scroll down to step through the letters into the Chamber network</span>
              <span>↓</span>
            </span>
          </>
        }
        background={
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 15%, rgba(217, 119, 6, 0.4), transparent 45%), radial-gradient(circle at 80% 25%, rgba(56, 189, 248, 0.2), transparent 40%), radial-gradient(circle at 50% 80%, rgba(11, 38, 51, 0.8), transparent 60%), linear-gradient(135deg, #071b26 0%, #0b2633 45%, #05141d 100%)",
            }}
          />
        }
      >
        <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 sm:gap-6 py-6 px-5 sm:px-8 rounded-3xl bg-[#071b26]/95 border border-amber-500/30 shadow-2xl backdrop-blur-md">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30">
              <span>✦</span>
              <span>VIZAGAPATAM CHAMBER NETWORK</span>
              <span>✦</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-tight">
              Where regional enterprise{" "}
              <span className="font-serif italic font-normal text-amber-400">
                shapes the future.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Representing over 1,000 member companies across maritime shipping,
              heavy engineering, pharmaceuticals, and technology in Andhra Pradesh’s
              premier commercial capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/15">
            <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center justify-between text-amber-400 font-mono text-xs">
                <span>01</span>
                <Building2 size={16} />
              </div>
              <h3 className="text-base font-bold text-white">
                Apex Policy Advocacy
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct representations with ministries, port authorities, and statutory
                bodies to safeguard business interests and streamline regulatory compliance.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center justify-between text-amber-400 font-mono text-xs">
                <span>02</span>
                <Anchor size={16} />
              </div>
              <h3 className="text-base font-bold text-white">
                Global Trade & eCOO
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Official electronic Certificates of Origin, international delegation
                meets, and export trade assistance linking Vizag to global ports.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center justify-between text-amber-400 font-mono text-xs">
                <span>03</span>
                <Award size={16} />
              </div>
              <h3 className="text-base font-bold text-white">
                Collaborative Leadership
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Specialized wings including VCCI Women’s Wing, Youth Wing, and Alumni
                Forum nurturing diverse entrepreneurs and next-gen leadership.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/join"
              onClick={(e) => {
                e.preventDefault();
                openMemberModal("join");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-lg cursor-pointer"
            >
              <span>Apply for VCCI Membership</span>
              <ArrowUpRight size={15} />
            </a>
            <a
              href="/join/benefits"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-white hover:text-amber-300 border border-white/20 hover:border-amber-400/50 transition-colors"
            >
              <span>Explore Member Benefits</span>
            </a>
            <a
              href="/join/members_directory"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white underline underline-offset-4 transition-colors"
            >
              Browse Members Directory →
            </a>
          </div>
        </div>
      </GlyphPortal>
    </div>
  );
}

"use client";

import { motion } from "./motion";
import { ArrowUpRight } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";

export type AvatarList = {
  image: string;
};

type HeroSectionProps = {
  avatarList: AvatarList[];
};

const chamberPhotos = [
  {
    src: "/assets/18fbf719fde424a68021106365f61ccf.jpg",
    title: "The Vizag Chamber Community",
    subtitle: "Rooted in Vizag. Connected to global trade & markets.",
    tag: "Community",
  },
  {
    src: "/assets/72e3eeeeac4348e08a86a5560456e749.jpg",
    title: "VCCI Women's Wing",
    subtitle: "Empowering women entrepreneurs and executive leadership.",
    tag: "Leadership",
  },
  {
    src: "/assets/4c14c3d92864c0bb08f4264ec0dec55b.jpeg",
    title: "VCCI Annual General Meeting",
    subtitle: "A lasting legacy of industry policy and shared progress.",
    tag: "Enterprise",
  },
];

export default function HeroSection({ avatarList }: HeroSectionProps) {
  return (
    <section>
      <div className="w-full h-full relative">
        <div className="relative w-full pt-4 md:pt-16 pb-8 md:pb-12 before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-sky-100/70 before:via-amber-50/50 before:to-amber-100/70 before:rounded-full before:top-24 before:blur-3xl before:-z-10">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col max-w-5xl mx-auto gap-8">
              <div className="relative flex flex-col text-center items-center sm:gap-5 gap-3.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-semibold tracking-wider uppercase">
                  <span>✦</span>
                  <span>Connecting Business. Building Tomorrow.</span>
                  <span>✦</span>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="lg:text-8xl md:text-7xl text-5xl font-medium tracking-tight leading-[1.1] md:leading-[1.12] text-foreground"
                >
                  A legacy of enterprise.{" "}
                  <span className="font-serif italic font-normal tracking-tight text-amber-700">
                    A limitless future.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
                  className="text-base sm:text-lg font-normal max-w-2xl text-muted-foreground leading-relaxed"
                >
                  The Vizagapatam Chamber of Commerce and Industry.
                  Bringing businesses, people and possibilities together — fostering
                  trade, industry advocacy, and economic progress in Visakhapatnam.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                className="flex items-center flex-col md:flex-row justify-center gap-6 sm:gap-8"
              >
                <a
                  href="#chamber"
                  className="relative inline-flex items-center text-sm font-semibold rounded-full h-12 p-1 ps-6 pe-14 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-900 shadow-md group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer border border-amber-300/80"
                >
                  <span className="relative z-10 transition-all duration-500">
                    Explore the Chamber
                  </span>
                  <span className="absolute right-1 w-10 h-10 bg-slate-900 text-amber-200 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </a>

                <div className="flex items-center sm:gap-6 gap-3">
                  <ul className="avatar flex flex-row items-center">
                    {avatarList.map((avatar, index) => (
                      <li
                        key={index}
                        className="-mr-2.5 z-1 hover:z-10 transition-transform"
                      >
                        <img
                          src={avatar.image}
                          alt="Chamber Leader"
                          width={42}
                          height={42}
                          className="rounded-full border-2 border-background object-cover w-10 h-10 shadow-xs"
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="gap-0.5 flex flex-col items-start">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          className="h-4 w-4 fill-amber-500 text-amber-500"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="sm:text-sm text-xs font-semibold text-foreground">
                      Trusted by 1,000+ Member Businesses
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      The premier voice of trade & commerce since 1931
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Photos added just below the main hero section with FloatingCard effect */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
                className="w-full mt-4 pt-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {chamberPhotos.map((photo, index) => (
                    <FloatingCard
                      key={photo.src}
                      className="group cursor-pointer rounded-[20px]"
                      maxRotation={12}
                      glare={true}
                    >
                      <div
                        className="flex flex-col items-stretch rounded-[16px] border border-white/10 bg-[#1F2121] p-3 md:p-4 shadow-2xl transition-all duration-300 hover:shadow-amber-500/10 hover:border-amber-400/30"
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <div
                          className="mx-1 flex-1"
                          style={{
                            transform: "translateZ(22px)",
                          }}
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px]">
                            <img
                              src={photo.src}
                              alt={photo.title}
                              className="absolute inset-0 h-full w-full rounded-[14px] object-cover contrast-90 transition-transform duration-500 group-hover:scale-105"
                              style={{
                                boxShadow: "rgba(0, 0, 0, 0.25) 0px 8px 16px 0px",
                              }}
                            />
                            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase text-amber-300 border border-white/15">
                              {photo.tag}
                            </div>
                          </div>
                        </div>

                        <div
                          className="mt-3 flex shrink-0 items-center justify-between px-2 pt-2 pb-0.5 font-mono text-white"
                          style={{
                            transform: "translateZ(30px)",
                          }}
                        >
                          <div className="text-xs font-semibold tracking-tight text-white/95">
                            {photo.title}
                          </div>
                          <div className="text-xs text-gray-300 opacity-60 font-mono">
                            #VCCI-0{index + 1}
                          </div>
                        </div>

                        <div
                          className="px-2 pb-1 text-left"
                          style={{
                            transform: "translateZ(25px)",
                          }}
                        >
                          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                            {photo.subtitle}
                          </p>
                        </div>
                      </div>
                    </FloatingCard>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection, chamberPhotos };

"use client";
import { Marquee } from "./marquee";
import { motion } from "./motion";

export interface BrandList {
  name: string;
  sub?: string;
  image?: string;
  lightimg?: string;
  tag?: string;
}

const defaultWings: BrandList[] = [
  {
    name: "VCCI Commerce & Industry",
    sub: "Voice of Enterprise Since 1931",
    tag: "Apex Chamber",
    image: "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png",
  },
  {
    name: "eCOO Digital Export Certification",
    sub: "Trade Beyond Borders",
    tag: "Trade Facilitation",
    image: "/assets/wing1.png",
  },
  {
    name: "VCCI Women's Wing",
    sub: "Empowering Women in Business",
    tag: "Leadership",
    image: "/assets/wing1.png",
  },
  {
    name: "VCCI Youth Wing",
    sub: "Next-Gen Leaders & Innovators",
    tag: "Innovation",
    image: "/assets/wing1.png",
  },
  {
    name: "Enterprise Helpdesk",
    sub: "Direct Business & Policy Advisory",
    tag: "Support",
    image: "/assets/wing1.png",
  },
  {
    name: "Alumni Forum",
    sub: "Experience that Inspires Growth",
    tag: "Mentorship",
    image: "/assets/wing1.png",
  },
  {
    name: "Maritime & Port Logistics",
    sub: "East Coast Gateway of India",
    tag: "Industry",
    image: "/assets/wing1.png",
  },
  {
    name: "CSR & Community Welfare",
    sub: "Sustainable Regional Progress",
    tag: "Community",
    image: "/assets/wing1.png",
  },
];

export default function BrandSlider({ brandList }: { brandList?: BrandList[] }) {
  const items =
    brandList &&
    brandList.length > 0 &&
    !brandList[0].image?.includes("21st.dev") &&
    !brandList[0].name.startsWith("Brand")
      ? brandList
      : defaultWings;

  return (
    <section className="py-6 md:py-10 border-t border-b border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-center text-center py-2 relative">
            <div className="flex items-center justify-center gap-4">
              <div className="hidden md:block h-[1px] w-32 bg-gradient-to-l from-amber-400/60 to-transparent" />
              <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground text-center">
                Pillars of Enterprise, Trade & Community Leadership
              </p>
              <div className="hidden md:block h-[1px] w-32 bg-gradient-to-r from-amber-400/60 to-transparent" />
            </div>
          </div>

          <div className="py-2">
            <Marquee pauseOnHover className="[--duration:35s] p-0 gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3.5 px-5 py-3 mx-2 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm shadow-xs hover:shadow-md hover:border-amber-300/80 transition-all duration-300 group"
                >
                  <img
                    src={
                      item.image ||
                      "/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png"
                    }
                    alt={item.name}
                    className="w-7 h-7 object-contain shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">
                      {item.name}
                    </span>
                    {item.sub && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap font-normal">
                        {item.sub}
                      </span>
                    )}
                  </div>
                  {item.tag && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-700 border border-amber-500/20 whitespace-nowrap">
                      {item.tag}
                    </span>
                  )}
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { BrandSlider };

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { content, localLink } from "@/lib/site-data";
import { motion } from "./motion";

export type NavSubItem = {
  label: string;
  href: string;
};

export type NavigationSection = {
  title: string;
  href: string;
  isActive?: boolean;
  items?: NavSubItem[];
};

type HeaderProps = {
  navigationData?: NavigationSection[];
  className?: string;
};

const rawVizagNavigation: NavigationSection[] = content.navigation
  .filter((g) => g.label !== "Join")
  .map((g) => ({
    title: g.label,
    href: localLink(g.href),
    isActive: g.label === "Home",
    items: g.items.map((i) => ({
      label: i.label,
      href: localLink(i.href),
    })),
  }));

const defaultVizagNavigation: NavigationSection[] = [
  rawVizagNavigation[0],
  {
    title: "About Us",
    href: "/about-us",
    items: [],
  },
  ...rawVizagNavigation.slice(1),
];

import { usePathname } from "next/navigation";

export default function Header({
  navigationData,
  className,
}: HeaderProps) {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const baseNav =
    navigationData && navigationData.length > 0 && navigationData[0].items
      ? navigationData
      : defaultVizagNavigation;

  const navList = baseNav.some((n) => n.title === "About Us")
    ? baseNav
    : [
        baseNav[0],
        { title: "About Us", href: "/about-us", items: [] },
        ...baseNav.slice(1),
      ];

  const isItemActive = useCallback(
    (navItem: NavigationSection) => {
      if (navItem.href === "/" && (pathname === "/" || !pathname)) return true;
      if (navItem.href !== "/" && pathname === navItem.href) return true;
      if (navItem.items?.some((sub) => pathname === sub.href)) return true;
      return false;
    },
    [pathname]
  );

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 30);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className={cn(
        "inset-x-0 z-50 px-3 md:px-6 flex items-center justify-center sticky top-0 py-3",
        className
      )}
    >
      <div
        className={cn(
          "w-full max-w-7xl flex items-center justify-between gap-2 lg:gap-3 xl:gap-5 transition-all duration-300",
          sticky
            ? "py-2 px-3 sm:px-4 md:px-5 bg-background/85 backdrop-blur-xl border border-border/70 shadow-xl rounded-full"
            : "py-2.5 px-3 sm:px-4 md:px-5 bg-background/70 backdrop-blur-md border border-border/40 rounded-full"
        )}
      >
        {/* VCCI Emblem & Brand */}
        <a
          href="/"
          className="flex items-center gap-2.5 xl:gap-3 shrink-0 group"
          aria-label="VCCI Home"
        >
          <img
            src="/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png"
            alt="VCCI Emblem"
            className="h-9 w-9 md:h-10 md:w-10 xl:h-11 xl:w-11 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col text-left">
            <span className="font-black tracking-wider text-base md:text-lg xl:text-xl text-foreground font-sans uppercase leading-none">
              VCCI
            </span>
            <span className="text-[8px] md:text-[9px] xl:text-[10px] tracking-widest text-muted-foreground uppercase font-semibold mt-0.5">
              Commerce & Industry
            </span>
          </div>
        </a>

        {/* Desktop Navigation with Dropdowns */}
        <div className="hidden lg:flex items-center justify-center">
          <NavigationMenu viewport={false} className="bg-muted/60 p-1 rounded-full border border-border/40 shrink-0">
            <NavigationMenuList className="flex items-center gap-0.5">
              {navList.map((navItem) => {
                const active = isItemActive(navItem);
                return (
                  <NavigationMenuItem key={navItem.title} className="relative shrink-0">
                    {navItem.items && navItem.items.length > 0 ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            "px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-medium rounded-full text-foreground/80 hover:text-foreground hover:bg-background/80 bg-transparent transition-colors whitespace-nowrap",
                            active
                              ? "bg-background text-foreground shadow-xs font-semibold"
                              : ""
                          )}
                        >
                          {navItem.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent
                          className={cn(
                            "p-2 min-w-[220px] bg-popover/95 backdrop-blur-xl border border-border/80 shadow-2xl rounded-2xl flex flex-col gap-0.5",
                            navItem.title === "Quick Links"
                              ? "right-0 left-auto"
                              : navItem.title === "Membership" || navItem.title === "About Us"
                              ? "left-0"
                              : "left-1/2 -translate-x-1/2"
                          )}
                        >
                          {navItem.items.map((sub) => (
                            <NavigationMenuLink asChild key={sub.href}>
                              <a
                                href={sub.href}
                                className="px-3.5 py-2 text-xs lg:text-sm text-foreground/85 hover:text-foreground hover:bg-muted/80 rounded-xl transition-colors font-medium flex items-center justify-between group"
                              >
                                <span>{sub.label}</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground">
                                  ↗
                                </span>
                              </a>
                            </NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <a
                          href={navItem.href}
                          className={cn(
                            "px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-medium rounded-full text-foreground/80 hover:text-foreground hover:bg-background/80 transition-colors block whitespace-nowrap",
                            active
                              ? "bg-background text-foreground shadow-xs font-semibold"
                              : ""
                          )}
                        >
                          {navItem.title}
                        </a>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/join"
            className="hidden sm:inline-flex items-center text-xs xl:text-sm font-semibold rounded-full h-9 xl:h-10 px-3.5 xl:px-5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-900 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group cursor-pointer border border-amber-300/70 shrink-0 whitespace-nowrap"
          >
            <span>Become a member</span>
            <ArrowUpRight
              size={14}
              className="ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
            />
          </a>

          {/* Mobile Menu Sheet */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild id="mobile-menu-trigger">
                <button
                  className="rounded-full border border-border/80 bg-background/80 p-2.5 flex items-center justify-center hover:bg-muted transition"
                  aria-label="Open navigation menu"
                >
                  <Menu width={20} height={20} />
                </button>
              </SheetTrigger>

              <SheetContent
                showCloseButton={false}
                side="right"
                className="w-full sm:w-96 p-0 border-l border-border/60 bg-background/95 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between p-5 border-b border-border/50">
                  <a href="/" className="flex items-center gap-2.5">
                    <img
                      src="/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png"
                      alt="VCCI Emblem"
                      className="h-8 w-8 object-contain"
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-black text-sm text-foreground uppercase tracking-wider leading-none">
                        VCCI
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">
                        Commerce & Industry
                      </span>
                    </div>
                  </a>
                  <SheetClose asChild id="mobile-menu-close">
                    <button
                      className="rounded-full border border-border p-2 block hover:bg-muted"
                      aria-label="Close menu"
                    >
                      <X width={16} height={16} />
                    </button>
                  </SheetClose>
                </div>

                <div className="flex flex-col gap-6 px-6 py-6 overflow-y-auto max-h-[calc(100vh-140px)]">
                  <SheetTitle className="sr-only">Vizag Chamber Menu</SheetTitle>
                  <div className="flex flex-col gap-5">
                    {navList.map((group) => (
                      <div key={group.title} className="flex flex-col gap-1.5">
                        {group.items && group.items.length > 0 ? (
                          <>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">
                              {group.title}
                            </p>
                            <div className="flex flex-col pl-2 border-l border-border/70 ml-2 gap-1">
                              {group.items.map((sub) => (
                                <a
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="py-1.5 px-2 text-sm text-foreground/90 hover:text-foreground hover:translate-x-1 transition-transform"
                                >
                                  {sub.label}
                                </a>
                              ))}
                            </div>
                          </>
                        ) : (
                          <a
                            href={group.href}
                            onClick={() => setIsOpen(false)}
                            className="text-base font-semibold text-foreground hover:text-primary transition-colors px-2 py-1"
                          >
                            {group.title}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/60 flex flex-col gap-3 mt-auto">
                    <a
                      href="/join"
                      className="w-full text-center py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-900 shadow-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Become a member ↗
                    </a>
                    <div className="flex items-center justify-between text-xs text-muted-foreground px-2 pt-2">
                      <a href="/about-us">About Us</a>
                      <span>•</span>
                      <a href="/contact-us">Contact Us</a>
                      <span>•</span>
                      <a href="/services/helpdesk">Helpline</a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export { Header };

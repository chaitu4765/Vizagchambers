"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

export type MemberModalMode = "join" | "login";

export interface MemberUser {
  name: string;
  company: string;
  membershipLevel: string;
  memberId: string;
  email: string;
  phone: string;
  validThru: string;
  category: string;
  avatar?: string;
  rsvps?: string[];
}

const SESSION_VERSION = 2;
const savedSession = (user: MemberUser) => JSON.stringify({ version: SESSION_VERSION, user });

interface MemberModalContextValue {
  isOpen: boolean;
  mode: MemberModalMode;
  isLoggedIn: boolean;
  user: MemberUser | null;
  openModal: (mode?: MemberModalMode) => void;
  closeModal: () => void;
  setMode: (mode: MemberModalMode) => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  toggleRsvp: (eventId: string) => void;
}

const MemberModalContext = createContext<MemberModalContextValue>({
  isOpen: false,
  mode: "join",
  isLoggedIn: false,
  user: null,
  openModal: () => {},
  closeModal: () => {},
  setMode: () => {},
  login: () => {},
  logout: () => {},
  toggleRsvp: () => {},
});

export function useMemberModal() {
  return useContext(MemberModalContext);
}

export function openMemberModal(mode: MemberModalMode = "join") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-vcci-member-modal", { detail: { mode } })
    );
  }
}

export function MemberModalProvider({
  children,
  defaultOpen = false,
  defaultMode = "join",
}: {
  children: ReactNode;
  defaultOpen?: boolean;
  defaultMode?: MemberModalMode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [mode, setMode] = useState<MemberModalMode>(defaultMode);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<MemberUser | null>(null);
  const closeModal = useCallback(() => setIsOpen(false), []);

  // Restore session from localStorage on mount
  useEffect(() => {
    // Defer the browser-only restore until after the initial hydration frame.
    const frame = requestAnimationFrame(() => { try {
      const saved = localStorage.getItem("vcci_member_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Old sessions contain a seeded demo identity and must not be restored.
        if (parsed.version === SESSION_VERSION && typeof parsed.user?.name === "string" && parsed.user.name.trim() && typeof parsed.user?.email === "string" && parsed.user.email.trim()) {
          setUser(parsed.user);
          setIsLoggedIn(true);
        }
      }
    } catch {
      // Ignore localStorage errors
    } });
    return () => cancelAnimationFrame(frame);
  }, []);

  const login = (email: string, name: string) => {
    if (!email.trim() || !name.trim()) return;
    const updatedUser: MemberUser = {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      company: "",
      membershipLevel: "Member portal",
      memberId: "Pending verification",
      phone: "",
      validThru: "Pending verification",
      category: "",
      rsvps: [],
    };
    setUser(updatedUser);
    setIsLoggedIn(true);
    try {
      localStorage.setItem("vcci_member_session", savedSession(updatedUser));
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem("vcci_member_session");
    } catch {
      // Ignore storage errors
    }
  };

  const toggleRsvp = (eventId: string) => {
    if (!user) return;
    const current = user.rsvps || [];
    const next = current.includes(eventId)
      ? current.filter((id) => id !== eventId)
      : [...current, eventId];
    const updated = { ...user, rsvps: next };
    setUser(updated);
    try {
      localStorage.setItem("vcci_member_session", savedSession(updated));
    } catch {
      // Ignore storage errors
    }
  };

  useEffect(() => {
    const handleEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: MemberModalMode }>;
      if (customEvent.detail?.mode) {
        setMode(customEvent.detail.mode);
      }
      setIsOpen(true);
    };

    window.addEventListener("open-vcci-member-modal", handleEvent);
    return () => {
      window.removeEventListener("open-vcci-member-modal", handleEvent);
    };
  }, []);

  // Intercept any click on links pointing to /join or /login
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest<HTMLAnchorElement>("a");
      if (!target) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target.target === "_blank" || target.hasAttribute("download")) return;
      const href = target.getAttribute("href");
      if (!href) return;

      if (href === "/join" || href === "/join/" || href.startsWith("/join?")) {
        e.preventDefault();
        e.stopPropagation();
        const urlMode = href.includes("mode=login") ? "login" : "join";
        setMode(urlMode);
        setIsOpen(true);
      } else if (href === "/login" || href === "/login/") {
        if (!isLoggedIn) {
          e.preventDefault();
          e.stopPropagation();
          setMode("login");
          setIsOpen(true);
        }
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [isLoggedIn]);

  return (
    <MotionConfig reducedMotion="user"><MemberModalContext.Provider
      value={{
        isOpen,
        mode,
        isLoggedIn,
        user,
        openModal: (m = "join") => {
          setMode(m);
          setIsOpen(true);
        },
        closeModal,
        setMode,
        login,
        logout,
        toggleRsvp,
      }}
    >
      {children}
    </MemberModalContext.Provider></MotionConfig>
  );
}

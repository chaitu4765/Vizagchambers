"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { SmokeyBackground, LoginForm } from "@/components/ui/login-form";
import { useMemberModal } from "@/components/member-modal-context";

import Link from "next/link";

export function HoveringMemberScreen() {
  const { isOpen, mode, closeModal, setMode, openModal, isLoggedIn, user, logout } = useMemberModal();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  return (
    <>
      {/* Floating Pill on bottom-right of the screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          type="button"
          onClick={() => openModal(isLoggedIn ? "login" : mode || "join")}
          className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
            isLoggedIn
              ? "border border-emerald-400/50 hover:border-emerald-300 shadow-emerald-500/10"
              : "border border-amber-400/40 hover:border-amber-400 shadow-amber-500/10"
          }`}
          aria-label="Open Chamber Member Portal"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLoggedIn ? "bg-emerald-400" : "bg-amber-400"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isLoggedIn ? "bg-emerald-500" : "bg-amber-500"
              }`}
            ></span>
          </span>
          <span className="text-xs font-semibold tracking-wide">
            {isLoggedIn ? (
              <span>
                Member Dashboard{" "}
                <span className="text-emerald-300 font-normal">
                  ({user?.name?.split(" ")[0] || "Active"})
                </span>
              </span>
            ) : (
              "Member Access / Join"
            )}
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-medium ${
              isLoggedIn
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-amber-400/20 text-amber-300"
            }`}
          >
            {isLoggedIn ? "PORTAL" : "✦ VCCI"}
          </span>
        </button>
      </motion.div>

      {/* Hovering Screen Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
              aria-hidden="true"
            />

            {/* Hovering Window Card with Attached Levitation Float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 35 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{
                opacity: { duration: 0.35 },
                scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                y: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                },
              }}
              className="relative w-full max-w-xl my-auto rounded-3xl border border-amber-400/35 shadow-[0_0_60px_rgba(217,119,6,0.18),0_30px_70px_-15px_rgba(0,0,0,0.85)] z-10"
              style={{ maxHeight: "calc(100vh - 2rem)" }}
            >
              {/* WebGL Smokey Background Canvas */}
              <SmokeyBackground
                className="absolute inset-0 z-0 pointer-events-auto rounded-3xl"
                color={isLoggedIn ? "#062822" : "#0A2C3D"}
                backdropBlurAmount="md"
              />

              {/* Decorative radial gradients */}
              <div
                className="absolute inset-0 pointer-events-none z-1 rounded-3xl"
                style={{
                  background: isLoggedIn
                    ? "radial-gradient(circle at top right, rgba(16,185,129,0.2), transparent 45%), radial-gradient(circle at bottom left, rgba(6,182,212,0.15), transparent 50%)"
                    : "radial-gradient(circle at top right, rgba(217,119,6,0.2), transparent 45%), radial-gradient(circle at bottom left, rgba(56,189,248,0.15), transparent 50%)",
                }}
              />

              {/* Glassmorphic UI Body */}
              <div className="relative z-10 p-5 sm:p-8 flex flex-col max-h-[calc(100vh-2.5rem)] overflow-y-auto">
                {/* Header Strip with Emblem, Tabs & Close */}
                <div className="flex items-center justify-between gap-3 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/a0ddb35059a90ffa27aaeeb64159c1aa.png"
                      alt="VCCI"
                      className="h-8 w-8 object-contain"
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-extrabold text-sm tracking-wider text-white font-sans uppercase leading-none">
                        VCCI PORTAL
                      </span>
                      <span className="text-[8px] tracking-widest text-amber-300 uppercase font-semibold mt-0.5">
                        {isLoggedIn ? "Validated Member Session" : "Visakhapatnam Chamber"}
                      </span>
                    </div>
                  </div>

                  {/* Tab Switcher (Only if not logged in) */}
                  {!isLoggedIn ? (
                    <div className="flex items-center p-1 rounded-full bg-slate-900/80 border border-white/20 backdrop-blur-md">
                      <button
                        type="button"
                        onClick={() => setMode("join")}
                        style={
                          mode === "join"
                            ? {
                                background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
                                color: "#071B26",
                                boxShadow: "0 2px 10px rgba(245, 158, 11, 0.45)",
                              }
                            : {
                                background: "transparent",
                                color: "#E2E8F0",
                              }
                        }
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer"
                      >
                        Apply / Join
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        style={
                          mode === "login"
                            ? {
                                background: "linear-gradient(135deg, #2563EB, #3B82F6)",
                                color: "#FFFFFF",
                                boxShadow: "0 2px 10px rgba(37, 99, 235, 0.45)",
                              }
                            : {
                                background: "transparent",
                                color: "#E2E8F0",
                              }
                        }
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer"
                      >
                        Member Sign In
                      </button>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-semibold text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Session Active
                    </span>
                  )}

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Tab Content or Logged-in Summary */}
                <div className="pt-5">
                  {isLoggedIn && user ? (
                    <div className="space-y-5 animate-in fade-in duration-300">
                      {/* Executive Card */}
                      <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-base text-white">{user.name}</h3>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              </div>
                              <p className="text-xs text-amber-300 font-medium">{user.company}</p>
                              <p className="text-[11px] text-slate-300 font-mono mt-0.5">{user.memberId}</p>
                            </div>
                          </div>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-200 border border-amber-400/30">
                            {user.membershipLevel}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                          <div className="p-2.5 rounded-lg bg-black/20">
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Upcoming Meets</p>
                            <p className="font-semibold text-white mt-0.5">5 Summits & Conclaves</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-black/20">
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Partner Concessions</p>
                            <p className="font-semibold text-emerald-300 mt-0.5">8 Partner Hotels</p>
                          </div>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="space-y-2.5">
                        <a
                          href="/dashboard"
                          onClick={closeModal}
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                          <span>Open Member Executive Dashboard</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              logout();
                            }}
                            className="text-xs text-rose-300 hover:text-rose-200 underline underline-offset-2 transition cursor-pointer"
                          >
                            Sign Out of Chamber Session
                          </button>
                          <a
                            href="/dashboard#hotels"
                            onClick={closeModal}
                            className="text-xs text-amber-300 hover:text-amber-200 transition"
                          >
                            Browse Hotel Tariffs ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : mode === "join" ? (
                    <JoinMembershipForm onSwitchToLogin={() => setMode("login")} />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <LoginForm
                        title="Member Sign In"
                        subtitle="Access the VCCI Executive Chamber Portal"
                        className="bg-transparent border-none shadow-none p-0 max-w-full"
                        onClose={closeModal}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Animated Membership Application Form with Floating Labels & Feedback
 */
function JoinMembershipForm({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
}) {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    category: "Corporate Member",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="p-4 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
          <CheckCircle2 size={44} />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Application Received!
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
          Thank you for applying to the Vizagapatam Chamber of Commerce &
          Industry. Our secretariat will contact you at{" "}
          <span className="font-semibold text-amber-300">{formData.email}</span>{" "}
          with membership documentation and details.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-2 px-5 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-left space-y-1">
        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Become a Chamber Member</span>
          <Sparkles size={18} className="text-amber-400" />
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Connect your enterprise with policy advocacy, global eCOO export
          services, and 1,000+ industry leaders across Visakhapatnam.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company */}
          <div className="relative z-0 group">
            <input
              type="text"
              id="join_company"
              required
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="join_company"
              className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <Building2 className="inline-block mr-2 -mt-1" size={15} />
              Company / Organisation *
            </label>
          </div>

          {/* Full Name */}
          <div className="relative z-0 group">
            <input
              type="text"
              id="join_name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="join_name"
              className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <User className="inline-block mr-2 -mt-1" size={15} />
              Full Name *
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="relative z-0 group">
            <input
              type="email"
              id="join_email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="join_email"
              className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <Mail className="inline-block mr-2 -mt-1" size={15} />
              Work Email Address *
            </label>
          </div>

          {/* Phone */}
          <div className="relative z-0 group">
            <input
              type="tel"
              id="join_phone"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="join_phone"
              className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <Phone className="inline-block mr-2 -mt-1" size={15} />
              Phone / Mobile *
            </label>
          </div>
        </div>

        {/* Membership Category */}
        <div className="space-y-1.5">
          <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <Briefcase size={14} className="text-amber-400" />
            <span>Select Membership Category *</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-amber-400 text-xs sm:text-sm cursor-pointer"
          >
            <option value="Corporate Member" className="bg-slate-900 text-white">
              Corporate / Major Enterprise
            </option>
            <option value="MSME Member" className="bg-slate-900 text-white">
              MSME / Small & Medium Enterprise
            </option>
            <option value="Associate Member" className="bg-slate-900 text-white">
              Associate Member / Individual Trader
            </option>
            <option value="Women's Wing" className="bg-slate-900 text-white">
              VCCI Women’s Wing
            </option>
            <option value="Youth Wing" className="bg-slate-900 text-white">
              VCCI Youth Wing
            </option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #D97706 100%)",
            color: "#071B26",
            boxShadow: "0 8px 24px -4px rgba(245, 158, 11, 0.5), 0 0 16px rgba(245, 158, 11, 0.3)",
          }}
          className="group w-full flex items-center justify-center py-3.5 px-5 rounded-xl font-extrabold text-sm tracking-wide transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 text-[#071B26] font-bold">
              <span className="w-4 h-4 border-2 border-[#071B26]/30 border-t-[#071B26] rounded-full animate-spin" />
              Submitting Application…
            </span>
          ) : (
            <span className="flex items-center text-[#071B26] font-bold">
              Submit Membership Application
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </button>

        {/* Footer switch to login */}
        <p className="text-center text-xs text-gray-400 pt-1">
          Already a registered Chamber member?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-2 transition cursor-pointer"
          >
            Sign in to Portal
          </button>
        </p>
      </form>
    </div>
  );
}

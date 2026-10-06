"use client";

import React, { useEffect } from "react";
import { openMemberModal } from "@/components/member-modal-context";
import Home from "../page";

export default function JoinPage() {
  useEffect(() => {
    // Open the hovering member screen immediately
    openMemberModal("join");
    // Clean up URL so the user stays on the main experience
    if (typeof window !== "undefined" && window.location.pathname === "/join") {
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return <Home />;
}

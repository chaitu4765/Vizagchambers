"use client";

import React, { useEffect } from "react";
import { openMemberModal } from "@/components/member-modal-context";
import Home from "../page";

export default function LoginPage() {
  useEffect(() => {
    openMemberModal("login");
    if (typeof window !== "undefined" && window.location.pathname === "/login") {
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return <Home />;
}

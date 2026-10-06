import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { ChamberMotion } from "@/components/ui/chamber-motion";
import { MemberDashboardView } from "@/components/member-dashboard-view";

export const metadata: Metadata = {
  title: "Member Executive Dashboard | Vizag Chamber",
  description:
    "Exclusive Chamber portal for validated members: upcoming summits, B2B meets, partner hotel corporate rates, and statutory services.",
};

export default function DashboardPage() {
  return (
    <>
      <ChamberMotion />
      <SiteHeader />
      <main id="main-content" className="min-h-screen bg-background">
        <MemberDashboardView />
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import "./experience.css";

export const metadata: Metadata = {
  title: "Vizag Chamber — A legacy. A limitless future.",
  description:
    "The Vizagapatam Chamber of Commerce and Industry. Connecting businesses, people and possibilities in Visakhapatnam.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

import { MemberModalProvider } from "@/components/member-modal-context";
import { HoveringMemberScreen } from "@/components/hovering-member-screen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="top" className="antialiased">
        <MemberModalProvider>
          {children}
          <HoveringMemberScreen />
        </MemberModalProvider>
      </body>
    </html>
  );
}

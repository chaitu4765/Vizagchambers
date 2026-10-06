"use client";

import { SmokeyBackground, LoginForm } from "@/components/ui/login-form";

export default function DemoOne() {
  return (
    <main className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      <SmokeyBackground className="absolute inset-0" color="#1E40AF" />
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <LoginForm />
      </div>
    </main>
  );
}

export { DemoOne };

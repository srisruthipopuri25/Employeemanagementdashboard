"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <aside className="w-60 bg-slate-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">EMS</h2>
      <nav className="space-y-3">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/employees">Employees</Link>
        <button
          className="text-red-400 block mt-6"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

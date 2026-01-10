"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEmployeeStore } from "@/store/employeeStore";

export default function Sidebar() {
  const logout = useAuthStore((s) => s.logout);
  const setView = useEmployeeStore((s) => s.setView);
  const pathname = usePathname();
  const router = useRouter();

  const inEmployees = pathname.startsWith("/employees");

  return (
    <aside className="w-60 bg-slate-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">EMS</h2>

      <nav className="space-y-3">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/employees">Employees</Link>

        {inEmployees && (
          <div className="mt-6 space-y-2 border-t border-slate-700 pt-4">
            <button onClick={() => setView("summary")} className="block w-full text-left">
              Summary
            </button>
            <button onClick={() => setView("form")} className="block w-full text-left">
              Add Employee
            </button>
            <button onClick={() => setView("filters")} className="block w-full text-left">
              Filters
            </button>
            <button onClick={() => setView("table")} className="block w-full text-left">
              Employee List
            </button>
          </div>
        )}

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

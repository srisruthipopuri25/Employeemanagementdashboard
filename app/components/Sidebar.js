'use client';


import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEmployeeStore } from '@/store/employeeStore';

export default function Sidebar() {
  const logout = useAuthStore((s) => s.logout);
  const setView = useEmployeeStore((s) => s.setView);
  const clearSelectedEmployee = useEmployeeStore(
    (s) => s.clearSelectedEmployee
  );
  const router = useRouter();

  return (
    <aside className="w-60 bg-slate-900 text-white p-4">
      <div className="text-2xl font-bold  text-white mb-6">
        Employee Management Dashboard
      </div>

      <nav className="space-y-3">
        <div className="mt-6 space-y-2 border-t border-slate-700 pt-4">
          <button
            onClick={() => setView('summary')}
            className="block w-full text-left"
          >
            Summary
          </button>
          <button
            onClick={() => {
              clearSelectedEmployee();
              setView('form');
            }}
            className="block w-full text-left"
          >
            Add Employee
          </button>

          <button
            onClick={() => setView('table')}
            className="block w-full text-left"
          >
            Employee List
          </button>
        </div>

        <button
          className="text-red-400 block mt-6"
          onClick={() => {
            logout();
            router.push('/login');
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

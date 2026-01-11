'use client';
import { useEmployeeStore } from '@/store/employeeStore';

export default function EmployeeSummary() {
  const employees = useEmployeeStore((s) => s.employees);

  const active = employees.filter((e) => e.active).length;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        Total: {employees.length}
      </div>
      <div className="bg-white p-4 rounded shadow">Active: {active}</div>
      <div className="bg-white p-4 rounded shadow">
        Inactive: {employees.length - active}
      </div>
    </div>
  );
}

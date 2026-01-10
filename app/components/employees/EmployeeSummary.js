"use client";
import { useEmployeeStore } from "@/store/employeeStore";

export default function EmployeeSummary() {
  const employees = useEmployeeStore((s) => s.employees);

  const active = employees.filter((e) => e.active).length;

  return (
    <div className="bg-white p-4 rounded shadow">
      <p>Total Employees: {employees.length}</p>
      <p>Active: {active}</p>
      <p>Inactive: {employees.length - active}</p>
    </div>
  );
}

"use client";
import { useEmployeeStore } from "@/store/employeeStore";

import EmployeeSummary from "@/components/employees/EmployeeSummary";
import EmployeeForm from "@/components/employees/EmployeeForm";
import EmployeeTable from "@/components/employees/EmployeeTable";

export default function EmployeesPage() {
  const view = useEmployeeStore((s) => s.currentView);

  return (
    <div>
      {view === "summary" && <EmployeeSummary />}
      {view === "form" && <EmployeeForm />}
      {view === "table" && <EmployeeTable />}
    </div>
  );
}

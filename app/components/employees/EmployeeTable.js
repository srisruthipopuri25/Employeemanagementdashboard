"use client";
import { useEffect } from "react";
import { useEmployeeStore } from "@/store/employeeStore";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeRow from "./EmployeeRow";
import Loading from "@/components/common/loader";


export default function EmployeeTable() {
  const fetchEmployees = useEmployeeStore((s) => s.fetchEmployees);
  const employees = useEmployeeStore((s) => s.employees);
  const isLoading = useEmployeeStore((s) => s.isLoading); // add in store


  const search = useEmployeeStore((s) => s.search);
  const filterGender = useEmployeeStore((s) => s.filterGender);
  const filterStatus = useEmployeeStore((s) => s.filterStatus);


  useEffect(() => {
    if (employees.length === 0) fetchEmployees();
  }, [fetchEmployees, employees.length]);


  const filtered = employees.filter((e) => {
    if (search && !e.fullName.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (filterGender && e.gender !== filterGender) return false;
    if (filterStatus === "active" && !e.active) return false;
    if (filterStatus === "inactive" && e.active) return false;
    return true;
  });


  return (
    <div className="bg-white p-4 rounded shadow space-y-4 text-black">
      <EmployeeFilters />


      <div id="employeeTable">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loading />
          </div>
        ) : (
          <table className="w-full border border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>State</th>
                <th>Status</th>
                <th className="print:hidden">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <EmployeeRow key={e.id} employee={e} />
              ))}


              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-4 text-gray-500 text-center">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


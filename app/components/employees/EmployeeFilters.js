"use client";
import { useEmployeeStore } from "@/store/employeeStore";

export default function EmployeeFilters() {
  const search = useEmployeeStore((s) => s.search);
  const setSearch = useEmployeeStore((s) => s.setSearch);
  const filterGender = useEmployeeStore((s) => s.filterGender);
  const setFilterGender = useEmployeeStore((s) => s.setFilterGender);
  const filterStatus = useEmployeeStore((s) => s.filterStatus);
  const setFilterStatus = useEmployeeStore((s) => s.setFilterStatus);
  const clearFilters = useEmployeeStore((s) => s.clearFilters);

  return (
    <div className="flex gap-3 mb-2">
      <input
        className="border p-2 flex-1"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2"
        value={filterGender}
        onChange={(e) => setFilterGender(e.target.value)}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        className="border p-2"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button
        onClick={clearFilters}
        className="bg-gray-500 text-white px-3 py-1 rounded"
      >
        Clear
      </button>

      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Print
      </button>
    </div>
  );
}

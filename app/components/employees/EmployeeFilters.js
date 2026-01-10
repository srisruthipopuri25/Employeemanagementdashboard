"use client";
import { useEmployeeStore } from "@/store/employeeStore";

export default function EmployeeFilters() {
  const search = useEmployeeStore((s) => s.search);
  const setSearch = useEmployeeStore((s) => s.setSearch);

  const filterGender = useEmployeeStore((s) => s.filterGender);
  const setFilterGender = useEmployeeStore((s) => s.setFilterGender);

  const filterStatus = useEmployeeStore((s) => s.filterStatus);
  const setFilterStatus = useEmployeeStore((s) => s.setFilterStatus);

  return (
    <div className="bg-white p-4 rounded shadow flex gap-4">
      <input
        className="border p-2 flex-1"
        placeholder="Search by name"
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
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useEmployeeStore } from "@/store/employeeStore";
import { Image as ImageIcon } from "lucide-react";

export default function EmployeeTable() {
  const fetchEmployees = useEmployeeStore((s) => s.fetchEmployees);
  const employees = useEmployeeStore((s) => s.employees);

  const search = useEmployeeStore((s) => s.search);
  const setSearch = useEmployeeStore((s) => s.setSearch);

  const filterGender = useEmployeeStore((s) => s.filterGender);
  const setFilterGender = useEmployeeStore((s) => s.setFilterGender);

  const filterStatus = useEmployeeStore((s) => s.filterStatus);
  const setFilterStatus = useEmployeeStore((s) => s.setFilterStatus);

  const deleteEmployee = useEmployeeStore((s) => s.deleteEmployee);
  const toggleStatus = useEmployeeStore((s) => s.toggleStatus);

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
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Print
        </button>
      </div>

      <div id="employeeTable">
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
              <tr key={e.id} className="border-t text-center">
                <td>{e.id}</td>
                <td>
                  {e.profileImage ? (
                    <img
                      src={e.profileImage}
                      className="h-10 w-10 mx-auto rounded-full object-cover"
                      onError={(ev) => {
                        ev.currentTarget.style.display = "none";
                        ev.currentTarget.nextSibling.style.display = "inline-block";
                      }}
                    />
                  ) : null}
                  <ImageIcon
                    className="h-8 w-8 mx-auto text-gray-400"
                    style={{ display: e.profileImage ? "none" : "inline-block" }}
                  />
                </td>
                <td>{e.fullName}</td>
                <td>{e.gender}</td>
                <td>{e.dob}</td>
                <td>{e.state}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(e.id)}
                    className={e.active ? "text-green-600" : "text-red-600"}
                  >
                    {e.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="print:hidden">
                  <button
                    onClick={() => deleteEmployee(e.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
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
      </div>
    </div>
  );
}

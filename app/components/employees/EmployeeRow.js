"use client";
import { User } from "lucide-react";
import { useEmployeeStore } from "@/store/employeeStore";

export default function EmployeeRow({ employee }) {
  const deleteEmployee = useEmployeeStore((s) => s.deleteEmployee);
  const toggleStatus = useEmployeeStore((s) => s.toggleStatus);
  const setSelectedEmployee = useEmployeeStore((s) => s.setSelectedEmployee);
  const setView = useEmployeeStore((s) => s.setView);

  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this employee?");
    if (!ok) return;
    deleteEmployee(id);
  };

  return (
    <tr className="border-t text-center">
      <td>{employee.id}</td>

      <td>
        {employee.profileImage ? (
          <img
            src={employee.profileImage}
            className="h-10 w-10 mx-auto rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "inline-block";
            }}
          />
        ) : null}

        <User
          className="h-8 w-8 mx-auto text-gray-400"
          style={{ display: employee.profileImage ? "none" : "inline-block" }}
        />
      </td>

      <td>{employee.fullName}</td>
      <td>{employee.gender}</td>
      <td>{employee.dob}</td>
      <td>{employee.state}</td>

      <td>
        <button
          onClick={() => toggleStatus(employee.id)}
          className={employee.active ? "text-green-600" : "text-red-600"}
        >
          {employee.active ? "Active" : "Inactive"}
        </button>
      </td>

      <td className="print:hidden space-x-2">
        <button
          onClick={() => {
            setSelectedEmployee(employee);
            setView("form");
          }}
          className="text-blue-600"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(employee.id)}
          className="text-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

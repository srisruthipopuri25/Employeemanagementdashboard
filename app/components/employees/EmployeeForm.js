"use client";
import { useState, useEffect } from "react";
import { useEmployeeStore } from "@/store/employeeStore";

const STATES = ["Maharashtra", "Telangana", "Tamil Nadu", "Delhi", "Gujarat", "Kerala"];

export default function EmployeeForm() {
  const addEmployee = useEmployeeStore((s) => s.addEmployee);
  const updateEmployee = useEmployeeStore((s) => s.updateEmployee);
  const selectedEmployee = useEmployeeStore((s) => s.selectedEmployee);
  const clearSelectedEmployee = useEmployeeStore((s) => s.clearSelectedEmployee);

  const [form, setForm] = useState({
    id: "",
    fullName: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    profileImage: null,
    preview: null,
  });

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        id: selectedEmployee.id,
        fullName: selectedEmployee.fullName,
        gender: selectedEmployee.gender,
        dob: selectedEmployee.dob,
        state: selectedEmployee.state,
        active: selectedEmployee.active,
        profileImage: selectedEmployee.profileImage,
        preview: selectedEmployee.profileImage,
      });
    } else {
      setForm({
        id: "",
        fullName: "",
        gender: "",
        dob: "",
        state: "",
        active: true,
        profileImage: null,
        preview: null,
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setForm({ ...form, profileImage: file, preview: reader.result });
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.gender || !form.dob || !form.state) {
      alert("All fields required");
      return;
    }

    if (selectedEmployee) {
      updateEmployee({
        id: form.id,
        fullName: form.fullName,
        gender: form.gender,
        dob: form.dob,
        state: form.state,
        active: form.active,
        profileImage: form.preview,
      });
      clearSelectedEmployee();
    } else {
      addEmployee({
        id: Date.now(),
        fullName: form.fullName,
        gender: form.gender,
        dob: form.dob,
        state: form.state,
        active: form.active,
        profileImage: form.preview,
      });
    }

    setForm({
      id: "",
      fullName: "",
      gender: "",
      dob: "",
      state: "",
      active: true,
      profileImage: null,
      preview: null,
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow grid grid-cols-2 gap-4">
      <input
        name="fullName"
        className="border p-2 col-span-2"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
      />

      <select name="gender" className="border p-2" value={form.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="date"
        name="dob"
        className="border p-2"
        value={form.dob}
        onChange={handleChange}
      />

      <select name="state" className="border p-2 col-span-2" value={form.state} onChange={handleChange}>
        <option value="">Select State</option>
        {STATES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <input type="file" accept="image/*" onChange={handleChange} />

      {form.preview && (
        <img src={form.preview} alt="preview" className="h-16 w-16 object-cover rounded" />
      )}

      <label className="flex items-center gap-2">
        <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
        Active
      </label>

      <button
        onClick={handleSubmit}
        className="col-span-2 bg-green-600 text-white py-2 rounded"
      >
        {selectedEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { useEmployeeStore } from '@/store/employeeStore';
import './Employee.css';

const STATES = [
  'Maharashtra',
  'Telangana',
  'Tamil Nadu',
  'Delhi',
  'Gujarat',
  'Kerala',
];

export default function EmployeeForm() {
  const addEmployee = useEmployeeStore((s) => s.addEmployee);
  const updateEmployee = useEmployeeStore((s) => s.updateEmployee);
  const selectedEmployee = useEmployeeStore((s) => s.selectedEmployee);
  const clearSelectedEmployee = useEmployeeStore(
    (s) => s.clearSelectedEmployee
  );
  const view = useEmployeeStore((s) => s.currentView);

  const emptyForm = {
    id: '',
    fullName: '',
    gender: '',
    dob: '',
    state: '',
    active: true,
    profileImage: null,
    preview: null,
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // When edit selected
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
      setErrors({});
    }
  }, [selectedEmployee]);

  // When switching to Add mode
  useEffect(() => {
    if (view === 'form' && !selectedEmployee) {
      setForm(emptyForm);
      setErrors({});
    }
  }, [view, selectedEmployee]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () =>
          setForm({ ...form, profileImage: file, preview: reader.result });
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [name]: value });
    }

    // remove error on change
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = true;
    if (!form.gender) newErrors.gender = true;
    if (!form.dob) newErrors.dob = true;
    if (!form.state) newErrors.state = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (selectedEmployee) {
      updateEmployee({
        id: form.id,
        fullName: form.fullName,
        gender: form.gender,
        dob: form.dob,
        state: form.state,
        active: form.active,
        profileImage: form.preview || selectedEmployee.profileImage,
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

    setForm(emptyForm);
    setErrors({});
  };

  return (
    <>
      <div className="page">
        <div className="card">
          <h2>{selectedEmployee ? 'Update Employee' : 'Add Employee'}</h2>

          {/* Form Grid */}
          <div className="grid">
            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter name"
                value={form.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'border-red-500' : ''}
              />
            </div>

            <div>
              <label>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={errors.gender ? 'border-red-500' : ''}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className={errors.dob ? 'border-red-500' : ''}
              />
            </div>

            <div>
              <label>State</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className={errors.state ? 'border-red-500' : ''}
              >
                <option value="">Select State</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div className="upload">
            <label>Profile Photo</label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
            />
            {form.profileImage && (
              <span className="text-sm text-gray-500">
                File: {form.profileImage.name}
              </span>
            )}
            {form.preview && (
              <img
                src={form.preview}
                alt="preview"
                className="h-16 w-16 object-cover rounded mt-2"
              />
            )}
          </div>

          {/* Actions */}
          <div className="actions">
            <label className="checkbox">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              Active
            </label>

            <button onClick={handleSubmit}>
              {selectedEmployee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

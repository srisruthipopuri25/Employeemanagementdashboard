import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  employees: [],
  selectedEmployee: null, 

  search: "",
  filterGender: "",
  filterStatus: "",

  currentView: "table", 
  setView: (view) => set({ currentView: view }),

  fetchEmployees: async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();
    set({ employees: data });
  },

  setSearch: (value) => set({ search: value }),
  setFilterGender: (value) => set({ filterGender: value }),
  setFilterStatus: (value) => set({ filterStatus: value }),

  addEmployee: (emp) =>
    set((s) => ({
      employees: [...s.employees, emp],
      currentView: "table", 
    })),

  updateEmployee: (emp) =>
    set((s) => ({
      employees: s.employees.map((e) => (e.id === emp.id ? emp : e)),
      selectedEmployee: null,
      currentView: "table",
    })),

  deleteEmployee: (id) =>
    set((s) => ({
      employees: s.employees.filter((e) => e.id !== id),
    })),

  toggleStatus: (id) =>
    set((s) => ({
      employees: s.employees.map((e) =>
        e.id === id ? { ...e, active: !e.active } : e
      ),
    })),

  setSelectedEmployee: (emp) => set({ selectedEmployee: emp }),
  clearSelectedEmployee: () => set({ selectedEmployee: null }),
}));

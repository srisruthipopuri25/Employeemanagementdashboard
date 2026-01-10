import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  employees: [],
  search: "",

  addEmployee: (emp) =>
    set((s) => ({ employees: [...s.employees, emp] })),

  deleteEmployee: (id) =>
    set((s) => ({ employees: s.employees.filter((e) => e.id !== id) })),

  setSearch: (value) => set({ search: value }),
}));

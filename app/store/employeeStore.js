import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  employees: [],
  selectedEmployee: null,

  search: "",
  filterGender: "",
  filterStatus: "",
  isLoading: false,

  currentView: "table",
  setView: (view) => set({ currentView: view }),

  // 🔹 Loader for useEffect / table load
  fetchEmployees: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      set({ employees: data });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },

  clearFilters: () =>
  set({
    search: "",
    filterGender: "",
    filterStatus: "",
  }),

  setSearch: (value) => set({ search: value }),
  setFilterGender: (value) => set({ filterGender: value }),
  setFilterStatus: (value) => set({ filterStatus: value }),

  // 🔹 Loader while adding employee
  addEmployee: async (emp) => {
    set({ isLoading: true });
    try {
      // if API call exists, keep it here
      // await fetch("/api/employees", { method: "POST", body: JSON.stringify(emp) });

      set((s) => ({
        employees: [...s.employees, emp],
        currentView: "table",
      }));
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },

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

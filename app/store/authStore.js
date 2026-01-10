import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuth: false,
  error: null,

  login: (username, password) => {
    // mock credentials
    if (username === "admin" && password === "1234") {
      document.cookie = "isAuth=true; path=/";
      set({ isAuth: true, error: null });
      return true;
    } else {
      set({ error: "Invalid username or password" });
      return false;
    }
  },

  logout: () => {
    document.cookie = "isAuth=; max-age=0; path=/";
    set({ isAuth: false });
  },
}));

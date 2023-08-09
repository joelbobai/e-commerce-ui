import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    user: [],
    isLoggedIn: false,
  },
  setUser: (obj) => set((state) => ({ auth: { ...state.auth, user: obj } })),
  setIsLoggedIn: (bool) =>
    set((state) => ({ auth: { ...state.auth, isLoggedIn: bool } })),
}));

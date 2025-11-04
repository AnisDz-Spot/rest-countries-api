import { ThemeStore } from "@/types/types";
import { create } from "zustand";

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,

  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { isDarkMode: newMode };
    }),

  initializeTheme: () => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialMode =
      storedTheme === "dark" || (storedTheme === null && prefersDark);

    if (initialMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    set({ isDarkMode: initialMode });
  },
}));

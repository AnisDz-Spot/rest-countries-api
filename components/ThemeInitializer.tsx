"use client";

import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

const ThemeInitializer = () => {
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return null;
};

export default ThemeInitializer;

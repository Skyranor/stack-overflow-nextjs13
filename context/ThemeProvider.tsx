"use client";
import { getDefaultTheme } from "@/lib/utils";
import { ThemeValue } from "@/types";
import { ReactNode, useState, useEffect, createContext } from "react";

interface ThemeContextType {
  theme: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const localStorageTheme = localStorage.getItem("theme") as ThemeValue;

  const [theme, setTheme] = useState<ThemeValue>(
    localStorageTheme || getDefaultTheme,
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

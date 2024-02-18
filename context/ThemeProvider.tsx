'use client';
import React, { ReactNode, createContext, useState } from 'react';

export type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

import { ThemeValue } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDefaultTheme = (): ThemeValue => {
  // if ("theme" in localStorage) {
  //   return localStorage.getItem("theme") as ThemeValue;
  // }
  // if (typeof window !== "undefined") {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  // }

  // return "light";
};

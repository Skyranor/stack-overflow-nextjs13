import { ThemeContext } from "@/context/ThemeProvider";
import { getDefaultTheme } from "@/lib/utils";
import { ThemeValue } from "@/types";
import { useContext, useEffect } from "react";

interface UseTheme {
  theme: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
}

export const useTheme = (): UseTheme => {
  const { theme, setTheme } = useContext(ThemeContext);

  let themeValue = theme;
  if (theme === "system") {
    themeValue = getDefaultTheme();
  }

  const handleChangeTheme = () => {
    switch (theme) {
      case "dark":
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        document.body.classList.remove(
          themeValue === "dark" ? "light" : "dark",
        );
        document.body.classList.add(themeValue);
        localStorage.setItem("theme", themeValue);
    }
  };

  useEffect(() => {
    handleChangeTheme();
  }, [theme]);

  return {
    theme: themeValue,
    setTheme,
  };
};

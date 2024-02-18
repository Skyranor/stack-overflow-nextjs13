import { Theme, ThemeContext } from '@/context/ThemeProvider';
import { useCallback, useContext } from 'react';

interface UseTheme {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): UseTheme => {
  const { theme, setTheme } = useContext(ThemeContext);

  let newTheme: Theme = 'light';

  const toggleTheme = useCallback(() => {
    switch (theme) {
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'light';
        break;
      default:
        newTheme = 'light';
    }

    setTheme?.(newTheme);
  }, [theme, setTheme]);

  document.documentElement.classList.add(newTheme);

  return {
    theme: newTheme,
    toggleTheme,
  };
};

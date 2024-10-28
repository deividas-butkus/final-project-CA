import { createContext, useState, ReactNode } from "react";

type ThemesContextType = {
  isLightMode: boolean;
  toggleTheme: () => void;
};

const ThemesContext = createContext<ThemesContextType | undefined>(undefined);

export const ThemesProvider = ({ children }: { children: ReactNode }) => {
  const storedTheme = localStorage.getItem("theme") === "dark";
  const [isLightMode, setIsLightMode] = useState(storedTheme);

  const toggleTheme = () => {
    setIsLightMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "light" : "dark");
      return newMode;
    });
  };

  return (
    <ThemesContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};

export default ThemesContext;

import { useContext } from "react";
import ThemesContext from "./ThemesContext";

export const useThemesContext = () => {
  const context = useContext(ThemesContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemesProvider");
  }
  return context;
};

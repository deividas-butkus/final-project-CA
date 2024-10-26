import { useContext } from "react";
import ThemesContext from "../contexts/ThemesContext";

export const useTheme = () => {
  const context = useContext(ThemesContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemesProvider");
  }
  return context;
};

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ThemesProvider as CustomThemesProvider } from "./contexts/ThemesContext";
import RootApp from "./RootApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomThemesProvider>
      <RootApp />
    </CustomThemesProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ThemeProvider as CustomThemeProvider } from "./contexts/ThemeProvider";
import RootApp from "./RootApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomThemeProvider>
      <RootApp />
    </CustomThemeProvider>
  </StrictMode>
);

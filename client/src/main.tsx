import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemesProvider as CustomThemesProvider } from "./contexts/ThemesContext";
import RootApp from "./RootApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CustomThemesProvider>
        <RootApp />
      </CustomThemesProvider>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemesProvider as CustomThemesProvider } from "./contexts/themes/ThemesContext";
import RootApp from "./RootApp";
import { UsersProvider } from "./contexts/users/UsersContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <CustomThemesProvider>
          <RootApp />
        </CustomThemesProvider>
      </UsersProvider>
    </BrowserRouter>
  </StrictMode>
);

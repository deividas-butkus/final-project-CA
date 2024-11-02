import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemesProvider as CustomThemesProvider } from "./contexts/themes/ThemesContext";
import RootApp from "./RootApp";
import { UsersProvider } from "./contexts/users/UsersContext";
import { ChatsProvider } from "./contexts/chats/ChatsContext";
import { MessagesProvider } from "./contexts/messages/MessagesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <ChatsProvider>
          <MessagesProvider>
            <CustomThemesProvider>
              <RootApp />
            </CustomThemesProvider>
          </MessagesProvider>
        </ChatsProvider>
      </UsersProvider>
    </BrowserRouter>
  </StrictMode>
);

import { useContext } from "react";

import ChatsContext from "./ChatsContext";
import { ChatsContextType } from "../../types/ChatsTypes";

export const useChatsContext = (): ChatsContextType => {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error("useChatsContext must be used within a ChatsProvider");
  }
  return context;
};

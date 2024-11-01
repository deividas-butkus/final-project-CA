import { useContext } from "react";

import MessagesContext from "./MessagesContext";
import { MessagesContextType } from "./messagesTypes";

export const useMessagesContext = (): MessagesContextType => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error(
      "useMessagesContext must be used within a MessagesProvider"
    );
  }
  return context;
};

import { createContext, useReducer, useEffect } from "react";

import { messagesReducer } from "./messagesReducer";
import { MessagesContextType } from "./messagesTypes";

type MessagesProviderProps = {
  children: React.ReactNode;
};

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const initialState = { messages: [] };
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_MESSAGES", payload: data });
      } else {
        console.error("Failed to fetch messages:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        dispatch,
        messages: state.messages,
        fetchMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;

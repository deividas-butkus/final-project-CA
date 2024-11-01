import { createContext, useReducer, useEffect } from "react";
import { chatsReducer } from "./chatsReducer";
import { ChatsContextType } from "./chatsTypes";

type ChatsProviderProps = {
  children: React.ReactNode;
};

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

export const ChatsProvider = ({ children }: ChatsProviderProps) => {
  const initialState = { chats: [] };
  const [state, dispatch] = useReducer(chatsReducer, initialState);

  const fetchChats = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_CHATS", payload: data });
      } else {
        console.error("Failed to fetch chats:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <ChatsContext.Provider
      value={{
        dispatch,
        chats: state.chats,
        fetchChats,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContext;

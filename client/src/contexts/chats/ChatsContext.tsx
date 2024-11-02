import { createContext, useReducer, useEffect } from "react";
import { chatsReducer } from "./chatsReducer";
import { Chat, ChatsContextType } from "../../types/ChatsTypes";

type ChatsProviderProps = {
  children: React.ReactNode;
};

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

export const ChatsProvider = ({ children }: ChatsProviderProps) => {
  const initialState: { chats: Chat[]; selectedChat: Chat | null } = {
    chats: [],
    selectedChat: null,
  };
  const [state, dispatch] = useReducer(chatsReducer, initialState);

  const fetchChatsSummary = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/chats/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_CHATS_SUMMARY", payload: data });
      } else {
        console.error("Failed to fetch chats:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChatsSummary();
  }, []);

  const fetchChatById = async (chatId: Chat["_id"]) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`/api/chats/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_SELECTED_CHAT", payload: data });
      } else {
        console.error(`Failed to fetch chat ${chatId}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error fetching chat ${chatId}:`, error);
    }
  };

  return (
    <ChatsContext.Provider
      value={{
        dispatch,
        chats: state.chats,
        selectedChat: state.selectedChat,
        fetchChatsSummary,
        fetchChatById,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContext;

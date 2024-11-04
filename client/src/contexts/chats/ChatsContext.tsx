import { createContext, useReducer, useEffect, useCallback } from "react";
import { chatsReducer } from "./chatsReducer";
import { Chat, ChatsContextType } from "../../types/ChatsTypes";
import { Message } from "../../types/MessagesTypes";
import { User } from "../../types/UsersTypes";

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

  const getOrCreateChat = async (
    members: Chat["members"]
  ): Promise<Chat | null> => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch(`/api/chats/chat/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ members }),
      });

      if (response.ok) {
        const data: Chat = await response.json();
        dispatch({ type: "SET_SELECTED_CHAT", payload: data });
        // Add new chat to the chats array
        dispatch({
          type: "SET_CHATS_SUMMARY",
          payload: [...state.chats, data],
        });
        return data;
      } else {
        console.error("Failed to fetch or create chat:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching or creating chat:", error);
      return null;
    }
  };

  const fetchChatById = useCallback(async (chatId: Chat["_id"]) => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch(`/api/chats/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Chat = await response.json();
        dispatch({ type: "SET_SELECTED_CHAT", payload: data });
        return data;
      } else {
        console.error("Failed to fetch chat by ID:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching chat by ID:", error);
      return null;
    }
  }, []);

  const refetchSelectedChat = async (chatId: Chat["_id"]) => {
    // Force re-fetch and update selected chat
    await fetchChatById(chatId);
  };

  const addMessage = async (
    chatId: Chat["_id"],
    content: Message["content"],
    userId: User["_id"]
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`/api/messages/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId, content, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add message");
      }

      const newMessage = await response.json();
      dispatch({
        type: "ADD_MESSAGE",
        payload: { chatId, message: newMessage },
      });
    } catch (error) {
      console.error("Error in addMessage:", error);
    }
  };

  const deleteChat = async (chatId: Chat["_id"]) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`/api/chats/chat/delete/${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      dispatch({ type: "DELETE_CHAT", payload: { chatId } });
    } catch (error) {
      console.error("Error in deleteChat", error);
    }
  };

  return (
    <ChatsContext.Provider
      value={{
        dispatch,
        chats: state.chats,
        selectedChat: state.selectedChat,
        fetchChatsSummary,
        getOrCreateChat,
        fetchChatById,
        refetchSelectedChat,
        addMessage,
        deleteChat,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContext;

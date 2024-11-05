import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { chatsReducer } from "./chatsReducer";
import { Chat, ChatsContextType, Action } from "../../types/ChatsTypes";
import { Message } from "../../types/MessagesTypes";
import { User } from "../../types/UsersTypes";
import { useUsersContext } from "../users/useUsersContext";

type ChatsProviderProps = {
  children: React.ReactNode;
};

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

async function setLastSeenHelper(
  chatId: Chat["_id"],
  currentUser: User | null,
  dispatch: React.Dispatch<Action>,
  updateSelectedChat: () => Promise<void>
): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token || !currentUser?._id) return;

  try {
    const response = await fetch(`/api/chats/chat/${chatId}/lastSeen`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: currentUser._id }),
    });

    if (!response.ok) {
      throw new Error("Failed to update last seen timestamp");
    }

    dispatch({
      type: "UPDATE_LAST_SEEN",
      payload: {
        chatId,
        userId: currentUser._id,
        timestamp: new Date().toISOString(),
      },
    });

    await updateSelectedChat();
  } catch (error) {
    console.error("Error updating last seen timestamp:", error);
  }
}

export const ChatsProvider = ({ children }: ChatsProviderProps) => {
  const initialState = { chats: [], selectedChat: null };
  const { currentUser } = useUsersContext();
  const [state, dispatch] = useReducer(chatsReducer, initialState);

  const fetchChatById = useCallback(
    async (chatId: Chat["_id"]): Promise<Chat | null> => {
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
    },
    [dispatch]
  );

  const refetchSelectedChat = useCallback(
    async (chatId: Chat["_id"]): Promise<void> => {
      await fetchChatById(chatId);
    },
    [fetchChatById]
  );

  const fetchChatsSummary = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/chats/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: Chat[] = await response.json();
        console.log("Fetched chat data:", data);

        dispatch({ type: "SET_CHATS_SUMMARY", payload: data });
      } else {
        console.error("Failed to fetch chats:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("Chats in context after update:", state.chats);
  }, [state.chats]);

  const debouncedFetchChatsSummary = useMemo(
    () => debounce(fetchChatsSummary, 500),
    [fetchChatsSummary]
  );

  useEffect(() => {
    debouncedFetchChatsSummary();
  }, [debouncedFetchChatsSummary]);

  const setLastSeen = useCallback(
    async (chatId: Chat["_id"]) => {
      await setLastSeenHelper(chatId, currentUser, dispatch, () =>
        refetchSelectedChat(chatId)
      );
    },
    [currentUser, dispatch, refetchSelectedChat]
  );

  const getOrCreateChat = useCallback(
    async (members: Chat["members"]): Promise<Chat | null> => {
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
    },
    [state.chats]
  );

  const addMessage = useCallback(
    async (
      chatId: Chat["_id"],
      content: Message["content"],
      userId: User["_id"]
    ): Promise<void> => {
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

        const newMessage: Message = await response.json();
        dispatch({
          type: "ADD_MESSAGE",
          payload: { chatId, message: newMessage },
        });
      } catch (error) {
        console.error("Error in addMessage:", error);
      }
    },
    []
  );

  const deleteChat = useCallback(async (chatId: Chat["_id"]): Promise<void> => {
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
  }, []);

  return (
    <ChatsContext.Provider
      value={{
        dispatch,
        chats: state.chats,
        selectedChat: state.selectedChat,
        fetchChatsSummary,
        setLastSeen,
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

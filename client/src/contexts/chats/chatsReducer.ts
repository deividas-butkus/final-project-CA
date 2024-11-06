import { Action, Chat } from "../../types/ChatsTypes";
import { Message } from "../../types/MessagesTypes";
import { User } from "../../types/UsersTypes";

type State = {
  chats: Chat[];
  selectedChat: Chat | null;
};

export const chatsReducer = (state: State, action: Action): State => {
  const reducers: Record<string, () => State> = {
    SET_SELECTED_CHAT: () => {
      if ("payload" in action) {
        return { ...state, selectedChat: action.payload as Chat };
      }
      return state;
    },
    SET_CHATS_SUMMARY: () => {
      if ("payload" in action) {
        return {
          ...state,
          chats: Array.isArray(action.payload) ? action.payload : [],
        };
      }
      return state;
    },
    ADD_MESSAGE: () => {
      if (
        state.selectedChat &&
        state.selectedChat._id ===
          (action.payload as { chatId: Chat["_id"]; message: Message }).chatId
      ) {
        return {
          ...state,
          selectedChat: {
            ...state.selectedChat,
            messages: [
              ...(state.selectedChat.messages || []),
              (action.payload as { chatId: Chat["_id"]; message: Message })
                .message,
            ],
          },
        };
      }
      return state;
    },
    DELETE_CHAT: () => ({
      ...state,
      chats: state.chats.filter(
        (chat) => chat._id !== (action.payload as { chatId: string }).chatId
      ),
    }),
    UPDATE_LAST_SEEN: () => {
      if ("payload" in action) {
        const { chatId, userId, timestamp } = action.payload as {
          chatId: Chat["_id"];
          userId: string;
          timestamp: string;
        };

        return {
          ...state,
          chats: state.chats.map((chat) =>
            chat._id === chatId
              ? {
                  ...chat,
                  lastSeen: {
                    ...(chat.lastSeen || {}),
                    [userId]: timestamp,
                  },
                }
              : chat
          ),
        };
      }
      return state;
    },
    UPDATE_LIKE: () => {
      if ("payload" in action) {
        const { messageId, userId } = action.payload as {
          messageId: Message["_id"];
          userId: User["_id"];
        };

        return {
          ...state,
          chats: state.chats.map((chat) => ({
            ...chat,
            messages: chat.messages?.map((message) =>
              message._id === messageId
                ? {
                    ...message,
                    likedUserId: message.likedUserId === userId ? "" : userId,
                  }
                : message
            ),
          })),
        };
      }
      return state;
    },
  };

  return reducers[action.type] ? reducers[action.type]() : state;
};

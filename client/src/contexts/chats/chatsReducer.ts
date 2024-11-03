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
          (action.payload as { chatId: User["_id"]; message: Message }).chatId
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
  };

  // Default state return if action type does not match any case
  return reducers[action.type] ? reducers[action.type]() : state;
};

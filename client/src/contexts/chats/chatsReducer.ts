import { Action, Chat } from "../../types/ChatsTypes";

export const chatsReducer = (
  state: { chats: Chat[]; selectedChat: Chat | null },
  action: Action
) => {
  switch (action.type) {
    case "SET_CHATS_SUMMARY":
      return { ...state, chats: action.payload };
    case "SET_SELECTED_CHAT":
      return { ...state, selectedChat: action.payload };
    default:
      return state;
  }
};

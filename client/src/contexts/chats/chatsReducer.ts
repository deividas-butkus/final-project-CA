import { Action, Chat } from "./chatsTypes";

export const chatsReducer = (state: { chats: Chat[] }, action: Action) => {
  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chats: action.payload };
    default:
      return state;
  }
};

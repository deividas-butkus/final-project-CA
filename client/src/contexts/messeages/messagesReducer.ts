import { Action, Message } from "./messagesTypes";

export const messagesReducer = (
  state: { messages: Message[] },
  action: Action
) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};

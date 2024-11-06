import { Chat } from "./ChatsTypes";
import { User } from "./UsersTypes";

export type MessagesContextType = {
  messages: Message[];
  dispatch: React.Dispatch<Action>;
  fetchMessages: () => Promise<void>;
};

export type Message = {
  _id: string;
  chatId: Chat["_id"][];
  userId: User["_id"];
  content: string;
  likedUserId: User["_id"];
  createdAt: string;
};

export type Action = { type: "SET_MESSAGES"; payload: Message[] };

export type MessageData = {
  chatId: Chat["_id"];
  message: Message;
};

export type LikeData = {
  messageId: Message["_id"];
  userId: User["_id"];
};

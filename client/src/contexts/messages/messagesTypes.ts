import { Chat } from "../chats/chatsTypes";
import { User } from "../users/usersTypes";

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
  isRead: boolean;
  createdAt: string;
};

export type Action = { type: "SET_MESSAGES"; payload: Message[] };

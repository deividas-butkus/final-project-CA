import { Message } from "../messeages/messagesTypes";
import { User } from "../users/usersTypes";

export type ChatsContextType = {
  chats: Chat[];
  dispatch: React.Dispatch<Action>;
  fetchChats: () => Promise<void>;
};

export type Chat = {
  _id: User["_id"];
  members: User["_id"][];
  memberDetails: User[];
  lastMessage: {
    content: Message["content"];
    isRead: Message["isRead"];
    createdAt: Message["createdAt"];
  };
  unreadCount: number;
};

export type Action = { type: "SET_CHATS"; payload: Chat[] };

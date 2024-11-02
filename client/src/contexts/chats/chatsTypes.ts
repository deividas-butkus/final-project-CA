import { Message } from "../messages/messagesTypes";
import { User } from "../users/usersTypes";

export type ChatsContextType = {
  chats: Chat[];
  dispatch: React.Dispatch<Action>;
  selectedChat: Chat | null;
  fetchChatsSummary: () => Promise<void>;
  fetchChatById: (chatId: Chat["_id"]) => Promise<void>;
};

export type Chat = {
  _id: string;
  members: User["_id"][];
  memberDetails: User[];
  messages?: Message[];
  lastMessage: {
    content: Message["content"];
    isRead: Message["isRead"];
    createdAt: Message["createdAt"];
  };
  unreadCount: number;
};

export type Action =
  | { type: "SET_CHATS_SUMMARY"; payload: Chat[] }
  | { type: "SET_SELECTED_CHAT"; payload: Chat | null };

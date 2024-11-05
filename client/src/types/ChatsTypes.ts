import { Message } from "./MessagesTypes";
import { User } from "./UsersTypes";

export type ChatsContextType = {
  chats: Chat[];
  dispatch: React.Dispatch<Action>;
  selectedChat: Chat | null;
  fetchChatsSummary: () => Promise<void>;
  setLastSeen: (chatId: Chat["_id"]) => Promise<void>;
  getOrCreateChat: (members: Chat["members"]) => Promise<Chat | null>;
  fetchChatById: (chatId: Chat["_id"]) => Promise<Chat | null>;
  refetchSelectedChat: (chatId: Chat["_id"]) => Promise<void>;
  addMessage: (
    chatId: Chat["_id"],
    content: Message["content"],
    userId: User["_id"]
  ) => Promise<void>;
  deleteChat: (chatId: Chat["_id"]) => Promise<void>;
};

export type Chat = {
  _id: string;
  members: User["_id"][];
  memberDetails: User[];
  messages?: Message[];
  lastMessage: {
    content: Message["content"];
    createdAt: Message["createdAt"];
  };
  lastSeen?: Record<User["_id"], string>;
  unreadCount: number;
};

export type Action =
  | { type: "SET_CHATS_SUMMARY"; payload: Chat[] }
  | { type: "SET_SELECTED_CHAT"; payload: Chat }
  | {
      type: "ADD_MESSAGE";
      payload: { chatId: Chat["_id"]; message: Message };
    }
  | { type: "DELETE_CHAT"; payload: { chatId: Chat["_id"] } }
  | {
      type: "UPDATE_LAST_SEEN";
      payload: { chatId: Chat["_id"]; userId: User["_id"]; timestamp: string };
    };

import { User } from "../users/usersTypes";

export type ChatsContextType = {
  chats: Chat[];
  dispatch: React.Dispatch<Action>;
  fetchChats: () => Promise<void>;
};

export type Chat = {
  _id: string;
  members: User["_id"][];
};

export type Action = { type: "SET_CHATS"; payload: Chat[] };

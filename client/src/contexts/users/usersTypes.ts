export type UsersContextType = {
  users: User[];
  currentUser: User | null;
  dispatch: React.Dispatch<Action>;
  addUser: (user: FormData) => Promise<void>;
  login: (credentials: { username: string; password: string }) => Promise<void>;
};

export type User = {
  _id: string;
  username: string;
  password: string;
  profileImage: string;
};

export type RegisterFormData = Omit<User, "_id">;

export type UsersState = {
  users: User[];
  currentUser: User | null;
};

export type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "LOGIN"; payload: User };

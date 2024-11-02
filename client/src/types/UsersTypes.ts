export type UsersContextType = {
  users: User[];
  currentUser: User | null;
  dispatch: React.Dispatch<Action>;
  fetchUsers: () => Promise<void>;
  fetchUserById: (userId: User["_id"]) => Promise<User | null>;
  addUser: (user: FormData) => Promise<void>;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  updateUsername: (newUsername: string) => Promise<void>;
  updateProfileImage: (file: File) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  logout: () => void;
};

export type User = {
  _id: string;
  username: string;
  password: string;
  profileImage?: string;
};

export type RegisterFormData = Omit<User, "_id">;

export type UsersState = {
  users: User[];
  currentUser: User | null;
};

export type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "FETCH_USER_BY_ID"; payload: User }
  | { type: "ADD_USER"; payload: User }
  | { type: "LOGIN"; payload: User }
  | { type: "UPDATE_USERNAME"; payload: string }
  | { type: "UPDATE_PROFILE_IMAGE"; payload: string }
  | { type: "UPDATE_PASSWORD" }
  | { type: "LOGOUT" }
  | { type: "CLEAR_USERS" };

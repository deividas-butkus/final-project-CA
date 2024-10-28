export type User = {
  _id: string;
  username: string;
  password: string;
  profileImage: string;
};

export type RegisterFormData = Omit<User, "_id">;

export type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "LOGIN"; payload: User };

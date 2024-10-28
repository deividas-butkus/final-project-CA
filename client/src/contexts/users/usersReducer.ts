import { Action, UsersState } from "./usersTypes";

export const usersReducer = (state: UsersState, action: Action): UsersState => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

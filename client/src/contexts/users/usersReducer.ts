import { User, Action } from "./usersTypes";

export const usersReducer = (state: User[], action: Action): User[] => {
  switch (action.type) {
    case "SET_USERS":
      return action.payload;
    case "ADD_USER":
      return [...state, action.payload];
    case "LOGIN":
      return [action.payload];
    default:
      return state;
  }
};

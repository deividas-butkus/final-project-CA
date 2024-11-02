import { Action, UsersState } from "../../types/UsersTypes";

export const usersReducer = (state: UsersState, action: Action): UsersState => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "FETCH_USER_BY_ID":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "UPDATE_USERNAME":
      return {
        ...state,
        currentUser: state.currentUser
          ? { ...state.currentUser, username: action.payload }
          : null,
      };
    case "UPDATE_PROFILE_IMAGE":
      return {
        ...state,
        currentUser: state.currentUser
          ? { ...state.currentUser, profileImage: action.payload }
          : null,
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        currentUser: state.currentUser ? { ...state.currentUser } : null,
      };
    case "LOGOUT":
      return { ...state, currentUser: null };
    case "CLEAR_USERS":
      return { ...state, users: [] };
    default:
      return state;
  }
};

import { useContext } from "react";

import UsersContext from "./UsersContext";
import { UsersContextType } from "../../types/UsersTypes";

export const useUsersContext = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};

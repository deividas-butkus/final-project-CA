import { createContext, useReducer, useEffect } from "react";

import { UsersContextType, User, UsersState } from "./usersTypes";
import { usersReducer } from "./usersReducer";

type UsersProviderProps = {
  children: React.ReactNode;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const initialState: UsersState = {
    users: [],
    currentUser: null,
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // Exit if there's no token

      try {
        const response = await fetch("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "SET_USERS", payload: data });
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("/api/users/current", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData: User = await response.json();
            dispatch({ type: "LOGIN", payload: userData });
          }
        } catch (error) {
          console.error("Failed to restore session:", error);
        }
      }
    };

    fetchUsers();
    restoreSession();
  }, []);

  const addUser = async (formData: FormData) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });
      const newUser: User = await response.json();
      dispatch({ type: "ADD_USER", payload: newUser });
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      console.log("Attempting login with credentials:", credentials);

      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const { token, ...userData } = await response.json();
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: userData });
    } catch (err) {
      console.error("Failed to login:", err);
      throw err;
    }
  };

  return (
    <UsersContext.Provider
      value={{
        dispatch,
        users: state.users,
        currentUser: state.currentUser,
        addUser,
        login,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

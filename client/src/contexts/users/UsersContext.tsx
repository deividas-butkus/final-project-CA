import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is correctly imported as a default export
import useExpirationTimer from "../../utils/useExpirationTimer"; // Adjust path if necessary
import TokenExpirationTimer from "../../components/atoms/TokenExpirationTimer";
import { UsersContextType, User, UsersState } from "../../types/UsersTypes";
import { usersReducer } from "./usersReducer";

type UsersProviderProps = {
  children: React.ReactNode;
};

// Define DecodedToken interface to avoid 'any' type
interface DecodedToken {
  userId: string;
  exp: number;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const initialState: UsersState = {
    users: [],
    currentUser: null,
  };
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const [sessionRestored, setSessionRestored] = useState(false);
  const [usersFetched, setUsersFetched] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  const navigate = useNavigate();

  // Apply useExpirationTimer with token expiration time
  useExpirationTimer(tokenExpiration);

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || usersFetched) return;

    try {
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_USERS", payload: data });
        setUsersFetched(true);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [usersFetched]);

  const restoreSession = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || sessionRestored) return;

    try {
      const response = await fetch("/api/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData: User = await response.json();
        dispatch({ type: "LOGIN", payload: userData });
        setSessionRestored(true);

        // Decode token to get expiration and set it
        const decodedToken: DecodedToken = jwtDecode(token);
        setTokenExpiration(decodedToken.exp * 1000); // Convert exp to ms
      }
    } catch (error) {
      console.error("Failed to restore session:", error);
    }
  }, [sessionRestored]);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    if (sessionRestored) {
      fetchUsers();
    }
  }, [sessionRestored, fetchUsers]);

  const fetchUserById = async (userId: User["_id"]): Promise<User | null> => {
    const response = await fetch(`/api/users/user/${userId}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  };

  const addUser = async (formData: FormData) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to register");

      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      if (!username || !password) {
        throw new Error("Username or password is missing for login");
      }

      await login({ username, password });
    } catch (err) {
      console.error("Failed to register and log in user:", err);
      throw err;
    }
  };

  const checkUsernameAvailability = async (username: User["username"]) => {
    try {
      const response = await fetch(
        `/api/users/checkUsername?username=${username}`
      );
      if (!response.ok)
        throw new Error("Failed to check username availability");
      const data = await response.json();
      return !data.exists;
    } catch (error) {
      console.error("Error checking username availability:", error);
      return false;
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
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
      const { token, user } = await response.json();
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: user });

      // Decode token to set expiration
      const decodedToken: DecodedToken = jwtDecode(token);
      setTokenExpiration(decodedToken.exp * 1000); // Set expiration in ms

      await fetchUsers();
    } catch (err) {
      console.error("Failed to login:", err);
      throw err;
    }
  };

  const updateUsername = async (newUsername: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users/updateUsername", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });
      if (!response.ok) throw new Error("Failed to update username");

      dispatch({ type: "UPDATE_USERNAME", payload: newUsername });
    } catch (err) {
      console.error("Failed to update username:", err);
    }
  };

  const updateProfileImage = async (file: File | null) => {
    try {
      const token = localStorage.getItem("token");

      if (file === null) {
        const response = await fetch("/api/users/resetProfileImage", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to reset profile image");

        dispatch({
          type: "UPDATE_PROFILE_IMAGE",
          payload: "/uploads/defaultProfileImage.png",
        });
        return;
      }

      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await fetch("/api/users/updateProfileImage", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update profile image");

      const updatedUser: User = await response.json();
      dispatch({
        type: "UPDATE_PROFILE_IMAGE",
        payload: updatedUser.profileImage || "",
      });
    } catch (err) {
      console.error("Failed to update profile image:", err);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users/updatePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!response.ok) throw new Error("Failed to update password");

      dispatch({ type: "UPDATE_PASSWORD" });
    } catch (err) {
      console.error("Failed to update password:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setTokenExpiration(null);
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_USERS" });
    setUsersFetched(false);
    navigate("/");
  };

  return (
    <UsersContext.Provider
      value={{
        dispatch,
        users: state.users,
        currentUser: state.currentUser,
        fetchUsers,
        fetchUserById,
        addUser,
        checkUsernameAvailability,
        login,
        updateUsername,
        updateProfileImage,
        updatePassword,
        logout,
        tokenExpiration,
      }}
    >
      {children}
      <TokenExpirationTimer token={tokenExpiration} />
    </UsersContext.Provider>
  );
};

export default UsersContext;

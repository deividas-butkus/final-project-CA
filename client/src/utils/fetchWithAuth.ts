import { NavigateFunction } from "react-router-dom";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  navigate: NavigateFunction
) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (response.status === 401) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else if (!response.ok) {
      throw new Error("An error occurred");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

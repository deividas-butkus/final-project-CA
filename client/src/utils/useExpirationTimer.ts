import { useEffect } from "react";

const useExpirationTimer = (expirationTime: number | null) => {
  useEffect(() => {
    if (expirationTime === null) return; // Handle the null case

    const timeUntilExpiration = expirationTime - Date.now();
    const warningTime = timeUntilExpiration - 10 * 60 * 1000;

    if (warningTime > 0) {
      const timer = setTimeout(() => {}, warningTime);
      return () => clearTimeout(timer); // Clear timer on component unmount
    }
  }, [expirationTime]);
};

export default useExpirationTimer;

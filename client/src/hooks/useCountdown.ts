import { useEffect, useState } from "react";

const useCountdown = (expirationTime: number | null) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    if (expirationTime === null) return;

    const updateRemainingTime = () => {
      const now = Date.now();
      const timeLeft = expirationTime - now;

      if (timeLeft > 0) {
        setRemainingTime(Math.floor(timeLeft / 1000)); // Convert to seconds
      } else {
        setRemainingTime(0);
      }
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [expirationTime]);

  return remainingTime;
};

export default useCountdown;

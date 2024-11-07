import useCountdown from "../../hooks/useCountdown";

type TokenExpirationTimerProps = {
  token: number | null;
};

const TokenExpirationTimer = ({ token }: TokenExpirationTimerProps) => {
  const remainingTime = useCountdown(token);

  if (remainingTime === null) return null;
  if (remainingTime === 0) return <p>Session expired. Please log in again.</p>;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      <p>
        Session expires in: {minutes}m {seconds}s
      </p>
    </div>
  );
};

export default TokenExpirationTimer;

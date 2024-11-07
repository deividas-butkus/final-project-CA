import styled from "styled-components";
import useCountdown from "../../hooks/useCountdown";

const StyledParagraph = styled.p`
  margin: 0%;
  padding: 7px 10%;
  font-size: 0.8rem;
  text-align: end;
  color: ${({ theme }) => theme.text};
  @media (min-width: 950px) {
    & {
      padding: 7px 20%;
    }
  }
`;

type TokenExpirationTimerProps = {
  token: number | null;
};

const TokenExpirationTimer = ({ token }: TokenExpirationTimerProps) => {
  const remainingTime = useCountdown(token);

  if (remainingTime === null) return null;
  if (remainingTime === 0)
    return (
      <StyledParagraph>Session expired. Please log in again.</StyledParagraph>
    );

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      <StyledParagraph>
        Session expires in: {minutes}m {seconds}s
      </StyledParagraph>
    </div>
  );
};

export default TokenExpirationTimer;

import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

import TokenExpirationTimer from "../atoms/TokenExpirationTimer";
import { useUsersContext } from "../../contexts/users/useUsersContext";
import { Link } from "react-router-dom";

const StyledFooter = styled.footer`
  min-height: 5vh;
  background-color: #3a5b68;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding-top: 0.5rem;
  ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
  }
  p {
    margin: 0;
  }
  > div {
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
      }
    }
    margin: 0.5rem 0;
  }
  > div.privacyAndTC {
    display: flex;
    gap: 0.625rem;
  }
  > div.social {
    display: flex;
    gap: 0.625rem;
    margin: 0.5rem 0;
  }
`;

const Footer = () => {
  const { tokenExpiration } = useUsersContext();

  return (
    <>
      <TokenExpirationTimer token={tokenExpiration} />
      <StyledFooter>
        <div>
          <p>Let's Chat, Inc. &copy; {new Date().getFullYear()}</p>
        </div>
        <div className="privacyAndTC">
          <Link to={"/policies/privacy"}>
            <p>Privacy policy</p>
          </Link>
          <Link to={"/policies/t&c"}>
            <p>T&C</p>
          </Link>
        </div>
        <div className="social">
          <a href="https://www.facebook.com/">
            <FacebookIcon />
          </a>
          <a href="https://www.youtube.com/">
            <YouTubeIcon />
          </a>
          <a href="https://www.instagram.com/">
            <InstagramIcon />
          </a>
        </div>
      </StyledFooter>
    </>
  );
};
export default Footer;

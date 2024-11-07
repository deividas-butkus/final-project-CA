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
  justify-content: space-between;
  align-items: top;
  > div {
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
      }
    }
  }
  > div.privacyAndTC {
    display: flex;
    gap: 10px;
  }
  > div.social {
    display: flex;
    gap: 10px;
    margin-top: 16px;
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

import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
  min-height: 10vh;
  background-color: #ccc;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: top;
  > div {
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: #039ed7;
      }
    }
  }
  > div.social {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p>Let's Chat, Inc.</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
      <div>
        <p>
          <Link to={"/policies/privacy"}>Privacy</Link>
        </p>
        <p>
          <Link to={"/policies/terms"}>Terms</Link>
        </p>
      </div>
      <div className="social">
        <a href="https://www.facebook.com/">Facebook</a>
        <a href="https://www.youtube.com/">YouTube</a>
        <a href="https://www.instagram.com/">Instagram</a>
      </div>
    </StyledFooter>
  );
};
export default Footer;

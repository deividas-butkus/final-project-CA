import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: 0 5%;
  min-height: 5vh;
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
  return (
    <StyledFooter>
      <div>
        <p>Let's Chat, Inc. &copy; {new Date().getFullYear()}</p>
      </div>
      <div className="privacyAndTC">
        <p>Privacy</p>
        <p>T&C</p>
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

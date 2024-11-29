import styled from "styled-components";
import { Link } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";

import hero from "../../../assets/hero.webp";

const StyledSection = styled.section`
  > div.heroImg {
    padding-top: 2rem;
    width: 100%;
    aspect-ratio: 16/9;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > img {
      width: 80%;
      ${({ theme }) => theme.media.mobile} {
        width: 60%;
      }
      ${({ theme }) => theme.media.tablet} {
        width: 50%;
      }
      height: auto;
      border-radius: 15px;
      box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
    }
  }
  > h1 {
    font-weight: 200;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;
  }
  > div.entryBoxesContainer {
    display: flex;
    justify-content: center;
    gap: 1rem;
    > div.entryBox {
      height: auto;
      width: 9.5rem;
      border-radius: 0.625rem;
      padding: 0.625rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      > div {
        > a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      }

      &.login {
        background-color: #24304f;
        box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
        color: #8de5f2;
        > div {
          > a {
            color: #8de5f2;
          }
        }
      }
      &.register {
        background-color: #64f1f0;
        box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
        color: #24304f;
        > div {
          > a {
            color: #24304f;
          }
        }
      }
      > p {
        margin: 0;
        margin-bottom: 10px;
        font-size: 0.9rem;
      }
      svg {
        font-size: larger;
      }
    }
  }
`;

const Landing = () => {
  return (
    <StyledSection>
      <div className="heroImg">
        <img src={hero} alt="People chatting" />
      </div>
      <h1>where ideas spark and stories bloom</h1>
      <div className="entryBoxesContainer">
        <div className="entryBox login">
          <p>Already a member?</p>
          <div>
            <Link to="/login">
              Log In
              <LoginIcon />
            </Link>
          </div>
        </div>
        <div className="entryBox register">
          <p>New to Let's Chat?</p>
          <div>
            <Link to="/register">
              Register
              <HowToRegIcon />
            </Link>
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

export default Landing;

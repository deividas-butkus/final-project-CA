import styled from "styled-components";

import hero from "../../../assets/hero.webp";

const StyledSection = styled.section`
  > div.heroImg {
    height: 250px;
    display: flex;
    justify-content: space-around;
    > img {
      height: 100%;
      border-radius: 10px;
      box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
    }
  }
  > h1 {
    font-weight: 200;
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 30px;
  }
  > div.entryBoxesContainer {
    display: flex;
    justify-content: center;
    gap: 20px;
    > div.entryBox {
      height: 100px;
      width: 150px;
      border-radius: 5px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.login {
        background-color: #24304f;
        box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
        color: #8de5f2;
      }
      &.register {
        background-color: #64f1f0;
        box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
        color: #24304f;
      }
      > p {
        margin: 0;
        font-size: 0.9rem;
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
          <p>Log In</p>
        </div>
        <div className="entryBox register">
          <p>New to Lets's Chat?</p>
          <p>Register</p>
        </div>
      </div>
    </StyledSection>
  );
};

export default Landing;

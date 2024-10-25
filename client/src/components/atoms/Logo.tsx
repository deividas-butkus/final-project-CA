import styled from "styled-components";

import logo from "../../assets/logo.png";

const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  > img {
    height: 100%;
  }
`;

const Logo = () => {
  return (
    <StyledDiv>
      <img src={logo} alt="Let's Chat logo" />
    </StyledDiv>
  );
};

export default Logo;

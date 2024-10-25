import styled from "styled-components";

import logo from "../../assets/logo.png";

const StyledDiv = styled.div`
  height: 100%;
  > img {
    height: 90%;
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

import styled from "styled-components";

const StyledHeader = styled.header`
  border: 1px solid #fff;
  height: 60px;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

import Logo from "../atoms/Logo";
import NavBar from "../molecules/NavBar";
import UserNavBox from "../molecules/UsrNavBox";

const Haeder = () => {
  return (
    <StyledHeader>
      <Logo />
      <NavBar />
      <UserNavBox />
    </StyledHeader>
  );
};

export default Haeder;

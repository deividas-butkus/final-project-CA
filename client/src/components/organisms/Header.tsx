import styled from "styled-components";

import Logo from "../atoms/Logo";
import NavBar from "../molecules/NavBar";
import UserNavBox from "../molecules/UserNavBox";
import ThemeToggler from "../molecules/ThemeToggler";

const StyledHeader = styled.header`
  height: 100px;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Haeder = () => {
  return (
    <StyledHeader>
      <Logo />
      <NavBar />
      <UserNavBox />
      <ThemeToggler />
    </StyledHeader>
  );
};

export default Haeder;

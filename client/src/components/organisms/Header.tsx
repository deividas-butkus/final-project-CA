import styled from "styled-components";
import { useMediaQuery } from "@mui/material";

import { useUsersContext } from "../../contexts/users/useUsersContext";
import Logo from "../atoms/Logo";
import NavBar from "../molecules/NavBar";
import UserNavBox from "../molecules/UserNavBox";
import BurgerMenu from "./BurgerMenu";

const StyledHeader = styled.header`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #5b5c5c;
`;

const Header = () => {
  const { currentUser } = useUsersContext();
  const isNotMobile = useMediaQuery("(min-width: 576px)");

  return (
    <StyledHeader>
      <Logo />
      {currentUser && (
        <>
          {isNotMobile && <NavBar />}
          {isNotMobile && <UserNavBox />}
          {!isNotMobile && <BurgerMenu />}
        </>
      )}
    </StyledHeader>
  );
};

export default Header;

import styled, { useTheme } from "styled-components";
import { useMediaQuery } from "@mui/material";

import { useUsersContext } from "../../contexts/users/useUsersContext";
import Logo from "../atoms/Logo";
import NavBar from "../molecules/NavBar";
import UserNavBox from "../molecules/UserNavBox";
import BurgerMenu from "./BurgerMenu";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  height: 4rem;
  ${({ theme }) => theme.media.mobile} {
    height: 5rem;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #5b5c5c;
  background-color: ${({ theme }) => theme.background};
  z-index: 1000;
`;

const Header = () => {
  const { currentUser } = useUsersContext();
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.media.mobile);

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

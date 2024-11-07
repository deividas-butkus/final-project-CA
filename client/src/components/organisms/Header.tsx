import styled from "styled-components";

import { useUsersContext } from "../../contexts/users/useUsersContext";
import Logo from "../atoms/Logo";
import NavBar from "../molecules/NavBar";
import UserNavBox from "../molecules/UserNavBox";

const StyledHeader = styled.header`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  const { currentUser } = useUsersContext();

  return (
    <StyledHeader>
      <Logo />
      {currentUser && (
        <>
          <NavBar />
          <UserNavBox />
        </>
      )}
    </StyledHeader>
  );
};

export default Header;

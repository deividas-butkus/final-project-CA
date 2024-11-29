import styled from "styled-components";

import NavLinks from "./NavLinks";

const StyledNav = styled.nav`
  display: flex;

  > ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.7rem;
  }
`;

const NavBar = () => {
  return (
    <StyledNav>
      <ul>
        <NavLinks />
      </ul>
    </StyledNav>
  );
};

export default NavBar;

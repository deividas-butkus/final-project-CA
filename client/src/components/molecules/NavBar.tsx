import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNav = styled.nav`
  display: flex;
  > ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    > li {
      list-style-type: none;
    }
  }
`;

const NavBar = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink to={"/user"}>My Profile</NavLink>
        </li>
        <li>Contacts</li>
        <li>Chats</li>
      </ul>
    </StyledNav>
  );
};

export default NavBar;

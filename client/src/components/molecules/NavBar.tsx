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

      a {
        font-weight: 300;
        color: inherit;
        text-decoration: none;
        display: inline-block;
        transition: transform 0.2s ease;
        &:hover {
          transform: scale(1.05);
        }
        &.active {
          color: ${({ theme }) => theme.accent};
          &:hover {
            transform: none;
          }
        }
      }
    }
  }
`;

const NavBar = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink
            to="/user"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contacts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contacts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chats"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Chats
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
};

export default NavBar;

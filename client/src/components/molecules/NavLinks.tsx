import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { useChatsContext } from "../../contexts/chats/useChatsContext";
import Counter from "../atoms/Counter";

const StyledLi = styled.li`
  position: relative;
  list-style-type: none;
  a {
    font-weight: 300;
    color: inherit;
    text-decoration: none;
    display: inline-block;
    color: ${({ theme }) => theme.accent};
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &.active {
      color: ${({ theme }) => theme.active};
      &:hover {
        transform: none;
      }
    }
  }
`;

const CounterWrapper = styled.div`
  position: absolute;
  top: -7px;
  right: -17px;
`;

const NavLinks = () => {
  const { chats } = useChatsContext();

  return (
    <>
      <StyledLi>
        <NavLink
          to="/user"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          My Profile
        </NavLink>
      </StyledLi>
      <StyledLi>
        <NavLink
          to="/contacts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contacts
        </NavLink>
      </StyledLi>
      <StyledLi>
        <NavLink
          to="/chats"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Chats
        </NavLink>
        {chats.length > 0 && (
          <CounterWrapper>
            <Counter count={chats.length} />
          </CounterWrapper>
        )}
      </StyledLi>
    </>
  );
};

export default NavLinks;

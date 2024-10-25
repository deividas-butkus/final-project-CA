import styled from "styled-components";

const StyledNav = styled.nav`
  border: 1px solid red;
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
        <li>My Profile</li>
        <li>Contacts</li>
        <li>Chats</li>
      </ul>
    </StyledNav>
  );
};

export default NavBar;

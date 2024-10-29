import styled from "styled-components";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import Avatar from "../atoms/Avatar";
import { useUsersContext } from "../../contexts/users/useUsersContext";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  div.username {
    color: ${({ theme }) => theme.accent};
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  padding: 0;
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
`;

const UserNavBox = () => {
  const { currentUser, logout } = useUsersContext();

  return (
    <StyledDiv>
      <div>
        <NavLink to="/user">
          <Avatar />
        </NavLink>
      </div>
      <div>
        <NavLink to="/user">
          <div className="username">{currentUser?.username}</div>
        </NavLink>
        <StyledButton onClick={logout}>
          <span>Logout</span>
          <LogoutIcon />
        </StyledButton>
      </div>
    </StyledDiv>
  );
};

export default UserNavBox;

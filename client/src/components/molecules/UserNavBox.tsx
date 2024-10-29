import styled from "styled-components";

import Avatar from "../atoms/Avatar";
import { useUsersContext } from "../../contexts/users/useUsersContext";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const UserNavBox = () => {
  const { currentUser } = useUsersContext();

  return (
    <StyledDiv>
      <div>
        <Avatar />
      </div>
      <div>
        <div>{currentUser?.username}</div>
        <div>Logout</div>
      </div>
    </StyledDiv>
  );
};

export default UserNavBox;

import styled from "styled-components";

import Avatar from "../atoms/Avatar";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const UserNavBox = () => {
  return (
    <StyledDiv>
      <div>
        <Avatar />
      </div>
      <div>
        <div>username</div>
        <div>Logout</div>
      </div>
    </StyledDiv>
  );
};

export default UserNavBox;

import styled from "styled-components";

import { useUsersContext } from "../../contexts/users/useUsersContext";
import { DEFAULT_USER_IMAGE, USER_IMAGE_ALT } from "../../config/constants";

const StyledDiv = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > img {
    background-color: #000;
    border-radius: 50%;
    object-fit: cover;
    height: 100%;
    width: 100%;
    box-shadow: 1px 1px 3px ${({ theme }) => theme.active};
    transition: background-color transform 0.2s;
    &:hover {
      background-color: ${({ theme }) => theme.accent};
      transform: scale(1.05);
    }
  }
`;

const Avatar = () => {
  const { currentUser } = useUsersContext();

  return (
    <StyledDiv>
      <img
        src={currentUser?.profileImage || DEFAULT_USER_IMAGE}
        alt={currentUser?.username || USER_IMAGE_ALT}
      />
    </StyledDiv>
  );
};

export default Avatar;

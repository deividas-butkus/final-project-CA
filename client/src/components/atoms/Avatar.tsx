import styled from "styled-components";

import defaultAvatarImg from "../../assets/userPhotos/defaultAvatarImg.png";

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
    transition: background-color 0.3s;
    &:hover {
      background-color: ${({ theme }) => theme.accent};
    }
  }
`;

const Avatar = () => {
  return (
    <StyledDiv>
      <img src={defaultAvatarImg} alt="Contact's photo" />
    </StyledDiv>
  );
};

export default Avatar;

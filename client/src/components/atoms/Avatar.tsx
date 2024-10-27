import styled from "styled-components";

// import defaultAvatarImg from "../../assets/defaultProfileImage.png";

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
    box-shadow: 1px 1px 3px ${({ theme }) => theme.accent};
    transition: background-color 0.3s;
    &:hover {
      background-color: ${({ theme }) => theme.accent};
    }
  }
`;

const Avatar = () => {
  return (
    <StyledDiv>
      {/* <img src={defaultProfileImage} alt="Contact's photo" /> */}
      <img
        src={
          "/uploads/profileImages/82c39380-5a70-48be-8f7f-723b7a725b2f-440px-Beelzebub.png"
        }
        alt="Belzebub"
      />
    </StyledDiv>
  );
};

export default Avatar;

import styled from "styled-components";
import { useUsersContext } from "../../contexts/users/useUsersContext";
import { User } from "../../types/UsersTypes";
import Button from "../atoms/Button";

const StyledArticle = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  height: 50px;
  box-shadow: 1px 1px 3px ${({ theme }) => theme.accent};
  border-radius: 5px;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
    > div {
      height: 100%;
      > img {
        height: 100%;
        min-width: 45px;
        object-fit: cover;
        object-position: center;
        border-radius: 3px;
      }
    }
    > span {
      color: ${({ theme }) => theme.accent};
      font-size: 0.8rem;
    }
  }
`;

type Props = {
  user: User;
};

const ContactCard = ({ user }: Props) => {
  const { currentUser } = useUsersContext();
  const defaultProfileImage = "/api/uploads/defaultProfileImage.png";

  return (
    <StyledArticle>
      <div>
        <div>
          <img
            src={`${
              user.profileImage || defaultProfileImage
            }?t=${new Date().getTime()}`} // Cache-busting parameter
            alt={`${user.username}'s profile`}
            onError={(e) => (e.currentTarget.src = defaultProfileImage)}
          />
        </div>
        <h3>{user.username}</h3>
        {currentUser?._id === user._id && <span>(You)</span>}
      </div>
      <Button>{currentUser?._id !== user._id ? "Chat" : "Store smth"}</Button>
    </StyledArticle>
  );
};

export default ContactCard;

import styled from "styled-components";
import { Link } from "react-router-dom";

import { useUsersContext } from "../../contexts/users/useUsersContext";
import { User } from "../../types/UsersTypes";

const StyledArticle = styled.article`
  width: 100%;
  ${({ theme }) => theme.media.tablet} {
    width: 80%;
  }
  > a {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 5px 10px;
    height: 3rem;
    box-shadow: 1px 1px 3px ${({ theme }) => theme.accent};
    border-radius: 5px;
    color: ${({ theme }) => theme.accent};
    > div:first-of-type {
      height: 100%;
      > img {
        height: 100%;
        width: 30px;
        min-width: 45px;
        object-fit: cover;
        object-position: center;
        border-radius: 3px;
      }
    }
    > div:last-of-type {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 100%;
      > span {
        color: ${({ theme }) => theme.active};
        font-size: 0.8rem;
      }
    }
  }
  > div.linkBox {
    display: flex;
    align-items: center;
    gap: 20px;
    > a {
      display: flex;
      align-items: center;
      gap: 5px;
      color: ${({ theme }) => theme.text};
      &:hover {
        color: ${({ theme }) => theme.accent};
      }
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
      <Link to={`/contacts/contact/${user._id}`}>
        <div>
          <img
            src={`${
              user.profileImage || defaultProfileImage
            }?t=${new Date().getTime()}`}
            alt={`${user.username}'s profile`}
            onError={(e) => (e.currentTarget.src = defaultProfileImage)}
          />
        </div>
        <div>
          <h3>{user.username}</h3>
          {currentUser?._id === user._id && <span>(You)</span>}
        </div>
      </Link>
    </StyledArticle>
  );
};

export default ContactCard;

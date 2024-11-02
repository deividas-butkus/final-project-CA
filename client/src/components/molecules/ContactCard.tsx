import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import { Link } from "react-router-dom";

import { useUsersContext } from "../../contexts/users/useUsersContext";
import { useChatsContext } from "../../contexts/chats/useChatsContext";
import { User } from "../../types/UsersTypes";

const StyledArticle = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  height: 50px;
  box-shadow: 1px 1px 3px ${({ theme }) => theme.accent};
  border-radius: 5px;
  > div.userBox {
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
  const navigate = useNavigate();
  const { currentUser } = useUsersContext();
  const { getOrCreateChat } = useChatsContext();
  const defaultProfileImage = "/api/uploads/defaultProfileImage.png";

  const handleChatClick = async () => {
    if (user && currentUser?._id) {
      const chat = await getOrCreateChat([user._id, currentUser._id]);
      if (chat) {
        navigate(`/chats/chat/${chat._id}`);
      }
    }
  };

  return (
    <StyledArticle>
      <div className="userBox">
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
      <div className="linkBox">
        <Link to={`/contacts/contact/${user._id}`}>
          <span>View profile</span>
          <AccountCircleIcon />
        </Link>
        <button onClick={handleChatClick}>
          <span>Chat with {user.username}</span>
          <MarkUnreadChatAltIcon />
        </button>
      </div>
    </StyledArticle>
  );
};

export default ContactCard;

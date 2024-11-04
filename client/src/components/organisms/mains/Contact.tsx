import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";

import { useUsersContext } from "../../../contexts/users/useUsersContext";
import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import { User } from "../../../types/UsersTypes";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  div {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  > div.profileImage {
    height: 300px;
    > img {
      height: 100%;
      border-radius: 10px;
      box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
    }
  }
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    padding: 5px 10px;
    color: ${({ theme }) => theme.accent};
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Contact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, fetchUserById } = useUsersContext();
  const { getOrCreateChat } = useChatsContext();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (id) {
        const userData = await fetchUserById(id);
        setUser(userData);
      }
    };
    loadUser();
  }, [id, fetchUserById]);

  if (!user) return <p>Loading...</p>;

  const handleChatClick = async () => {
    if (user && currentUser?._id) {
      const chat = await getOrCreateChat([user._id, currentUser._id]);
      if (chat) {
        navigate(`/chats/chat/${chat._id}`);
      }
    }
  };

  return (
    <StyledSection>
      <h2>{user.username}</h2>
      <div className="profileImage">
        <img
          src={user.profileImage || "/uploads/defaultProfileImage.png"}
          alt={`${user.username}'s profile`}
        />
      </div>
      <button onClick={handleChatClick}>
        <span>Chat with {user.username}</span>
        <MarkUnreadChatAltIcon />
      </button>
    </StyledSection>
  );
};

export default Contact;

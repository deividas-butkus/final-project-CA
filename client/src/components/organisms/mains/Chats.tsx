import { useEffect, useContext } from "react";
import styled from "styled-components";

import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import ChatCard from "../../molecules/ChatCard";
import TokenExpirationTimer from "../../atoms/TokenExpirationTimer";
import UsersContext from "../../../contexts/users/UsersContext";
import { UsersContextType } from "../../../types/UsersTypes"; // Ensure this import path is correct

const StyledSection = styled.section`
  margin-bottom: 50px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const Chats = () => {
  const { chats, fetchChatsSummary } = useChatsContext();
  const { tokenExpiration } = useContext(UsersContext) as UsersContextType; // Cast context to UsersContextType

  useEffect(() => {
    fetchChatsSummary();
  }, [fetchChatsSummary]);

  return (
    <StyledSection>
      <h2>Chats</h2>
      <TokenExpirationTimer token={tokenExpiration} />
      <div>
        {chats.map((chat) => (
          <ChatCard key={chat._id} chat={chat} />
        ))}
      </div>
    </StyledSection>
  );
};

export default Chats;

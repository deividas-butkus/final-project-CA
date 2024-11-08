import { useEffect } from "react";
import styled from "styled-components";

import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import ChatCard from "../../molecules/ChatCard";

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

  useEffect(() => {
    fetchChatsSummary();
  }, [fetchChatsSummary]);

  return (
    <StyledSection>
      <h2>Chats</h2>
      <div>
        {chats.length > 0 ? (
          chats.map((chat) => <ChatCard key={chat._id} chat={chat} />)
        ) : (
          <p>
            No chats yet.
            <br />
            Choose a contact for a conversation to see a chat here!
          </p>
        )}
      </div>
    </StyledSection>
  );
};

export default Chats;

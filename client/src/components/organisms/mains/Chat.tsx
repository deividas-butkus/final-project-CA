import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import { useUsersContext } from "../../../contexts/users/useUsersContext";
import MessageCard from "../../molecules/MessageCard";
import { Chat as ChatType } from "../../../contexts/chats/chatsTypes";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #135244;
  padding: 30px;
  border-radius: 15px;
  > img {
    width: 50px;
    height: 50px;
    border-radius: 7px;
  }
`;

const Chat = () => {
  const { chatId } = useParams<{ chatId: ChatType["_id"] }>();
  const { selectedChat, fetchChatById } = useChatsContext();
  const { currentUser } = useUsersContext();

  useEffect(() => {
    if (chatId) fetchChatById(chatId);
  }, [chatId, fetchChatById]);

  if (!selectedChat) {
    return <p>Loading chat...</p>;
  }

  const isSelfChat = selectedChat.members.length === 1;
  const otherUser = selectedChat.memberDetails.find(
    (member) => member._id !== currentUser?._id
  );
  const chatTitle = isSelfChat
    ? "Store something for myself"
    : `Chat with ${otherUser?.username || "Unknown User"}`;

  return (
    <StyledSection>
      <h2>{chatTitle}</h2>

      {isSelfChat
        ? currentUser?.profileImage && (
            <img
              src={currentUser.profileImage}
              alt={`${currentUser.username}'s image`}
            />
          )
        : otherUser?.profileImage && (
            <img
              src={otherUser.profileImage}
              alt={`${otherUser.username}'s avatar`}
            />
          )}

      {selectedChat.messages && selectedChat.messages.length > 0 ? (
        selectedChat.messages.map((message) => (
          <MessageCard
            key={message._id}
            message={{
              content: message.content || "No message content",
              isRead: message.isRead ?? false,
              createdAt: message.createdAt || "No timestamp",
            }}
          />
        ))
      ) : (
        <p>No messages yet</p>
      )}
    </StyledSection>
  );
};

export default Chat;

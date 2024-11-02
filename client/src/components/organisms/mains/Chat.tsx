import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import { useUsersContext } from "../../../contexts/users/useUsersContext";
import MessageCard from "../../molecules/MessageCard";
import { Chat as ChatType } from "../../../types/ChatsTypes";

const StyledSection = styled.section`
  > div.chatHeader {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    > img {
      width: 50px;
      height: 50px;
      border-radius: 7px;
    }
  }
  > div.messages {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #135244;
    padding: 30px;
    border-radius: 15px;
    align-items: flex-start;
  }
`;

const Chat = () => {
  const { chatId } = useParams<{ chatId: ChatType["_id"] }>();
  const { selectedChat, fetchChatById, refetchSelectedChat } =
    useChatsContext();
  const { currentUser } = useUsersContext();

  const stableFetchChatById = useCallback(() => {
    if (
      chatId &&
      currentUser &&
      (!selectedChat || selectedChat._id !== chatId)
    ) {
      fetchChatById(chatId);
    }
  }, [chatId, currentUser, fetchChatById, selectedChat]);

  useEffect(() => {
    stableFetchChatById();
  }, [stableFetchChatById]);

  useEffect(() => {
    if (selectedChat && selectedChat._id === chatId && !selectedChat.messages) {
      refetchSelectedChat(chatId);
    }
  }, [selectedChat, chatId, refetchSelectedChat]);

  if (!selectedChat || selectedChat._id !== chatId) {
    return <p>Loading chat...</p>;
  }

  const isSelfChat = selectedChat.members.length === 1;
  const otherUser = selectedChat.memberDetails?.find(
    (member) => member._id !== currentUser?._id
  );
  const chatTitle = isSelfChat
    ? "Store something for myself"
    : `Chat with ${otherUser?.username || "Unknown User"}`;

  return (
    <StyledSection>
      <div className="chatHeader">
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
      </div>

      <div className="messages">
        {selectedChat.messages && selectedChat.messages.length > 0 ? (
          selectedChat.messages.map((message) => (
            <MessageCard
              key={message._id}
              message={{
                _id: message._id,
                content: message.content,
                isRead: message.isRead ?? false,
                createdAt: message.createdAt || "No timestamp",
              }}
              isCurrentUser={message.userId === currentUser?._id}
            />
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
    </StyledSection>
  );
};

export default Chat;

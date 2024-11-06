import React, { useEffect, useCallback, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";

import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import { useUsersContext } from "../../../contexts/users/useUsersContext";
import MessageCard from "../../molecules/MessageCard";
import { Chat as ChatType } from "../../../types/ChatsTypes";
import InputWithLabel from "../../molecules/InputWithLabel";
import { Message } from "../../../types/MessagesTypes";

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
      object-fit: cover;
      object-position: center;
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
    min-height: 400px;
    overflow-y: auto;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`;

const StyledForm = styled.form`
  position: sticky;
  bottom: 0%;
`;

const StyledButton = styled.button<{ disabled?: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 10px 5px 0;
  background: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  outline: none;
  box-shadow: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Spacer = styled.div`
  height: 5vh;
`;

const Chat = () => {
  const { chatId } = useParams<{ chatId: ChatType["_id"] }>();
  const {
    selectedChat,
    setLastSeen,
    fetchChatById,
    refetchSelectedChat,
    addMessage,
  } = useChatsContext();
  const { currentUser } = useUsersContext();
  const [messageInput, setMessageInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const token = localStorage.getItem("token") || "";

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [selectedChat?.messages]);

  useEffect(() => {
    if (chatId) {
      setLastSeen(chatId);
    }
  }, [chatId, setLastSeen]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessageInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser?._id) {
      console.error("User ID is undefined. Cannot send message.");
      return;
    }

    try {
      await addMessage(chatId, messageInput, currentUser._id);
      setMessageInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleToggleLike = async (messageId: Message["_id"]) => {
    try {
      await fetch(`/api/messages/message/toggle-like/${messageId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetchMessages();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const refetchMessages = async () => {
    await fetchChatById(chatId);
  };

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
          selectedChat.messages.map((message) => {
            const isLiked = message.likedUserId === currentUser?._id;

            return (
              <MessageCard
                key={message._id}
                message={{
                  _id: message._id,
                  content: message.content,
                  createdAt: message.createdAt || "No timestamp",
                  likedUserId: message.likedUserId,
                }}
                isCurrentUser={message.userId === currentUser?._id}
                onToggleLike={handleToggleLike}
                $isLiked={isLiked}
              />
            );
          })
        ) : (
          <p>No messages yet</p>
        )}
        <Spacer />
        <div ref={messagesEndRef} />
      </div>
      <StyledForm onSubmit={handleSubmit}>
        <InputWithLabel
          type="textarea"
          label=""
          name="message"
          value={messageInput}
          onChange={handleChange}
          placeholder="Aa"
        />
        <StyledButton type="submit" disabled={!messageInput.trim()}>
          <SendIcon />
        </StyledButton>
      </StyledForm>
    </StyledSection>
  );
};

export default Chat;

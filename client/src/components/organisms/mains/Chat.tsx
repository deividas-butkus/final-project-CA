import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import { useUsersContext } from "../../../contexts/users/useUsersContext";
import MessageCard from "../../molecules/MessageCard";
import { Chat as ChatT } from "../../../types/ChatsTypes";

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
  const { chats } = useChatsContext();
  const { currentUser } = useUsersContext();

  const chat = chats.find((c) => c._id === chatId);

  if (!chat) {
    return <p>Chat not found</p>;
  }

  const isSelfChat = chat.members.length === 1;
  const otherUser = chat.memberDetails.find(
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

      {chat.lastMessage && (
        <MessageCard
          lastMessage={{
            content: chat.lastMessage.content || "No message content",
            isRead: chat.lastMessage.isRead ?? false,
            createdAt: chat.lastMessage.createdAt || "No timestamp",
          }}
          unreadCount={chat.unreadCount}
        />
      )}
    </StyledSection>
  );
};

export default Chat;

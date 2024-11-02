import styled from "styled-components";
import { Message } from "../../types/MessagesTypes";

const StyledArticle = styled.article<{ $isCurrentUser: boolean }>`
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$isCurrentUser ? "#daf5e3" : "#c44228"};
  align-self: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
  color: black;
  text-align: ${(props) => (props.$isCurrentUser ? "right" : "left")};
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export type MessageCardProps = {
  message: {
    _id: Message["_id"];
    content: Message["content"];
    isRead: Message["isRead"];
    createdAt: Message["createdAt"];
  };
  isCurrentUser: boolean;
};

const MessageCard = ({ message, isCurrentUser }: MessageCardProps) => {
  return (
    <StyledArticle $isCurrentUser={isCurrentUser}>
      <div>
        <p>Message ID: {message._id}</p>
        <p>{message.content}</p>
        <p>{message.isRead ? "Read" : "Unread"}</p>
        <p>{new Date(message.createdAt).toLocaleString()}</p>
      </div>
    </StyledArticle>
  );
};

export default MessageCard;

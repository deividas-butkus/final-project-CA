import styled from "styled-components";

const StyledArticle = styled.article`
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > svg {
    display: flex;
    justify-self: flex-end;
  }
`;

type MessageCardProps = {
  lastMessage: Chat["lastMessage"];
  unreadCount: Chat["unreadCount"];
};

const MessageCard = ({ lastMessage, unreadCount }: MessageCardProps) => {
  return (
    <StyledArticle>
      <div>
        <p>{lastMessage.content}</p>
        <p>{lastMessage.isRead ? "Read" : "Unread"}</p>
        <p>{lastMessage.createdAt}</p>
        <p>
          {unreadCount > 0
            ? `${unreadCount} unread messages`
            : "No unread messages"}
        </p>
      </div>
    </StyledArticle>
  );
};

export default MessageCard;

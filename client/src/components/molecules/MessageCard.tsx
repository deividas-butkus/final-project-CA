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

export type MessageCardProps = {
  message: {
    content: string;
    isRead: boolean;
    createdAt: string;
  };
};

const MessageCard = ({ message }: MessageCardProps) => {
  return (
    <StyledArticle>
      <div>
        <p>{message.content}</p>
        <p>{message.isRead ? "Read" : "Unread"}</p>
        <p>{new Date(message.createdAt).toLocaleString()}</p>
      </div>
    </StyledArticle>
  );
};

export default MessageCard;

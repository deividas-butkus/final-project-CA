import { useState } from "react";
import styled from "styled-components";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Message } from "../../types/MessagesTypes";

const StyledArticle = styled.article<{ $isCurrentUser: boolean }>`
  position: relative;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$isCurrentUser ? "#ac867e" : "#daf5e3"};
  align-self: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
  color: black;
  text-align: ${(props) => (props.$isCurrentUser ? "right" : "left")};

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledLikeIcon = styled(ThumbUpIcon)<{ $isLiked: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: ${(props) => (props.$isLiked ? props.theme.active : "grey")};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${(props) =>
      props.$isLiked ? props.theme.activeHover : "lightgrey"};
  }
`;

export type MessageCardProps = {
  message: {
    _id: Message["_id"];
    content: Message["content"];
    createdAt: Message["createdAt"];
    likedUserId?: string;
  };
  isCurrentUser: boolean;
  onToggleLike: (messageId: string) => void;
  $isLiked: boolean;
};

const MessageCard = ({
  message,
  isCurrentUser,
  onToggleLike,
  $isLiked: initialIsLiked,
}: MessageCardProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onToggleLike(message._id);
  };

  return (
    <StyledArticle
      $isCurrentUser={isCurrentUser}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <p>{message.content}</p>
        <p>
          {new Date(message.createdAt).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        {!isCurrentUser && (isHovered || isLiked) && (
          <StyledLikeIcon $isLiked={isLiked} onClick={handleLikeClick} />
        )}
      </div>
    </StyledArticle>
  );
};

export default MessageCard;

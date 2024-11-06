import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { lighten } from "polished";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Avatar from "../atoms/Avatar";
import { useUsersContext } from "../../contexts/users/useUsersContext";
import { Message } from "../../types/MessagesTypes";
import { User as UserType } from "../../types/UsersTypes";

const StyledArticle = styled.article<{ $isCurrentUser: boolean }>`
  position: relative;
  width: fit-content;
  max-width: 60%;
  min-width: 200px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$isCurrentUser ? lighten(0.1, props.theme.active) : "#e6faed"};
  align-self: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
  color: black;
  > div {
    display: flex;
    flex-direction: column;
    p.content {
      max-width: 95%;
    }
  }
`;

const StyledImageAndNameAndTimestampDiv = styled.div<{
  $isCurrentUser: boolean;
}>`
  display: flex;
  gap: 10px;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;

    > h4 {
      margin: 0;
      color: ${(props) =>
        props.$isCurrentUser ? props.theme.text : props.theme.accent};
    }

    > p {
      margin: 0;
      font-size: small;
      font-weight: 100;
    }
  }
`;

const StyledLikeIcon = styled(ThumbUpIcon)<{
  $isLiked: boolean;
  $isCurrentUser: boolean;
}>`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 7px;
  color: ${(props) =>
    props.$isLiked
      ? props.$isCurrentUser
        ? props.theme.accent
        : props.theme.active
      : "grey"};
  cursor: ${(props) => (props.$isCurrentUser ? "default" : "pointer")};
  transition: color 0.3s;

  &:hover {
    color: ${(props) =>
      props.$isLiked
        ? props.$isCurrentUser
          ? props.theme.accent
          : props.theme.activeHover
        : "lightgrey"};
    cursor: ${(props) => (props.$isCurrentUser ? "default" : "pointer")};
  }
`;

export type MessageCardProps = {
  messageId: Message["_id"];
  isCurrentUser: boolean;
  onToggleLike: (messageId: Message["_id"]) => void;
};

const MessageCard = ({
  messageId,
  isCurrentUser,
  onToggleLike,
}: MessageCardProps) => {
  const { fetchUserById, currentUser } = useUsersContext();
  const [message, setMessage] = useState<Message | null>(null);
  const [messageUser, setMessageUser] = useState<UserType | undefined>(
    undefined
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const fetchMessage = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Cannot fetch message.");
      return;
    }

    try {
      const response = await fetch(`/api/messages/message/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedMessage = await response.json();

      if (response.ok) {
        setMessage(fetchedMessage);
        setIsLiked(
          fetchedMessage.likedUserId === currentUser?._id ||
            !!fetchedMessage.likedUserId
        );
      } else {
        console.error(
          "Failed to fetch message:",
          fetchedMessage.error || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  }, [messageId, currentUser?._id]);

  const fetchMessageUser = useCallback(async () => {
    if (message && !isCurrentUser) {
      const user = await fetchUserById(message.userId);
      setMessageUser(user ?? undefined);
    }
  }, [fetchUserById, message, isCurrentUser]);

  useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  useEffect(() => {
    fetchMessageUser();
  }, [fetchMessageUser]);

  const handleLikeClick = async () => {
    if (isCurrentUser) return;

    setIsLiked((prev) => !prev);

    try {
      await onToggleLike(messageId);
      await fetchMessage();
    } catch (error) {
      console.error("Error toggling like status:", error);
      setIsLiked((prev) => !prev);
    }
  };

  if (!message) return null;

  return (
    <StyledArticle
      $isCurrentUser={isCurrentUser}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <StyledImageAndNameAndTimestampDiv $isCurrentUser={isCurrentUser}>
          <Avatar
            user={
              isCurrentUser
                ? currentUser ?? undefined
                : messageUser ?? undefined
            }
          />
          <div>
            <h4>
              {isCurrentUser
                ? currentUser?.username
                : messageUser?.username || "User"}
            </h4>
            <p>
              {new Date(message.createdAt).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </StyledImageAndNameAndTimestampDiv>
        <p className="content">{message.content}</p>

        {(isLiked || (!isCurrentUser && isHovered)) && (
          <StyledLikeIcon
            $isLiked={isLiked}
            $isCurrentUser={isCurrentUser}
            onClick={!isCurrentUser ? handleLikeClick : undefined}
          />
        )}
      </div>
    </StyledArticle>
  );
};

export default MessageCard;

import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";

import { useUsersContext } from "../../contexts/users/useUsersContext";
import { Chat as ChatType } from "../../types/ChatsTypes";
import Button from "../atoms/Button";
import { useChatsContext } from "../../contexts/chats/useChatsContext";
import Counter from "../atoms/Counter";
import { Message } from "../../types/MessagesTypes";
import Dialog from "./Dialog";

const StyledDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 0.5rem;
  ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
    align-items: center;
  }
  > a {
    width: 100%;
    ${({ theme }) => theme.media.mobile} {
      width: 70%;
    }
    > div {
      display: flex;
      gap: 30px;
      width: 100%;
      border-radius: 7px;
      padding: 5px 10px;
      box-shadow: 1px 1px 3px ${({ theme }) => theme.accent};
      > img {
        height: 70px;
        width: 70px;
        object-fit: cover;
        border-radius: 7px;
      }
      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        .title-container {
          display: flex;
          align-items: center;
          position: relative;
          h4 {
            margin: 0;
            color: ${({ theme }) => theme.accent};
          }
          .counter {
            position: absolute;
            top: -7px;
            right: -17px;
          }
        }
        p {
          margin: 0;
          font-size: 0.8rem;
          color: ${({ theme }) => theme.text};
        }
        > p.timestamp {
          font-size: 0.6rem;
          font-weight: 100;
        }
      }
    }
  }
  > button {
    align-self: flex-end;
    ${({ theme }) => theme.media.mobile} {
      align-self: center;
    }
    &:hover {
      color: #fff;
    }
  }
`;

const MAX_MESSAGE_LENGTH = 50;

const truncateText = (text: Message["content"], maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

type Props = {
  chat: ChatType;
};

const ChatCard = ({ chat }: Props) => {
  const { currentUser } = useUsersContext();
  const { deleteChat } = useChatsContext();
  const theme = useTheme();
  const [showDialog, setShowDialog] = useState(false);

  const isSelfChat = chat.members.length === 1;
  const otherUser = chat.memberDetails?.find(
    (member) => member._id !== currentUser?._id
  );
  const chatTitle = isSelfChat
    ? "Store something for myself"
    : `Chat with ${otherUser?.username || "Unknown User"}`;

  const handleDeleteClick = () => {
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteChat(chat._id);
    setShowDialog(false);
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
  };

  return (
    <>
      <StyledDiv>
        <Link to={`/chats/chat/${chat._id}`}>
          <div>
            {isSelfChat ? (
              <img
                src={
                  currentUser?.profileImage ||
                  "/uploads/defaultProfileImage.png"
                }
                alt={`${currentUser?.username}'s avatar`}
              />
            ) : (
              otherUser?.profileImage && (
                <img
                  src={otherUser.profileImage}
                  alt={`${otherUser.username}'s avatar`}
                />
              )
            )}
            <div>
              <div className="title-container">
                <h4>{chatTitle}</h4>
                {chat.unreadCount > 0 && (
                  <Counter
                    className="counter"
                    count={chat.unreadCount}
                    $bgColor={theme.error}
                  />
                )}
              </div>
              {chat.lastMessage ? (
                <>
                  <p>
                    {truncateText(
                      chat.lastMessage.content,
                      MAX_MESSAGE_LENGTH
                    ) || "No message content available"}
                  </p>
                  <p className="timestamp">
                    {chat.lastMessage.createdAt
                      ? new Date(chat.lastMessage.createdAt).toLocaleString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "No timestamp available"}
                  </p>
                </>
              ) : (
                <p>No messages yet</p>
              )}
            </div>
          </div>
        </Link>
        <Button className="delete" onClick={handleDeleteClick}>
          Delete Chat
        </Button>
      </StyledDiv>

      <Dialog
        title="Confirm Deletion"
        message={
          <>
            Are you sure you want to delete <strong>{chatTitle}</strong>?
          </>
        }
        note="This action is irreversible."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        visible={showDialog}
      />
    </>
  );
};

export default ChatCard;

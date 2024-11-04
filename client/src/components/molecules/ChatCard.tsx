import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUsersContext } from "../../contexts/users/useUsersContext";
import { Chat as ChatType } from "../../types/ChatsTypes";
import Button from "../atoms/Button";
import { useChatsContext } from "../../contexts/chats/useChatsContext";

const StyledDiv = styled.div`
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a {
    > div {
      display: flex;
      gap: 30px;
      min-width: 500px;
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
        h4 {
          margin: 0;
          color: ${({ theme }) => theme.accent};
        }
        p {
          margin: 0;
          color: #fff;
        }
        > p.timestamp {
          font-size: small;
          font-weight: 100;
        }
      }
    }
  }
  > button:hover {
    background-color: ${({ theme }) => theme.error};
  }
`;

type Props = {
  chat: ChatType;
};

const ChatCard = ({ chat }: Props) => {
  const { currentUser } = useUsersContext();
  const { deleteChat } = useChatsContext();

  const isSelfChat = chat.members.length === 1;
  const otherUser = chat.memberDetails?.find(
    (member) => member._id !== currentUser?._id
  );
  const chatTitle = isSelfChat
    ? "Store something for myself"
    : `Chat with ${otherUser?.username || "Unknown User"}`;

  const handleDelete = () => {
    deleteChat(chat._id);
  };

  return (
    <StyledDiv>
      <Link to={`/chats/chat/${chat._id}`}>
        <div>
          {isSelfChat ? (
            <img
              src={
                currentUser?.profileImage || "/uploads/defaultProfileImage.png"
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
            <h4>{chatTitle}</h4>
            {chat.lastMessage ? (
              <>
                <p>
                  {chat.lastMessage.content || "No message content available"}
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
      <Button onClick={handleDelete}>Delete Chat</Button>
    </StyledDiv>
  );
};

export default ChatCard;

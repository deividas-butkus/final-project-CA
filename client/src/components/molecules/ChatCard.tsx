import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUsersContext } from "../../contexts/users/useUsersContext";
import { Chat as ChatType } from "../../types/ChatsTypes";

const StyledDiv = styled.div`
  height: auto;
  > h4 {
    > a {
      color: ${({ theme }) => theme.accent};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  > div {
    display: flex;
    gap: 20px;
    > img {
      height: 100px;
      width: 100px;
      object-fit: cover;
      border-radius: 7px;
      box-shadow: 0.5px 0.5px 1px ${({ theme }) => theme.accent};
    }
  }
`;

type Props = {
  chat: ChatType;
};

const ChatCard = ({ chat }: Props) => {
  const { currentUser } = useUsersContext();

  const isSelfChat = chat.members.length === 1;
  const otherUser = chat.memberDetails?.find(
    (member) => member._id !== currentUser?._id
  );
  const chatTitle = isSelfChat
    ? "Store something for myself"
    : `Chat with ${otherUser?.username || "Unknown User"}`;

  return (
    <StyledDiv>
      <h4>
        <Link to={`/chats/chat/${chat._id}`}>{chatTitle}</Link>
      </h4>
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
          {chat.lastMessage ? (
            <>
              <p>
                {chat.lastMessage.content || "No message content available"}
              </p>
              <p>
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
    </StyledDiv>
  );
};

export default ChatCard;

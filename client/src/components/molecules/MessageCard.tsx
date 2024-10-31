import styled from "styled-components";

import Avatar from "../atoms/Avatar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const StyledArticle = styled.article`
  width: 200px;
  background-color: grey;
  padding: 10px;
  border-radius: 10px;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  > svg {
    display: flex;
    justify-self: flex-end;
  }
`;

const MessageCard = () => {
  return (
    <StyledArticle>
      <div>
        <Avatar />
        <div>
          <h3>Username</h3>
          <p>Date and time</p>
        </div>
      </div>
      <p>Content</p>
      <ThumbUpIcon />
    </StyledArticle>
  );
};

export default MessageCard;

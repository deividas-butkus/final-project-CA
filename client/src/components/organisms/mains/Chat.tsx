import styled from "styled-components";
import MessageCard from "../../molecules/MessageCard";

const StyledSection = styled.section`
  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #a05212;
    padding: 30px;
    border-radius: 15px;
  }
`;

const Chat = () => {
  return (
    <StyledSection>
      <h2>Chat with contact x</h2>
      <div>
        <MessageCard />
        <MessageCard />
      </div>
    </StyledSection>
  );
};

export default Chat;

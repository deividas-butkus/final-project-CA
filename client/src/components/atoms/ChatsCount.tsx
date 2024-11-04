import styled from "styled-components";

import { useChatsContext } from "../../contexts/chats/useChatsContext";

const StyledDiv = styled.div`
  display: grid;
  place-items: center;
  width: 15px;
  height: 15px;
  font-size: 0.7rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.active};
  color: ${({ theme }) => theme.text};
  transform: translate(-10px, -10px);
`;

const ChatsCount = () => {
  const { chats } = useChatsContext();

  return <StyledDiv>{chats.length}</StyledDiv>;
};

export default ChatsCount;

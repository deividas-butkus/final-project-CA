import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import ChatCard from "../../molecules/ChatCard";

const Chats = () => {
  const { chats } = useChatsContext();

  return (
    <section>
      <h2>Chats</h2>
      <div>
        {chats.map((chat) => (
          <ChatCard key={chat._id} chat={chat} />
        ))}
      </div>
    </section>
  );
};

export default Chats;

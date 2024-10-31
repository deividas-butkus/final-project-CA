import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import { useMessagesContext } from "../../../contexts/messeages/useMessagesContext";

const Chats = () => {
  const { chats } = useChatsContext();
  const { messages } = useMessagesContext();

  return (
    <section>
      <h2>Chats</h2>
      {chats.map((c) => (
        <ul key={c._id}>
          <li>
            Chat ID: {c._id}
            <ul>
              {c.members.map((m) => (
                <li key={m}>Participant ID: {m}</li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
      <h3>Messages</h3>
      {messages.map((m) => (
        <div key={m._id}>{m.content}</div>
      ))}
    </section>
  );
};

export default Chats;

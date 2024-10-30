import { useChatsContext } from "../../../contexts/chats/useChatsContext";

const Chats = () => {
  const { chats } = useChatsContext();

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
    </section>
  );
};

export default Chats;

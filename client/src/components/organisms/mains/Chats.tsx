import { Link } from "react-router-dom";

const Chats = () => {
  const chatId = "123";

  return (
    <section>
      <h2>Chats</h2>
      <div>
        <h4>Chat with X</h4>
        <Link to={`/chats/chat/${chatId}`}>Go to chat with X</Link>
      </div>
    </section>
  );
};

export default Chats;

import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Layout from "./components/templates/Layout";

import Landing from "./components/organisms/mains/Landing";
import Register from "./components/organisms/mains/Register";
import Login from "./components/organisms/mains/Login";
import MyProfile from "./components/organisms/mains/MyProfile";
import Contacts from "./components/organisms/mains/Contacts";
import Chats from "./components/organisms/mains/Chats";
import Chat from "./components/organisms/mains/Chat";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<MyProfile />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/chat/:chatId" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

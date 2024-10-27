import { Routes, Route } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Layout from "./components/templates/Layout";

import Landing from "./components/organisms/mains/Landing";
import Register from "./components/organisms/mains/Register";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

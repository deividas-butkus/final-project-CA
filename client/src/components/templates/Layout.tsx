import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

const StyledMain = styled.main`
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Layout = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
};

export default Layout;

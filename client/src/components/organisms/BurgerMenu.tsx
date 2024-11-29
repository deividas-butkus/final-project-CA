import { useState } from "react";
import { IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import NavLinks from "../molecules/NavLinks";
import UserNavBox from "../molecules/UserNavBox";

const StyledBurgerButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.accent};
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 200px;
    background-color: ${({ theme }) => theme.background};
    border-bottom-right-radius: 5px;
    > ul {
      padding: 20%;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 20px;
    }
  }
`;

const BurgerMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <StyledBurgerButtonWrapper>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </StyledBurgerButtonWrapper>

      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <ul>
          <NavLinks />
          <UserNavBox />
        </ul>
      </StyledDrawer>
    </>
  );
};

export default BurgerMenu;

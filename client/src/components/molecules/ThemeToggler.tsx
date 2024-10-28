import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemesContext } from "../../contexts/themes/useThemesContext";
import styled from "styled-components";

const StyledDiv = styled.div`
  > svg {
    cursor: pointer;
  }
`;

const ThemeToggler = () => {
  const { isLightMode, toggleTheme } = useThemesContext();

  return (
    <StyledDiv onClick={toggleTheme} style={{ cursor: "pointer" }}>
      {isLightMode ? (
        <DarkModeIcon titleAccess="Switch to dark mode" />
      ) : (
        <LightModeIcon titleAccess="Switch to light mode" />
      )}
    </StyledDiv>
  );
};

export default ThemeToggler;

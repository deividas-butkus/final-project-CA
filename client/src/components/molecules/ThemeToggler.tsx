import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemesContext } from "../../contexts/themes/useThemesContext";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
  span,
  svg {
    color: ${({ theme }) => theme.accent};
  }
`;

const ThemeToggler = () => {
  const { isLightMode, toggleTheme } = useThemesContext();

  return (
    <StyledDiv onClick={toggleTheme}>
      <span>Switch mode</span>
      {isLightMode ? (
        <DarkModeIcon titleAccess="Switch to dark mode" />
      ) : (
        <LightModeIcon titleAccess="Switch to light mode" />
      )}
    </StyledDiv>
  );
};

export default ThemeToggler;

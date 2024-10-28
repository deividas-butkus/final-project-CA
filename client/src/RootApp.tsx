import { useThemesContext } from "./contexts/themes/useThemesContext";
import { ThemeProvider as StyledThemesProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/themes";
import App from "./App";

const RootApp = () => {
  const { isLightMode } = useThemesContext();

  return (
    <StyledThemesProvider theme={isLightMode ? lightTheme : darkTheme}>
      <App />
    </StyledThemesProvider>
  );
};

export default RootApp;

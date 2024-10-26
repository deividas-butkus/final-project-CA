import { useTheme } from "./contexts/useTheme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import App from "./App";

const RootApp = () => {
  const { isLightMode } = useTheme();

  return (
    <StyledThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <App />
    </StyledThemeProvider>
  );
};

export default RootApp;

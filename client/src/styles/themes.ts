const baseTheme = {
  border: "#1f3b4d",
  active: "#ff4500",
  media: {
    tablet: "@media (min-width: 576px)",
    laptop: "@media (min-width: 768px)",
    desktop: "@media (min-width: 1024px)",
  },
};

export const lightTheme = {
  ...baseTheme,
  background: "#fffce2",
  text: "#2e2e2e",
  accent: "#195470",
  buttonBg: "#8de5f2",
  buttonText: "#243b55",
  error: "#FE0605",
};

export const darkTheme = {
  ...baseTheme,
  background: "#2e2e2e",
  text: "#f0f0f0",
  accent: "#60c1c7",
  buttonBg: "#243b55",
  buttonText: "#8de5f2",
  error: "#d91924",
};

import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#343131",
    },
    primary: {
      main: "#8E1616",
      light: "#B85252",
      dark: "#5a0f0f",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFB22C",
      light: "#FFD166",
      dark: "#B07E18",
      contrastText: "#000000",
    },
    // // custom extra key you already use
    // accent: {
    //   main: "#B85252",
    //   light: "#d17b7b",
    //   dark: "#823b3b",
    //   contrastText: "#FFFFFF",
    // },
    text: {
      primary: "#FFFFFF",
      secondary: "#E5E5E5",
    },
    divider: "#343131",
  },
  typography: {
    fontFamily: '"Geist", "Geist Fallback", sans-serif',
    h1: { fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontSize: "2rem", fontWeight: 700 },
    h3: { fontSize: "1.5rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 500, borderRadius: "0.5rem" },
        contained: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#343131",
          borderColor: "#343131",
          border: "1px solid #343131",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#000000",
            borderColor: "#343131",
          },
        },
      },
    },
  },
})

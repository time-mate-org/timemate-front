import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff9d", // Verde Vercel
      contrastText: "#0a0a0a",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#e5e5e5",
      secondary: "#999",
    },
    error: {
      main: "#ff4444",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.5px",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#00ff9d",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00ff9d",
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});

import { Box, Button, styled } from "@mui/material";

export const LoginBox = styled(Box)(() => ({
  minHeight: "100vh",
  ml: -1,
  display: "grid",
  placeItems: "center",
  maxWidth: "100vw",
  maxHeight: "100vh",
  background: "url('../public/login-background.jpeg') no-repeat fixed",
}));

export const LoginForm = styled(Box)(({ theme }) => ({
  // Largura responsiva
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: 420,
  },

  // Fundo e bordas
  bgcolor: "background.paper",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(3),

  // Efeito hover apenas em telas maiores
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    [theme.breakpoints.down("sm")]: {
      transform: "none",
    },
  },

  // Borda e overflow
  border: "1px solid",
  borderColor: "grey.300",
  overflow: "hidden",
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  bgcolor: "primary.main",
  "&:hover": {
    bgcolor: theme.palette.primary.dark,
  },
}));

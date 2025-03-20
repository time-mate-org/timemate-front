import { Container, styled, Button } from "@mui/material";

export const NotFoundContainer = styled(Container)(() => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5", // Fundo claro
  color: "#333", // Texto escuro
}));

export const BackToLoginButton = styled(Button)(() => ({
  py: 1.5,
  px: 4,
  backgroundColor: "#00ff9d",
  "&:hover": { bgcolor: "#00e68a" },
}));

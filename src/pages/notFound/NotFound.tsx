// NotFound.tsx
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackToLoginButton, NotFoundContainer } from "./style";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer maxWidth="lg">
      <Typography
        variant="h1"
        sx={{ fontSize: "8rem", fontWeight: "bold", color: "#ff4d4d" }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
        Nada de novo no front.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Parece que você se perdeu. Não temos nada aqui.
      </Typography>
      <BackToLoginButton
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Voltar ao Início
      </BackToLoginButton>
    </NotFoundContainer>
  );
};

export default NotFound;

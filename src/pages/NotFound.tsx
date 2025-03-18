// NotFound.tsx
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "#f5f5f5", // Fundo claro
        color: "#333", // Texto escuro
      }}
    >
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          py: 1.5,
          px: 4,
          bgcolor: "#00ff9d",
          "&:hover": { bgcolor: "#00e68a" },
        }}
      >
        Voltar ao Início
      </Button>
    </Box>
  );
};

export default NotFound;

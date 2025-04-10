import { Box } from "@mui/material";
import "./loading.css";

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        m: -1,
        flexDirection: "column",
        display: "flex", // Habilita flexbox
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Centraliza verticalmente
        overflowY: "hidden",
        overflowX: "hidden",
        width: "100vw", // Largura total d'a viewport
        height: "100vh", // Altura total da viewport
        bgcolor: "#0f0f0f", // Cor de fundo
        opacity:0.9
      }}
    >
      {/* Loader centralizado */}
      <Box component='img' src='/images/logo.png' sx={{width: "40vw", height: "40vh", margin: "auto"}} />
      <Box className="loader" sx={{ mx: "auto" }} />
    </Box>
  );
};

export default LoadingComponent;

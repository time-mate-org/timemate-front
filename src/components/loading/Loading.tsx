import { Box } from "@mui/material";
import "./loading.css";
import { ResponsiveTypography } from "../../pages/home/style";

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
        opacity: 1,
      }}
    >
      {/* Loader centralizado */}
      <ResponsiveTypography
        initialVariant="h1"
        sx={{ color: "#f1f1f1", mt: "30vh" }}
      >
        BALTAZAR
      </ResponsiveTypography>
      <ResponsiveTypography
        initialVariant="h5"
        sx={{ fontWeight: 300, letterSpacing: 7, color: "#f1f1f1", mb: 0 }}
      >
        CORTES DE CABELO MASCULINO
      </ResponsiveTypography>
      <Box className="loader" sx={{ mx: "auto" }} />
    </Box>
  );
};

export default LoadingComponent;

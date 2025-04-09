import { Box, Typography } from "@mui/material";

export const HomeHero = () => {
  return (
    <Box
      id="inicio"
      sx={{
        position: "relative",
        textAlign: "center",
        color: "white",
      }}
    >
      <Box
        component="img"
        src="/uploads/capa/banner-home.jpg"
        alt="BALTAZAR"
        sx={{ width: "100%" }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h2">BALTAZAR</Typography>
        <Typography variant="h5">Cortes de Cabelo Masculino</Typography>
      </Box>
    </Box>
  );
};

import { Box } from "@mui/material";
import { ResponsiveTypography } from "../style";

export const HomeHero = () => {
  return (
    <Box
      id="inicio"
      sx={{
        position: "relative",
        textAlign: "center",
        color: "white",
        pt: 7
      }}
    >
      <Box
        component="img"
        src="/images/capa/banner-home.jpg"
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
        <ResponsiveTypography initialVariant="h2">
          BALTAZAR
        </ResponsiveTypography>
        <ResponsiveTypography initialVariant="h5">
          Cortes de Cabelo Masculino
        </ResponsiveTypography>
      </Box>
    </Box>
  );
};

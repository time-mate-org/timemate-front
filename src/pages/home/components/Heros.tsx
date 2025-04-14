import { Box } from "@mui/material";
import { ResponsiveTypography } from "../style";

export const HomeHero = () => {
  return (
    <Box
      id="início"
      sx={{
        position: "relative",
        textAlign: "center",
        color: "white",
        pt: 7,
      }}
    >
      <Box
        component="img"
        src="/images/capa/banner.jpg"
        alt="BALTAZAR"
        sx={{ width: "100%", height: "100vh", zoom: "initial" }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ResponsiveTypography initialVariant="h1">
          BALTAZAR
        </ResponsiveTypography>
        <ResponsiveTypography initialVariant="h5" sx={{fontWeight: 300, letterSpacing: 7}}>
          CORTES DE CABELO MASCULINO
        </ResponsiveTypography>
      </Box>
    </Box>
  );
};

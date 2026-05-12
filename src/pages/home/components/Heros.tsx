import { Box } from "@mui/material";
import { ResponsiveTypography } from "../style";
import { useTenant } from "../../../hooks";

export const HomeHero = () => {
  const { tenant } = useTenant();

  return (
    <Box
      id="início"
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        textAlign: "center",
        color: "white",
      }}
    >
      <Box
        component="img"
        src={tenant?.banner}
        alt={tenant?.blog_title?.toUpperCase() || "TIMEMATE"}
        sx={{
          width: "100%",
          height: "100%",
          objectPosition: "center",
          display: "block",
          position: "cover",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <ResponsiveTypography initialVariant="h1">
          {tenant?.blog_title?.toUpperCase() || "TIMEMATE"}
        </ResponsiveTypography>

        <ResponsiveTypography
          initialVariant="h5"
          sx={{ fontWeight: 300, letterSpacing: 7 }}
        >
          {tenant?.blog_subtitle || "AGENDAMENTOS"}
        </ResponsiveTypography>
      </Box>
    </Box>
  );
};

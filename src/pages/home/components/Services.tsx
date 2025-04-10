import {
  Container,
  Typography,
  Paper,
  Box,
  Grid2,
  IconButton,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { services } from "./utils";
import { ResponsiveTypography } from "../style";

export const HomeServices = () => {
  return (
    <Container id="servicos" sx={{ py: 4, background: "#f1f1f1" }}>
      <ResponsiveTypography
        initialVariant="h4"
        align="center"
        color="primary"
        gutterBottom
      >
        Serviços
      </ResponsiveTypography>
      <Grid2 container spacing={4}>
        {services.map((service, index) => (
          <Grid2 size={{ xs: 12, sm: 4 }} key={index}>
            <Paper
              elevation={2}
              sx={{
                overflow: "hidden",
                position: "relative",
                background: "transparent",
                boxShadow: "none",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={service.image}
                  alt={service.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    borderRadius: 100,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    borderRadius: 100,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: "rgba(6, 9, 82, 0.48)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    "&:hover": { opacity: 1 },
                    zIndex: 0,
                  }}
                >
                  <Grid2 container sx={{ width: "100%", textAlign: "center" }}>
                    <Grid2 size={12}>
                      <IconButton sx={{ color: "white", textAlign: "center" }}>
                        <Star sx={{ fontSize: 100 }} />
                      </IconButton>
                    </Grid2>
                    <Grid2 size={12}>
                      <p>{service.title}</p>
                    </Grid2>
                  </Grid2>
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary" textAlign="center">
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="secondary"
                  textAlign="center"
                >
                  {service.description}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

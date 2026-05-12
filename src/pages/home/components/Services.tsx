import { Container, Typography, Paper, Box, Grid } from "@mui/material";
import { Star } from "@mui/icons-material";
import { LIGHTBLUE } from "./utils";
import { ResponsiveTypography } from "../style";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../services/getEntity";
import { useTenant } from "../../../hooks";

export const HomeServices = () => {
  const { tenant } = useTenant();
  const servicesQuery = useQuery({
    enabled: !!tenant,
    queryKey: ["services"],
    queryFn: () => getServices(tenant!.id),
  });

  return (
    <Container id="serviços" sx={{ py: 4, background: "#f1f1f1" }}>
      <ResponsiveTypography
        initialVariant="h3"
        align="center"
        color={LIGHTBLUE}
        gutterBottom
        py={5}
        letterSpacing={2}
        sx={{ fontWeight: 800, mb: 5 }}
      >
        SERVIÇOS
      </ResponsiveTypography>
      <Grid container spacing={4}>
        {servicesQuery.data?.map((service, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
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
                  alt={service.name}
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1", // ← força quadrado
                    objectFit: "cover", // ← centraliza e corta
                    borderRadius: 100,
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    borderRadius: 100,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: LIGHTBLUE,
                    opacity: 0,
                    transition: "opacity 0.8s",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <Grid
                    container
                    sx={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Grid size={12}>
                      <Star sx={{ fontSize: 100 }} />
                    </Grid>
                    <Grid size={12}>
                      <p>{service.name}</p>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography variant="h6" color={LIGHTBLUE} textAlign="center">
                  {service.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="secondary"
                  textAlign="center"
                  fontFamily="Ubuntu"
                  py={5}
                >
                  {service.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

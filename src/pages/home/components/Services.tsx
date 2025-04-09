import { Container, Typography, Paper, Box, Grid2 } from "@mui/material";
import { services } from "./utils";

export const HomeServices = () => {
  return (
    <Container id="servicos" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Serviços
      </Typography>
      <Grid2 container spacing={4}>
        {services.map((service, index) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={index}>
            <Paper
              elevation={3}
              sx={{ overflow: "hidden", position: "relative" }}
            >
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={service.image}
                  alt={service.title}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">{service.title}</Typography>
                <Typography variant="body2">{service.description}</Typography>
              </Box>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

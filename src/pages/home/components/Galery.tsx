import { Container, Typography, Grid2, Box, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

export const HomeGallery = () => {
  // Array de nomes/índices das imagens
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Container id="galeria" sx={{ py: 4, bgcolor: "grey.900" }}>
      <Typography variant="h4" align="center" color="common.white" gutterBottom>
        Galeria de Fotos
      </Typography>
      <Grid2 container spacing={2}>
        {images.map((img, index) => (
          <Grid2 size={{ xs: 6, md: 3 }} key={index}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={`/uploads/galeria/${img}.jpg`}
                alt={`Galeria ${img}`}
                sx={{ width: "100%" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  "&:hover": { opacity: 1 },
                }}
              >
                <IconButton sx={{ color: "white" }}>
                  <Search />
                </IconButton>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};
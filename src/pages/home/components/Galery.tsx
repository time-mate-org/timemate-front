import { Container, Typography, Grid2, Box, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { BLUE } from "./utils";

export const HomeGallery = () => {
  // Array de nomes/índices das imagens
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box id="galeria" sx={{ py: 4, bgcolor: BLUE, width: 1 }}>
      <Container>
        <Typography
          py={5}
          variant="h4"
          align="center"
          color="common.white"
          fontWeight={700}
          gutterBottom
        >
          GALERIA DE FOTOS
        </Typography>
        <Grid2 container spacing={2}>
          {images.reverse().map((img, index) => (
            <Grid2 size={{ xs: 12, md: 6 }} p={2} key={index}>
              <Box sx={{ position: "relative", borderRadius: 2 }}>
                <Box
                  component="img"
                  src={`/images/galeria/${img}.jpg`}
                  alt={`Galeria ${img}`}
                  sx={{ width: "100%" ,minHeight: '100%' }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: "rgba(82, 6, 6, 0.48)",
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
    </Box>
  );
};

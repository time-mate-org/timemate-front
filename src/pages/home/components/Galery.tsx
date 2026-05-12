import { Container, Typography, Grid, Box, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { BLUE } from "./utils";
import { useDialog, useTenant } from "../../../hooks";

export const HomeGallery = () => {
  const { openImageDialog } = useDialog();
  const { tenant } = useTenant();

  return (
    <Box id="galeriadefotos" sx={{ py: 4, bgcolor: BLUE, width: 1 }}>
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
        <Grid container spacing={2}>
          {tenant?.blog_photos?.reverse().map((imgUrl, index) => (
            <Grid size={{ xs: 12, md: 6 }} p={2} key={index}>
              <Box
                sx={{ position: "relative", borderRadius: 2 }}
                onClick={() => openImageDialog(imgUrl)}
              >
                <Box
                  component="img"
                  src={imgUrl}
                  alt={`Galeria ${index}`}
                  sx={{
                    width: "100%",
                    minHeight: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

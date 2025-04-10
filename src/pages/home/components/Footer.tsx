import { Box, Grid2, Typography } from "@mui/material";
import { BLUE } from "./utils";

export const HomeFooter = () => {
  return (
    <Box component="footer" sx={{ bgcolor: BLUE, py: 2 }}>
      <Grid2 container maxWidth="lg">
        <Grid2 size={6}>
          <Typography variant="body2" color="#f1f1f1" align="center">
            <strong>Baltazar</strong> - 2025, Todos os Direitos Reservados.
          </Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="body2" color="#f1f1f1" align="center">
            Por:
            <Box
              component="a"
              href="https://github.com/timemate-org"
              color="inherit"
              sx={{ textDecoration: "none" }}
            >
              {" "}
              DRP-12
            </Box>
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};

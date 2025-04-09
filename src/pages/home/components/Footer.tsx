import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const HomeFooter = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.900", py: 2 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="white" align="center">
          <strong>Baltazar</strong> - 2025, Todos os Direitos Reservados.
        </Typography>
        <Typography variant="body2" color="white" align="center">
          Por:{" "}
          <Link
            to={{ pathname: "https://www.timemate-frontonerender.com/" }}
            color="inherit"
          >
            DRP-12
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

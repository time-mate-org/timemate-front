import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid2,
} from "@mui/material";
import { Instagram, Facebook } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ResponsiveTypography } from "../style";
import { LIGHTBLUE } from "./utils";

export const HomeContact = () => {
  const navigate = useNavigate();
  const handleRedirect = (url: string) => navigate(url);
  return (
    <Container id="contato" sx={{ py: 4 }}>
      <ResponsiveTypography
        initialVariant="h4"
        align="center"
        color={LIGHTBLUE}
        gutterBottom
      >
        FALE CONOSCO
      </ResponsiveTypography>
      <Grid2 container spacing={4}>
        {/* Formulário */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box component="form" noValidate autoComplete="off" color="info">
            <TextField
              fullWidth
              label="Nome"
              margin="normal"
              required
              sx={{ borderColor: LIGHTBLUE }}
              color="secondary"
            />
            <TextField fullWidth label="E-mail" margin="normal" required />
            <TextField
              fullWidth
              label="Mensagem"
              margin="normal"
              multiline
              rows={3}
              required
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: LIGHTBLUE }}
            >
              Enviar
            </Button>
          </Box>
        </Grid2>
        {/* Informações de contato */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Grid2 container spacing={1} pt={2}>
            <Grid2 size={2}>
              <Box component="img" src="images/background/post.png" />
            </Grid2>
            <Grid2 size={10}>
              <Grid2
                container
                spacing={1}
                sx={{
                  textAlign: "center",
                  mt: 2,
                }}
              >
                <Grid2
                  size={12}
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body1">
                      <strong>Email:</strong> baltazar@baltazar.com
                    </Typography>
                    <Typography variant="body1">
                      <strong>Telefone:</strong> 18 99125-2142
                    </Typography>
                    <Typography variant="body1">
                      <strong>Whatsapp:</strong> 18 99173-0525
                    </Typography>
                    <Typography variant="body1">
                      <strong>Local:</strong> Pereira Barreto/SP
                    </Typography>
                    <Typography variant="body1">
                      <strong>Atendimento:</strong> Segunda a Sexta
                    </Typography>
                    <Typography variant="body1">
                      <strong>Horário:</strong> 9:00 às 20:00
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2
                  size={12}
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Instagram
                    onClick={() => handleRedirect("https://instagram.com")}
                    sx={{ color: LIGHTBLUE, fontSize: 40 }}
                  />
                  <Facebook
                    onClick={() => handleRedirect("http://facebook.com")}
                    color="primary"
                    sx={{ color: LIGHTBLUE, fontSize: 40, marginLeft: 2 }}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
};

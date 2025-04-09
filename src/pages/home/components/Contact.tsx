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

export const HomeContact = () => {
  const navigate = useNavigate();
  const handleRedirect = (url: string) => navigate(url);
  return (
    <Container id="contato" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Fale Conosco
      </Typography>
      <Grid2 container spacing={4}>
        {/* Formulário */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField fullWidth label="Nome" margin="normal" required />
            <TextField fullWidth label="E-mail" margin="normal" required />
            <TextField
              fullWidth
              label="Mensagem"
              margin="normal"
              multiline
              rows={3}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Box>
        </Grid2>
        {/* Informações de contato */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
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
          <Box>
            <Instagram
              onClick={() => handleRedirect("https://instagram.com")}
              color="primary"
            />
            <Facebook
              onClick={() => handleRedirect("http://facebook.com")}
              color="primary"
            />
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

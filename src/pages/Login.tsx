import { useCallback, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../services/store";
import { useShallow } from "zustand/shallow";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Usa o Zustand para acessar o estado global
  const {
    user,
    login,
    setLoading,
    loading: isLoading,
  } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
      login: state.login,
      logout: state.logout,
      setLoading: state.setLoading,
    }))
  );

  const redirectToDashboard = useCallback(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (user) redirectToDashboard();
  }, [user, redirectToDashboard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        ml: -1,
        display: "grid",
        placeItems: "center",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "100%", sm: "0%", md: 420 }, // Responsivo: tela cheia no sm
          bgcolor: "background.paper",
          borderRadius: { xs: 0, sm: 2 }, // Sem bordas no sm
          boxShadow: {
            xs: "none",
            sm: "1px 4px 10px 5px rgba(255, 255, 255, 0.1)",
          }, // Sem sombra no sm
          p: { xs: 3, sm: 4 }, // Padding responsivo
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: { xs: "none", sm: "translateY(-2px)" }, // Efeito hover apenas em telas maiores
          },
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          color="text.primary"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Entrar
        </Typography>

        {error && (
          <Alert severity="error" sx={{ bgcolor: "error.dark", my: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          autoFocus
          slotProps={{
            input: {
              sx: { color: "text.primary" },
            },
          }}
        />

        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              sx: { color: "text.primary" },
            },
          }}
          sx={{ mt: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          sx={{
            my: 2,
            py: 1.5,
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Entrar"
          )}
        </Button>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Não tem conta?{" "}
          <Link
            href="/signup"
            underline="hover"
            sx={{
              color: "primary.main",
              fontWeight: 500,
              "&:hover": {
                textDecorationColor: "primary.light",
              },
            }}
          >
            Cadastre-se
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;

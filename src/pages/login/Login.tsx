import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Link,
  Alert,
  // CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginBox, LoginButton } from "./style";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { login } from "../../services/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // TODO: outlet loading

  const redirectToDashboard = useCallback(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (user) redirectToDashboard();
  }, [user, redirectToDashboard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user) navigate("/dashboard");
    } catch (e) {
      setError((e as Error).message);
      console.log("🚀 ~ handleSubmit ~ (e as Error).message:", (e as Error).message)
    }
  };

  return (
    <LoginBox>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "100%", sm: "0%", md: 420 }, // Responsivo: tela cheia no sm
          bgcolor: "background.paper",
          borderRadius: { xs: 0, sm: 2 }, // Sem bordas no sm
          boxShadow: {
            xs: "none",
            sm: "1px 4px 5px 2px rgba(255, 255, 255, 0.1)",
          }, // Sem sombra no sm
          p: { xs: 3, sm: 4 }, // Padding responsivo
          border: "1px solid gray",
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

        <LoginButton
          type="submit"
          variant="contained"
          fullWidth
          disabled={!email || !password} // TODO: isLoading aqui
        >
          {/* {isLoading ? (
            <CircularProgress size={24} color="inherit" /> // TODO: isLoading aqui
          ) : (
            "Entrar"
          )} */}
          Entrar
        </LoginButton>

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
            Solicite aqui.
          </Link>
        </Typography>
      </Box>
    </LoginBox>
  );
};

export default Login;

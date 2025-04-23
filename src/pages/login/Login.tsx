import { useCallback, useContext, useEffect, useState } from "react";
import { Box, TextField, Typography, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginBox, LoginButton } from "./style";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { ResponsiveTypography } from "../home/style";
import { LIGHTBLUE } from "../home/components/utils";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      setUser(user);
      if (user) navigate("/dashboard");
    } catch (e) {
      setError((e as Error).message);
      console.log(
        "🚀 ~ handleSubmit ~ (e as Error).message:",
        (e as Error).message
      );
    }
  };

  return (
    <LoginBox>
      <ResponsiveTypography
        initialVariant="h1"
        sx={{
          color: LIGHTBLUE,
          margin: 0,
          textShadow: "15px 20px 6px #1f1f1f",
        }}
      >
        BALTAZAR
      </ResponsiveTypography>
      <ResponsiveTypography
        initialVariant="h5"
        sx={{
          fontWeight: 300,
          letterSpacing: 7,
          color: "#f1f1f1",
          my: 0,
          textShadow: "5px 10px 2px #1f1f1f",
        }}
      >
        DASHBOARD
      </ResponsiveTypography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "95%", sm: "80%", md: 420 }, // Responsivo: tela cheia no sm
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
          disabled={!email || !password}
        >
          Entrar
        </LoginButton>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Não tem conta?{" "}
          <Link
            href="/signup"
            underline="hover"
            sx={{
              color: "#f1f1f1",
              fontWeight: 500,
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

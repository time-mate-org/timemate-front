import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/firebase';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: 4,
        minHeight: '400px'
      }}
    >
      <Typography variant="h5" color="text.primary" textAlign="center">
        Entrar
      </Typography>

      {error && (
        <Alert severity="error" sx={{ bgcolor: 'error.dark' }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        autoFocus
        InputProps={{
          sx: { color: 'text.primary' }
        }}
      />

      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        InputProps={{
          sx: { color: 'text.primary' }
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        sx={{
          py: 1.5,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: theme.palette.primary.dark
          }
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
      </Button>

      <Typography variant="body2" color="text.secondary" textAlign="center">
        Não tem conta?{' '}
        <Link
          href="/signup"
          underline="hover"
          sx={{
            color: 'primary.main',
            fontWeight: 500,
            '&:hover': {
              textDecorationColor: 'primary.light'
            }
          }}
        >
          Cadastre-se
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
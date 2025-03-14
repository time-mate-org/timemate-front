import { Box } from '@mui/material';

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      bgcolor: 'background.default',
      backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a1a, #0a0a0a)',
      backgroundAttachment: 'fixed',
      padding: { xs: 2, md: 0 }
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: 420,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)'
        }
      }}
    >
      {children}
    </Box>
  </Box>
);

export default AuthLayout;
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../providers/auth/AuthProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Cria uma função estável com useCallback
  const redirectToLogin = useCallback(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!user) redirectToLogin();
  }, [user, redirectToLogin]);

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        padding: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;

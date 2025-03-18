import { Box } from "@mui/material";
import { useAuthStore } from "../services/store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/shallow";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

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

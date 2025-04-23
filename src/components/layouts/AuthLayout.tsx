import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useAuth } from "../../hooks";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, isUserFetching } = useAuth();

  // Cria uma função estável com useCallback
  const redirectToLogin = useCallback(() => {
    navigate("/login", {
      replace: true,
    });
  }, [navigate]);

  useEffect(() => {
    if (!user && !isUserFetching) redirectToLogin();
  }, [user, redirectToLogin, isUserFetching]);

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

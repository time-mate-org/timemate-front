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
        minHeight: "100%",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;

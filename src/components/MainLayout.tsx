import { Box } from "@mui/material";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import { useAuthStore } from "../services/store";
import { useShallow } from "zustand/shallow";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { setError } = useAuthStore(
    useShallow((state) => ({
      setError: state.setError,
    }))
  );

  useEffect(() => {
    return () => {
      setError(undefined);
    };
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        ml: -1,
        mb: -1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "black",
      }}
    >
      <Navbar />

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "black",
          backgroundAttachment: "fixed",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export { MainLayout };

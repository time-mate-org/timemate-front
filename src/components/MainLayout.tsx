import { Box } from "@mui/material";
import { Navbar } from "./Navbar";
import { useContext } from "react";
import { LoadingContext } from "../providers/loading/LoadingProvider";
import LoadingComponent from "./loading/Loading";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useContext(LoadingContext);
  return isLoading ? (
    <LoadingComponent />
  ) : (
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

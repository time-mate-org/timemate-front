import { Box } from "@mui/material";
import { Navbar } from "./Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => (
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

export { MainLayout };

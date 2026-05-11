import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { ArrowBack } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid, useTheme, useMediaQuery } from "@mui/material";
import { OutletContainer } from "../../pages/dashboard/styled";
import { DashboardDrawer } from "../DashboardDrawer";
import { Navbar } from "../Navbar";

export const DashboardLayout = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [sectionName, setSectionName] = useState("DASHBOARD");
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setIsDrawerOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  const handleDrawerItemClick = (path: string) => {
    handleDrawerClose();
    navigate(path);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        maxWidth: "100vw",
        height: "100%",
        bgcolor: "background.paper",
        overflowX: "hidden",
      }}
    >
      <Grid size={12} sx={{ width: "100%", height: "auto" }}>
        <Navbar handleDrawerToggle={handleDrawerToggle} />
      </Grid>

      <Grid size={{ sm: 0, md: 2 }} justifyContent="center" alignItems="center">
        <Box
          component="nav"
          aria-label="mailbox folders"
          sx={{ height: "100%" }}
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant={isMdUp ? "permanent" : "temporary"}
            open={isDrawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              height: "100%",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                top: 64,
                height: "100%",
                ...(!isMdUp && { width: { xs: "66%", sm: "33%" } }),
                ...(isMdUp && { position: "relative" }),
                zIndex: 1,
              },
            }}
          >
            <DashboardDrawer handleDrawerItemClick={handleDrawerItemClick} />
          </Drawer>
        </Box>
      </Grid>

      <Grid
        size={{ sm: 12, md: 10 }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component="main"
          sx={{
            p: { xs: 0, lg: 2, xl: 3 },
            zIndex: 5,
          }}
        >
          <OutletContainer>
            <Grid container>
              <Grid size={12}>
                <Typography
                  textAlign="center"
                  color="#f1f1f1"
                  fontWeight={800}
                  fontSize={30}
                  letterSpacing={5}
                  mt={0}
                  pb={4}
                >
                  <ArrowBack
                    onClick={() => navigate(-1)}
                    sx={{
                      color: "#f1f1f1",
                      cursor: "pointer",
                      margin: "auto",
                      width: "25px",
                      mt: 2,
                      float: "left",
                    }}
                  />
                  {sectionName}
                </Typography>
              </Grid>
              <Grid
                size={12}
                sx={{
                  pt: { xs: 3, md: 0 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Outlet context={{ setSectionName }} />
              </Grid>
            </Grid>
          </OutletContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

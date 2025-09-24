import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { ArrowBack } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { OutletContainer } from "../../pages/dashboard/styled";
import { DashboardDrawer } from "../DashboardDrawer";
import { Navbar } from "../Navbar";

const drawerWidth = 240;

export const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [sectionName, setSectionName] = useState("DASHBOARD");
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerItemClick = (path: string) => {
    handleDrawerClose();
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          <DashboardDrawer handleDrawerItemClick={handleDrawerItemClick} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DashboardDrawer handleDrawerItemClick={handleDrawerItemClick} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 0, sm: 1, md: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
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
                    display: {
                      xs: "none",
                      md: "inline",
                    },
                  }}
                />
                {sectionName}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Outlet context={{ setSectionName }} />
            </Grid>
          </Grid>
        </OutletContainer>
      </Box>
    </Box>
  );
};

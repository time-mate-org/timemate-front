import {
  Box,
  Container,
  Divider,
  Grid2,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { menuItems } from "../../pages/dashboard/components/menuItems";
import {
  DashboardDrawer,
  DrawerListItem,
  OutletContainer,
} from "../../pages/dashboard/styled";
import { Navbar } from "../Navbar";
import { useAuth } from "../../hooks";
import { useState } from "react";

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sectionName, setSectionName] = useState("DASHBOARD");

  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "black",
          backgroundAttachment: "fixed",
        }}
      />
      <Container sx={{ display: "flex" }}>
        <DashboardDrawer variant="permanent" sx={{}}>
          <Box sx={{ overflow: "auto", mt: 10 }}>
            <List>
              {menuItems.map((item) => (
                <DrawerListItem
                  key={item.text}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: "#e5e5e5" }} />
                </DrawerListItem>
              ))}
              <Divider />
              <DrawerListItem key="logoutbutton" onClick={logout}>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: "#e5e5e5" }} />
              </DrawerListItem>
            </List>
          </Box>
        </DashboardDrawer>

        <OutletContainer maxWidth="xl">
          <Grid2 container>
            <Grid2 size={1}>
              <ArrowBack
                onClick={() => navigate(-1)}
                sx={{
                  color: "#f1f1f1",
                  cursor: "pointer",
                  pl: 2,
                  pb: 0,
                  pt: 2,
                }}
              />
            </Grid2>
            <Grid2 size={11}>
              <Typography
                textAlign="center"
                color="#f1f1f1"
                fontWeight={800}
                fontSize={30}
                letterSpacing={5}
                pt={1}
                pr={10}
                pb={4}
              >
                {sectionName}
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <Outlet context={{ setSectionName }} />
            </Grid2>
          </Grid2>
        </OutletContainer>
      </Container>
    </>
  );
};

export default DashboardLayout;

import {
  Box,
  Container,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { menuItems } from "../../pages/dashboard/components/menuItems";
import {
  DashboardDrawer,
  DrawerListItem,
  OutletContainer,
} from "../../pages/dashboard/styled";
import { logout } from "../../services/firebase";
import { Navbar } from "../Navbar";

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "black",
          backgroundAttachment: "fixed",
        }}
      ></Box>
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
          <Outlet />
        </OutletContainer>
      </Container>
    </>
  );
};

export default DashboardLayout;

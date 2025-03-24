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
import { menuItems } from "../pages/dashboard/components/menuItems";
import { useAuthStore } from "../services/store";
import { useShallow } from "zustand/shallow";
import {
  DashboardDrawer,
  DrawerListItem,
  OutletContainer,
} from "../pages/dashboard/styled";
import { DashboardProvider } from "../providers/DashboardProvider";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore(
    useShallow((state) => ({
      logout: state.logout,
    }))
  );

  const handleLogout = async () => {
    await logout();
    // navigate("/login");
  };

  return (
    <DashboardProvider>
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
              <DrawerListItem key="logoutbutton" onClick={handleLogout}>
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
    </DashboardProvider>
  );
};

export default DashboardLayout;

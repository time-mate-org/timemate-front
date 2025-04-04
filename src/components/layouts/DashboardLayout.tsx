import {
  Box,
  Container,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { menuItems } from "../../pages/dashboard/components/menuItems";
import { logout } from "../../services/firebase";
import {
  DashboardDrawer,
  DrawerListItem,
  OutletContainer,
} from "../../pages/dashboard/styled";
import { useContext, useEffect } from "react";
import {
  CacheType,
  FetcherContext,
} from "../../providers/fetcher/FetcherProvider";
import { LoadingContext } from "../../providers/loading/LoadingProvider";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoadingCallback } = useContext(LoadingContext);
  const { fetchResource, fetchAll } = useContext(FetcherContext);

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    const dashboardRoutes = [
      "appointments",
      "clients",
      "services",
      "professionals",
    ];
    if (dashboardRoutes.includes(path)) {
      setIsLoadingCallback(true);
      fetchResource(path as keyof CacheType);
      setIsLoadingCallback(false);
    }

    if (location.pathname === "/dashboard") {
      setIsLoadingCallback(true);
      fetchAll();
      setIsLoadingCallback(false);
    }
  }, [fetchResource, location, fetchAll, setIsLoadingCallback]);

  const handleLogout = async () => {
    await logout();
  };

  return (
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
  );
};

export default DashboardLayout;

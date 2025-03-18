import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { menuItems } from "./MenuItems";
import { useAuthStore } from "../../services/store";
import { useShallow } from "zustand/shallow";

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
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          zIndex: 1,
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: "#0a0a0a",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ overflow: "auto", mt: 10 }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  py: 2,
                  "&.Mui-selected": {
                    bgcolor: "rgba(0, 255, 157, 0.1)",
                    "&:hover": {
                      bgcolor: "rgba(0, 255, 157, 0.2)",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#e5e5e5" }} />
              </ListItemButton>
            ))}
            <Divider />
            <ListItemButton
              key="logoutbutton"
              onClick={handleLogout}
              sx={{
                py: 2,
                "&.Mui-selected": {
                  bgcolor: "rgba(0, 255, 157, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(0, 255, 157, 0.2)",
                  },
                },
              }}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "#e5e5e5" }} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#0a0a0a",
          minHeight: "100vh",
          mt: 7, // Espaço para evitar sobreposição com a navbar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;

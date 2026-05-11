import { Logout, PictureAsPdf } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { menuItems } from "../pages/dashboard/components/menuItems";
import { useAuth, useTenant } from "../hooks";
import { useNavigate } from "react-router-dom";

export const DashboardDrawer = ({
  handleDrawerItemClick,
}: {
  handleDrawerItemClick: (path: string) => void;
}) => {
  const { logout } = useAuth();
  const { tenant } = useTenant();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="img"
        src={tenant?.logo}
        alt={tenant?.blog_title || "TIMEMATE"}
        sx={{
          height: { xs: 30, sm: 30, md: 50 },
          width: "60%",
          margin: 2,
          alignSelf: "center",
          "&:hover": { cursor: "pointer" },
        }}
        onClick={() => navigate("/")}
      />

      <Divider />

      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleDrawerItemClick(path)}
            sx={{ py: 1, width: "100%" }}
          >
            <ListItemButton
              sx={{
                width: "100%",
                justifyContent: {
                  xs: "flex-start",
                  sm: "center",
                  md: "flex-start",
                },
                px: 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ display: "block", ml: 2 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          key="pdfReport"
          disablePadding
          onClick={() => navigate("/dashboard/pdfReport")}
          sx={{ py: 1, width: "100%" }}
        >
          <ListItemButton
            sx={{
              width: "100%",
              justifyContent: {
                xs: "flex-start",
                sm: "center",
                md: "flex-start",
              },
              px: 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
              <PictureAsPdf />
            </ListItemIcon>
            <ListItemText
              primary={"Relatório"}
              sx={{ display: "block", ml: 2 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          key="logout"
          disablePadding
          onClick={logout}
          sx={{ width: "100%" }}
        >
          <ListItemButton
            sx={{
              width: "100%",
              px: 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ display: "block", ml: 2 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

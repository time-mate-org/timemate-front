import { Logout, PictureAsPdf } from "@mui/icons-material";
import {
  Toolbar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { menuItems } from "../pages/dashboard/components/menuItems";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

export const DashboardDrawer = ({
  handleDrawerItemClick,
}: {
  handleDrawerItemClick: (path: string) => void;
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box
          component="img"
          src="/images/logo.png"
          alt="BALTAZAR"
          sx={{
            height: { xs: 30, sm: 30, md: 50 },
            width: "auto",
            margin: "auto",
            "&:hover": { cursor: "pointer" },
          }}
          onClick={() => navigate("/")}
        />
      </Toolbar>
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
                justifyContent: { xs: "flex-start", sm: "center", md: "flex-start" },
                px: 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>{icon}</ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ display: { xs: "block", sm: "none", md: "block" } }}
              />
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
              justifyContent: { xs: "flex-start", sm: "center", md: "flex-start" },
              px: 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
              <PictureAsPdf />
            </ListItemIcon>
            <ListItemText
              primary={"Relatório"}
              sx={{ display: { xs: "block", sm: "none", md: "block" } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="logout" disablePadding onClick={logout} sx={{ width: "100%" }}>
          <ListItemButton
            sx={{
              width: "100%",
              justifyContent: { xs: "flex-start", sm: "center", md: "flex-start" },
              px: 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ display: { xs: "block", sm: "none", md: "block" } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

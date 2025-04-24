import { Logout } from "@mui/icons-material";
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

export const DashboardDrawer = ({
  handleDrawerItemClick,
}: {
  handleDrawerItemClick: (path: string) => void;
}) => {
  const { logout } = useAuth();
  return (
    <div>
      <Toolbar>
        <Box
          component="img"
          src="/images/logo.png"
          alt="BALTAZAR"
          sx={{ height: 50, margin: "auto" }}
        />
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleDrawerItemClick(path)}
            sx={{py: 1}}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key="logout" disablePadding onClick={logout}>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

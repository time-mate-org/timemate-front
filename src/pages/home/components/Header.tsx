import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomNavItem } from "../style";
import { BLUE, LIGHTBLUE } from "./utils";
import { toTitle } from "../../../utils/string";
import { replace } from "ramda";

export const HomeHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const pages = ["início", "serviços", "galeria de fotos", "contato", "entrar"];

  const handleItemClick = (item: string) => {
    setMobileOpen(false);
    if (item === "entrar") navigate("/login");
    const itemName = replace(/\s/g, "", item);
    const ref = document.querySelector(`#${itemName}`);
    if (ref) ref.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppBar
      sx={{
        bgcolor: "#f1f1f1",
        boxShadow: "none",
        position: { xs: "fixed", md: "static" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/images/logo.png"
            alt="BALTAZAR"
            sx={{ display: { xs: "none", md: "flex" }, height: 50 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              sx={{ color: LIGHTBLUE }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ textAlign: "center" }}>
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 240,
                    bgcolor: BLUE,
                  },
                }}
              >
                <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
                  BALTAZAR
                </Typography>
                <Divider />
                <List>
                  {pages.map((item) => (
                    <div key={item}>
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ textAlign: "center" }}
                          onClick={() => handleItemClick(item)}
                        >
                          <ListItemText primary={toTitle(item)} />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Drawer>
            </Box>
          </Box>
          <Box
            component="img"
            src="/images/logo.png"
            alt="BALTAZAR"
            sx={{ display: { xs: "flex", md: "none" }, height: 50 }}
          />
          <Box flexGrow={1} />
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 8 }}>
            {pages.map((page) => (
              <CustomNavItem key={page} onClick={() => handleItemClick(page)}>
                {page}
              </CustomNavItem>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

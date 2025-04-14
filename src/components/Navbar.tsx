import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import SportsBarOutlinedIcon from "@mui/icons-material/SportsBarOutlined";

const Navbar = () => (
  <AppBar
    position="fixed"
    sx={{
      width: "100vw",
      zIndex: 99,
      ml: { sm: `240px` },
    }}
  >
    <Toolbar disableGutters sx={{ ml: 1 }}>
      <Box
        component="img"
        src="/images/logo.png"
        alt="BALTAZAR"
        sx={{ height: 50 }}
      />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          ml: 3,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        BAR BEER BALTAZAR
      </Typography>
      <ContentCutOutlinedIcon
        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
      />
      <SportsBarOutlinedIcon
        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
      />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        BALTAZAR
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
    </Toolbar>
  </AppBar>
);

export { Navbar };

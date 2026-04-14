import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu } from "@mui/icons-material";

const Navbar = ({ handleDrawerToggle }: { handleDrawerToggle: () => void }) => {
  const { breakpoints } = useTheme();
  const isMdDown = useMediaQuery(breakpoints.down("md"));

  return (
    <AppBar sx={{ width: "100%" }}>
      <Toolbar sx={{ width: "100%" }} disableGutters>
        <Grid container alignItems="center" sx={{ width: "100%" }}>
          {isMdDown ? (
            <>
              <Grid size="auto">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 2, "&:hover": { cursor: "pointer" } }}
                >
                  <Menu />
                </IconButton>
              </Grid>
              <Grid display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                  }}
                >
                  BALTAZAR
                </Typography>
              </Grid>
            </>
          ) : (
            <Grid
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  ml: 2,
                }}
              >
                BAR BEER BALTAZAR
              </Typography>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };

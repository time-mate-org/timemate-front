import { AppBar, Container, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomNavItem } from "../style";
import { useNavigate } from "react-router-dom";

export const HomeHeader = () => {
  const navigate = useNavigate();
  const sections = ["início", "serviços", "galeria", "contato", "entrar"];
  const onClick = (item: string) => {
    if(item === 'entrar') navigate('/login')
    const ref = document.querySelector(`#${item}`);
    if (ref) ref.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#f1f1f1" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/images/logo.png"
            alt="BALTAZAR"
            sx={{ height: 50 }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {/* Menu para telas maiores */}
          <Box sx={{ display: { xs: "none", md: "flex" }, paddingRight: 12 }}>
            {sections.map((item) => (
              <CustomNavItem key={item} onClick={() => onClick(item)}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </CustomNavItem>
            ))}
          </Box>
          {/* Ícone de menu para mobile */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon color="primary" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

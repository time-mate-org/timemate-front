import { HomeContact } from "./components/Contact";
import { HomeFooter } from "./components/Footer";
import { Box } from "@mui/material";
import { BarberPoleDivider } from "./components/BarberPole";
import { HomeGallery } from "./components/Galery";
import { HomeHeader } from "./components/Header";
import { HomeHero } from "./components/Heros";
import { HomeServices } from "./components/Services";

export const Home = () => (
  <Box sx={{ backgroundColor: "#f1f1f1", width: 1}}>
    <HomeHeader />
    <main>
      <HomeHero />
      <HomeServices />
      <BarberPoleDivider />
      <HomeGallery />
      <HomeContact />
    </main>
    <HomeFooter />
  </Box>
);

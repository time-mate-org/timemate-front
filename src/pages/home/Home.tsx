import { HomeContact } from "./components/Contact";
import { HomeFooter } from "./components/Footer";
import { Box } from "@mui/material";
import { BarberPoleDivider } from "./components/BarberPole";
import { HomeGallery } from "./components/Galery";
import { HomeHeader } from "./components/Header";
import { HomeHero } from "./components/Heros";
import { HomeServices } from "./components/Services";
import { containsBaltazarInName } from "./components/utils";
import { useTenant } from "../../hooks";

export const Home = () => {
  const { tenant } = useTenant();

  return (
    <Box sx={{ backgroundColor: "#f1f1f1", width: 1 }}>
      <HomeHeader />
      <main>
        <HomeHero />
        <HomeServices />
        {containsBaltazarInName(tenant?.name) && <BarberPoleDivider />}
        <HomeGallery />
        <HomeContact />
      </main>
      <HomeFooter />
    </Box>
  );
};

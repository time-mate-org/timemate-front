import { Typography, Grid2 } from "@mui/material";
import { AvailableServicesBox, ServiceBox } from "../styled";
import { useContext } from "react";
import { FetcherContext } from "../../../providers/fetcher/FetcherProvider";

export const AvailableServices = () => {
  const {
    cache: { services },
  } = useContext(FetcherContext);
  return (
    <AvailableServicesBox>
      <Typography variant="h5" sx={{ color: "#e2e8f0", mb: 2 }}>
        Serviços Disponíveis
      </Typography>
      <Grid2 container spacing={2}>
        {services?.map((service) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
            <ServiceBox>
              <Typography variant="subtitle1" sx={{ color: "#e2e8f0" }}>
                {service.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                Duração: {service.estimatedTime} min
              </Typography>
              <Typography variant="h6" sx={{ color: "#00ff9d", mt: 1 }}>
                R$ {service.price.toFixed(2)}
              </Typography>
            </ServiceBox>
          </Grid2>
        ))}
      </Grid2>
    </AvailableServicesBox>
  );
};

import { Typography, Grid } from "@mui/material";
import { AvailableServicesBox, ServiceBox } from "../styled";
import { Service } from "../../../types/models";
import { getEntity } from "../../../services/getEntity";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks";

export const AvailableServices = () => {
  const { user } = useAuth();

  const servicesQuery = useQuery({
    enabled: !!user,
    queryKey: ["services"],
    queryFn: () => getEntity<Service[]>({ user, resource: "services" }),
  });

  return (
    <AvailableServicesBox>
      <Typography variant="h5" sx={{ color: "#e2e8f0", mb: 2 }}>
        Serviços Disponíveis
      </Typography>
      <Grid container spacing={2}>
        {servicesQuery.data?.map((service) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
            <ServiceBox>
              <Typography variant="subtitle1" sx={{ color: "#e2e8f0" }}>
                {service.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                Duração: {service.estimated_time} min
              </Typography>
              <Typography variant="h6" sx={{ color: "#00ff9d", mt: 1 }}>
                R$ {service.price.toFixed(2)}
              </Typography>
            </ServiceBox>
          </Grid>
        ))}
      </Grid>
    </AvailableServicesBox>
  );
};

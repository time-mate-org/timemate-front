import { Typography, Grid2 } from "@mui/material";
import { AvailableServicesBox, ServiceBox } from "../styled";
import { useContext } from "react";
import { Service } from "../../../types/models";
import { getEntity } from "../../../services/getEntity";
import { AuthContext } from "../../../providers/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const AvailableServices = () => {
  const { user } = useContext(AuthContext);

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
      <Grid2 container spacing={2}>
        {servicesQuery.data?.map((service) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
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
          </Grid2>
        ))}
      </Grid2>
    </AvailableServicesBox>
  );
};

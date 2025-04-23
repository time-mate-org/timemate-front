import CircleIcon from "@mui/icons-material/Circle";
import { toTitle } from "../../../utils/string";
import { Grid2 } from "@mui/material";
import {
  TimelineContainer,
  HeaderGrid,
  HeaderTypography,
  ServiceGrid,
  ServiceCard,
} from "../style";
import { Service } from "../../../types/models";
import { getEntity } from "../../../services/getEntity";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks";

export const TimelineHeader = ({
  colors,
}: {
  colors: { [key: number]: string };
}) => {
  const { user } = useAuth();

  const servicesQuery = useQuery({
    enabled: !!user,
    queryKey: ["services"],
    queryFn: () => getEntity<Service[]>({ user, resource: "services" }),
  });

  return (
    <TimelineContainer
      container
      spacing={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <HeaderGrid>
        <HeaderTypography>SERVIÇOS</HeaderTypography>
      </HeaderGrid>
      {servicesQuery.data?.map((service) => (
        <ServiceGrid
          key={`service-color-${service.id}`}
          size={{ xs: 12, sm: 4, md: 3 }}
        >
          <ServiceCard container>
            <Grid2 container>
              <CircleIcon sx={{ color: colors[service?.id ?? -1] }} />
            </Grid2>
            <Grid2>
              <HeaderTypography variant="body2">
                {toTitle(service.name)}
              </HeaderTypography>
            </Grid2>
          </ServiceCard>
        </ServiceGrid>
      ))}
    </TimelineContainer>
  );
};

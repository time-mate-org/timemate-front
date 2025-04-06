import { useContext } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { FetcherContext } from "../../../providers/fetcher/FetcherProvider";
import { toTitle } from "../../../utils/string";
import { Grid2 } from "@mui/material";
import {
  TimelineContainer,
  HeaderGrid,
  HeaderTypography,
  ServiceGrid,
  ServiceCard,
} from "../style";

export const TimelineHeader = ({
  colors,
}: {
  colors: { [key: number]: string };
}) => {
  const {
    cache: { services },
  } = useContext(FetcherContext);

  return (
    <TimelineContainer container spacing={2}>
      <HeaderGrid>
        <HeaderTypography>SERVIÇOS</HeaderTypography>
      </HeaderGrid>
      {services?.map((service) => (
        <ServiceGrid
          key={`service-color-${service.id}`}
          size={{ xs: 12, sm: 4, md: 3 }}
        >
          <ServiceCard container>
            <Grid2
              container
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
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

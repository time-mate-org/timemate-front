import { Grid2, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { toTitle } from "../../../utils/string";
import { useContext } from "react";
import { FetcherContext } from "../../../providers/fetcher/FetcherProvider";

export const TimelineHeader = ({
  colors,
}: {
  colors: { [key: number]: string };
}) => {
  const {
    cache: { services },
  } = useContext(FetcherContext);
  return (
    <Grid2 container spacing={2} py={2} border="1px solid #f0f0f0">
      <Grid2 size={12}>
        <Typography align="center">SERVIÇOS</Typography>
      </Grid2>

      {services?.map((service) => (
        <Grid2
          key={`service-color-${service.id}`}
          size={{ sm: 4, md: 3 }}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid2 container>
            <Grid2
              size={{ sm: 12 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircleIcon sx={{ color: colors[service?.id ?? -1] }} />
            </Grid2>
            <Grid2 size={{ sm: 12 }}>
              <Typography align="center">{toTitle(service.name)}</Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      ))}
    </Grid2>
  );
};

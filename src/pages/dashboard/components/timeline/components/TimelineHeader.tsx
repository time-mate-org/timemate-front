import CircleIcon from "@mui/icons-material/Circle";
import { toTitle } from "../../../../../utils/string";
import { Grid2 } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { TimelineContainer, HeaderTypography } from "../style";
import { Service } from "../../../../../types/models";
import { getEntity } from "../../../../../services/getEntity";
import { useAuth } from "../../../../../hooks";

export const TimelineHeader = ({
  colors,
  date = new Date(),
  setDate,
}: {
  colors: { [key: number]: string };
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
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
      <Grid2 size={6}>
        <DatePicker
          label="Selecione o dia"
          value={date}
          onChange={(e) => setDate(e ?? new Date())}
        />
      </Grid2>
      <Grid2
        size={6}
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Grid2 size={12}>
          <HeaderTypography>SERVIÇOS</HeaderTypography>
        </Grid2>
        {servicesQuery.data?.map((service) => (
          <Grid2
            key={`service-color-${service.id}`}
            size={{ xs: 6, sm: 4, md: 3 }}
          >
            <Grid2 size={12}>
              <CircleIcon sx={{ color: colors[service?.id ?? -1] }} />
            </Grid2>
            <Grid2 size={12}>
              <HeaderTypography variant="body2">
                {toTitle(service.name)}
              </HeaderTypography>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </TimelineContainer>
  );
};

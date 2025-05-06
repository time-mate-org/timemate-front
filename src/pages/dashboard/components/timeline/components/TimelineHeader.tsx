import CircleIcon from "@mui/icons-material/Circle";
import { toTitle } from "../../../../../utils/string";
import { Grid2 } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { TimelineContainer, HeaderTypography } from "../style";
import { Appointment, Service } from "../../../../../types/models";
import { getEntity } from "../../../../../services/getEntity";
import { useAuth } from "../../../../../hooks";
import { DateInput } from "./DateInput";

export const TimelineHeader = ({
  colors,
  date = new Date(),
  appointments,
  setDate,
}: {
  colors: { [key: number]: string };
  date: Date;
  appointments: Appointment[];
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
      alignItems="start"
    >
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <DateInput appointments={appointments} date={date} setDate={setDate} />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 6 }}
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

import CircleIcon from "@mui/icons-material/Circle";
import { toTitle } from "../../../../../utils/string";
import { Grid2 } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TimelineContainer, HeaderTypography } from "../style";
import { Appointment, Service } from "../../../../../types/models";
import { getEntity } from "../../../../../services/getEntity";
import { useAuth } from "../../../../../hooks";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { CalendarDay } from "./CalendarDay";
import { isSameMonth } from "date-fns";
import { uniq } from "ramda";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [selectedMonth, setSelectedMonth] = useState<Date>(date);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const servicesQuery = useQuery({
    enabled: !!user,
    queryKey: ["services"],
    queryFn: () => getEntity<Service[]>({ user, resource: "services" }),
  });

  useEffect(() => {
    const highlightDays = uniq(
      appointments
        ?.filter((appointment) =>
          isSameMonth(new Date(appointment.start_time), selectedMonth)
        )
        .map((appointment) => new Date(appointment.start_time).getDate()) ?? []
    );

    setHighlightedDays(highlightDays ?? []);
  }, [appointments, selectedMonth]);

  return (
    <TimelineContainer
      container
      spacing={2}
      display="flex"
      justifyContent="center"
      alignItems="start"
    >
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <DatePicker
          label="Selecione o dia"
          value={date}
          onChange={(e) => {
            setDate(e as Date);
            setSelectedMonth(e as Date);
          }}
          sx={{ display: { xs: "flex", md: "none" } }}
        />
        <DateCalendar
          value={date}
          onChange={(e: Date) => setDate(e)}
          onMonthChange={(e) => setSelectedMonth(e)}
          slots={{
            day: (props) => (
              <CalendarDay
                pickerProps={props}
                highlightedDays={highlightedDays}
              />
            ),
          }}
          sx={{ color: "#f1f1f1", display: { xs: "none", md: "flex" } }}
        />
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

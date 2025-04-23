import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNextTimeSlot, getCurrentTimeSlot, getTimeSlots } from "./utils";
import { TimelineHeader } from "./components/TimelineHeader";
import { toTitle } from "../../utils/string";
import { getNewServiceColors } from "./colors";
import { Appointment, Professional, Service } from "../../types/models";
import { TimelineTableRow } from "./components/TimelineTableRow";

type AppointmentTimelineProps = {
  services: Service[];
  appointments: Appointment[];
  professionals: Professional[];
};

export const AppointmentTimeline = ({
  services,
  appointments,
  professionals,
}: AppointmentTimelineProps) => {
  const [currentTimeSlot, setCurrentTimeSlot] = useState<Date | null>();
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const [date, setDate] = useState(new Date());
  const timerRef = useRef<NodeJS.Timeout>(undefined);

  const setColorsCallback = useCallback(
    () => setColors(getNewServiceColors(services)),
    [services]
  );

  useEffect(() => {
    const setupTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      const now = new Date();
      const nextSlot = getNextTimeSlot(now);
      const timeUntilNext = nextSlot.getTime() - now.getTime();

      timerRef.current = setTimeout(() => {
        setCurrentTimeSlot(getCurrentTimeSlot(new Date()));
        setupTimer(); // Reinicia o timer
      }, timeUntilNext);
    };
    setColorsCallback();

    // Inicialização
    setCurrentTimeSlot(getCurrentTimeSlot(new Date()));
    setupTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [services, setColorsCallback]);

  return (
    <TableContainer
      component={Paper}
      sx={{ border: "1px solid fff", maxHeight: "80vh" }}
    >
      <TimelineHeader colors={colors} date={date} setDate={setDate}/>
      <Table
        stickyHeader
        sx={{ minWidth: 650, border: "1px solid fff" }}
        size="small"
        aria-label="appointments"
      >
        <TableHead>
          <TableRow>
            <TableCell>Horário</TableCell>
            {professionals?.map(({ name }) => (
              <TableCell align="center" key={`${name}-head`}>
                {toTitle(name)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {getTimeSlots(date).map((rowTimeSlot, index) => (
            <TimelineTableRow
              key={`${format(rowTimeSlot, "HH:mm")}-${index}`}
              appointments={appointments}
              colors={colors}
              currentTimeSlot={currentTimeSlot}
              professionals={professionals}
              rowTimeSlot={rowTimeSlot}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

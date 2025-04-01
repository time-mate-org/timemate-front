import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format, isToday } from "date-fns";
import { CustomTableCell, CustomTableRow } from "./style";
import { useContext, useEffect, useRef, useState } from "react";
import {
  getNextTimeSlot,
  getCurrentTimeSlot,
  getTimeSlots,
  isCurrentTimeSlot,
  isBusy,
  getCellAppointment,
} from "./utils";
import { TimelineHeader } from "./components/TimelineHeader";
import { toTitle } from "../../utils/string";
import { FetcherContext } from "../../providers/fetcher/FetcherProvider";

export const AppointmentTimeline = () => {
  const [currentTimeSlot, setCurrentTimeSlot] = useState<Date | null>();
  const {
    cache: { services, professionals, appointments: allAppointments },
  } = useContext(FetcherContext);
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const timerRef = useRef<NodeJS.Timeout>(undefined);
  const appointments =
    allAppointments?.filter((appointment) =>
      isToday(appointment.startTime as Date)
    ) ?? [];

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
    const setServiceColors = () =>
      services?.forEach((service) => {
        const newColors = colors;
        const randomColor = "#000000".replace(/0/g, function () {
          return (~~(2 + Math.random() * 6)).toString(16);
        });
        newColors[service?.id ?? -1] = randomColor;
        setColors(newColors);
      });

    // Inicialização
    setCurrentTimeSlot(getCurrentTimeSlot(new Date()));
    setupTimer();
    setServiceColors();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [colors, services]);

  return (
    <TableContainer component={Paper}>
      <TimelineHeader colors={colors} />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
          {getTimeSlots().map((rowTimeSlot, index) => (
            <CustomTableRow
              key={`${format(rowTimeSlot, "HH:mm")}-${index}`}
              isCurrentTimeSlot={isCurrentTimeSlot(
                rowTimeSlot,
                currentTimeSlot as Date
              )}
            >
              <CustomTableCell
                component="th"
                scope="row"
                isCurrentTimeSlot={isCurrentTimeSlot(
                  rowTimeSlot,
                  currentTimeSlot as Date
                )}
                isDateCell
              >
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>{format(rowTimeSlot, "HH:mm")}</Grid2>
                  <Grid2 size={6}>
                    {isCurrentTimeSlot(
                      rowTimeSlot,
                      currentTimeSlot as Date
                    ) && <ArrowForwardIosIcon sx={{ fontSize: 15 }} />}
                  </Grid2>
                </Grid2>
              </CustomTableCell>
              {professionals?.map((professional, index) => {
                const isBusyCell = isBusy({
                  professional,
                  currentTime: rowTimeSlot,
                  appointments,
                });
                const cellAppointment = getCellAppointment(
                  professional,
                  rowTimeSlot,
                  appointments
                );
                return (
                  <CustomTableCell
                    key={`${professional.name}-${index}`}
                    align="center"
                    isBusy={isBusyCell}
                    professionalColor={colors[professional.id ?? -1]}
                    isCurrentTimeSlot={isCurrentTimeSlot(
                      rowTimeSlot,
                      currentTimeSlot as Date
                    )}
                  >
                    {cellAppointment
                      ? toTitle(cellAppointment.client.name)
                      : ""}
                  </CustomTableCell>
                );
              })}
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

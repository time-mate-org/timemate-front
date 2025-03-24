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
import { format } from "date-fns";
import { Appointment } from "../../types/models";
import { mockedProfessionals } from "../../mocks/professionals";
import { CustomTableCell, CustomTableRow } from "./style";
import { useEffect, useRef, useState } from "react";
import {
  getNextTimeSlot,
  getCurrentTimeSlot,
  getTimeSlots,
  isCurrentTimeSlot,
  isBusy,
  getCellAppointment,
} from "./utils";
import { TimelineHeader } from "./components/TimelineHeader";
import { mockedServices } from "../../mocks/services";
import { toTitle } from "../../utils/string";

export const AppointmentTimeline = ({
  appointments = [],
}: {
  appointments?: Appointment[];
}) => {
  const [currentTimeSlot, setCurrentTimeSlot] = useState<Date | null>();
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const timerRef = useRef<NodeJS.Timeout>(undefined);

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
      mockedServices.forEach((service) => {
        const newColors = colors;
        const randomColor = "#000000".replace(/0/g, function () {
          return (~~(2 + Math.random() * 6)).toString(16);
        });
        newColors[service.id] = randomColor;
        setColors(newColors);
      });

    // Inicialização
    setCurrentTimeSlot(getCurrentTimeSlot(new Date()));
    setupTimer();
    setServiceColors();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [colors]);

  return (
    <TableContainer component={Paper}>
      <TimelineHeader colors={colors} />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Horário</TableCell>
            {mockedProfessionals.map(({ name }) => (
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
              {mockedProfessionals.map((professional, index) => {
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
                    professionalColor={colors[professional.id]}
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

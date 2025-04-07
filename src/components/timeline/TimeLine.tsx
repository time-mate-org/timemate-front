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
  Tooltip,
  Typography,
} from "@mui/material";
import { format, isToday } from "date-fns";
import { CustomTableCell, CustomTableRow } from "./style";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  getNextTimeSlot,
  getCurrentTimeSlot,
  getTimeSlots,
  isCurrentTimeSlot,
  isBusy,
  getCellAppointment,
  simplifyName,
} from "./utils";
import { TimelineHeader } from "./components/TimelineHeader";
import { toTitle } from "../../utils/string";
import { FetcherContext } from "../../providers/fetcher/FetcherProvider";
import { getNewServiceColors } from "./colors";
import { useNavigate } from "react-router-dom";

export const AppointmentTimeline = () => {
  const [currentTimeSlot, setCurrentTimeSlot] = useState<Date | null>();
  const {
    cache: { services, professionals, appointments: allAppointments },
  } = useContext(FetcherContext);
  const navigate = useNavigate();
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const timerRef = useRef<NodeJS.Timeout>(undefined);
  const appointments =
    allAppointments?.filter((appointment) =>
      isToday(appointment.startTime as Date)
    ) ?? [];

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
      <TimelineHeader colors={colors} />
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
                  <Grid2 size={8}>{format(rowTimeSlot, "HH:mm")}</Grid2>
                  <Grid2 size={4}>
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
                    professionalColor={colors[cellAppointment?.service.id ?? -1]}
                    onClick={() =>
                      navigate(
                        `/dashboard/appointment/edit/${cellAppointment?.id}`
                      )
                    }
                    isCurrentTimeSlot={isCurrentTimeSlot(
                      rowTimeSlot,
                      currentTimeSlot as Date
                    )}
                  >
                    <Tooltip
                      title={`${cellAppointment?.professional.name} x ${
                        cellAppointment?.client.name
                      } | ${cellAppointment?.service.name} | ${format(
                        rowTimeSlot as Date,
                        "HH:mm"
                      )}`}
                    >
                      <Typography m={0} p={0} fontSize={13}>
                        {cellAppointment
                          ? toTitle(simplifyName(cellAppointment.client.name))
                          : ""}
                      </Typography>
                    </Tooltip>
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

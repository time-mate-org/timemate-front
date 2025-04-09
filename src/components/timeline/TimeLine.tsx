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
import { getNewServiceColors } from "./colors";
import { useNavigate } from "react-router-dom";
import { Appointment, Professional, Service } from "../../types/models";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { getEntity } from "../../services/getEntity";
import { toUTCDate } from "../../utils/date";
import { LoadingContext } from "../../providers/loading/LoadingProvider";

export const AppointmentTimeline = () => {
  const { user } = useContext(AuthContext);
  const { setIsLoadingCallback } = useContext(LoadingContext);
  const [currentTimeSlot, setCurrentTimeSlot] = useState<Date | null>();
  const navigate = useNavigate();
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const timerRef = useRef<NodeJS.Timeout>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  const fetchData = useCallback(async () => {
    const fetchedProfessionals = await getEntity<Professional[]>({
      user,
      resource: "professionals",
    });
    const fetchedServices = await getEntity<Service[]>({
      user,
      resource: "services",
    });
    const fetchedAppointments = await getEntity<Appointment[]>({
      user,
      resource: "appointments",
    });
    setProfessionals(fetchedProfessionals);
    setServices(fetchedServices);
    setAppointments(
      fetchedAppointments.filter((appointment) =>
        isToday(toUTCDate(appointment.start_time))
      )
    );
  }, [user]);

  useEffect(() => {
    setIsLoadingCallback(true);
    fetchData();
    setIsLoadingCallback(false);
  }, [fetchData, setIsLoadingCallback]);

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
                    professionalColor={
                      colors[cellAppointment?.service.id ?? -1]
                    }
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

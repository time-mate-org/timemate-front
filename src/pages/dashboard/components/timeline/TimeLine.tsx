import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNextTimeSlot, getCurrentTimeSlot, getTimeSlots } from "./utils";
import { TimelineHeader } from "./components/TimelineHeader";
import { toTitle } from "../../../../utils/string";
import { getNewServiceColors } from "./colors";
import { Appointment, Professional, Service } from "../../../../types/models";
import { TimelineTableRow } from "./components/TimelineTableRow";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../hooks";
import { getEntity } from "../../../../services/getEntity";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../../../components/types/OutletContext";

export const AppointmentTimeline = () => {
  const { user } = useAuth();
  const [currentTimeSlot, setCurrentTimeSlot] = useState<Date | null>();
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const [date, setDate] = useState(new Date());
  const timerRef = useRef<NodeJS.Timeout>(undefined);
  const { setSectionName } = useOutletContext<OutletContextType>();

  setSectionName("TIMELINE");
  
  const professionalsQuery = useQuery({
    enabled: !!user,
    queryKey: ["professionals"],
    queryFn: () =>
      getEntity<Professional[]>({ user, resource: "professionals" }),
  });
  const servicesQuery = useQuery({
    enabled: !!user,
    queryKey: ["services"],
    queryFn: () => getEntity<Service[]>({ user, resource: "services" }),
  });
  const appointmentsQuery = useQuery({
    enabled: !!user,
    queryKey: ["appointments"],
    queryFn: () => getEntity<Appointment[]>({ user, resource: "appointments" }),
  });

  const setColorsCallback = useCallback(
    () => setColors(getNewServiceColors(servicesQuery.data ?? [])),
    [servicesQuery.data]
  );
  const shouldShowTimeline =
    !servicesQuery.isLoading &&
    !professionalsQuery.isLoading &&
    servicesQuery.data &&
    professionalsQuery.data &&
    servicesQuery.data.length > 0 &&
    professionalsQuery.data.length > 0;

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
  }, [setColorsCallback]);

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      {!shouldShowTimeline ? (
        <Typography color="white" p={3} fontSize={20} textAlign='center'>
          São necessários ao menos um serviço e um profissonal para exibir a
          Timeline.
        </Typography>
      ) : (
        <Box>
          <TimelineHeader colors={colors} date={date} setDate={setDate} />
          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid fff",
              maxHeight: "80vh",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <Table
              stickyHeader
              sx={{ minWidth: 650, border: "1px solid fff" }}
              size="small"
              aria-label="appointments"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Horário</TableCell>
                  {professionalsQuery.data?.map(({ name }) => (
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
                    appointments={appointmentsQuery.data ?? []}
                    colors={colors}
                    currentTimeSlot={currentTimeSlot}
                    professionals={professionalsQuery.data ?? []}
                    rowTimeSlot={rowTimeSlot}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

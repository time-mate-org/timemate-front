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
  useTheme, // Import useTheme
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
  const theme = useTheme(); // Initialize theme
  const [currentTimeSlot, setCurrentTimeSlot] = useState<Date | null>();
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const [date, setDate] = useState(new Date());
  const timerRef = useRef<NodeJS.Timeout>(undefined);
  const { setSectionName } = useOutletContext<OutletContextType>();

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

  useEffect(() => {
    setSectionName("TIMELINE");
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
        p: { xs: 0, sm: 3 },
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column", // Ensure header and table are stacked vertically
      }}
    >
      {!shouldShowTimeline ? (
        <Typography color="text.primary" p={3} fontSize={20} textAlign="center">
          São necessários ao menos um serviço e um profissonal para exibir a
          Timeline.
        </Typography>
      ) : (
        <Box width="100%">
          <TimelineHeader // This component might need its own styling review for consistency
            colors={colors}
            date={date}
            setDate={setDate}
            appointments={appointmentsQuery.data ?? []}
          />
          <TableContainer
            component={Paper}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              maxHeight: "calc(100vh - 200px)", // Adjusted maxHeight to account for header and padding
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.background.default,
              mt: 2, // Margin top to separate from TimelineHeader
            }}
          >
            <Table
              stickyHeader
              sx={{
                minWidth: 300,
                // Removed direct border from Table, rely on TableContainer and cell borders
              }}
              size="small" // Keep size small for density, padding is handled in CustomTableCell
              aria-label="appointments timeline"
            >
              <TableHead
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderBottom: `2px solid ${theme.palette.divider}`,
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: theme.typography.fontWeightBold,
                      padding: theme.spacing(1, 1.5),
                      textAlign: "left",
                      borderBottom: 'none', // Handled by TableHead border
                    }}
                  >
                    Horário
                  </TableCell>
                  {professionalsQuery.data?.map(({ name, id }) => (
                    <TableCell
                      align="center"
                      key={`${name}-head-${id}`}
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: theme.typography.fontWeightBold,
                        padding: theme.spacing(1, 1.5),
                        borderBottom: 'none', // Handled by TableHead border
                      }}
                    >
                      {toTitle(name)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  // Ensure body background allows row/cell styles to show
                  backgroundColor: theme.palette.background.paper,
                }}
              >
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

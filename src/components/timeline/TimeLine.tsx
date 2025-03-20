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
import { isEmpty } from "ramda";
import { addMinutes, format, getHours, setHours, setMinutes } from "date-fns";
import { Appointment, Professional } from "../../types/models";
import { mockedProfessionals } from "../../mocks/professionals";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const AppointmentTimeline = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  const getTimeSlots = (): Date[] => {
    const timeSlots: Date[] = [];
    let currentTime = setHours(setMinutes(new Date(), 0), 8);
    while (getHours(currentTime) < 18) {
      timeSlots.push(currentTime);
      currentTime = addMinutes(currentTime, 15);
    }
    console.log("🚀 ~ timeSlots:", timeSlots);
    return timeSlots;
  };

  const isBusy = ({
    professional,
    currentTime,
    appointments,
  }: {
    professional: Professional;
    currentTime: Date;
    appointments: Appointment[];
  }): boolean =>
    !isEmpty(
      appointments.filter(
        ({ professionalId, service, date }) =>
          professionalId === professional.id &&
          currentTime >= date &&
          currentTime < addMinutes(date, service.estimatedTime)
      )
    );

  const isActualTimeSlot = (timeSlot: Date) => {
    // const now = new Date();
    const now = setHours(new Date(), 15);
    return now >= timeSlot && now < addMinutes(timeSlot, 15);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Horário</TableCell>
            {mockedProfessionals.map(({ name }) => (
              <TableCell align="center" key={`${name}-head`}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {getTimeSlots().map((currentTime, index) => (
            <TableRow
              key={`${format(currentTime, "HH:mm")}-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>{format(currentTime, "HH:mm")}</Grid2>
                  <Grid2 size={6}>
                    {isActualTimeSlot(currentTime) && (
                      <ArrowForwardIosIcon sx={{ fontSize: 15 }} />
                    )}
                  </Grid2>
                </Grid2>
              </TableCell>
              {mockedProfessionals.map((professional, index) => (
                <TableCell
                  key={`${professional.name}-${index}`}
                  align="center"
                  sx={{
                    backgroundColor: isBusy({
                      professional,
                      currentTime,
                      appointments,
                    })
                      ? "#cc1212"
                      : "#00ff9d",
                  }}
                >
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

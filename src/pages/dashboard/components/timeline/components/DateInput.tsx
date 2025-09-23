import { DatePicker, DateCalendar } from "@mui/x-date-pickers";
import { CalendarDay } from "./CalendarDay";
import { useState } from "react";
import { isSameMonth, toDate } from "date-fns";
import { uniq } from "ramda";
import { Appointment } from "../../../../../types/models";
import { PickerValue } from "@mui/x-date-pickers/internals";

export const DateInput = ({
  date,
  setDate,
  appointments,
  highlightFn,
}: {
  highlightFn?: (appointments: Appointment[]) => number[];
  appointments: Appointment[];
  date: Date;
  setDate: (newDate: Date) => void;
}) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(date);
  const getDaysWithAppointments = (appointments: Appointment[]): number[] =>
    uniq(
      appointments
        ?.filter((appointment) =>
          isSameMonth(new Date(appointment.start_time), selectedMonth)
        )
        .map((appointment) => new Date(appointment.start_time).getDate()) ?? []
    );
  const highLightFunction = highlightFn ?? getDaysWithAppointments;
  const highlightedDays = highLightFunction(appointments);

  return (
    <>
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
        onChange={(e: PickerValue) =>
          e ? setDate(toDate(e.toISOString())) : undefined
        }
        onMonthChange={(e) => setSelectedMonth(e)}
        slots={{
          day: (props) => (
            <CalendarDay
              pickerProps={props}
              highlightedDays={highlightedDays}
            />
          ),
        }}
<<<<<<< Updated upstream
        sx={{ color: "#f1f1f1", display: { xs: "none", md: "flex" } }}
=======
        sx={{
          color: "text.primary",
          display: { xs: "none", md: "flex" },
          backgroundColor: "background.paper",
          borderRadius: 1,
          "& .MuiPickersDay-root": {
            color: "text.primary",
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              "&:focus": {
                backgroundColor: "primary.main",
              },
            },
          },
          "& .MuiPickersDay-dayOutsideMonth": {
            color: "text.secondary",
          },
          "& .MuiPickersArrowSwitcher-button": {
            color: "text.secondary",
          },
          "& .MuiDayCalendar-weekDayLabel": {
            color: "text.secondary",
          },
        }}
>>>>>>> Stashed changes
      />
    </>
  );
};

import { DatePicker, DateCalendar } from "@mui/x-date-pickers";
import { CalendarDay } from "./CalendarDay";
import { useState } from "react";
import { isSameMonth } from "date-fns";
import { uniq } from "ramda";
import { Appointment } from "../../../../../types/models";

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
    </>
  );
};

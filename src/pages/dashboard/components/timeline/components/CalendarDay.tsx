import { Badge, useTheme } from "@mui/material";
import {
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers/PickersDay/PickersDay";

export const CalendarDay = ({
  pickerProps,
  highlightedDays,
}: {
  pickerProps: PickersDayProps<Date> & { selected?: boolean };
  highlightedDays: number[];
}) => {
  const { day, outsideCurrentMonth, selected, ...other } = pickerProps;
  const theme = useTheme();

  const hasAppointment =
    !outsideCurrentMonth && highlightedDays.includes(day.getDate());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={hasAppointment ? "✂️" : undefined}
      sx={{
        "& .MuiBadge-badge": {
          fontSize: "0.75rem",
          minWidth: "1rem",
          height: "1rem",
          padding: "0 2px",
          // Position badge slightly different if day is selected to avoid overlap with number
          top: selected ? "25%" : "20%",
          right: selected ? "25%" : "20%",
          backgroundColor: theme.palette.error.main, // Use error color for badge background for now
          color: theme.palette.getContrastText(theme.palette.error.main),
        },
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        selected={selected} // Pass selected prop to PickersDay
        sx={{
          ...(selected && { // Styles for selected day
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            "&:focus": {
              backgroundColor: theme.palette.primary.main,
            },
          }),
          ...(!selected && { // Styles for non-selected days
            color: outsideCurrentMonth ? theme.palette.text.secondary : theme.palette.text.primary,
          }),
        }}
      />
    </Badge>
  );
};

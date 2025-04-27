import { Badge } from "@mui/material";
import {
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers/PickersDay/PickersDay";

export const CalendarDay = ({
  pickerProps,
  highlightedDays,
}: {
  pickerProps: PickersDayProps<Date>;
  highlightedDays: number[];
}) => {
  const { day, outsideCurrentMonth, ...other } = pickerProps;

  const isSelected =
    !pickerProps.outsideCurrentMonth && highlightedDays.includes(day.getDate());
  return (
    <Badge
      key={pickerProps.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "✂️" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

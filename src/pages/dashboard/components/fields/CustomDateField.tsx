import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import { closestTo, set, setMinutes, toDate } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";

export const CustomDateField = <T extends object>({
  control,
  errors,
  controlName,
  format = "dd/MM hh:mm",
  justDays = false,
  label = "Data",
}: {
  control: Control<T>;
  errors: FieldErrors<T>;
  controlName: Path<T>;
  format?: string;
  justDays?: boolean;
  label?: string;
}) => {
  const helperTextMessage = errors[
    controlName as unknown as keyof FieldErrors<T>
  ]?.message as string;
  const now = new Date();
  const defaultDate =
    closestTo(now, [
      setMinutes(now, 0),
      setMinutes(now, 15),
      setMinutes(now, 30),
      setMinutes(now, 45),
    ]) ?? now;

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <Controller
        name={controlName}
        control={control}
        render={({ field }) =>
          justDays ? (
            <DatePicker
              label={label}
              value={field.value ? toDate(field.value) : defaultDate}
              onChange={(e) => field.onChange(e)}
              format={format}
              slotProps={{
                textField: {
                  helperText: helperTextMessage,
                  error: !!helperTextMessage,
                },
              }}
            />
          ) : (
            <DateTimePicker
              label={label}
              value={field.value ? toDate(field.value) : defaultDate}
              shouldDisableTime={(value, view) => {
                if (view === "minutes") {
                  const minutes = new Date(value).getMinutes();
                  return minutes % 15 !== 0;
                }
                return false;
              }}
              onChange={(e) => field.onChange(e)}
              format={format}
              minTime={set(new Date(), { hours: 8, minutes: 0, seconds: 0 })}
              maxTime={set(new Date(), { hours: 17, minutes: 45, seconds: 0 })}
              slotProps={{
                textField: {
                  helperText: helperTextMessage,
                  error: !!helperTextMessage,
                },
              }}
            />
          )
        }
      />
    </FormControl>
  );
};

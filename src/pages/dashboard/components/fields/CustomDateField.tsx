import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { AppointmentFormData } from "../../../../types/formData";
import { closestTo, set, setMinutes, toDate } from "date-fns";

export const CustomDateField = ({
  control,
  errors,
}: {
  control: Control<AppointmentFormData>;
  errors: FieldErrors<AppointmentFormData>;
}) => {
  const helperTextMessage = errors.start_time?.message;
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
        name="start_time"
        control={control}
        render={({ field }) => (
          <DateTimePicker
            label="Data"
            value={field.value ? toDate(field.value) : defaultDate}
            shouldDisableTime={(value, view) => {
              if (view === "minutes") {
                const minutes = new Date(value).getMinutes();
                return minutes % 15 !== 0;
              }
              return false;
            }}
            onChange={(e) => field.onChange(e)}
            format="dd/MM hh:mm"
            minTime={set(new Date(), { hours: 8, minutes: 0, seconds: 0 })}
            maxTime={set(new Date(), { hours: 17, minutes: 45, seconds: 0 })}
            slotProps={{
              textField: {
                helperText: helperTextMessage,
                error: !!helperTextMessage,
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};

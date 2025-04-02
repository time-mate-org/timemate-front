import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { AppointmentFormData } from "../../../../types/formData";
import { startOfHour } from "date-fns";

export const CustomDateField = ({
  control,
  errors,
}: {
  control: Control<AppointmentFormData>;
  errors: FieldErrors<AppointmentFormData>;
}) => {
  const helperTextMessage = errors.start_time?.message;

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <Controller
        name="start_time"
        control={control}
        render={({ field }) => (
          <DateTimePicker
            label="Data"
            value={
              field.value ? startOfHour(field.value) : startOfHour(new Date())
            }
            minutesStep={15}
            onChange={(newDate) => newDate}
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

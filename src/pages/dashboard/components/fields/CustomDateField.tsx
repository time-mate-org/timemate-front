import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { AppointmentFormData } from "../../../../types/formData";

export const CustomDateField = ({
  control,
  errors,
}: {
  control: Control<AppointmentFormData>;
  errors: FieldErrors<AppointmentFormData>;
}) => {
  const helperTextMessage = errors.date?.message;

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Data"
            value={field.value ? new Date(field.value) : null}
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

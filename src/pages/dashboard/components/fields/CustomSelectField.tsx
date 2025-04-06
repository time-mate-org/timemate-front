import { FormControl, MenuItem, TextField } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { AppointmentFormData } from "../../../../types/formData";
import { Client, Professional, Service } from "../../../../types/models";

export const CustomSelectField = ({
  control,
  controlName,
  label,
  errors,
  options,
}: {
  control: Control<AppointmentFormData>;
  controlName: keyof AppointmentFormData;
  label: string;
  errors: FieldErrors<AppointmentFormData>;
  options: Service[] | Professional[] | Client[];
}) => {
  const helperTextMessage = errors[controlName]?.message;

  return (
    <FormControl fullWidth sx={{ m:1, my:1.5 }}>
      <Controller
        name={controlName}
        control={control}
        render={({ field }) => (
          <TextField
            select
            label={label}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
            helperText={helperTextMessage}
            error={!!helperTextMessage}
            fullWidth
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id?.toString()}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </FormControl>
  );
};

import { FormControl, MenuItem, TextField } from "@mui/material";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import { Client, Professional, Service } from "../../../../types/models";

export const CustomSelectField = <T extends object>({
  control,
  controlName,
  label,
  errors,
  options,
}: {
  control: Control<T>;
  controlName: keyof T;
  label: string;
  errors: FieldErrors<T>;
  options: Service[] | Professional[] | Client[];
}) => {
  const helperTextMessage = errors[controlName]?.message as string;

  return (
    <FormControl fullWidth sx={{ m: 1, my: 1.5 }}>
      <Controller
        name={controlName as unknown as Path<T>}
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

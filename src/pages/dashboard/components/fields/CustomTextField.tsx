import { FormControl, TextField } from "@mui/material";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

export const CustomTextField = <T extends object>({
  label,
  name,
  register,
  errors,
}: {
  label: string;
  name: keyof T;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}) => (
  <FormControl fullWidth sx={{ m: 1 }}>
    <TextField
      label={label}
      {...register(name as unknown as Path<T>)}
      fullWidth
      margin="normal"
      slotProps={{ input: { sx: { color: "text.primary" } } }}
      error={!!errors[name]?.message}
      helperText={errors[name]?.message as unknown as string}
    />
  </FormControl>
);

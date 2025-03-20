import { FormControl, TextField } from "@mui/material";
import { UseFormRegister, FieldErrors, Path } from "react-hook-form";

export const CustomNumberField = <T extends object>({
  label,
  name,
  register,
  errors,
}: {
  label: string;
  name: keyof T;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <TextField
        label={label}
        type="number"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        {...register(name as unknown as Path<T>)}
        error={!!errors[name]?.message}
        helperText={errors[name]?.message as unknown as string}
      />
    </FormControl>
  );
};

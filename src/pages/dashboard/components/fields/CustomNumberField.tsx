import { FormControl, TextField } from "@mui/material";
import { FieldErrors, Control, Controller } from "react-hook-form";
import { ServiceFormData } from "../../../../types/formData";

export const CustomNumberField = <T extends object>({
  label,
  name,
  control,
  errors,
}: {
  label: string;
  name: keyof T;
  control: Control<ServiceFormData>;
  errors: FieldErrors<T>;
}) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <Controller
        name={name as keyof ServiceFormData}
        control={control}
        render={({ field }) => (
          <TextField
            label={label}
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            value={field.value}
            onChange={(e) => field.onChange(e)}
            error={!!errors[name]?.message}
            helperText={errors[name]?.message as unknown as string}
          />
        )}
      />
    </FormControl>
  );
};

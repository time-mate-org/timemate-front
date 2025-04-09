import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { FieldErrors, Control, Controller } from "react-hook-form";
import { ServiceFormData } from "../../../../types/formData";

export const CustomPriceField = <T extends object>({
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
          <>
            <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={field.value}
              onChange={(e) => field.onChange(e)}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              slotProps={{ input: { sx: { color: "text.primary" } } }}
              error={!!errors[name as unknown as keyof T]?.message}
              label="Preço"
            />
          </>
        )}
      />
    </FormControl>
  );
};

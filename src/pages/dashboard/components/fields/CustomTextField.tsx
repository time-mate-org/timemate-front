import { FormControl, TextField } from "@mui/material";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import { formatPhoneNumber } from "../../../../utils/string";

type CustomTextFieldPropsType<T extends object> = {
  label: string;
  formId: string;
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  isPhone?: boolean;
};

export const CustomTextField = <T extends object>({
  label,
  name,
  formId,
  control,
  errors,
  isPhone,
}: CustomTextFieldPropsType<T>) => {
  const onChange = (value: string) =>
    isPhone ? formatPhoneNumber(value) : value;

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            id={`${formId}-${name as string}`}
            label={label}
            fullWidth
            margin="normal"
            onChange={(e) => field.onChange(onChange(e.target.value))}
            value={field.value ?? ""}
            slotProps={{ input: { sx: { color: "text.primary" } } }}
            error={!!errors[name as unknown as keyof T]?.message}
            helperText={
              errors[name as unknown as keyof T]?.message as unknown as string
            }
          />
        )}
      />
    </FormControl>
  );
};

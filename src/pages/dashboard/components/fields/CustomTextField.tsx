import { FormControl, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import {
  FieldErrors,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { formatPhoneNumber } from "../../../../utils/string";

type CustomTextFieldPropsType<T extends object> = {
  label: string;
  formId: string;
  name: keyof T;
  register: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  isPhone?: boolean;
};

export const CustomTextField = <T extends object>({
  label,
  name,
  formId,
  register,
  errors,
  isPhone,
  setValue,
}: CustomTextFieldPropsType<T>) => {
  const onChange = (event: SyntheticEvent) => {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value.replace(/\D/g, "");
    const formattedValue = formatPhoneNumber(rawValue);

    if (setValue)
      setValue("phone" as Path<T>, formattedValue as PathValue<T, Path<T>>);
  };

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <TextField
        id={`${formId}-${name as string}`}
        label={label}
        {...register(name as unknown as Path<T>, {
          ...(isPhone && { onChange }),
        })}
        fullWidth
        margin="normal"
        slotProps={{ input: { sx: { color: "text.primary" } } }}
        error={!!errors[name]?.message}
        helperText={errors[name]?.message as unknown as string}
      />
    </FormControl>
  );
};

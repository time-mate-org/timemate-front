import { CircularProgress } from "@mui/material";
import { SubmitButton } from "../../styled";

export const CustomSubmitButton = ({
  isLoading,
  label = "Salvar",
  formId = "",
}: {
  isLoading: boolean;
  label?: string;
  formId: string;
}) => {
  return (
    <SubmitButton
      type="submit"
      variant="contained"
      form={formId}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={24} color="warning" /> : label}
    </SubmitButton>
  );
};

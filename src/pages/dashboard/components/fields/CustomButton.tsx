import { CircularProgress } from "@mui/material";
import { SubmitButton } from "../../styled";

export const CustomSubmitButton = ({
  isLoading,
  label = "Salvar",
}: {
  isLoading: boolean;
  label?: string;
}) => {
  return (
    <SubmitButton
      type="submit"
      variant="contained"
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={24} color="warning" /> : label}
    </SubmitButton>
  );
};

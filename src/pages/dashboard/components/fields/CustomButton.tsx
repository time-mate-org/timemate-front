import { SubmitButton } from "../../styled";

export const CustomSubmitButton = ({
  label = "Salvar",
  formId = "",
}: {
  label?: string;
  formId: string;
}) => {
  return (
    <SubmitButton type="submit" variant="contained" form={formId}>
      {label}
    </SubmitButton>
  );
};

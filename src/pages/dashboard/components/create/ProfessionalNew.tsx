import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { Professional } from "../../../../types/models";
import { professionalSchema } from "../../../../validation/professional";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { createEntity } from "../../../../services/createEntity";
import { ProfessionalFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { User } from "firebase/auth";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { cleanPhoneNumber } from "../../../../utils/string";

const ProfessionalNew = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Professional>({
    defaultValues: {
      name: "",
      phone: "",
      title: "",
    },
    resolver: joiResolver(professionalSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: Professional) => {
    let toastMessage: string = "";
    try {
      data.phone = cleanPhoneNumber(data.phone)
      await createEntity<ProfessionalFormData>(
        user as User,
        "professionals",
        data
      );
      toastMessage = `${data.name} é o novo ${data.title}.`;
      navigate("/dashboard/professionals");
    } catch (err) {
      toastMessage = `Erro na criação do profissional: ${(err as Error).message}`;
    } finally {
      showToast(toastMessage);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo profissional
      </Typography>

      <Box
        component="form"
        id="professionalCreateForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomTextField<Professional>
          errors={errors}
          formId="professionalCreateForm"
          label="Nome"
          name="name"
          control={control}
        />
        <CustomTextField<Professional>
          errors={errors}
          formId="professionalCreateForm"
          label="Título(ex: barbeiro)"
          name="title"
          control={control}
        />
        <CustomTextField<Professional>
          errors={errors}
          formId="professionalCreateForm"
          label="Telefone"
          name="phone"
          isPhone={true}
          control={control}
        />

        <CustomSubmitButton
          formId="professionalCreateForm"
        />
      </Box>
    </Box>
  );
};

export default ProfessionalNew;

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clientSchema } from "../../../../validation/client";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { Client } from "../../../../types/models";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ClientFormData } from "../../../../types/formData";
import { cleanPhoneNumber } from "../../../../utils/string";
import { createEntity } from "../../../../services/createEntity";
import { useMutation } from "@tanstack/react-query";

const ClientNew = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
    resolver: joiResolver(clientSchema),
  });
  const { showToast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const newClientMutation = useMutation({
    mutationKey: ["clientCreate"],
    mutationFn: (data: ClientFormData) =>
      createEntity<ClientFormData>(user as User, "clients", data),
  });

  const onSubmit = async (data: ClientFormData) => {
    let toastMessage: string = "";
    data.phone = cleanPhoneNumber(data.phone);
    try {
      newClientMutation.mutate(data);
      toastMessage = `O cliente ${data.name} foi criado com sucesso.`;
      navigate("/dashboard/clients");
    } catch (err) {
      toastMessage = `Erro na criação do cliente: ${(err as Error).message}`;
    } finally {
      showToast(toastMessage);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo Cliente
      </Typography>

      <Box
        component="form"
        id="clientCreateForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomTextField<Client>
          errors={errors}
          formId="clientCreateForm"
          label="Nome"
          name="name"
          control={control}
        />

        <CustomTextField<Client>
          errors={errors}
          formId="clientCreateForm"
          label="Endereço"
          name="address"
          control={control}
        />

        <CustomTextField<Client>
          errors={errors}
          formId="clientCreateForm"
          label="Telefone"
          name="phone"
          isPhone={true}
          control={control}
        />

        <CustomSubmitButton formId="clientCreateForm" />
      </Box>
    </Box>
  );
};

export default ClientNew;

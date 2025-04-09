import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { updateEntity } from "../../../../services/updateEntity";
import { ClientFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { cleanPhoneNumber } from "../../../../utils/string";
import { clientSchema } from "../../../../validation/client";
import { getEntity } from "../../../../services/getEntity";
import { Client } from "../../../../types/models";

const ClientEdit = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const { isLoading, setIsLoadingCallback } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: joiResolver(clientSchema),
  });

  const backToClients = useCallback(
    () => navigate("/dashboard/clients"),
    [navigate]
  );

  const setValueCallback = useCallback(
    (field: keyof ClientFormData, value: string | number | undefined) =>
      setValue(field, value),
    [setValue]
  );

  const fetchData = useCallback(async () => {
    const fetchedClient = await getEntity<Client>({
      user,
      resource: "clients",
      id: parseInt(id ?? "0"),
    });

    if (!fetchedClient) backToClients();

    setValueCallback("name", fetchedClient.name);
    setValueCallback("phone", fetchedClient.phone);
    setValueCallback("address", fetchedClient.address);
  }, [backToClients, id, setValueCallback, user]);

  useEffect(() => {
    setIsLoadingCallback(true);
    fetchData();
    setIsLoadingCallback(false);
  }, [fetchData, setIsLoadingCallback]);

  const onSubmit = async (data: ClientFormData) => {
    let toastMessage: string = "";

    try {
      setIsLoadingCallback(true);
      data.phone = cleanPhoneNumber(data.phone as string);
      await updateEntity<ClientFormData>({
        user: user as User,
        resource: "clients",
        entityId: parseInt(id as string),
        payload: data,
      });
      toastMessage = `Cliente ${data.name} atualizado com sucesso.`;
      navigate("/dashboard/clients");
    } catch (err) {
      toastMessage = `Erro na atualização do cliente: ${
        (err as Error).message
      }`;
    } finally {
      setIsLoadingCallback(false);
      showToast(toastMessage);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Editar Cliente
      </Typography>

      <Box
        component="form"
        id="clientEditForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomTextField<ClientFormData>
          formId="clientEditForm"
          errors={errors}
          label="Nome"
          name="name"
          control={control}
        />
        <CustomTextField<ClientFormData>
          formId="clientEditForm"
          errors={errors}
          label="endereço"
          name="address"
          control={control}
        />
        <CustomTextField<ClientFormData>
          formId="clientEditForm"
          errors={errors}
          label="Celular"
          name="phone"
          isPhone={true}
          control={control}
        />

        <CustomSubmitButton formId="clientEditForm" isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ClientEdit;

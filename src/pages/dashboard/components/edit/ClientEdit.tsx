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
import { FetcherContext } from "../../../../providers/fetcher/FetcherProvider";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { cleanPhoneNumber, formatPhoneNumber } from "../../../../utils/string";
import { clientSchema } from "../../../../validation/client";

const ClientEdit = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const {
    cache: { clients },
  } = useContext(FetcherContext);
  const { isLoading, setIsLoadingCallback } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
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
  const showToastCallback = useCallback(
    (message: string) => showToast(message),
    [showToast]
  );
  const setValueCallback = useCallback(
    (field: keyof ClientFormData, value: string | number | undefined) =>
      setValue(field, value),
    [setValue]
  );

  useEffect(() => {
    const getClient = async () => {
      if (!id) return;

      try {
        setIsLoadingCallback(true);

        const client = clients.find((s) => s.id === parseInt(id));

        if (client) {
          setValueCallback("name", client.name);
          setValueCallback("address", client.address);
          setValueCallback("phone", formatPhoneNumber(client.phone));
        } else {
          showToastCallback("Id de cliente inexistente.");
          backToClients();
        }
      } catch (err) {
        showToastCallback(
          `Erro ao carregar cliente: ${(err as Error).message}`
        );
      } finally {
        setIsLoadingCallback(false);
      }
    };

    getClient();
  }, [
    id,
    showToastCallback,
    user,
    setValueCallback,
    isLoading,
    setIsLoadingCallback,
    backToClients,
    clients,
  ]);

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
          register={register}
        />
        <CustomTextField<ClientFormData>
          formId="clientEditForm"
          errors={errors}
          label="endereço"
          name="address"
          register={register}
        />
        <CustomTextField<ClientFormData>
          formId="clientEditForm"
          errors={errors}
          label="Celular"
          name="phone"
          setValue={setValue}
          isPhone={true}
          register={register}
        />

        <CustomSubmitButton formId="clientEditForm" isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ClientEdit;

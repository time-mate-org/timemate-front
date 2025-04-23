import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { updateEntity } from "../../../../services/updateEntity";
import { ClientFormData } from "../../../../types/formData";
import { cleanPhoneNumber, formatPhoneNumber } from "../../../../utils/string";
import { clientSchema } from "../../../../validation/client";
import { getEntity } from "../../../../services/getEntity";
import { Client } from "../../../../types/models";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useToast } from "../../../../hooks";

const ClientEdit = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const clientQuery = useQuery({
    enabled: !!user,
    queryKey: ["clients"],
    queryFn: () =>
      getEntity<Client>({
        user,
        resource: "clients",
        id: parseInt(id ?? "-1"),
      }),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: joiResolver(clientSchema),
  });

  const setValueCallback = useCallback(
    (
      field: "id" | "name" | "address" | "phone",
      newValue: string | number | undefined
    ) => setValue(field, newValue),
    [setValue]
  );

  const updateClientMutation = useMutation({
    mutationFn: (data: ClientFormData) =>
      updateEntity<ClientFormData>({
        user: user as User,
        resource: "clients",
        entityId: parseInt(id ?? "0"),
        payload: data,
      }),
    mutationKey: ["clientUpdate"],
  });

  useEffect(() => {
    const { data } = clientQuery;
    if (data && data.phone) {
      const { name, phone, address } = data;
      setValueCallback("name", name);
      setValueCallback("phone", formatPhoneNumber(phone));
      setValueCallback("address", address);
    }
  }, [clientQuery, setValueCallback]);

  const onSubmit = async (data: ClientFormData) => {
    let toastMessage: string = "";

    try {
      data.phone = cleanPhoneNumber(data.phone as string);
      updateClientMutation.mutate(data);
      toastMessage = `Cliente ${data.name} atualizado com sucesso.`;
      navigate("/dashboard/clients");
    } catch (err) {
      toastMessage = `Erro na atualização do cliente: ${
        (err as Error).message
      }`;
    } finally {
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

        <CustomSubmitButton formId="clientEditForm" />
      </Box>
    </Box>
  );
};

export default ClientEdit;

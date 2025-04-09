import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { serviceSchema } from "../../../../validation/service";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomNumberField } from "../fields/CustomNumberField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { updateEntity } from "../../../../services/updateEntity";
import { ServiceFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { Service } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { CustomPriceField } from "../fields/CustomPriceField";

const ServiceEdit = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, setIsLoadingCallback } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: joiResolver(serviceSchema),
  });

  const backToServices = useCallback(
    () => navigate("/dashboard/services"),
    [navigate]
  );

  const setValueCallback = useCallback(
    (field: keyof ServiceFormData, value: string | number | undefined) =>
      setValue(field, value),
    [setValue]
  );

  const fetchData = useCallback(async () => {
    const fetchedService = await getEntity<Service>({
      user,
      resource: "services",
      id: parseInt(id ?? "0"),
    });

    if (!fetchedService) backToServices();

    setValueCallback("name", fetchedService.name);
    setValueCallback("estimated_time", fetchedService.estimated_time);
    setValueCallback("price", fetchedService.price);
  }, [backToServices, id, setValueCallback, user]);

  useEffect(() => {
    setIsLoadingCallback(true);
    fetchData();
    setIsLoadingCallback(false);
  }, [fetchData, setIsLoadingCallback]);

  const onSubmit = async (data: ServiceFormData) => {
    let toastMessage: string = "";

    try {
      setIsLoadingCallback(true);
      await updateEntity<ServiceFormData>({
        user: user as User,
        resource: "services",
        entityId: parseInt(id as string),
        payload: data,
      });
      toastMessage = `Serviço ${data.name} atualizado com sucesso.`;
      navigate("/dashboard/services");
    } catch (err) {
      toastMessage = `Erro na atualização do serviço: ${
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
        Editar Serviço
      </Typography>

      <Box
        component="form"
        id="serviceEditForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomTextField<ServiceFormData>
          formId="serviceEditForm"
          errors={errors}
          label="Nome"
          name="name"
          control={control}
        />

        <CustomNumberField<ServiceFormData>
          label="Tempo estimado (em minutos)"
          name="estimated_time"
          control={control}
          errors={errors}
        />

        <CustomPriceField
          control={control}
          errors={errors}
          label="Preço"
          name="price"
        />

        <CustomSubmitButton formId="serviceEditForm" isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ServiceEdit;

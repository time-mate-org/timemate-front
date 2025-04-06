import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { serviceSchema } from "../../../../validation/service";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomNumberField } from "../fields/CustomNumberField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { updateEntity } from "../../../../services/updateEntity";
import { ServiceFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { FetcherContext } from "../../../../providers/fetcher/FetcherProvider";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";

const ServiceEdit = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const {
    cache: { services },
  } = useContext(FetcherContext);
  const { isLoading, setIsLoadingCallback } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
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
  const showToastCallback = useCallback(
    (message: string) => showToast(message),
    [showToast]
  );
  const setValueCallback = useCallback(
    (field: keyof ServiceFormData, value: string | number | undefined) =>
      setValue(field, value),
    [setValue]
  );

  useEffect(() => {
    const getService = async () => {
      if (!id) return;

      try {
        setIsLoadingCallback(true);

        const service = services.find((s) => s.id === parseInt(id));

        if (service) {
          setValueCallback("name", service.name);
          setValueCallback("price", service.price);
          setValueCallback("estimated_time", service.estimated_time);
        } else {
          showToastCallback("Id de serviço inexistente.");
          backToServices();
        }
      } catch (err) {
        showToastCallback(
          `Erro ao carregar serviço: ${(err as Error).message}`
        );
      } finally {
        setIsLoadingCallback(false);
      }
    };

    getService();
  }, [
    id,
    backToServices,
    showToastCallback,
    user,
    setValueCallback,
    services,
    isLoading,
    setIsLoadingCallback,
  ]);

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
          register={register}
        />

        <CustomNumberField<ServiceFormData>
          label="Tempo estimado (em minutos)"
          name="estimated_time"
          register={register}
          errors={errors}
        />

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Preço</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            {...register("price")}
            startAdornment={
              <InputAdornment position="start">R$</InputAdornment>
            }
            label="Preço"
          />
        </FormControl>

        <CustomSubmitButton formId="serviceEditForm" isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ServiceEdit;

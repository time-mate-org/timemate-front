import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { Service } from "../../../../types/models";
import { serviceSchema } from "../../../../validation/service";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomNumberField } from "../fields/CustomNumberField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { createEntity } from "../../../../services/createEntity";
import { ServiceFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { CustomPriceField } from "../fields/CustomPriceField";
import { useMutation } from "@tanstack/react-query";

const ServiceNew = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: "",
      price: 0.0,
      estimated_time: 0,
    },
    resolver: joiResolver(serviceSchema),
  });
  const navigate = useNavigate();
  const newServiceMutation = useMutation({
    mutationKey: ["serviceCreate"],
    mutationFn: (data: ServiceFormData) =>
      createEntity<ServiceFormData>(user as User, "services", data),
  });

  const onSubmit = async (data: ServiceFormData) => {
    let toastMessage: string = "";
    try {
      newServiceMutation.mutate(data);
      toastMessage = `Agora ${data.name} é mais um serviço que oferecemos.`;
      navigate("/dashboard/services");
    } catch (err) {
      toastMessage = `Erro na criação do serviço: ${(err as Error).message}`;
    } finally {
      showToast(toastMessage);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo Serviço
      </Typography>

      <Box
        component="form"
        id="serviceCreateForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomTextField<Service>
          formId="serviceCreateForm"
          errors={errors}
          label="Nome"
          name="name"
          control={control}
        />

        <CustomNumberField<Service>
          label="Tempo estimado(em minutos)"
          name="estimated_time"
          control={control}
          errors={errors}
        />

        <CustomPriceField
          label="Preço"
          name="price"
          control={control}
          errors={errors}
        />

        <CustomSubmitButton formId="serviceCreateForm" />
      </Box>
    </Box>
  );
};

export default ServiceNew;

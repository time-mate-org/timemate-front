import { useForm, useWatch } from "react-hook-form";
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
import { CustomPriceField } from "../fields/CustomPriceField";
import { useMutation } from "@tanstack/react-query";
import { useAuth, useToast } from "../../../../hooks";

const ServiceNew = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: "",
      price: 0.0,
      estimated_time: 0,
      description: "",
      image: "",
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

  const image = useWatch({ control, name: "image" });

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

        <CustomTextField<Service>
          formId="serviceCreateForm"
          errors={errors}
          label="Descrição"
          name="description"
          control={control}
        />

        <CustomTextField<Service>
          formId="serviceCreateForm"
          errors={errors}
          label="URL da Imagem"
          name="image"
          control={control}
        />

        <CustomSubmitButton formId="serviceCreateForm" />
      </Box>

      {image && (
        <Box
          component="img"
          src={control._formValues.image}
          alt="Preview"
          sx={{
            mt: 3,
            maxWidth: "100%",
            maxHeight: 200,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
    </Box>
  );
};

export default ServiceNew;

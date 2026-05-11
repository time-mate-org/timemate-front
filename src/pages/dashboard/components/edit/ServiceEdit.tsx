import { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { Service } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { CustomPriceField } from "../fields/CustomPriceField";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useToast } from "../../../../hooks";

const ServiceEdit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams<{ id: string }>();
  const serviceQuery = useQuery({
    enabled: !!user,
    queryKey: ["service"],
    queryFn: () =>
      getEntity<Service>({
        user,
        resource: "services",
        id: parseInt(id ?? "-1"),
      }),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: joiResolver(serviceSchema),
  });

  const setValueCallback = useCallback(
    (
      field:
        | "id"
        | "name"
        | "estimated_time"
        | "price"
        | "image"
        | "description",
      newValue: string | number | undefined,
    ) => setValue(field, newValue),
    [setValue],
  );

  const updateServiceMutation = useMutation({
    mutationFn: (data: ServiceFormData) =>
      updateEntity<ServiceFormData>({
        user: user as User,
        resource: "services",
        entityId: parseInt(id ?? "0"),
        payload: data,
      }),
    mutationKey: ["serviceUpdate"],
  });

  useEffect(() => {
    const { data } = serviceQuery;
    if (data && data.price) {
      const { name, estimated_time, price, image, description } = data;
      setValueCallback("name", name);
      setValueCallback("estimated_time", estimated_time);
      setValueCallback("price", price);
      setValueCallback("image", image);
      setValueCallback("description", description);
    }
  }, [serviceQuery, setValueCallback]);

  const onSubmit = async (data: ServiceFormData) => {
    let toastMessage: string = "";

    try {
      updateServiceMutation.mutate(data);
      toastMessage = `Serviço ${data.name} atualizado com sucesso.`;
      navigate("/dashboard/services");
    } catch (err) {
      toastMessage = `Erro na atualização do serviço: ${
        (err as Error).message
      }`;
    } finally {
      showToast(toastMessage);
    }
  };

  const image = useWatch({ control, name: "image" });

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

export default ServiceEdit;

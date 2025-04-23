import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { updateEntity } from "../../../../services/updateEntity";
import { ProfessionalFormData } from "../../../../types/formData";
import { cleanPhoneNumber, formatPhoneNumber } from "../../../../utils/string";
import { professionalSchema } from "../../../../validation/professional";
import { Professional } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useToast } from "../../../../hooks";

const ProfessionalEdit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams<{ id: string }>();
  const professionalQuery = useQuery({
    enabled: !!user,
    queryKey: ["professionals"],
    queryFn: () =>
      getEntity<Professional>({
        user,
        resource: "professionals",
        id: parseInt(id ?? "-1"),
      }),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfessionalFormData>({
    resolver: joiResolver(professionalSchema),
  });

  const setValueCallback = useCallback(
    (
      field: "id" | "name" | "title" | "phone",
      newValue: string | number | undefined
    ) => setValue(field, newValue),
    [setValue]
  );

  const updateProfessionalMutation = useMutation({
    mutationFn: (data: ProfessionalFormData) =>
      updateEntity<ProfessionalFormData>({
        user: user as User,
        resource: "professionals",
        entityId: parseInt(id ?? "0"),
        payload: data,
      }),
    mutationKey: ["professionalUpdate"],
  });

  useEffect(() => {
    const { data } = professionalQuery;
    if (data && data.phone) {
      const { name, phone, title } = data;
      setValueCallback("name", name);
      setValueCallback("phone", formatPhoneNumber(phone));
      setValueCallback("title", title);
    }
  }, [professionalQuery, setValueCallback]);

  const onSubmit = async (data: ProfessionalFormData) => {
    let toastMessage: string = "";

    try {
      data.phone = cleanPhoneNumber(data.phone as string);
      updateProfessionalMutation.mutate(data);
      toastMessage = `Profissional ${data.name} atualizado com sucesso.`;
      navigate("/dashboard/professionals");
    } catch (err) {
      toastMessage = `Erro na atualização do profissional: ${
        (err as Error).message
      }`;
    } finally {
      showToast(toastMessage);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Editar Profissional
      </Typography>

      <Box
        component="form"
        id="professionalEditForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomTextField<ProfessionalFormData>
          formId="professionalEditForm"
          errors={errors}
          label="Nome"
          name="name"
          control={control}
        />
        <CustomTextField<ProfessionalFormData>
          formId="professionalEditForm"
          errors={errors}
          label="Especialidade"
          name="title"
          control={control}
        />
        <CustomTextField<ProfessionalFormData>
          formId="professionalEditForm"
          errors={errors}
          label="Celular"
          name="phone"
          isPhone={true}
          control={control}
        />

        <CustomSubmitButton formId="professionalEditForm" />
      </Box>
    </Box>
  );
};

export default ProfessionalEdit;

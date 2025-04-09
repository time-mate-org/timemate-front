import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { updateEntity } from "../../../../services/updateEntity";
import { ProfessionalFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { cleanPhoneNumber, formatPhoneNumber } from "../../../../utils/string";
import { professionalSchema } from "../../../../validation/professional";
import { Professional } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";

const ProfessionalEdit = () => {
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
  } = useForm<ProfessionalFormData>({
    resolver: joiResolver(professionalSchema),
  });

  const backToProfessionals = useCallback(
    () => navigate("/dashboard/professionals"),
    [navigate]
  );

  const setValueCallback = useCallback(
    (field: keyof ProfessionalFormData, value: string | number | undefined) =>
      setValue(field, value),
    [setValue]
  );

  const fetchData = useCallback(async () => {
    const fetchedProfessional = await getEntity<Professional>({
      user,
      resource: "professionals",
      id: parseInt(id ?? "0"),
    });
    console.log("🚀 ~ fetchData ~ fetchedProfessional:", fetchedProfessional);

    if (!fetchedProfessional) backToProfessionals();

    setValueCallback("name", fetchedProfessional.name);
    setValueCallback("phone", formatPhoneNumber(fetchedProfessional.phone));
    setValueCallback("title", fetchedProfessional.title);
  }, [backToProfessionals, id, setValueCallback, user]);

  useEffect(() => {
    setIsLoadingCallback(true);
    fetchData();
    setIsLoadingCallback(false);
  }, [fetchData, setIsLoadingCallback]);

  const onSubmit = async (data: ProfessionalFormData) => {
    let toastMessage: string = "";

    try {
      setIsLoadingCallback(true);
      data.phone = cleanPhoneNumber(data.phone as string);
      await updateEntity<ProfessionalFormData>({
        user: user as User,
        resource: "professionals",
        entityId: parseInt(id as string),
        payload: data,
      });
      toastMessage = `Profissional ${data.name} atualizado com sucesso.`;
      navigate("/dashboard/professionals");
    } catch (err) {
      toastMessage = `Erro na atualização do profissional: ${
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

        <CustomSubmitButton
          formId="professionalEditForm"
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default ProfessionalEdit;

import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { updateEntity } from "../../../../services/updateEntity";
import { ProfessionalUpdateFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { FetcherContext } from "../../../../providers/fetcher/FetcherProvider";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { cleanPhoneNumber, formatPhoneNumber } from "../../../../utils/string";
import { professionalSchema } from "../../../../validation/professional";

const ProfessionalEdit = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const {
    cache: { professionals },
  } = useContext(FetcherContext);
  const { isLoading, setIsLoadingCallback } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfessionalUpdateFormData>({
    resolver: joiResolver(professionalSchema),
  });

  const backToProfessionals = useCallback(
    () => navigate("/dashboard/professionals"),
    [navigate]
  );
  const showToastCallback = useCallback(
    (message: string) => showToast(message),
    [showToast]
  );
  const setValueCallback = useCallback(
    (
      field: keyof ProfessionalUpdateFormData,
      value: string | number | undefined
    ) => setValue(field, value),
    [setValue]
  );

  useEffect(() => {
    const getProfessional = async () => {
      if (!id) return;

      try {
        setIsLoadingCallback(true);

        const profesisonal = professionals.find((s) => s.id === parseInt(id));

        if (profesisonal) {
          setValueCallback("name", profesisonal.name);
          setValueCallback("title", profesisonal.title);
          setValueCallback("phone", formatPhoneNumber(profesisonal.phone));
        } else {
          showToastCallback("Id de serviço inexistente.");
          backToProfessionals();
        }
      } catch (err) {
        showToastCallback(
          `Erro ao carregar profissional: ${(err as Error).message}`
        );
      } finally {
        setIsLoadingCallback(false);
      }
    };

    getProfessional();
  }, [
    id,
    showToastCallback,
    user,
    setValueCallback,
    isLoading,
    setIsLoadingCallback,
    professionals,
    backToProfessionals,
  ]);

  // Função de envio do formulário
  const onSubmit = async (data: ProfessionalUpdateFormData) => {
    let toastMessage: string = "";

    try {
      setIsLoadingCallback(true);
      data.phone = cleanPhoneNumber(data.phone as string);
      await updateEntity<ProfessionalUpdateFormData>({
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
        <CustomTextField<ProfessionalUpdateFormData>
          formId="professionalEditForm"
          errors={errors}
          label="Nome"
          name="name"
          register={register}
        />
        <CustomTextField<ProfessionalUpdateFormData>
          formId="professionalEditForm"
          errors={errors}
          label="Especialidade"
          name="title"
          register={register}
        />
        <CustomTextField<ProfessionalUpdateFormData>
          formId="professionalEditForm"
          errors={errors}
          label="Celular"
          name="phone"
          setValue={setValue}
          isPhone={true}
          register={register}
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

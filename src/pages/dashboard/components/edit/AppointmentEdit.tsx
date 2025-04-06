import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { updateEntity } from "../../../../services/updateEntity";
import { AppointmentFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { FetcherContext } from "../../../../providers/fetcher/FetcherProvider";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { appointmentSchema } from "../../../../validation/appointment";
import { CustomDateField } from "../fields/CustomDateField";
import { CustomSelectField } from "../fields/CustomSelectField";

const AppointmentEdit = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const {
    cache: { appointments, services, clients, professionals },
  } = useContext(FetcherContext);
  const { isLoading, setIsLoadingCallback } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: joiResolver(appointmentSchema),
  });

  const backToAppointments = useCallback(
    () => navigate("/dashboard/appointments"),
    [navigate]
  );
  const showToastCallback = useCallback(
    (message: string) => showToast(message),
    [showToast]
  );
  const setValueCallback = useCallback(
    (field: keyof AppointmentFormData, value: string | number  | undefined) =>
      setValue(field, value),
    [setValue]
  );

  useEffect(() => {
    const getAppointment = async () => {
      if (!id) return;

      try {
        setIsLoadingCallback(true);

        const appointment = appointments.find((s) => s.id === parseInt(id));

        if (appointment) {
          setValueCallback("client_id", appointment.client.id);
          setValueCallback("professional_id", appointment.professional.id);
          setValueCallback("service_id", appointment.service.id);
          setValueCallback("start_time", appointment.startTime?.toISOString());
        } else {
          showToastCallback("Id de agendamento inexistente.");
          backToAppointments();
        }
      } catch (err) {
        showToastCallback(
          `Erro ao carregar agendamento: ${(err as Error).message}`
        );
      } finally {
        setIsLoadingCallback(false);
      }
    };

    getAppointment();
  }, [
    id,
    showToastCallback,
    user,
    setValueCallback,
    isLoading,
    setIsLoadingCallback,
    appointments,
    backToAppointments,
  ]);

  const onSubmit = async (data: AppointmentFormData) => {
    let toastMessage: string = "";

    try {
      setIsLoadingCallback(true);

      await updateEntity<AppointmentFormData>({
        user: user as User,
        resource: "appointments",
        entityId: parseInt(id as string),
        payload: data,
      });
      toastMessage = `Agendamento atualizado com sucesso.`;
      navigate("/dashboard/appointments");
    } catch (err) {
      toastMessage = `Erro na atualização do agtendamento: ${
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
        Editar Agendamento
      </Typography>

      <Box
        component="form"
        id="appointmentEditForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomDateField control={control} errors={errors} />

        <CustomSelectField
          control={control}
          controlName="service_id"
          label="Serviço"
          errors={errors}
          options={services}
        />

        <CustomSelectField
          control={control}
          controlName="client_id"
          label="Cliente"
          errors={errors}
          options={clients}
        />

        <CustomSelectField
          control={control}
          controlName="professional_id"
          label="Profissional"
          errors={errors}
          options={professionals}
        />

        <CustomSubmitButton
          formId="appointmentEditForm"
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default AppointmentEdit;

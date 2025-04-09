import { useCallback, useContext, useEffect, useState } from "react";
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
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { appointmentSchema } from "../../../../validation/appointment";
import { CustomDateField } from "../fields/CustomDateField";
import { CustomSelectField } from "../fields/CustomSelectField";
import {
  Appointment,
  Client,
  Professional,
  Service,
} from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { toUTCDate } from "../../../../utils/date";

const AppointmentEdit = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const { showToast } = useContext(ToastContext);
  const { isLoading, setIsLoadingCallback } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
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

  const setValueCallback = useCallback(
    (field: keyof AppointmentFormData, value: string | number | undefined) =>
      setValue(field, value),
    [setValue]
  );

  const fetchData = useCallback(async () => {
    const fetchedAppointment = await getEntity<Appointment>({
      user,
      resource: "appointments",
      id: parseInt(id ?? "0"),
    });

    if (!fetchedAppointment) backToAppointments();

    const fetchedClients = await getEntity<Client[]>({
      user,
      resource: "clients",
    });
    const fetchedProfessionals = await getEntity<Professional[]>({
      user,
      resource: "professionals",
    });
    const fetchedServices = await getEntity<Service[]>({
      user,
      resource: "services",
    });

    setValueCallback("client_id", fetchedAppointment.client.id);
    setValueCallback("professional_id", fetchedAppointment.professional.id);
    setValueCallback("service_id", fetchedAppointment.service.id);
    setValueCallback(
      "start_time",
      toUTCDate(fetchedAppointment.start_time).toISOString()
    );

    setServices(fetchedServices);
    setProfessionals(fetchedProfessionals);
    setClients(fetchedClients);
  }, [backToAppointments, id, setValueCallback, user]);

  useEffect(() => {
    setIsLoadingCallback(true);
    fetchData();
    setIsLoadingCallback(false);
  }, [fetchData, setIsLoadingCallback]);

  const onSubmit = async (data: AppointmentFormData) => {
    let toastMessage: string = "";

    try {
      setIsLoadingCallback(true);

      await updateEntity<AppointmentFormData>({
        user: user as User,
        resource: "appointments",
        entityId: parseInt(id ?? "0"),
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
          options={services ?? []}
        />

        <CustomSelectField
          control={control}
          controlName="client_id"
          label="Cliente"
          errors={errors}
          options={clients ?? []}
        />

        <CustomSelectField
          control={control}
          controlName="professional_id"
          label="Profissional"
          errors={errors}
          options={professionals ?? []}
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

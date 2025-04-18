import { Box, Typography } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { closestTo, format, setMinutes } from "date-fns";
import { User } from "firebase/auth";

import { appointmentSchema } from "../../../../validation/appointment";
import { AppointmentFormData } from "../../../../types/formData";
import { CustomDateField } from "../fields/CustomDateField";
import { CustomSelectField } from "../fields/CustomSelectField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { Client, Professional, Service } from "../../../../types/models";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { getEntity } from "../../../../services/getEntity";
import { createEntity } from "../../../../services/createEntity";

const AppointmentNew = () => {
  const { user } = useContext(AuthContext);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const {
    state: { professionalId, timeSlot },
  } = useLocation();
  const { showToast } = useContext(ToastContext);
  const now = new Date();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      client_id: "",
      professional_id: professionalId ?? "",
      service_id: "",
      start_time:
        timeSlot?.toISOString() ??
        (
          closestTo(now, [
            setMinutes(now, 0),
            setMinutes(now, 15),
            setMinutes(now, 30),
            setMinutes(now, 45),
          ]) ?? now
        ).toISOString(),
    },
    resolver: joiResolver(appointmentSchema),
  });
  const navigate = useNavigate();
  const { isLoading, setIsLoadingCallback } = useContext(LoadingContext);

  const onSubmit = async (data: AppointmentFormData) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    let toastMessage: string = "";
    const client = clients.find(
      (client) => client.id === data.client_id
    ) as Client;
    const service = services?.find(
      (service: Service) => service.id === data.service_id
    ) as Service;
    const professional = professionals?.find(
      (professional) => professional.id === data.professional_id
    ) as Professional;

    try {
      await createEntity<AppointmentFormData>(
        user as User,
        "appointments",
        data
      );
      toastMessage = `${client.name} agendou um ${service.name} com ${
        professional.name
      } as ${format(data.start_time, "HH:mm")} do dia ${format(
        data.start_time,
        "dd/MM"
      )}`;
      navigate("/dashboard/appointments");
    } catch (err) {
      toastMessage = `Erro na criação do agendamento: ${
        (err as Error).message
      }`;
    } finally {
      showToast(toastMessage);
    }
  };

  const fetchData = useCallback(async () => {
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
    setClients(fetchedClients);
    setProfessionals(fetchedProfessionals);
    setServices(fetchedServices);
  }, [user]);

  useEffect(() => {
    setIsLoadingCallback(true);
    fetchData();
    setIsLoadingCallback(false);
  }, [fetchData, setIsLoadingCallback]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo Agendamento
      </Typography>

      <Box
        component="form"
        id="appointmentCreateForm"
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
          formId="appointmentCreateForm"
          label="salvar"
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default AppointmentNew;

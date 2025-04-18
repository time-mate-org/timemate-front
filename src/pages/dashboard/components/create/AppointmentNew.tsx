import { Box, Typography } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { closestTo, format, set } from "date-fns";
import { User } from "firebase/auth";

import { appointmentSchema } from "../../../../validation/appointment";
import { AppointmentFormData } from "../../../../types/formData";
import { CustomDateField } from "../fields/CustomDateField";
import { CustomSelectField } from "../fields/CustomSelectField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { Client, Professional, Service } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { createEntity } from "../../../../services/createEntity";
import { useMutation, useQuery } from "@tanstack/react-query";

const AppointmentNew = () => {
  const { user } = useContext(AuthContext);
  const { state } = useLocation();
  const { showToast } = useContext(ToastContext);
  const now = new Date();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      client_id: "",
      professional_id: state?.professionalId ?? "",
      service_id: "",
      start_time:
        state?.timeSlot?.toISOString() ??
        (
          closestTo(now, [
            set(now, { minutes: 0, seconds: 0, milliseconds: 0 }),
            set(now, { minutes: 15, seconds: 0, milliseconds: 0 }),
            set(now, { minutes: 30, seconds: 0, milliseconds: 0 }),
            set(now, { minutes: 45, seconds: 0, milliseconds: 0 }),
          ]) ?? now
        ).toISOString(),
    },
    resolver: joiResolver(appointmentSchema),
  });
  const navigate = useNavigate();

  const professionalsQuery = useQuery({
    enabled: !!user,
    queryKey: ["professionals"],
    queryFn: () =>
      getEntity<Professional[]>({ user, resource: "professionals" }),
  });
  const clientsQuery = useQuery({
    enabled: !!user,
    queryKey: ["clients"],
    queryFn: () => getEntity<Client[]>({ user, resource: "clients" }),
  });
  const servicesQuery = useQuery({
    enabled: !!user,
    queryKey: ["services"],
    queryFn: () => getEntity<Service[]>({ user, resource: "services" }),
  });
  const newAppointmentMutation = useMutation({
    mutationKey: [""],
    mutationFn: (data: AppointmentFormData) =>
      createEntity<AppointmentFormData>(user as User, "appointments", data),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    let toastMessage: string = "";
    const client = clientsQuery.data?.find(
      (client) => client.id === data.client_id
    );
    const service = servicesQuery.data?.find(
      (service: Service) => service.id === data.service_id
    );
    const professional = professionalsQuery.data?.find(
      (professional) => professional.id === data.professional_id
    );

    try {
      data.start_time = set(data.start_time, {
        seconds: 0,
        milliseconds: 0,
      }).toISOString();
      newAppointmentMutation.mutate(data);
      toastMessage = `${client?.name} agendou um ${service?.name} com ${
        professional?.name
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
          options={servicesQuery.data ?? []}
        />

        <CustomSelectField
          control={control}
          controlName="client_id"
          label="Cliente"
          errors={errors}
          options={clientsQuery.data ?? []}
        />

        <CustomSelectField
          control={control}
          controlName="professional_id"
          label="Profissional"
          errors={errors}
          options={professionalsQuery.data ?? []}
        />

        <CustomSubmitButton formId="appointmentCreateForm" label="salvar" />
      </Box>
    </Box>
  );
};

export default AppointmentNew;

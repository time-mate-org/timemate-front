import { Box, Typography } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { appointmentSchema } from "../../../../validation/appointment";
import { AppointmentFormData } from "../../../../types/formData";
import { CustomDateField } from "../fields/CustomDateField";
import { CustomSelectField } from "../fields/CustomSelectField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { FetcherContext } from "../../../../providers/fetcher/FetcherProvider";
import { createAppointment } from "../../../../services/appointment";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { User } from "firebase/auth";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { Client, Professional, Service } from "../../../../types/models";
import { format } from "date-fns";

const AppointmentNew = () => {
  const { user } = useContext(AuthContext);
  const {
    cache: { services, clients, professionals },
  } = useContext(FetcherContext);
  const { showToast } = useContext(ToastContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      client_id: "",
      professional_id: "",
      service_id: "",
      start_time: new Date(),
    },
    resolver: joiResolver(appointmentSchema),
  });
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  const onSubmit = async (data: AppointmentFormData) => {
    const client = clients.find(
      (client) => client.id === data.client_id
    ) as Client;
    const service = services.find(
      (service: Service) => service.id === data.service_id
    ) as Service;
    const professional = professionals.find(
      (professional) => professional.id === data.professional_id
    ) as Professional;

    createAppointment(user as User, data);
    const toastMessage = `${client.name} agendou um ${service.name} com ${
      professional.name
    } as ${format(data.start_time, "HH:mm")} do dia ${format(
      data.start_time,
      "dd/MM"
    )}`;
    showToast(toastMessage);
    navigate("/dashboard/appointments");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo Agendamento
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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

        <CustomSubmitButton label="salvar" isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default AppointmentNew;

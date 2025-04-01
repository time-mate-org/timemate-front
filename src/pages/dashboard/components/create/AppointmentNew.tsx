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

const AppointmentNew = () => {
  const { services, clients, professionals } = useContext(FetcherContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      client_id: "",
      professional_id: "",
      service_id: "",
      date: new Date(),
    },
    resolver: joiResolver(appointmentSchema),
  });
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  const onSubmit = async (data: AppointmentFormData) => {
    // Simular salvamento no estado global ou mock
    console.log("Agendamento salvo:", data);
    await navigate("/dashboard/appointments");
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

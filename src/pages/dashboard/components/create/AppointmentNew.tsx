import { Box, Typography } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { appointmentSchema } from "../../../../validation/appointment";
import { AppointmentFormData } from "../../../../types/formData";
import { mockedServices } from "../../../../mocks/services";
import { mockedProfessionals } from "../../../../mocks/professionals";
import { mockedClients } from "../../../../mocks/clients";
import { CustomDateField } from "../fields/CustomDateField";
import { CustomSelectField } from "../fields/CustomSelectField";
import { CustomSubmitButton } from "../fields/CustomButton";

const AppointmentNew = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      clientId: "",
      professionalId: "",
      serviceId: "",
      date: new Date(),
    },
    resolver: joiResolver(appointmentSchema),
  });
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  const onSubmit = async (data: AppointmentFormData) => {
    console.log("🚀 ~ onSubmit ~ data:", JSON.stringify(data, null, 2));

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
          controlName="serviceId"
          label="Serviço"
          errors={errors}
          options={mockedServices}
        />

        <CustomSelectField
          control={control}
          controlName="clientId"
          label="Cliente"
          errors={errors}
          options={mockedClients}
        />

        <CustomSelectField
          control={control}
          controlName="professionalId"
          label="Profissional"
          errors={errors}
          options={mockedProfessionals}
        />

        <CustomSubmitButton label="salvar" isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default AppointmentNew;

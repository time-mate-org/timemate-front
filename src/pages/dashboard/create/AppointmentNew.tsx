import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Client, Professional, Service } from "../../../types/models";
import { appointmentSchema } from "../../../validation/appointment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppointmentFormData } from "../../../types/formData";

type FormData = AppointmentFormData;

const mockedServices: Service[] = [
  {
    id: 1,
    name: "Corte",
    estimatedTime: 30,
    price: 29.99,
  },
];
const mockedProfessionals: Professional[] = [
  {
    id: 1,
    name: "Paulinho",
    phone: "123123123",
    title: "Barbeiro",
  },
];
const mockedClients: Client[] = [
  {
    id: 1,
    name: "João José",
    address: "casa dele, 12",
    phone: "123123123",
  },
];

const AppointmentNew = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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

  const onSubmit = async (data: FormData) => {
    console.log("🚀 ~ onSubmit ~ data:", JSON.stringify(data, null, 2));

    // Simular salvamento no estado global ou mock
    console.log("Agendamento salvo:", data);
    await navigate("/dashboard/appointments");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" mb={3} color="text.primary">
          Novo Agendamento
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newDate) =>
                    field.onChange(newDate?.format("YYYY-MM-DD"))
                  }
                  slotProps={{
                    textField: {
                      helperText: "DD/MM/YYYY",
                    },
                  }}
                  format="DD-MM-YYYY"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <Controller
              name="serviceId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Serviço"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  helperText={
                    errors.serviceId?.message ?? "Selecione o serviço."
                  }
                  error={!!errors.serviceId}
                  fullWidth
                >
                  {mockedServices.map((option) => (
                    <MenuItem key={option.id} value={option.id?.toString()}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <Controller
              name="clientId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Cliente"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  helperText={
                    errors.clientId?.message ?? "Selecione o cliente."
                  }
                  error={!!errors.clientId}
                  fullWidth
                >
                  {mockedClients.map((option) => (
                    <MenuItem key={option.id} value={option.id?.toString()}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <Controller
              name="professionalId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Profissional"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  helperText={
                    errors.professionalId?.message ??
                    "Selecione o profissional."
                  }
                  error={!!errors.professionalId}
                  fullWidth
                >
                  {mockedProfessionals.map((option) => (
                    <MenuItem key={option.id} value={option.id?.toString()}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </FormControl>

          {/* Botão de Envio */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: "#00ff9d",
              color: "#0a0a0a",
              "&:hover": { bgcolor: "#00e68a" },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Salvar"
            )}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AppointmentNew;

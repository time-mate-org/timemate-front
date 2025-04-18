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
import { useQuery } from "@tanstack/react-query";

const AppointmentEdit = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: joiResolver(appointmentSchema),
  });
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
  const appointmentQuery = useQuery({
    enabled: !!user,
    queryKey: ["appointment"],
    queryFn: () =>
      getEntity<Appointment>({
        user,
        resource: "appointments",
        id: parseInt(id ?? "-1"),
      }),
  });

  const setValueCallback = useCallback(
    (
      field:
        | "id"
        | "start_time"
        | "client_id"
        | "service_id"
        | "professional_id",
      newValue: string | number | undefined
    ) => setValue(field, newValue),
    [setValue]
  );

  useEffect(() => {
    const { data } = appointmentQuery;
    if (data && data.client) {
      const { client, service, professional, start_time } = data;
      setValueCallback("client_id", client.id);
      setValueCallback("service_id", service.id);
      setValueCallback("professional_id", professional.id);
      setValueCallback("start_time", start_time);
    }
  }, [appointmentQuery, setValueCallback]);

  const onSubmit = async (data: AppointmentFormData) => {
    let toastMessage: string = "";

    try {
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

        <CustomSubmitButton formId="appointmentEditForm" />
      </Box>
    </Box>
  );
};

export default AppointmentEdit;

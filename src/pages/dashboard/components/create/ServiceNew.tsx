import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Service } from "../../../../types/models";
import { serviceSchema } from "../../../../validation/service";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomNumberField } from "../fields/CustomNumberField";
import { CustomSubmitButton } from "../fields/CustomButton";
import { User } from "firebase/auth";
import { createEntity } from "../../../../services/createEntity";
import { ServiceFormData } from "../../../../types/formData";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";

const ServiceNew = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: "",
      price: 0.0,
      estimated_time: 0,
    },
    resolver: joiResolver(serviceSchema),
  });
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  const onSubmit = async (data: ServiceFormData) => {
    let toastMessage: string = "";
    try {
      await createEntity<ServiceFormData>(user as User, "services", data);
      toastMessage = `Agora ${data.name} é mais um serviço que oferecemos.`;
      navigate("/dashboard/services");
    } catch (err) {
      toastMessage = `Erro na criação do serviço: ${(err as Error).message}`;
    } finally {
      showToast(toastMessage);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo Serviço
      </Typography>

      <Box
        component="form"
        id="serviceCreateForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomTextField<Service>
          formId="serviceCreateForm"
          errors={errors}
          label="Nome"
          name="name"
          register={register}
        />

        <CustomNumberField<Service>
          label="Tempo estimado(em minutos)"
          name="estimated_time"
          register={register}
          errors={errors}
        />

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Preço</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            {...register("price")}
            startAdornment={
              <InputAdornment position="start">R$</InputAdornment>
            }
            label="Preço"
          />
        </FormControl>

        <CustomSubmitButton formId="serviceCreateForm" isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ServiceNew;

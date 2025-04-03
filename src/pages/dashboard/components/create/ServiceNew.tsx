import { useState } from "react";
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

const ServiceNew = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Service>({
    defaultValues: {
      name: "",
      price: 0.0,
      estimatedTime: 0,
    },
    resolver: joiResolver(serviceSchema),
  });
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  const onSubmit = async (data: Service) => {
    console.log("Serviço salvo:", data);
    navigate("/dashboard/services");
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
          name="estimatedTime"
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

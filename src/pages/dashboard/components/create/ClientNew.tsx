import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clientSchema } from "../../../../validation/client";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { Client } from "../../../../types/models";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";

const ClientNew = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
    resolver: joiResolver(clientSchema),
  });
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  const onSubmit = async (data: Client) => {
    console.log("Cliente salvo:", data);
    navigate("/dashboard/clients");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo Cliente
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CustomTextField<Client>
          errors={errors}
          label="Nome"
          name="name"
          register={register}
        />

        <CustomTextField<Client>
          errors={errors}
          label="Endereço"
          name="address"
          register={register}
        />

        <CustomTextField<Client>
          errors={errors}
          label="Telefone"
          name="phone"
          register={register}
        />

        <CustomSubmitButton isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ClientNew;

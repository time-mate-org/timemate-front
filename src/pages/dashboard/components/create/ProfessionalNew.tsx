import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Typography } from "@mui/material";
import { Professional } from "../../../../types/models";
import { professionalSchema } from "../../../../validation/professional";
import { CustomTextField } from "../fields/CustomTextField";
import { CustomSubmitButton } from "../fields/CustomButton";

const ProfessionalNew = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Professional>({
    defaultValues: {
      name: "",
      phone: "",
      title: "",
    },
    resolver: joiResolver(professionalSchema),
  });
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  const onSubmit = async (data: Professional) => {
    console.log("Profissional salvo:", data);
    navigate("/dashboard/professionals");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo profissional
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CustomTextField<Professional>
          errors={errors}
          label="Nome"
          name="name"
          register={register}
        />
        <CustomTextField<Professional>
          errors={errors}
          label="Título(ex: barbeiro)"
          name="title"
          register={register}
        />
        <CustomTextField<Professional>
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

export default ProfessionalNew;

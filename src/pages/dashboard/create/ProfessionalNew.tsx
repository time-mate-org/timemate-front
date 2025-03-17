import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { Professional } from "../../../types/models";
import { professionalSchema } from "../../../validation/professional";

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
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            label="Nome"
            {...register("name")}
            fullWidth
            margin="normal"
            InputProps={{ sx: { color: "text.primary" } }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            label="Título"
            {...register("title")}
            fullWidth
            margin="normal"
            InputProps={{ sx: { color: "text.primary" } }}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            label="Telefone"
            {...register("phone")}
            fullWidth
            margin="normal"
            InputProps={{ sx: { color: "text.primary" } }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </FormControl>

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
  );
};

export default ProfessionalNew;

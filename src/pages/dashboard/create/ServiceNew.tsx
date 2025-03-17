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
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Service } from "../../../types/models";
import { serviceSchema } from "../../../validation/service";

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
    resolver: joiResolver(serviceSchema)
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
            label="Tempo estimado(em minutos)"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("estimatedTime")}
            InputProps={{ sx: { color: "text.primary" } }}
            error={!!errors.name}
            helperText={errors.estimatedTime?.message}
          />
        </FormControl>

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

export default ServiceNew;

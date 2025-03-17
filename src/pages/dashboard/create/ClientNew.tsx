import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clientSchema } from "../../../validation/client";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { Client } from "../../../types/models";

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
            label="Endereço"
            {...register("address")}
            fullWidth
            margin="normal"
            InputProps={{ sx: { color: "text.primary" } }}
            error={!!errors.address}
            helperText={errors.address?.message}
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

export default ClientNew;

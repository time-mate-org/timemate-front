import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useContext } from "react";
import { toEstimatedTimeDisplay, toTitle } from "../../../../utils/string";
import { DialogContext } from "../../../../providers/dialog/DialogProvider";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { Service } from "../../../../types/models";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { getEntity } from "../../../../services/getEntity";
import { useMutation, useQuery } from "@tanstack/react-query";

const ServiceList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { openDialog } = useContext(DialogContext);
  const { showToast } = useContext(ToastContext);

  const servicesQuery = useQuery({
    enabled: !!user,
    queryKey: ["services"],
    queryFn: () => getEntity<Service[]>({ user, resource: "services" }),
  });
  const deleteServiceMutation = useMutation({
    mutationKey: ["serviceDelete"],
    mutationFn: async (id: number) => {
      deleteEntity(user as User, "services", id);
      await servicesQuery.refetch();
    }
  });

  const handleDelete = (service?: Service) => {
    if (service)
      openDialog({
        title: `Tem certeza que deseja excluir o/a ${service.name}?`,
        description: `A exclusão desse serviço é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: () => {
          deleteServiceMutation.mutate(service.id as number);
          showToast(`O serviço ${service.name} foi deletado com sucesso.`);
        },
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          mb: 3,
          bgcolor: "#00ff9d",
          color: "#0a0a0a",
          "&:hover": { bgcolor: "#00e68a" },
        }}
        onClick={() => navigate("/dashboard/service/new")}
      >
        Novo Serviço
      </Button>
      {servicesQuery.data && servicesQuery.data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#1a1a1a" }}>
              <TableRow>
                <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                  Serviço
                </TableCell>
                <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                  Duração
                </TableCell>
                <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                  Preço
                </TableCell>
                <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                  Operações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicesQuery.data?.map((service) => (
                <TableRow
                  key={service.id}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#121212" },
                    "&:hover": { bgcolor: "#1a1a1a" },
                  }}
                >
                  <TableCell>{toTitle(service.name)}</TableCell>
                  <TableCell>
                    {toEstimatedTimeDisplay(service.estimated_time as number)}
                  </TableCell>
                  <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        onClick={() =>
                          navigate(`/dashboard/service/edit/${service.id}`)
                        }
                        sx={{ color: "#00ff9d" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(service)}
                        sx={{ color: "#ff4444" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="#00ff9d" py={1} fontSize={15}>
          Não há serviços cadastrados.{" "}
          <strong
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/service/new")}
          >
            Cadastre um aqui.
          </strong>
        </Typography>
      )}
    </Box>
  );
};

export { ServiceList };

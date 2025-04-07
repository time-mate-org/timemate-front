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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useContext } from "react";
import { toEstimatedTimeDisplay, toTitle } from "../../../../utils/string";
import { FetcherContext } from "../../../../providers/fetcher/FetcherProvider";
import { DialogContext } from "../../../../providers/dialog/DialogProvider";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { Service } from "../../../../types/models";
import { ToastContext } from "../../../../providers/toast/ToastProvider";

const ServiceList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { openDialog } = useContext(DialogContext);
  const { showToast } = useContext(ToastContext);
  const {
    cache: { services },
  } = useContext(FetcherContext);

  const handleDelete = (service?: Service) => {
    if (service)
      openDialog({
        title: `Tem certeza que deseja excluir o/a ${service.name}?`,
        description: `A exclusão desse serviço é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: async () => {
          await deleteEntity(user as User, "services", service.id as number);
          showToast(`O serviço ${service.name} foi deletado com sucesso.`);
          navigate("/dashboard/services");
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
            {services?.map((service) => (
              <TableRow
                key={service.id}
                sx={{
                  "&:nth-of-type(odd)": { bgcolor: "#121212" },
                  "&:hover": { bgcolor: "#1a1a1a" },
                }}
              >
                <TableCell>{toTitle(service.name)}</TableCell>
                <TableCell>
                  {toEstimatedTimeDisplay(service.estimatedTime as number)}
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
    </Box>
  );
};

export { ServiceList };

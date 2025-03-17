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
import { useNavigate } from "react-router-dom"; // Imports necessários
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// Função de exclusão
const handleDelete = async (id: number) => {
  console.log("🚀 ~ handleDelete ~ id excluido: ", id);
  //   if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
  //     await deleteDoc(doc(clientsCollection, id));
  //     Atualize a lista ou use queryClient.invalidateQueries()
  //   }
};

const AppointmentList = () => {
  const navigate = useNavigate();
  const appointments = [
    {
      id: 1,
      client: { name: "João Silva", id: 1 },
      professional: { name: "Dr. Jão Silva", id: 1 },
      service: { name: "Consulta", id: 1 },
      date: new Date().toISOString(),
    },
  ];

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
        onClick={() => navigate("/dashboard/appointment/new")}
      >
        Novo Atendimento
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1a1a1a" }}>
            <TableRow>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Cliente
              </TableCell>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Profissional
              </TableCell>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Serviço
              </TableCell>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Data
              </TableCell>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Operações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((app) => (
              <TableRow
                key={app.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    bgcolor: "#121212",
                  },
                  "&:hover": { bgcolor: "#1a1a1a" },
                }}
              >
                <TableCell>{app.client.name}</TableCell>
                <TableCell>{app.professional.name}</TableCell>
                <TableCell>{app.service.name}</TableCell>
                <TableCell>{new Date(app.date).toLocaleString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      onClick={() => navigate(`edit/${app.client.id}`)}
                      sx={{ color: "#00ff9d" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(app.client.id)}
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

export { AppointmentList };

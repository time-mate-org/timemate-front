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
  Divider,
  styled,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Imports necessários
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { mockedAppointments } from "../../../mocks/appointments";
import { AppointmentTimeline } from "../../../components/timeline/TimeLine";
import { format } from "date-fns";

// Função de exclusão
const handleDelete = async (id: number) => {
  console.log("🚀 ~ handleDelete ~ id excluido: ", id);
  //   if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
  //     await deleteDoc(doc(clientsCollection, id));
  //     Atualize a lista ou use queryClient.invalidateQueries()
  //   }
};

const StyledTableCell = styled(TableCell)(() => ({
  align: "center",
  textAlign: 'center',
  color: "#f0f0f0",
  fontWeight: 600,
}));

const AppointmentList = () => {
  const navigate = useNavigate();

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
              <TableCell
                align="center"
                sx={{ color: "#00ff9d", fontWeight: 600 }}
              >
                Cliente
              </TableCell>
              <StyledTableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Profissional
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Serviço
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Data
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Operações
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockedAppointments.map((appointment) => (
              <TableRow
                key={appointment.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    bgcolor: "#121212",
                  },
                  "&:hover": { bgcolor: "#1a1a1a" },
                }}
              >
                <StyledTableCell>{appointment.client.name}</StyledTableCell>
                <StyledTableCell>
                  {appointment.professional.name}
                </StyledTableCell>
                <StyledTableCell>{appointment.service.name}</StyledTableCell>
                <StyledTableCell>
                  {format(appointment.date, "HH:mm")}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => navigate(`edit/${appointment.client.id}`)}
                    sx={{ color: "#00ff9d" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(appointment.id as number)}
                    sx={{ color: "#ff4444" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ mb: 10 }} />
      <Typography align="center" color="#00ff9d" py={1} fontSize={25}>
        TIMELINE
      </Typography>
      <AppointmentTimeline appointments={mockedAppointments} />
    </Box>
  );
};

export { AppointmentList };

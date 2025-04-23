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
import { useNavigate, useOutletContext } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { format, isToday } from "date-fns";
import { toTitle } from "../../../../utils/string";
import { StyledTableCell } from "../../styled";
import { Appointment } from "../../../../types/models";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { getEntity } from "../../../../services/getEntity";
import { toUTCDate } from "../../../../utils/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useDialog, useToast } from "../../../../hooks";
import { OutletContextType } from "../../../../components/types/OutletContext";

const AppointmentList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openDialog } = useDialog();
  const { showToast } = useToast();
  const { setSectionName } = useOutletContext<OutletContextType>();

  setSectionName("AGENDAMENTOS");

  const appointmentsQuery = useQuery({
    enabled: !!user,
    queryKey: ["appointments"],
    queryFn: () => getEntity<Appointment[]>({ user, resource: "appointments" }),
  });
  const deleteAppointmentMutation = useMutation({
    mutationKey: ["appointmentDelete"],
    mutationFn: (id: number) => deleteEntity(user as User, "appointments", id),
  });

  const todayAppointments = appointmentsQuery.data?.filter((appointment) =>
    isToday(appointment.start_time)
  );

  const handleDelete = (appointment?: Appointment) => {
    if (appointment)
      openDialog({
        title: `Tem certeza que deseja excluir o agendamento?`,
        description: `A exclusão desse agendamento é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: () => {
          deleteAppointmentMutation.mutate(appointment.id as number);
          showToast(
            `O agendamento #${appointment.id} foi deletado com sucesso.`
          );
          appointmentsQuery.refetch();
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
        onClick={() => navigate("/dashboard/appointment/new")}
      >
        Novo Atendimento
      </Button>

      <Typography align="center" color="#00ff9d" py={1} fontSize={25}>
        Hoje
      </Typography>
      {todayAppointments && todayAppointments.length > 0 ? (
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
              {todayAppointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      bgcolor: "#121212",
                    },
                    "&:hover": { bgcolor: "#1a1a1a" },
                  }}
                >
                  <StyledTableCell>
                    {toTitle(appointment.professional?.name ?? "-")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {toTitle(appointment.client?.name ?? "-")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {toTitle(appointment.service?.name ?? "-")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {format(toUTCDate(appointment.start_time) as Date, "HH:mm")}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/dashboard/appointment/edit/${appointment.id}`
                        )
                      }
                      sx={{ color: "#00ff9d" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(appointment)}
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
      ) : (
        <Typography align="center" color="#00ff9d" py={1} fontSize={15}>
          Ainda não há agendamentos hoje.
        </Typography>
      )}
    </Box>
  );
};

export { AppointmentList };

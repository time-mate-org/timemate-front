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
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Imports necessários
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { format, isToday } from "date-fns";
import { AppointmentTimeline } from "../../../../components/timeline/TimeLine";
import { toTitle } from "../../../../utils/string";
import { StyledTableCell } from "../../styled";
import { useCallback, useContext, useEffect, useState } from "react";
import { Appointment } from "../../../../types/models";
import { User } from "firebase/auth";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { DialogContext } from "../../../../providers/dialog/DialogProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { deleteEntity } from "../../../../services/deleteEntity";
import { getEntity } from "../../../../services/getEntity";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { toUTCDate } from "../../../../utils/date";

const AppointmentList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { openDialog } = useContext(DialogContext);
  const { showToast } = useContext(ToastContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const { setIsLoadingCallback } = useContext(LoadingContext);

  const fetchData = useCallback(async () => {
    if (!shouldFetch) return;
    const fetchedAppointments = await getEntity<Appointment[]>({
      user,
      resource: "appointments",
    });

    setIsLoadingCallback(true);
    setAppointments(
      fetchedAppointments.filter((appointment) =>
        isToday(toUTCDate(appointment.start_time) as Date)
      )
    );
    setShouldFetch(false);
    setIsLoadingCallback(false);
  }, [setIsLoadingCallback, shouldFetch, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = (appointment?: Appointment) => {
    if (appointment)
      openDialog({
        title: `Tem certeza que deseja excluir o agendamento?`,
        description: `A exclusão desse agendamento é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: async () => {
          await deleteEntity(
            user as User,
            "appointments",
            appointment.id as number
          );
          showToast(
            `O agendamento #${appointment.id} foi deletado com sucesso.`
          );
          setShouldFetch(true);
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
      {appointments && appointments.length > 0 ? (
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
              {appointments?.map((appointment) => (
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

      <Divider sx={{ mb: 10 }} />

      <Typography align="center" color="#00ff9d" py={1} fontSize={25}>
        TIMELINE
      </Typography>
      <AppointmentTimeline />
    </Box>
  );
};

export { AppointmentList };

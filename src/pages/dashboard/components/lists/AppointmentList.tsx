import { Box, Button, Typography, Grid2 } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { format, isSameDay, isToday } from "date-fns";
import { Appointment } from "../../../../types/models";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { getEntity } from "../../../../services/getEntity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useDialog, useToast } from "../../../../hooks";
import { OutletContextType } from "../../../../components/types/OutletContext";
import { useEffect, useState } from "react";
import {
  appointmentsColumnNames,
  appointmentsToTableData,
} from "../../../../utils/table";
import { appointmentsToListData } from "../../../../utils/list";
import { DefaultDataDisplay } from "../../../../components/DefaultDataDisplay";
import { DateInput } from "../timeline/components/DateInput";

const AppointmentList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openDialog } = useDialog();
  const { showToast } = useToast();
  const { setSectionName } = useOutletContext<OutletContextType>();
  const [appointmentsByDate, setAppointmentsByDate] = useState<Appointment[]>(
    []
  );
  const { state } = useLocation();
  const [date, setDate] = useState(state?.externalDate ?? new Date());

  useEffect(() => setSectionName("AGENDAMENTOS"));

  const appointmentsQuery = useQuery({
    enabled: !!user,
    queryKey: ["appointments"],
    queryFn: () => getEntity<Appointment[]>({ user, resource: "appointments" }),
  });
  const deleteAppointmentMutation = useMutation({
    mutationKey: ["appointmentDelete"],
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      await deleteEntity(user as User, "appointments", id);
      await appointmentsQuery.refetch();
      showToast(`O agendamento ${name} foi deletado com sucesso.`);
    },
  });

  const handleDelete = ({ id, name }: { id: number; name: string }) => {
    if (id)
      openDialog({
        title: `Tem certeza que deseja excluir o agendamento ${name}?`,
        description: `A exclusão desse agendamento é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: () => deleteAppointmentMutation.mutate({ id, name }),
      });
  };

  useEffect(() => {
    const appointments =
      appointmentsQuery.data?.filter((appointment: Appointment) => {
        const dayIsSame = isSameDay(date, appointment.start_time);
        return dayIsSame;
      }) ?? [];
    setAppointmentsByDate(appointments);
  }, [appointmentsQuery.data, date]);

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2
          size={{ xs: 12, md: 6 }}
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              p: 1,
              bgcolor: "#00ff9d",
              color: "#0a0a0a",
              "&:hover": { bgcolor: "#00e68a" },
            }}
            onClick={() => navigate("/dashboard/appointment/new")}
          >
            Novo Agendamento
          </Button>
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6 }}
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DateInput
            appointments={appointmentsQuery.data ?? []}
            date={date}
            setDate={setDate}
          />
        </Grid2>
        <Grid2 size={12}>
          <Typography align="center" color="#00ff9d" py={1} fontSize={25}>
            {isToday(date) ? "Hoje" : format(date, "dd/MM/yy")}
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <DefaultDataDisplay
            columnNames={appointmentsColumnNames}
            emptyMessage={`Ainda não há agendamentos ${
              isToday(date) ? "hoje" : "para esse dia"
            }.`}
            handleDelete={(id: number, name) => handleDelete({ id, name })}
            handleEdit={(id: number) =>
              navigate(`/dashboard/appointment/edit/${id}`)
            }
            listItems={appointmentsToListData(appointmentsByDate)}
            tableItems={appointmentsToTableData(appointmentsByDate)}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export { AppointmentList };

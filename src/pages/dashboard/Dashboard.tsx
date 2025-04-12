import { Box, Grid2, Typography } from "@mui/material";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState, useContext, useCallback } from "react";
import { Appointment, Client, Professional, Service } from "../../types/models";
import { ServiceBox } from "./styled";
import { toTitle } from "../../utils/string";
import { MetricCard } from "./components/MetricCard";
import { LoadingContext } from "../../providers/loading/LoadingProvider";
import { getEntity } from "../../services/getEntity";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { toUTCDate } from "../../utils/date";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { setIsLoadingCallback } = useContext(LoadingContext);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [tomorrowAppointments, setTomorrowAppointments] = useState<
    Appointment[]
  >([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const fetchData = useCallback(async () => {
    const fetchedClients = await getEntity<Client[]>({
      user,
      resource: "clients",
    });
    const fetchedProfessionals = await getEntity<Professional[]>({
      user,
      resource: "professionals",
    });
    const fetchedServices = await getEntity<Service[]>({
      user,
      resource: "services",
    });
    const fetchedAppointments = await getEntity<Appointment[]>({
      user,
      resource: "appointments",
    });

    setClients(fetchedClients);
    setProfessionals(fetchedProfessionals);
    setServices(fetchedServices);
    setTodayAppointments(
      fetchedAppointments.filter((appointment) =>
        isToday(toUTCDate(appointment.start_time))
      )
    );
    setTomorrowAppointments(
      fetchedAppointments.filter((appointment) =>
        isTomorrow(toUTCDate(appointment.start_time))
      )
    );
  }, [user]);

  useEffect(() => {
    setIsLoadingCallback(true);
    fetchData();
    setIsLoadingCallback(false);
  }, [fetchData, setIsLoadingCallback]);

  return (
    <Grid2 container spacing={5} justifyContent="center" alignItems="center">
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#e2e8f0", mb: 4 }}>
          Painel de Controle
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
        <MetricCard
          title="Hoje"
          metricNumber={todayAppointments.length}
          metricName="agendamentos"
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
        <MetricCard
          title={toTitle(
            format(addDays(new Date(), 1), "EEEE", { locale: ptBR })
          )}
          metricNumber={tomorrowAppointments.length}
          metricName="agendamentos"
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
        <MetricCard
          title="Clientes"
          metricNumber={clients?.length ?? 0}
          metricName="cadastrados"
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
        <MetricCard
          title="Profissionais"
          metricNumber={professionals?.length ?? 0}
          metricName="cadastrados"
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Grid2
          container
          spacing={5}
          justifyContent="center"
          alignItems="center"
        >
          {/* Serviços */}
          <Grid2 size={{ xs: 12 }}>
            <Box
              sx={{
                background: "#1e293b",
                borderRadius: 2,
                p: 3,
                mb: 10,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="h5" sx={{ color: "#e2e8f0", mb: 2 }}>
                Serviços Disponíveis
              </Typography>
              <Grid2 container spacing={2}>
                {services?.map((service) => (
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                    <ServiceBox>
                      <Typography variant="subtitle1" sx={{ color: "#e2e8f0" }}>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        Duração: {service.estimated_time} min
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#00ff9d", mt: 1 }}>
                        R$ {service.price.toFixed(2)}
                      </Typography>
                    </ServiceBox>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;

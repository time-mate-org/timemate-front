import { Box, Grid2, Typography, CircularProgress } from "@mui/material";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState, useContext } from "react";
import { Appointment } from "../../types/models";
import { ServiceBox } from "./styled";
import { toTitle } from "../../utils/string";
import { MetricCard } from "./components/MetricCard";
import { DashboardContext } from "../../providers/DashboardContext";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [tomorrowAppointments, setTomorrowAppointments] = useState<
    Appointment[]
  >([]);
  const { appointments, clients, professionals, services } =
    useContext(DashboardContext);

  useEffect(() => {
    // Simulação de carregamento
    setTimeout(() => {
      setTodayAppointments(appointments?.filter((a) => isToday(a.date)) ?? []);
      setTomorrowAppointments(
        appointments?.filter(
          (a) =>
            isTomorrow(a.date) ||
            format(a.date, "EEEE", { locale: ptBR }) === "segunda-feira"
        ) ?? []
      );
      setLoading(false);
    }, 500);
  }, [appointments]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

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
                        Duração: {service.estimatedTime} min
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

export default DashboardPage;

import { Box, Grid2, Typography, CircularProgress } from "@mui/material";
import { CalendarToday, PeopleAlt, Schedule, Work } from "@mui/icons-material";
import { styled } from "@mui/material";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  Appointment,
  Client,
  Professional,
  Service,
} from "../../../types/models";
import { ServiceBox } from "../styled";

// Tipos
interface DashboardPageProps {
  appointments: Appointment[];
  clients: Client[];
  professionals: Professional[];
  services: Service[];
}

// Cards estilizados
const MetricCard = styled(Box)(() => ({
  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  borderRadius: "12px",
  padding: "2rem",
  transition: "transform 0.3s ease",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  fontSize: "2.4rem",
  color: "#00ff9d",
  marginBottom: "1rem",
}));

const DashboardPage = ({
  appointments,
  clients,
  professionals,
  services,
}: DashboardPageProps) => {
  const [loading, setLoading] = useState(true);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [tomorrowAppointments, setTomorrowAppointments] = useState<
    Appointment[]
  >([]);

  useEffect(() => {
    // Simulação de carregamento
    setTimeout(() => {
      setTodayAppointments(appointments.filter((a) => isToday(a.date)));
      setTomorrowAppointments(
        appointments.filter(
          (a) =>
            isTomorrow(a.date) ||
            format(a.date, "EEEE", { locale: ptBR }) === "segunda-feira"
        )
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
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#e2e8f0", mb: 4 }}>
        Painel de Controle
      </Typography>

      <Grid2 container spacing={4}>
        {/* Agendamentos Hoje */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard>
            <Schedule />
            <Typography variant="h5" sx={{ color: "#e2e8f0" }}>
              Hoje
            </Typography>
            <Typography variant="h4" sx={{ color: "#00ff9d", mt: 1 }}>
              {todayAppointments.length} agendamentos
            </Typography>
          </MetricCard>
        </Grid2>

        {/* Agendamentos Amanhã/Segunda */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard>
            <CalendarToday />
            <Typography variant="h5" sx={{ color: "#e2e8f0" }}>
              {format(addDays(new Date(), 1), "EEEE", { locale: ptBR })}
            </Typography>
            <Typography variant="h4" sx={{ color: "#00ff9d", mt: 1 }}>
              {tomorrowAppointments.length} agendamentos
            </Typography>
          </MetricCard>
        </Grid2>

        {/* Clientes */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard>
            <PeopleAlt />
            <Typography variant="h5" sx={{ color: "#e2e8f0" }}>
              Clientes
            </Typography>
            <Typography variant="h4" sx={{ color: "#00ff9d", mt: 1 }}>
              {clients.length} cadastrados
            </Typography>
          </MetricCard>
        </Grid2>

        {/* Profissionais */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard>
            <Work />
            <Typography variant="h5" sx={{ color: "#e2e8f0" }}>
              Profissionais
            </Typography>
            <Typography variant="h4" sx={{ color: "#00ff9d", mt: 1 }}>
              {professionals.length} disponíveis
            </Typography>
          </MetricCard>
        </Grid2>

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
              {services.map((service) => (
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
    </Box>
  );
};

export default DashboardPage;

import { Box, Grid2, Typography } from "@mui/material";
import {
  format,
  addDays,
  isToday,
  isTomorrow,
  startOfTomorrow,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Appointment, Client, Professional, Service } from "../../types/models";
import { ServiceBox } from "./styled";
import { toTitle } from "../../utils/string";
import { MetricCard } from "./components/MetricCard";
import { getEntity } from "../../services/getEntity";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks";
import { OutletContextType } from "../../components/types/OutletContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const { setSectionName } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();

  useEffect(() => setSectionName("VISÃO GERAL"));

  const appointmentsQuery = useQuery({
    enabled: !!user,
    queryKey: ["appointments"],
    queryFn: () => getEntity<Appointment[]>({ user, resource: "appointments" }),
  });
  const professionalsQuery = useQuery({
    enabled: !!user,
    queryKey: ["professionals"],
    queryFn: () =>
      getEntity<Professional[]>({ user, resource: "professionals" }),
  });
  const clientsQuery = useQuery({
    enabled: !!user,
    queryKey: ["clients"],
    queryFn: () => getEntity<Client[]>({ user, resource: "clients" }),
  });
  const servicesQuery = useQuery({
    enabled: !!user,
    queryKey: ["services"],
    queryFn: () => getEntity<Service[]>({ user, resource: "services" }),
  });
  const todayAppointments = appointmentsQuery.data?.filter((appointment) =>
    isToday(appointment.start_time)
  );
  const tomorrowAppointments = appointmentsQuery.data?.filter((appointment) =>
    isTomorrow(appointment.start_time)
  );

  return (
    <Grid2 container spacing={5} justifyContent="center" alignItems="center">
      <Grid2 size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
        <MetricCard
          title="Hoje"
          metricNumber={todayAppointments?.length ?? 0}
          metricName="agendamentos"
          onClick={() => navigate("/dashboard/appointments")}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
        <MetricCard
          title={toTitle(
            format(addDays(new Date(), 1), "EEEE", { locale: ptBR })
          )}
          metricNumber={tomorrowAppointments?.length ?? 0}
          metricName="agendamentos"
          onClick={() =>
            navigate("/dashboard/appointments", {
              state: { externalDate: startOfTomorrow() },
            })
          }
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
        <MetricCard
          title="Clientes"
          metricNumber={clientsQuery.data?.length ?? 0}
          metricName="cadastrados"
          onClick={() => navigate("/dashboard/clients")}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
        <MetricCard
          title="Profissionais"
          metricNumber={professionalsQuery.data?.length ?? 0}
          metricName="cadastrados"
          onClick={() => navigate("/dashboard/professionals")}
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
                {servicesQuery.data?.map((service) => (
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                    <ServiceBox onClick={() => navigate("/dashboard/services")}>
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

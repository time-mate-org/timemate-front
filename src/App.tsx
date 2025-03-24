import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "date-fns/locale"; // Adicione localização
import { mainTheme } from "./theme/theme";
import Login from "./pages/login/Login";
import DashboardLayout from "./components/DashboardLayout";
import {
  ClientList,
  ProfessionalList,
  ServiceList,
  AppointmentList,
} from "./pages/dashboard/components/lists";
import ClientNew from "./pages/dashboard/components/create/ClientNew";
import ServiceNew from "./pages/dashboard/components/create/ServiceNew";
import ProfessionalNew from "./pages/dashboard/components/create/ProfessionalNew";
import AppointmentNew from "./pages/dashboard/components/create/AppointmentNew";
import { MainLayout } from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import NotFound from "./pages/notFound/NotFound";
import Dashboard2 from "./pages/dashboard/Dashboard";

const DashboardRoutes = () => (
  <Routes>
    <Route path="" element={<DashboardLayout />}>
      <Route index element={<Dashboard2 />} />
      <Route path="clients/*" element={<ClientList />} />
      <Route path="client/new" element={<ClientNew />} />
      <Route path="professionals/*" element={<ProfessionalList />} />
      <Route path="professional/new" element={<ProfessionalNew />} />
      <Route path="services/*" element={<ServiceList />} />
      <Route path="service/new" element={<ServiceNew />} />
      <Route path="appointments/*" element={<AppointmentList />} />
      <Route path="appointment/new" element={<AppointmentNew />} />
    </Route>
  </Routes>
);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <ThemeProvider theme={mainTheme}>
        <MainLayout>
          <BrowserRouter>
            <Routes>
              <Route
                path="/dashboard/*"
                element={
                  <AuthLayout>
                    <DashboardRoutes />
                  </AuthLayout>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route index element={<Navigate to="/login" replace />} />
              {/* Rota para capturar tudo o que não foi especificado */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MainLayout>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "date-fns/locale"; // Adicione localização
import { mainTheme } from "./theme/theme";
import Login from "./pages/login/Login";
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
import AuthLayout from "./components/layouts/AuthLayout";
import NotFound from "./pages/notFound/NotFound";
import { AuthProvider } from "./providers/auth/AuthProvider";
import { ToastProvider } from "./providers/toast/ToastProvider";
import ServiceEdit from "./pages/dashboard/components/edit/ServiceEdit";
import ProfessionalEdit from "./pages/dashboard/components/edit/ProfessionalEdit";
import { MainLayout } from "./components/layouts/MainLayout";
import ClientEdit from "./pages/dashboard/components/edit/ClientEdit";
import AppointmentEdit from "./pages/dashboard/components/edit/AppointmentEdit";
import { DialogProvider } from "./providers/dialog/DialogProvider";
import Dashboard from "./pages/dashboard/Dashboard";
import { Home } from "./pages/home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppointmentTimeline } from "./pages/dashboard/components/timeline/TimeLine";
import { DashboardLayout } from "./components/layouts/DashboardLayout";

const queryClient = new QueryClient();

const DashboardRoutes = () => (
  <Routes>
    <Route path="" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="clients/*" element={<ClientList />} />
      <Route path="client/new" element={<ClientNew />} />
      <Route path="client/edit/:id" element={<ClientEdit />} />
      <Route path="professionals/*" element={<ProfessionalList />} />
      <Route path="professional/new" element={<ProfessionalNew />} />
      <Route path="professional/edit/:id" element={<ProfessionalEdit />} />
      <Route path="services/*" element={<ServiceList />} />
      <Route path="service/new" element={<ServiceNew />} />
      <Route path="service/edit/:id" element={<ServiceEdit />} />
      <Route path="appointments/*" element={<AppointmentList />} />
      <Route path="appointment/new" element={<AppointmentNew />} />
      <Route path="appointment/edit/:id" element={<AppointmentEdit />} />
      <Route path="timeline" element={<AppointmentTimeline />} />
    </Route>
  </Routes>
);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <ThemeProvider theme={mainTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ToastProvider>
              <MainLayout>
                <DialogProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route index element={<Home />} />
                      <Route
                        path="/dashboard/*"
                        element={
                          <AuthLayout>
                            <DashboardRoutes />
                          </AuthLayout>
                        }
                      />

                      <Route path="/login" element={<Login />} />

                      {/* Rota para capturar tudo o que não foi especificado */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </DialogProvider>
              </MainLayout>
            </ToastProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;

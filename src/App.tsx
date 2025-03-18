import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "./theme/theme";
import Login from "./pages/Login";
import DashboardLayout from "./pages/dashboard/Dashboard";
import {
  ClientList,
  ProfessionalList,
  ServiceList,
  AppointmentList,
} from "./pages/dashboard/lists";
import ClientNew from "./pages/dashboard/create/ClientNew";
import ServiceNew from "./pages/dashboard/create/ServiceNew";
import ProfessionalNew from "./pages/dashboard/create/ProfessionalNew";
import AppointmentNew from "./pages/dashboard/create/AppointmentNew";
import { MainLayout } from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";

const DashboardRoutes = () => (
  <Routes>
    <Route path="" element={<DashboardLayout />}>
      <Route index element={<Navigate to="clients/" replace />} />
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
          </Routes>
        </BrowserRouter>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;

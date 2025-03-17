import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "./theme/theme";
import AuthLayout from "./components/AuthLayout";
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

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="clients/*" element={<ClientList />} />
            <Route path="client/new" element={<ClientNew />} />
            <Route path="professionals/*" element={<ProfessionalList />} />
            <Route path="professional/new" element={<ProfessionalNew />} />
            <Route path="services/*" element={<ServiceList />} />
            <Route path="service/new" element={<ServiceNew />} />
            <Route path="appointments/*" element={<AppointmentList />} />
            <Route path="appointment/new" element={<AppointmentNew />} />
            <Route
              index
              element={<Navigate to="/dashboard/clients" replace />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

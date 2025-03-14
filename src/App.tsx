import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from './theme/theme';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import ClientList from './pages/dashboard/ClientList';
import DashboardLayout from './components/DashboardLayout';
import AppointmentList from './pages/dashboard/AppointmentList';
import ProfessionalList from './pages/dashboard/ProfessionalList';
import ServiceList from './pages/dashboard/ServiceList';
// import ClientNew from './pages/dashboard/ClientNew';

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
          />// Adicione esta rota junto às outras
					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route path="clients/" element={<ClientList />} />
						{/* <Route path="clients/new" element={<ClientNew />} /> */}
						<Route path="professionals/*" element={<ProfessionalList />} />
						<Route path="services/*" element={<ServiceList />} />
						<Route path="appointments/*" element={<AppointmentList />} />
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
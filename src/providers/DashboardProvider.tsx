import { ReactNode, useState } from "react";
import { Appointment, Client, Professional, Service } from "../types/models";
import { mockedClients } from "../mocks/clients";
import { mockedProfessionals } from "../mocks/professionals";
import { mockedServices } from "../mocks/services";
import { mockedAppointments } from "../mocks/appointments";
import { DashboardContext } from "./DashboardContext";

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>(mockedClients);
  const [professionals, setProfessionals] =
    useState<Professional[]>(mockedProfessionals);
  const [services, setServices] = useState<Service[]>(mockedServices);
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockedAppointments);

  const dashboardProvidings = {
    clients,
    setClients,
    professionals,
    setProfessionals,
    services,
    setServices,
    appointments,
    setAppointments,
  };

  return (
    <DashboardContext.Provider value={dashboardProvidings}>
      {children}
    </DashboardContext.Provider>
  );
};

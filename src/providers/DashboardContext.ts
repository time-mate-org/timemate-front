import { createContext } from "react";
import { Appointment, Client, Professional, Service } from "../types/models";

export type DashboardContextType = {
  appointments?: Appointment[];
  clients?: Client[];
  services?: Service[];
  professionals?: Professional[];
  setAppointments?: React.Dispatch<React.SetStateAction<Appointment[]>>;
  setClients?: React.Dispatch<React.SetStateAction<Client[]>>;
  setServices?: React.Dispatch<React.SetStateAction<Service[]>>;
  setProfessionals?: React.Dispatch<React.SetStateAction<Professional[]>>;
};
const defaultContextValue: DashboardContextType = {
  appointments: [],
  clients: [],
  services: [],
  professionals: [],
  setAppointments: () => null,
  setClients: () => null,
  setServices: () => null,
  setProfessionals: () => null,
};

export const DashboardContext = createContext(defaultContextValue);

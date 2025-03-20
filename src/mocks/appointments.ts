import { setHours, setMinutes } from "date-fns";
import { Appointment } from "../types/models";
import { mockedClients } from "./clients";
import { mockedProfessionals } from "./professionals";
import { mockedServices } from "./services";

export const mockedAppointments: Appointment[] = [
  {
    id: 1,
    clientId: 1,
    client: mockedClients[0],
    professionalId: 1,
    professional: mockedProfessionals[0],
    serviceId: 1,
    service: mockedServices[0],
    date: setHours(setMinutes(new Date(), 15), 10),
  },
  {
    id: 2,
    clientId: 2,
    client: mockedClients[1],
    professionalId: 1,
    professional: mockedProfessionals[0],
    serviceId: 2,
    service: mockedServices[1],
    date: setHours(setMinutes(new Date(), 45), 14),
  },
  {
    id: 3,
    clientId: 3,
    client: mockedClients[2],
    professionalId: 2,
    professional: mockedProfessionals[1],
    serviceId: 1,
    service: mockedServices[2],
    date: setHours(setMinutes(new Date(), 0), 16),
  },
];

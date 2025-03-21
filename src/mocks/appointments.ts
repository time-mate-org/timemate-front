import { set, startOfMinute } from "date-fns";
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
    date: startOfMinute(set(new Date(), { hours: 10, minutes: 15 })),
  },
  {
    id: 2,
    clientId: 2,
    client: mockedClients[1],
    professionalId: 1,
    professional: mockedProfessionals[0],
    serviceId: 2,
    service: mockedServices[1],
    date: startOfMinute(set(new Date(), { hours: 14, minutes: 45 })),
  },
  {
    id: 3,
    clientId: 3,
    client: mockedClients[2],
    professionalId: 2,
    professional: mockedProfessionals[1],
    serviceId: 1,
    service: mockedServices[0],
    date: startOfMinute(set(new Date(), { hours: 16, minutes: 0 })),
  },
  {
    id: 4,
    clientId: 1,
    client: mockedClients[0],
    professionalId: 3,
    professional: mockedProfessionals[2],
    serviceId: 4,
    service: mockedServices[3],
    date: startOfMinute(set(new Date(), { hours: 8, minutes: 45 })),
  },
  {
    id: 5,
    clientId: 3,
    client: mockedClients[2],
    professionalId: 4,
    professional: mockedProfessionals[3],
    serviceId: 5,
    service: mockedServices[4],
    date: startOfMinute(set(new Date(), { hours: 14, minutes: 15 })),
  },
];

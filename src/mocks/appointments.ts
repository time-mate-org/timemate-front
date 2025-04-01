import { set, startOfMinute } from "date-fns";
import { Appointment } from "../types/models";
import { mockedClients } from "./clients";
import { mockedProfessionals } from "./professionals";
import { mockedServices } from "./services";

export const mockedAppointments: Appointment[] = [
  {
    id: 1,
    client_id: 1,
    client: mockedClients[0],
    professional_id: 1,
    professional: mockedProfessionals[0],
    service_id: 1,
    service: mockedServices[0],
    startTime: startOfMinute(set(new Date(), { hours: 10, minutes: 15 })),
    start_time: "",
    end_time: "",
    endTime: startOfMinute(set(new Date(), { hours: 10, minutes: 45 })),
  },
  {
    id: 2,
    client_id: 2,
    client: mockedClients[1],
    professional_id: 1,
    professional: mockedProfessionals[0],
    service_id: 2,
    service: mockedServices[1],
    startTime: startOfMinute(set(new Date(), { hours: 14, minutes: 45 })),
    endTime: startOfMinute(set(new Date(), { hours: 15, minutes: 15 })),
    start_time: "",
    end_time: "",
  },
  {
    id: 3,
    client_id: 3,
    client: mockedClients[2],
    professional_id: 2,
    professional: mockedProfessionals[1],
    service_id: 1,
    service: mockedServices[0],
    startTime: startOfMinute(set(new Date(), { hours: 16, minutes: 45 })),
    endTime: startOfMinute(set(new Date(), { hours: 17, minutes: 15 })),
    start_time: "",
    end_time: "",
  },
  {
    id: 4,
    client_id: 1,
    client: mockedClients[0],
    professional_id: 3,
    professional: mockedProfessionals[2],
    service_id: 4,
    service: mockedServices[3],
    startTime: startOfMinute(set(new Date(), { hours: 8, minutes: 45 })),
    endTime: startOfMinute(set(new Date(), { hours: 9, minutes: 45 })),
    start_time: "",
    end_time: "",
  },
  {
    id: 5,
    client_id: 3,
    client: mockedClients[2],
    professional_id: 4,
    professional: mockedProfessionals[3],
    service_id: 5,
    service: mockedServices[4],
    startTime: startOfMinute(set(new Date(), { hours: 14, minutes: 15 })),
    endTime: startOfMinute(set(new Date(), { hours: 15, minutes: 0 })),
    start_time: "",
    end_time: "",
  },
];

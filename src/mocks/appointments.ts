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
    start_time: "",
    end_time: "",
  },
  {
    id: 2,
    client_id: 2,
    client: mockedClients[1],
    professional_id: 1,
    professional: mockedProfessionals[0],
    service_id: 2,
    service: mockedServices[1],
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
    start_time: "",
    end_time: "",
  },
];

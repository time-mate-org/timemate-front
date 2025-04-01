import { Client, Professional, Service } from "../../types/models";

export type GetAppointmentEntityType = "service" | "professional" | "client";

export const getAppointmentClient = (id: number, clients: Client[]) =>
  clients.find((client) => client.id === id);

export const getAppointmentProfessional = (
  id: number,
  professionals: Professional[]
) => professionals.find((professional) => professional.id === id);

export const getAppointmentService = (id: number, services: Service[]) =>
  services.find((service) => service.id === id);

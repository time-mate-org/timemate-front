import { CacheType } from "../../providers/fetcher/FetcherProvider";
import { Appointment, Service } from "../../types/models";

const parseAppointments = (appointments: Appointment[]): Appointment[] =>
  appointments.map((appointment) => ({
    ...appointment,
    startTime: new Date(appointment.start_time),
    endTime: new Date(appointment.end_time),
  }));

const parseServices = (services: Service[]): Service[] =>
  services.map((service) => ({
    ...service,
    estimatedTime: service.estimated_time,
  }));

const parseEntity = <T>(data: T[], resource: keyof CacheType)=> {
  if (resource === "appointments")
    return parseAppointments(data as Appointment[]);
  if (resource === "services") return parseServices(data as Service[]);
  return data;
};

export { parseEntity, parseAppointments, parseServices };

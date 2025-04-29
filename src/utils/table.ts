import { format } from "date-fns";
import { DefaultTableItem } from "../components/DefaultTable";
import { Appointment, Client, Professional, Service } from "../types/models";
import { formatPhoneNumber, toTitle } from "./string";

export const appointmentsToTableData = (
  appointments: Appointment[] = []
): DefaultTableItem[] =>
  appointments.map(({ id, service, professional, start_time, client }) => ({
    id: id as number,
    service: toTitle(service.name),
    professional: toTitle(professional.name),
    client: toTitle(client.name),
    start_time: format(new Date(start_time), "HH: mm"),
    name: `#${id}`,
  }));

export const clientsToTableData = (
  clients: Client[] = []
): DefaultTableItem[] =>
  clients.map(({ name, address, phone, id }) => ({
    id: id as number,
    name: toTitle(name),
    address: toTitle(address),
    phone: formatPhoneNumber(phone),
  }));

export const professionalToTableData = (
  professionals: Professional[] = []
): DefaultTableItem[] =>
  professionals.map(({ name, title, phone, id }) => ({
    id: id as number,
    name: toTitle(name),
    title: toTitle(title),
    phone: formatPhoneNumber(phone),
  }));

export const serviceToTableData = (
  services: Service[] = []
): DefaultTableItem[] =>
  services.map(({ name, estimated_time, price, id }) => ({
    id: id as number,
    name: toTitle(name),
    price,
    estimated_time,
  }));

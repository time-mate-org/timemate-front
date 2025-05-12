import { format } from "date-fns";
import { DefaultTableItem } from "../components/DefaultTable";
import { Appointment, Client, Professional, Service } from "../types/models";
import { formatPhoneNumber, toTitle } from "./string";
import { toUTCDate } from "./date";

export const appointmentsToTableData = (
  appointments: Appointment[] = []
): DefaultTableItem[] =>
  appointments.map(({ id, service, professional, start_time, client }) => ({
    id: id as number,
    client: toTitle(client?.name),
    professional: toTitle(professional?.name),
    service: toTitle(service?.name),
    start_time: format(toUTCDate(start_time), "HH:mm"),
  }));

export const appointmentsColumnNames = [
  "Cliente",
  "Profissional",
  "Serviço",
  "Horário",
];

export const clientsToTableData = (
  clients: Client[] = []
): DefaultTableItem[] =>
  clients.map(({ name, address, phone, id }) => ({
    id: id as number,
    name: toTitle(name),
    address: toTitle(address),
    phone: formatPhoneNumber(phone),
  }));

export const clientsColumnNames = ["Nome", "Endereço", "Telefone"];

export const professionalToTableData = (
  professionals: Professional[] = []
): DefaultTableItem[] =>
  professionals.map(({ name, title, phone, id }) => ({
    id: id as number,
    name: toTitle(name),
    title: toTitle(title),
    phone: formatPhoneNumber(phone),
  }));

export const professionalsColumnNames = ["Nome", "Profissão", "Telefone"];

const getPrice = (price: number) => `R$ ${price.toFixed(2).replace(".", ",")}`;
const getEstimatedTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minutesString}`;
};
export const serviceToTableData = (
  services: Service[] = []
): DefaultTableItem[] =>
  services.map(({ name, estimated_time, price, id }) => ({
    id: id as number,
    name: toTitle(name),
    price: getPrice(price),
    estimated_time: getEstimatedTime(estimated_time),
  }));

export const servicesColumnNames = ["Nome", "Preço", "Duração"];

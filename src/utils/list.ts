import { format } from "date-fns";
import { Appointment, Client, Professional, Service } from "../types/models";
import { toUTCDate } from "./date";
import { formatPhoneNumber, toEstimatedTimeDisplay, toTitle } from "./string";
import { DefaultListItem } from "../components/DefaultList";

export const appointmentsToListData = (
  appointments: Appointment[] = []
): DefaultListItem[] =>
  appointments?.map(({ client, service, professional, start_time, id }) => ({
    primaryText: `${toTitle(client?.name)} : ${toTitle(professional?.name)}`,
    secondaryText: `${toTitle(service?.name)} às ${format(
      toUTCDate(start_time) as Date,
      "HH:mm"
    )}`,
    id: id as number,
    name: `#${id}`,
  })) ?? [];

export const clientsToListData = (
  clients: Client[] = []
): DefaultListItem[] => {
  return (
    clients.map(({ name, phone, address, id }) => ({
      primaryText: `${toTitle(name)} : ${formatPhoneNumber(phone)}`,
      secondaryText: toTitle(address),
      id: id as number,
      name,
    })) ?? []
  );
};

export const professionalToListData = (
  professionals: Professional[] = []
): DefaultListItem[] =>
  professionals?.map(({ name, phone, title, id }) => ({
    primaryText: `${toTitle(name)} : ${toTitle(title)}`,
    secondaryText: formatPhoneNumber(phone),
    id: id as number,
    name,
  })) ?? [];

export const serviceToListData = (
  services: Service[] = []
): DefaultListItem[] =>
  services?.map(({ name, price, estimated_time, id }) => ({
    primaryText: `${toTitle(name)} : ${toEstimatedTimeDisplay(estimated_time)}`,
    secondaryText: `R$ ${price}`,
    id: id as number,
    name,
  })) ?? [];

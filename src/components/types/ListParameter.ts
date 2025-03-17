import { Appointment, Client, Professional, Service } from "../../types/models";

export type ListData = {
  lables: string[];
  lines: ListDataValues[];
};

export type ListDataValues =
  | Client
  | Professional
  | Service
  | Appointment;

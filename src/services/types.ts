import { User } from "firebase/auth";

export type GetEntityParamType = {
  user: User | null;
  resource: string;
  id?: number;
};

export type ContactType = {
  email: string;
  name: string;
};

export type EmailPayloadType = {
  category: string;
  content: string;
  subject: string;
  subtitle?: string;
  to: ContactType;
  origin: ContactType;
};

export type UpdateEntityParamType<T> = {
  user: User;
  entityId: number;
  resource: string;
  payload: T;
};

export type GetPdfReportParamType = {
  professional_id: number | "";
  start_date: string;
  end_date: string;
  user: User;
};

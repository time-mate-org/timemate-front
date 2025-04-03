
export type AppointmentFormData = {
  client_id: number | "";
  professional_id: number | "";
  service_id: number | "";
  start_time: Date;
};

export type AppointmentUpdateFormData = {
  id: number;
  client_id?: number | "";
  professional_id?: number | "";
  service_id?: number | "";
  start_time?: Date;
};

export type ClientFormData = {
  name: string;
  address: string;
  phone: string;
};

export type ClientUpdateFormData = {
  id: number;
  name?: string;
  address?: string;
  phone?: string;
};

export type ProfessionalFormData = {
  name: string;
  phone: string;
  title: string;
};

export type ProfessionalUpdateFormData = {
  id: number;
  name?: string;
  phone?: string;
  title?: string;
};

export type ServiceFormData = {
  name: string;
  estimated_time: number;
  price: number;
};

export type ServiceUpdateFormData = {
  id: number;
  name?: string;
  estimated_time?: number;
  price?: number;
};
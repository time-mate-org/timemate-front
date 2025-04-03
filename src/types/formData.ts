
export type AppointmentFormData = {
  id?: number;
  client_id: number | "";
  professional_id: number | "";
  service_id: number | "";
  start_time: Date;
};

export type ClientFormData = {
  name: string;
  address: string;
  phone: string;
};

export type ProfessionalFormData = {
  name: string;
  phone: string;
  title: string;
};

export type ServiceFormData = {
  name: string;
  estimated_time: number;
  price: number;
};

export type FormData =
  | AppointmentFormData
  | ClientFormData
  | ProfessionalFormData
  | ServiceFormData;

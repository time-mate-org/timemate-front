
export type AppointmentFormData = {
  id?: number;
  client_id: number | "";
  professional_id: number | "";
  service_id: number | "";
  start_time: string;
};


export type ClientFormData = {
  id?: number;
  name: string;
  address: string;
  phone: string;
};
export type ProfessionalFormData = {
  id?: number;
  name: string;
  phone: string;
  title: string;
};

export type ServiceFormData = {
  id?: number;
  name: string;
  estimated_time: number;
  price: number;
};

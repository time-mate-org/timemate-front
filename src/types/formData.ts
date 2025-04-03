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
}
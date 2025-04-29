export type Model = {
  id?: number;
};

export interface Client extends Model {
  name: string;
  address: string;
  phone: string;
}

export interface Professional extends Model {
  name: string;
  phone: string;
  title: string;
}

export interface Service extends Model {
  name: string;
  estimated_time: number;
  price: number;
}

export interface Appointment extends Model {
  client_id: number;
  client: Client;
  professional_id: number;
  professional: Professional;
  service_id: number;
  service: Service;
  start_time: string;
  end_time: string;
}

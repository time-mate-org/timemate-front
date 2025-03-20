export type Client = {
  id?: number;
  name: string;
  address: string;
  phone: string;
};

export type Professional = {
  id?: number;
  name: string;
  phone: string;
  title: string;
};

export type Service = {
  id?: number;
  name: string;
  estimatedTime: number;
  price: number;
};

export type Appointment = {
  id?: number;
  clientId: number;
  client: Client;
  professionalId: number;
  professional: Professional;
  serviceId: number;
  service: Service;
  date: Date;
};

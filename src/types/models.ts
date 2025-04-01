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
  estimated_time: number;
  estimatedTime?: number;
  price: number;
};

export type Appointment = {
  id?: number;
  client_id: number;
  client: Client;
  professional_id: number;
  professional: Professional;
  service_id: number;
  service: Service;
  start_time: string;
  startTime?: Date;
  end_time: string;
  endTime?: Date;
};

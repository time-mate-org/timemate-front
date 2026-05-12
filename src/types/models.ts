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
  description: string;
  image: string;
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

export interface Tenant extends Model {
  id: number;
  subdomain: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  availability: string;
  is_active: boolean;
  logo?: string;
  blog_photos?: string[];
  blog_title: string;
  blog_subtitle: string;
  blog_about?: string;
  banner: string;
  instagram_profile?: string;
  facebook_profile?: string;
  isAuthenticated?: boolean;
}

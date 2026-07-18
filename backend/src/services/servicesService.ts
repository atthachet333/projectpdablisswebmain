import servicesData from '../data/services.json';

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
  href: string;
}

export class ServicesService {
  static async getAll(): Promise<Service[]> {
    return servicesData as Service[];
  }
}

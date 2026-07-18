import axios from 'axios';
import type { ApiResponse, Service, Package, Testimonial, Faq, ContactFormData } from '../types';
import i18n from '../i18n';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = i18n.resolvedLanguage === 'en' ? 'en' : 'th';
  return config;
});

export const apiService = {
  // Health check
  health: async (): Promise<ApiResponse<null>> => {
    const res = await apiClient.get('/health');
    return res.data;
  },

  // Services
  getServices: async (): Promise<ApiResponse<Service[]>> => {
    const res = await apiClient.get('/services');
    return res.data;
  },

  // Packages
  getPackages: async (): Promise<ApiResponse<Package[]>> => {
    const res = await apiClient.get('/packages');
    return res.data;
  },

  // Testimonials
  getTestimonials: async (): Promise<ApiResponse<Testimonial[]>> => {
    const res = await apiClient.get('/testimonials');
    return res.data;
  },

  // FAQs
  getFaqs: async (): Promise<ApiResponse<Faq[]>> => {
    const res = await apiClient.get('/faqs');
    return res.data;
  },

  // Submit contact form
  submitContact: async (data: ContactFormData): Promise<ApiResponse<{ id: string }>> => {
    const res = await apiClient.post('/contact', data);
    return res.data;
  },
};

export default apiService;

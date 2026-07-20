import axios, { AxiosError } from 'axios';
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

// Robust error mapping
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = 'An unexpected error occurred';
    if (error.code === 'ECONNABORTED') {
      message = 'Request timed out';
    } else if (error.response) {
      const data = error.response.data as any;
      message = data?.message || data?.error || `Server error: ${error.response.status}`;
    } else if (error.request) {
      message = 'No response received from server';
    }
    
    if (axios.isCancel(error)) {
      message = 'Request cancelled';
    }

    return Promise.reject(new Error(message));
  }
);

let isSubmittingContact = false;

export const apiService = {
  // Health check
  health: async (signal?: AbortSignal): Promise<ApiResponse<null>> => {
    const res = await apiClient.get('/health', { signal });
    return res.data;
  },

  // Services
  getServices: async (signal?: AbortSignal): Promise<ApiResponse<Service[]>> => {
    const res = await apiClient.get('/services', { signal });
    return res.data;
  },

  // Packages
  getPackages: async (signal?: AbortSignal): Promise<ApiResponse<Package[]>> => {
    const res = await apiClient.get('/packages', { signal });
    return res.data;
  },

  // Testimonials
  getTestimonials: async (signal?: AbortSignal): Promise<ApiResponse<Testimonial[]>> => {
    const res = await apiClient.get('/testimonials', { signal });
    return res.data;
  },

  // FAQs
  getFaqs: async (signal?: AbortSignal): Promise<ApiResponse<Faq[]>> => {
    const res = await apiClient.get('/faqs', { signal });
    return res.data;
  },

  // Submit contact form
  submitContact: async (data: ContactFormData, signal?: AbortSignal): Promise<ApiResponse<{ id: string }>> => {
    if (isSubmittingContact) {
      throw new Error('Form is already submitting');
    }
    isSubmittingContact = true;
    try {
      const res = await apiClient.post('/contact', data, { 
        signal,
        timeout: 15000 
      });
      return res.data;
    } finally {
      isSubmittingContact = false;
    }
  },
};

export default apiService;

// Service types
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

// Package types
export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  badge: string | null;
  highlighted: boolean;
  features: PackageFeature[];
  cta: string;
}

// Testimonial types
export interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  rating: number;
  text: string;
  avatar: string | null;
  initials: string;
}

// FAQ types
export interface Faq {
  id: number;
  category: string;
  question: string;
  answer: string;
}

// Contact form types
export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
  privacyAccepted: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

// Company stats
export interface CompanyStat {
  label: string;
  value: string;
  suffix: string;
  numericValue: number;
  icon: string;
}

// Team member
export interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string | null;
  initials: string;
  linkedin?: string;
}

// Timeline event
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

// Company value
export interface CompanyValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Client logo
export interface ClientLogo {
  id: number;
  name: string;
  logo: string | null;
}

// Nav item
export interface NavItem {
  label: string;
  href: string;
  path: string;
}

// Contact channel
export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  icon: string;
  href: string;
  color: string;
}

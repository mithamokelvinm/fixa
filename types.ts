
export enum UserRole {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

export enum JobStatus {
  PENDING = 'PENDING',
  MATCHING = 'MATCHING',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export type UrgencyLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  rating?: number;
  loyaltyPoints: number;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ProviderProfile extends User {
  category: string;
  bio: string;
  hourlyRate: number;
  completedJobs: number;
  skills: string[];
  isVerified: boolean;
  isOnline: boolean;
  serviceRadiusKm: number;
  reviews: Review[];
  promotions?: {
    type: 'FIRST_TIME' | 'PROMO';
    discountPercent: number;
    description: string;
  };
}

export interface Review {
  id: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Job {
  id: string;
  clientId: string;
  providerId?: string;
  category: string;
  status: JobStatus;
  urgency: UrgencyLevel;
  date: string;
  time: string;
  amount: number;
  description: string;
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  pointsEarned?: number;
  discountApplied?: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface MatchResult {
  provider: ProviderProfile;
  distanceKm: number;
  score: number;
}

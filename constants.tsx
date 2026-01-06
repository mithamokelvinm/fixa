
import React from 'react';
import { 
  Wrench, 
  Zap, 
  Trash2, 
  Car, 
  Paintbrush, 
  Hammer, 
  Home, 
  Briefcase 
} from 'lucide-react';
import { ServiceCategory, ProviderProfile, UserRole } from './types';

export const CATEGORIES: ServiceCategory[] = [
  { id: '1', name: 'Plumbing', icon: 'Wrench', description: 'Leaking taps, burst pipes, and bathroom fixes.' },
  { id: '2', name: 'Electrical', icon: 'Zap', description: 'Wiring, lighting, and appliance repairs.' },
  { id: '3', name: 'Cleaning', icon: 'Trash2', description: 'Deep house cleaning and office sanitization.' },
  { id: '4', name: 'Mechanic', icon: 'Car', description: 'Car repairs and regular maintenance.' },
  { id: '5', name: 'Painting', icon: 'Paintbrush', description: 'Wall painting and surface decoration.' },
  { id: '6', name: 'Carpentry', icon: 'Hammer', description: 'Furniture repair and woodworking.' },
];

export const MOCK_PROVIDERS: ProviderProfile[] = [
  {
    id: 'p1',
    name: 'John Kamau',
    email: 'john@example.com',
    phone: '+254712345678',
    role: UserRole.PROVIDER,
    avatar: 'https://picsum.photos/seed/p1/200',
    category: 'Plumbing',
    bio: 'Experienced plumber with over 10 years in residential and commercial plumbing. Specialized in hot water systems.',
    hourlyRate: 1500,
    completedJobs: 142,
    rating: 4.8,
    loyaltyPoints: 450,
    serviceRadiusKm: 15,
    skills: ['Pipe Fitting', 'Solar Heater Repair', 'Drainage'],
    isVerified: true,
    isOnline: true,
    location: { lat: -1.286389, lng: 36.817223, address: 'Upper Hill, Nairobi' },
    reviews: [
      { id: 'r1', clientId: 'c1', clientName: 'Alice Mwangi', rating: 5, comment: 'Quick and professional. Fixed my sink in no time!', date: '2024-03-10' }
    ],
    promotions: {
      type: 'FIRST_TIME',
      discountPercent: 10,
      description: '10% off for your first plumbing fix!'
    }
  },
  {
    id: 'p2',
    name: 'Sarah Otieno',
    email: 'sarah@example.com',
    phone: '+254722334455',
    role: UserRole.PROVIDER,
    avatar: 'https://picsum.photos/seed/p2/200',
    category: 'Electrical',
    bio: 'Certified electrical engineer offering safe and reliable home wiring solutions.',
    hourlyRate: 2000,
    completedJobs: 89,
    rating: 4.9,
    loyaltyPoints: 210,
    serviceRadiusKm: 20,
    skills: ['Wiring', 'Fault Finding', 'CCTV Installation'],
    isVerified: true,
    isOnline: true,
    location: { lat: -1.2921, lng: 36.8219, address: 'Kilimani, Nairobi' },
    reviews: []
  },
  {
    id: 'p3',
    name: 'Samuel Kiprop',
    email: 'sam@example.com',
    phone: '+254700112233',
    role: UserRole.PROVIDER,
    avatar: 'https://picsum.photos/seed/p3/200',
    category: 'Mechanic',
    bio: 'Specialist in German and Japanese cars. We come to your location!',
    hourlyRate: 2500,
    completedJobs: 210,
    rating: 4.7,
    loyaltyPoints: 1200,
    serviceRadiusKm: 25,
    skills: ['Engine Overhaul', 'Brake Systems', 'Diagnosis'],
    isVerified: true,
    isOnline: false,
    location: { lat: -1.3032, lng: 36.7846, address: 'Westlands, Nairobi' },
    reviews: []
  }
];

export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Wrench': return <Wrench className="w-6 h-6" />;
    case 'Zap': return <Zap className="w-6 h-6" />;
    case 'Trash2': return <Trash2 className="w-6 h-6" />;
    case 'Car': return <Car className="w-6 h-6" />;
    case 'Paintbrush': return <Paintbrush className="w-6 h-6" />;
    case 'Hammer': return <Hammer className="w-6 h-6" />;
    default: return <Briefcase className="w-6 h-6" />;
  }
};

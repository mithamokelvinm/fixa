
import { ProviderProfile, UrgencyLevel, MatchResult } from '../types';
import { MOCK_PROVIDERS } from '../constants';

/**
 * Haversine formula to calculate distance between two points in km
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const matchingService = {
  /**
   * Matches providers based on client criteria
   */
  async matchProviders(
    clientLat: number,
    clientLng: number,
    category: string,
    urgency: UrgencyLevel
  ): Promise<MatchResult[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const matches: MatchResult[] = MOCK_PROVIDERS
      .filter(p => p.category === category && p.isOnline)
      .map(p => {
        const distance = calculateDistance(clientLat, clientLng, p.location!.lat, p.location!.lng);
        
        // Scoring Algorithm
        // 1. Distance score (Closer is better, max 50 points)
        const distanceScore = Math.max(0, 50 - (distance * 2));
        
        // 2. Rating score (Out of 30 points)
        const ratingScore = (p.rating || 0) * 6;
        
        // 3. Urgency Weighting
        // For HIGH urgency, we heavily prioritize proximity
        let score = distanceScore + ratingScore;
        if (urgency === 'HIGH') score += (50 - distance); 
        
        return {
          provider: p,
          distanceKm: parseFloat(distance.toFixed(1)),
          score
        };
      })
      // Filter by provider's service radius
      .filter(m => m.distanceKm <= m.provider.serviceRadiusKm)
      // Sort by best score
      .sort((a, b) => b.score - a.score);

    return matches;
  }
};

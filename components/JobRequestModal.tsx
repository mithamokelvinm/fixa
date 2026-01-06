
import React, { useState } from 'react';
import { X, MapPin, Zap, AlertTriangle, Loader2, Sparkles, CheckCircle, Star } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { UrgencyLevel, MatchResult } from '../types';
import { matchingService } from '../services/matchingService';

interface JobRequestModalProps {
  onClose: () => void;
  onJobConfirmed: (match: MatchResult) => void;
}

const JobRequestModal: React.FC<JobRequestModalProps> = ({ onClose, onJobConfirmed }) => {
  const [step, setStep] = useState<'DETAILS' | 'MATCHING' | 'RESULTS'>('DETAILS');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [urgency, setUrgency] = useState<UrgencyLevel>('MEDIUM');
  const [description, setDescription] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);

  const handleStartMatching = async () => {
    setStep('MATCHING');
    // Simulated client location (Nairobi CBD)
    const lat = -1.2833;
    const lng = 36.8167;
    const results = await matchingService.matchProviders(lat, lng, category, urgency);
    setMatches(results);
    setStep('RESULTS');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Request a Service</h2>
            <p className="text-sm text-gray-500">Find the perfect match for your needs</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-8">
          {step === 'DETAILS' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Service Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  >
                    {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Urgency</label>
                  <div className="flex gap-2">
                    {(['LOW', 'MEDIUM', 'HIGH'] as UrgencyLevel[]).map(level => (
                      <button
                        key={level}
                        onClick={() => setUrgency(level)}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition border ${
                          urgency === level 
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                            : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Describe the Issue</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g. The kitchen sink is leaking heavily..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl h-32 outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                />
              </div>

              <button 
                onClick={handleStartMatching}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Find Best Match
              </button>
            </div>
          )}

          {step === 'MATCHING' && (
            <div className="text-center py-12 space-y-6">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25" />
                <div className="absolute inset-4 bg-emerald-200 rounded-full animate-pulse" />
                <div className="absolute inset-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Scanning for Pros...</h3>
                <p className="text-gray-500">Optimizing matches based on proximity and rating</p>
              </div>
            </div>
          )}

          {step === 'RESULTS' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">We found {matches.length} pros near you</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 hide-scrollbar">
                {matches.map((match, idx) => (
                  <div 
                    key={match.provider.id} 
                    className={`p-4 rounded-2xl border transition group flex items-center gap-4 ${
                      idx === 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-100 hover:border-emerald-100'
                    }`}
                  >
                    <div className="relative">
                      <img src={match.provider.avatar} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="absolute -top-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                        <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-50" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900">{match.provider.name}</h4>
                        <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-100">
                          {match.distanceKm} km away
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="text-xs font-bold">{match.provider.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs font-bold text-gray-900">KES {match.provider.hourlyRate}/hr</span>
                      </div>
                      {match.provider.promotions && (
                        <p className="text-[10px] text-emerald-600 font-bold mt-1 bg-emerald-100/50 px-2 py-0.5 rounded inline-block">
                          PROMO: {match.provider.promotions.description}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => onJobConfirmed(match)}
                      className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
                        idx === 0 ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      {idx === 0 ? 'Accept Best Match' : 'Select'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobRequestModal;

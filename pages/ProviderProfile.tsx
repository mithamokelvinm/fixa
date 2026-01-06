
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PROVIDERS } from '../constants';
import { Star, MapPin, ShieldCheck, Clock, Check, Calendar, MessageCircle, ChevronRight, Share2, Heart } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import MpesaModal from '../components/MpesaModal';

const ProviderProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const provider = MOCK_PROVIDERS.find(p => p.id === id);
  const [summary, setSummary] = useState('Loading summary...');
  const [showPayModal, setShowPayModal] = useState(false);

  useEffect(() => {
    if (provider) {
      geminiService.summarizeReviews(provider.reviews).then(setSummary);
    }
  }, [provider]);

  if (!provider) return <div className="p-20 text-center">Provider not found</div>;

  return (
    <div className="pb-24 pt-4 md:pt-24 px-4 max-w-4xl mx-auto space-y-8">
      {/* Header Info */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600" />
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-4 border-gray-50 shadow-sm">
          <img src={provider.avatar} className="w-full h-full object-cover" alt={provider.name} />
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase">{provider.category}</span>
                {provider.isVerified && <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified</span>}
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900">{provider.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-gray-900">{provider.rating}</span>
                  <span>({provider.completedJobs} jobs)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  {provider.location?.address}
                </div>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              <button className="p-3 bg-gray-50 rounded-xl text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition"><Heart className="w-5 h-5" /></button>
              <button className="p-3 bg-gray-50 rounded-xl text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg max-w-xl">{provider.bio}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {provider.skills.map(skill => (
              <span key={skill} className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* AI Summary */}
          <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
            <h3 className="text-emerald-900 font-bold mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AI Insight
            </h3>
            <p className="text-emerald-800 text-sm leading-relaxed italic">"{summary}"</p>
          </section>

          {/* Availability */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Working Hours</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Mon - Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">{day}</p>
                  <p className="text-sm font-bold text-gray-900">{idx === 2 ? 'Closed' : '08:00 - 18:00'}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Client Reviews</h3>
              <button className="text-emerald-600 text-sm font-bold">See All</button>
            </div>
            {provider.reviews.length > 0 ? provider.reviews.map(review => (
              <div key={review.id} className="space-y-3 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                      {review.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{review.clientName}</p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            )) : (
              <p className="text-gray-400 text-sm text-center py-6">No reviews yet. Be the first to hire {provider.name.split(' ')[0]}!</p>
            )}
          </section>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-24 space-y-6">
            <div className="text-center">
              <span className="text-gray-500 text-sm">Starting at</span>
              <p className="text-4xl font-extrabold text-gray-900">KES {provider.hourlyRate}<span className="text-gray-400 text-lg font-medium">/hr</span></p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Available Today, 02:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Service Warranty Included</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setShowPayModal(true)}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </button>
              <button 
                onClick={() => navigate(`/chat/${provider.id}`)}
                className="w-full bg-white text-gray-700 border border-gray-200 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Provider
              </button>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center gap-3 justify-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Fixa Secure Payment Protection
            </div>
          </div>
        </div>
      </div>

      {showPayModal && (
        <MpesaModal 
          amount={provider.hourlyRate} 
          onSuccess={() => {
            setShowPayModal(false);
            navigate('/bookings');
          }}
          onClose={() => setShowPayModal(false)}
        />
      )}
    </div>
  );
};

export default ProviderProfile;

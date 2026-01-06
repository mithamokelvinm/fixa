
import React, { useState } from 'react';
import { CATEGORIES, getCategoryIcon, MOCK_PROVIDERS } from '../constants';
import { Search, MapPin, Star, ShieldCheck, ArrowRight, Sparkles, Zap, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import JobRequestModal from '../components/JobRequestModal';
import LoyaltyCard from '../components/LoyaltyCard';
import { MatchResult } from '../types';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const navigate = useNavigate();

  const handleMatchConfirmed = (match: MatchResult) => {
    setShowMatchModal(false);
    navigate(`/provider/${match.provider.id}`);
  };

  return (
    <div className="pb-32 pt-4 md:pt-24 px-4 md:px-12 max-w-7xl mx-auto space-y-12">
      {/* Dynamic Nairobi Hero */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-8 md:p-20 text-white shadow-2xl">
        {/* Decorative Skyline silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-[url('https://www.transparentpng.com/download/city-silhouette/skyline-city-silhouette-clipart-9.png')] opacity-10 bg-bottom bg-repeat-x pointer-events-none filter invert"></div>
        
        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/30 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md text-emerald-300">
            <Zap className="w-4 h-4" />
            Nairobi's #1 Service Network
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Karibu. Fix your space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">trusted pros.</span>
          </h1>
          
          <p className="text-emerald-100/70 text-lg md:text-xl font-medium max-w-xl">
            From Kilimani to Westlands, connect with top-tier fundis for your home or office. Secure, reliable, and fast.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1 group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-800 z-20">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="What do you need fixed today?"
                className="w-full pl-14 pr-6 py-5 bg-white/95 text-emerald-950 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-400/50 shadow-2xl transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && navigate('/discover')}
              />
            </div>
            <button 
              onClick={() => setShowMatchModal(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-emerald-950 px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-yellow-400/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              SMART MATCH
            </button>
          </div>
        </div>

        {/* Floating Accent Elements */}
        <div className="hidden lg:block absolute top-10 right-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="hidden lg:block absolute bottom-20 right-40 w-32 h-32 bg-yellow-400/10 rounded-full blur-[60px]"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Content Area */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Categorized Experiences */}
          <section className="space-y-8">
            <div className="flex justify-between items-end px-2">
              <div className="space-y-1">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Expertise</h2>
                <p className="text-slate-500 font-medium">Precision services for every corner of your life.</p>
              </div>
              <Link to="/discover" className="bg-emerald-100 text-emerald-700 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => navigate(`/discover?category=${cat.name}`)}
                  className="relative group h-48 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 overflow-hidden text-left"
                >
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900 leading-tight">{cat.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-[3] transition-transform duration-700 opacity-50"></div>
                </button>
              ))}
            </div>
          </section>

          {/* Premium Providers */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 px-2">
               <div className="h-px flex-1 bg-slate-200"></div>
               <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Verified Elite</h2>
               <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MOCK_PROVIDERS.map((provider) => (
                <div 
                  key={provider.id}
                  onClick={() => navigate(`/provider/${provider.id}`)}
                  className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                >
                  <div className="relative h-56">
                    <img src={provider.avatar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={provider.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black shadow-lg">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      {provider.rating}
                    </div>
                    
                    <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="bg-emerald-500 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full">
                          {provider.category}
                        </span>
                        <h3 className="text-xl font-black text-white">{provider.name}</h3>
                      </div>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-emerald-950 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      {provider.location?.address.split(',')[0]}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Rate</p>
                      <p className="text-emerald-600 font-black text-lg">KES {provider.hourlyRate.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar - Status & Rewards */}
        <div className="lg:col-span-4 space-y-10">
          <div className="sticky top-28 space-y-10">
            <div className="space-y-4 px-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Rewards</h2>
              <LoyaltyCard points={750} />
            </div>
            
            <div className="glass rounded-[2rem] p-8 space-y-6 shadow-xl">
              <h4 className="text-lg font-black text-slate-900">Unlock Fixa Benefits</h4>
              <div className="space-y-5">
                {[
                  { label: 'Fixa Gold', desc: 'Lower service fees on all jobs.', color: 'emerald' },
                  { label: 'Priority Support', desc: 'Direct access to pro help.', color: 'blue' },
                  { label: 'Free Estimates', desc: 'No-cost site visits for Gold.', color: 'yellow' },
                ].map(benefit => (
                  <div key={benefit.label} className="flex gap-4 group cursor-default">
                    <div className={`w-10 h-10 rounded-2xl bg-${benefit.color}-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <ShieldCheck className={`w-5 h-5 text-${benefit.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{benefit.label}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                Explore All Benefits
              </button>
            </div>
          </div>
        </div>
      </div>

      {showMatchModal && (
        <JobRequestModal 
          onClose={() => setShowMatchModal(false)} 
          onJobConfirmed={handleMatchConfirmed}
        />
      )}
    </div>
  );
};

export default Home;

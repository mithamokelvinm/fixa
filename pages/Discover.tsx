
import React, { useState, useMemo } from 'react';
import { MOCK_PROVIDERS, CATEGORIES } from '../constants';
import { MapPin, Star, Filter, SlidersHorizontal, LayoutGrid, Map as MapIcon, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Discover: React.FC = () => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter(p => {
      const catMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pb-24 pt-4 md:pt-24 px-4 h-screen flex flex-col max-w-7xl mx-auto">
      {/* Header Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-6 sticky top-20 z-40">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search providers..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center overflow-x-auto hide-scrollbar pb-1 md:pb-0">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${selectedCategory === 'All' ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-600'}`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${selectedCategory === cat.name ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-600'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-gray-50 rounded-xl text-gray-600 hover:bg-gray-100">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          <div className="flex bg-gray-50 rounded-xl p-1">
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition ${view === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-400'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('map')}
              className={`p-2 rounded-lg transition ${view === 'map' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-400'}`}
            >
              <MapIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {view === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProviders.length > 0 ? filteredProviders.map(provider => (
              <Link 
                key={provider.id} 
                to={`/provider/${provider.id}`}
                className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0">
                  <img src={provider.avatar} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={provider.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{provider.category}</span>
                      <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {provider.rating}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition">{provider.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {provider.location?.address}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-900 font-bold">KES {provider.hourlyRate}<span className="text-gray-400 text-xs font-normal">/hr</span></span>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {provider.completedJobs}+ Jobs Done
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No providers found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[60vh] bg-gray-200 rounded-3xl relative overflow-hidden flex items-center justify-center text-gray-500 border-4 border-white shadow-inner">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/800')] opacity-50 bg-cover bg-center" />
            <div className="z-10 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-gray-100 text-center max-w-xs">
              <MapPin className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900">Interactive Map View</h4>
              <p className="text-sm text-gray-600 mt-2">See providers near your current location. Move the map to explore other areas.</p>
            </div>
            
            {/* Custom Mock Markers */}
            {filteredProviders.map(p => (
              <div 
                key={p.id} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }}
              >
                <div className="bg-emerald-600 text-white p-2 rounded-full shadow-lg border-2 border-white hover:bg-emerald-700 hover:scale-125 transition">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-1 rounded-lg shadow-xl hidden group-hover:block whitespace-nowrap">
                   <p className="text-xs font-bold text-gray-900">{p.name} - KES {p.hourlyRate}/hr</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;

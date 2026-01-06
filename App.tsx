
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from './types';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Discover from './pages/Discover';
import ProviderProfile from './pages/ProviderProfile';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  // Demo Role state - In a real app, this would come from AuthContext
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Role Switcher for Demo Purposes */}
        <div className="fixed top-0 left-0 z-[60] bg-white border-b border-r p-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter hidden md:block">
          <span className="px-2">Demo Role:</span>
          <button onClick={() => setRole(UserRole.CLIENT)} className={`px-2 py-1 rounded ${role === UserRole.CLIENT ? 'bg-emerald-600 text-white' : ''}`}>Client</button>
          <button onClick={() => setRole(UserRole.PROVIDER)} className={`px-2 py-1 rounded ${role === UserRole.PROVIDER ? 'bg-emerald-600 text-white' : ''}`}>Provider</button>
          <button onClick={() => setRole(UserRole.ADMIN)} className={`px-2 py-1 rounded ${role === UserRole.ADMIN ? 'bg-emerald-600 text-white' : ''}`}>Admin</button>
        </div>

        <Navigation role={role} />
        
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/bookings" element={<div className="p-20 text-center">Your bookings will appear here.</div>} />
            <Route path="/messages" element={<div className="p-20 text-center">Conversations with your pros.</div>} />
            <Route path="/profile" element={<div className="p-20 text-center">User account settings.</div>} />

            {/* Provider Routes */}
            <Route path="/provider-dashboard" element={<Dashboard role={UserRole.PROVIDER} />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard role={UserRole.ADMIN} />} />
            
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;


import React from 'react';
import { Home, Search, Calendar, User, MessageCircle, Settings, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../types';

interface NavigationProps { role: UserRole; }

const Navigation: React.FC<NavigationProps> = ({ role }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const clientLinks = [
    { path: '/', icon: <Home />, label: 'Home' },
    { path: '/discover', icon: <Search />, label: 'Discover' },
    { path: '/bookings', icon: <Calendar />, label: 'Jobs' },
    { path: '/messages', icon: <MessageCircle />, label: 'Chat' },
    { path: '/profile', icon: <User />, label: 'Me' },
  ];

  const providerLinks = [
    { path: '/provider-dashboard', icon: <Home />, label: 'Home' },
    { path: '/provider-jobs', icon: <Calendar />, label: 'Schedule' },
    { path: '/messages', icon: <MessageCircle />, label: 'Inbox' },
    { path: '/provider-profile', icon: <User />, label: 'Profile' },
  ];

  const adminLinks = [
    { path: '/admin', icon: <Home />, label: 'Admin' },
    { path: '/admin/users', icon: <User />, label: 'Users' },
    { path: '/admin/payments', icon: <Shield />, label: 'Control' },
  ];

  const links = role === UserRole.CLIENT ? clientLinks : (role === UserRole.PROVIDER ? providerLinks : adminLinks);

  return (
    <>
      {/* High-End Desktop Nav */}
      <nav className="hidden md:flex fixed top-0 w-full glass z-50 px-8 py-4 justify-between items-center border-b border-white/20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-600/30 group-hover:rotate-12 transition-transform">F</div>
          <span className="text-2xl font-black text-emerald-950 tracking-tighter">Fixa<span className="text-emerald-500">.</span></span>
        </div>
        
        <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${isActive(link.path) ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {React.cloneElement(link.icon as React.ReactElement, { size: 18 })}
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden cursor-pointer hover:scale-110 transition-transform shadow-md">
            <img src="https://picsum.photos/seed/user123/100" alt="Profile" />
          </div>
        </div>
      </nav>

      {/* Floating Mobile Nav */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] glass z-50 flex justify-around items-center py-4 px-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40">
        {links.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className={`flex flex-col items-center gap-1.5 flex-1 transition-all duration-300 ${isActive(link.path) ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive(link.path) ? 'bg-emerald-100 shadow-inner' : ''}`}>
              {React.cloneElement(link.icon as React.ReactElement, { size: 22 })}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-wider transition-opacity ${isActive(link.path) ? 'opacity-100' : 'opacity-0'}`}>
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navigation;

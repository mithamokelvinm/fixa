
import React, { useState, useEffect } from 'react';
import { UserRole, JobStatus } from '../types';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Plus,
  Bell,
  MapPin,
  Sparkles
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const [showNotification, setShowNotification] = useState(false);

  // Simulate an incoming job matching notification for a provider
  useEffect(() => {
    if (role === UserRole.PROVIDER) {
      const timer = setTimeout(() => setShowNotification(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [role]);

  const data = [
    { name: 'Mon', jobs: 4, earnings: 6000 },
    { name: 'Tue', jobs: 7, earnings: 10500 },
    { name: 'Wed', jobs: 5, earnings: 7500 },
    { name: 'Thu', jobs: 9, earnings: 13500 },
    { name: 'Fri', jobs: 12, earnings: 18000 },
    { name: 'Sat', jobs: 15, earnings: 22500 },
    { name: 'Sun', jobs: 8, earnings: 12000 },
  ];

  const adminStats = [
    { label: 'Total Revenue', value: 'KES 1.2M', change: '+12.5%', icon: <DollarSign />, color: 'emerald' },
    { label: 'Active Providers', value: '842', change: '+4.3%', icon: <Users />, color: 'blue' },
    { label: 'Pending Bookings', value: '156', change: '-2.1%', icon: <Clock />, color: 'amber' },
    { label: 'Customer Satisfaction', value: '98.2%', change: '+0.4%', icon: <TrendingUp />, color: 'indigo' },
  ];

  const providerStats = [
    { label: 'Total Earnings', value: 'KES 84,200', icon: <DollarSign />, color: 'emerald' },
    { label: 'Jobs Completed', value: '142', icon: <CheckCircle />, color: 'blue' },
    { label: 'Current Rating', value: '4.9', icon: <TrendingUp />, color: 'amber' },
    { label: 'Wallet Balance', value: 'KES 12,400', icon: <Briefcase />, color: 'indigo' },
  ];

  const stats = role === UserRole.ADMIN ? adminStats : providerStats;

  return (
    <div className="pb-24 pt-4 md:pt-24 px-4 md:px-12 max-w-7xl mx-auto space-y-8 relative">
      
      {/* Real-time Job Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-4 md:right-12 z-[100] w-full max-w-sm animate-in slide-in-from-right duration-500">
          <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <Bell className="animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">New Match Found!</h4>
                  <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">Urgent</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">A client in <b>Upper Hill</b> needs a plumber now. 1.2km away.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowNotification(false)}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20"
              >
                Accept Job
              </button>
              <button 
                onClick={() => setShowNotification(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{role === UserRole.ADMIN ? 'Admin Overivew' : 'Provider Dashboard'}</h1>
          <p className="text-gray-500">Welcome back, {role === UserRole.ADMIN ? 'Administrator' : 'John'}. Here's what's happening.</p>
        </div>
        {role === UserRole.PROVIDER && (
          <div className="flex gap-3">
             <div className="hidden md:flex flex-col items-end px-4 border-r border-gray-200">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Loyalty Status</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Gold Pro
                </span>
             </div>
             <button className="hidden md:flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-600/20">
               <Plus className="w-5 h-5" /> Withdraw KES 12k
             </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat: any, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white ${
              stat.color === 'emerald' ? 'bg-emerald-500' : 
              stat.color === 'blue' ? 'bg-blue-500' : 
              stat.color === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'
            }`}>
              {stat.icon}
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              {stat.change && <span className={`text-[10px] font-bold ${String(stat.change).startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{stat.change}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Performance Analytics</h3>
            <select className="bg-gray-50 border-none rounded-xl text-sm font-bold px-4 py-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="jobs" fill="#10b981" radius={[4, 4, 4, 4]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Upcoming Jobs</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-gray-900 truncate">Leaking Sink Fix</p>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Today</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Kilimani Estate, Nairobi</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">KES 3,500 Estimated</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-emerald-600 text-sm font-bold hover:underline">View All Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

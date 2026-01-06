
import React from 'react';
import { Trophy, Gift, TrendingUp, Sparkles } from 'lucide-react';

interface LoyaltyCardProps {
  points: number;
}

const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ points }) => {
  const nextMilestone = 1000;
  const progress = (points / nextMilestone) * 100;
  const redeemableKES = Math.floor(points / 10);

  return (
    <div className="relative group perspective-1000">
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden transition-all duration-500 transform group-hover:scale-[1.02] active:scale-95">
        
        {/* Holographic Sheen Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
          <Trophy className="w-48 h-48 rotate-12" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Fixa Elite Member</span>
            </div>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>

          <div className="space-y-1">
            <p className="text-[10px] text-emerald-200/50 font-black uppercase tracking-[0.3em]">Points Balance</p>
            <div className="flex items-baseline gap-3">
              <h4 className="text-5xl font-black tracking-tighter">
                {points.toLocaleString()}
              </h4>
              <span className="text-lg font-bold opacity-40">FXP</span>
            </div>
            <p className="text-xs text-emerald-300/80 font-semibold">≈ KES {redeemableKES.toLocaleString()} Reward Credits</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
              <span>Next Milestone</span>
              <span>{points}/{nextMilestone}</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-300 h-full rounded-full transition-all duration-1000 relative shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                style={{ width: `${Math.min(100, progress)}%` }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              </div>
            </div>
          </div>

          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-emerald-500/20 active:translate-y-1">
            <Gift className="w-4 h-4" />
            Redeem Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;

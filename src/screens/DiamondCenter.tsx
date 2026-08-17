import React, { useMemo } from 'react';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, Gem, Copy, CheckCircle2 } from 'lucide-react';
import { audio } from '../lib/audio';
import { cn } from '../lib/utils';
import { getCurrencyForCountry, formatRewardAmount } from '../lib/currency';

const REDEEM_OPTIONS = [
  { cost: 1400, inr: 10, tier: 'low' },
  { cost: 2800, inr: 20, tier: 'low' },
  { cost: 7000, inr: 50, tier: 'medium' },
  { cost: 14000, inr: 100, tier: 'medium' },
  { cost: 28000, inr: 200, tier: 'medium' },
  { cost: 70000, inr: 500, tier: 'high' },
];

export default function DiamondCenter({ onBack }: { onBack: () => void }) {
  const { diamonds, redemptions, redeemDiamonds, profile } = useUserStore();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  
  const currentCurrency = useMemo(() => getCurrencyForCountry(profile?.country), [profile?.country]);

  const handleRedeem = (cost: number, rewardLabel: string) => {
    if (diamonds >= cost) {
      const currencyDetails = profile?.country ? {
        country: profile.country,
        currencyCode: currentCurrency.code,
        currencySymbol: currentCurrency.symbol
      } : undefined;
      const record = redeemDiamonds(cost, rewardLabel, currencyDetails);
      if (record) {
        audio.playWin();
      }
    } else {
      audio.playClick();
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    audio.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTierStyles = (tier: string) => {
    switch(tier) {
      case 'low': return 'bg-slate-800 border-slate-700';
      case 'medium': return 'bg-gradient-to-br from-slate-800 to-blue-900/20 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]';
      case 'high': return 'bg-gradient-to-br from-slate-800 to-purple-900/30 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]';
      case 'ultra': return 'bg-gradient-to-br from-slate-800 to-yellow-900/30 border-yellow-500/50 shadow-[0_0_25px_rgba(234,179,8,0.2)]';
      default: return 'bg-slate-800 border-slate-700';
    }
  };

  const getTierTextStyles = (tier: string) => {
    switch(tier) {
      case 'low': return 'text-white';
      case 'medium': return 'text-blue-100';
      case 'high': return 'text-purple-100';
      case 'ultra': return 'text-yellow-100';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col max-w-5xl mx-auto w-full h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <button onClick={onBack} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Gem className="w-6 h-6" /> Diamond Center
        </h1>
        <div className="w-10" />
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 text-center mb-10 shadow-xl shrink-0">
        <h2 className="text-slate-400 font-bold mb-2 uppercase tracking-wide text-sm">Your Diamonds</h2>
        <div className="flex items-center justify-center gap-3">
          <Gem className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          <span className="text-5xl font-black text-white">{diamonds.toLocaleString()}</span>
        </div>
      </div>

      <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-center shrink-0">Redeem Rewards</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 shrink-0">
        {REDEEM_OPTIONS.map((option, idx) => {
          const rewardLabel = formatRewardAmount(option.inr, currentCurrency);
          return (
          <div key={idx} className={cn("rounded-3xl p-5 border flex flex-col relative overflow-hidden transition-all hover:scale-[1.02]", getTierStyles(option.tier))}>
            <div className="flex items-center gap-2 mb-4">
              <Gem className="w-5 h-5 text-cyan-400 drop-shadow-md" />
              <span className="text-cyan-100 font-bold text-sm sm:text-base">{option.cost.toLocaleString()} Diamonds</span>
            </div>
            
            <div className={cn("text-3xl sm:text-4xl font-black mb-6 drop-shadow-sm", getTierTextStyles(option.tier))}>
              {rewardLabel}
            </div>
            <div className="mt-auto">
              <button
                onClick={() => handleRedeem(option.cost, rewardLabel)}
                disabled={diamonds < option.cost}
                className={cn(
                  "w-full font-black py-3 rounded-xl transition-all text-sm sm:text-base",
                  diamonds < option.cost
                    ? "bg-slate-900/50 text-slate-400 border border-slate-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:brightness-110 active:scale-[0.98]"
                )}
              >
                {diamonds < option.cost 
                  ? `Need ${(option.cost - diamonds).toLocaleString()} more Diamonds`
                  : 'REDEEM'}
              </button>
            </div>
          </div>
        )})}
      </div>

      <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-center shrink-0">Redemption History</h2>
      
      <div className="space-y-4 pb-12 max-w-3xl mx-auto w-full shrink-0">
        {redemptions.length === 0 ? (
          <div className="text-center text-slate-500 py-8 font-medium bg-slate-800/30 rounded-2xl border border-slate-700/50">
            No redemptions yet.
          </div>
        ) : (
          redemptions.map((record) => (
            <div key={record.id} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{record.date}</span>
                   </div>
                   <h3 className="text-2xl font-black text-white mb-2">{record.reward}</h3>
                   <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium bg-slate-900/50 inline-flex px-3 py-1.5 rounded-lg border border-slate-700">
                     <Gem className="w-4 h-4 text-cyan-400" />
                     {record.diamondsSpent.toLocaleString()} Diamonds Used
                   </div>
                 </div>
                 
                 <div className="bg-slate-900 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-4 border border-slate-700 min-w-[200px]">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">Redeem Code</span>
                     <code className="text-cyan-300 font-mono font-bold text-sm sm:text-base">{record.code}</code>
                   </div>
                   <button 
                     onClick={() => handleCopy(record.code, record.id)}
                     className="p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-white border border-slate-700"
                   >
                     {copiedId === record.id ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                   </button>
                 </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

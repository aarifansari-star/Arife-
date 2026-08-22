import React, { useState, useMemo } from 'react';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, Coins, CheckCircle2, Upload, AlertCircle, Clock } from 'lucide-react';
import { audio } from '../lib/audio';
import { cn } from '../lib/utils';
import { getCurrencyForCountry, formatRewardAmount } from '../lib/currency';

const REDEEM_OPTIONS = [
  { coins: 2000, inr: 10, tier: 'low' },
  { coins: 4000, inr: 20, tier: 'low' },
  { coins: 8000, inr: 30, tier: 'medium' },
  { coins: 16000, inr: 40, tier: 'medium' },
  { coins: 32000, inr: 50, tier: 'high' },
];

export default function UpiRedeemScreen({ onBack }: { onBack: () => void }) {
  const { coins, profile } = useUserStore();
  
  const [selectedOption, setSelectedOption] = useState<{ coins: number, inr: number } | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const [history, setHistory] = useState<any[]>(() => {
    const saved = localStorage.getItem('upi-history');
    return saved ? JSON.parse(saved) : [];
  });

  const currentCurrency = useMemo(() => getCurrencyForCountry(profile?.country), [profile?.country]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setQrPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file (JPG, PNG, WEBP)");
      }
    }
  };

  const handleRedeem = () => {
    if (!selectedOption) return;
    
    if (!qrPreview) {
      setStatus('error');
      setMessage('Please upload your UPI QR code.');
      return;
    }
    
    if (coins < selectedOption.coins) {
      setStatus('error');
      setMessage('Not enough coins.');
      return;
    }

    // Process redemption
    useUserStore.setState((state) => ({ coins: state.coins - selectedOption.coins }));
    audio.playWin();
    
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      coinsSpent: selectedOption.coins,
      reward: formatRewardAmount(selectedOption.inr, currentCurrency),
      status: 'pending'
    };
    
    const newHistory = [newRecord, ...history];
    setHistory(newHistory);
    localStorage.setItem('upi-history', JSON.stringify(newHistory));
    
    setStatus('success');
    setMessage('Withdrawal request submitted successfully! It is pending approval.');
    setSelectedOption(null);
    setQrPreview(null);
    
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col max-w-5xl mx-auto w-full h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <button onClick={onBack} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
           💰 UPI REDEEM CENTER
        </h1>
        <div className="w-10" />
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 text-center mb-10 shadow-xl shrink-0">
        <h2 className="text-slate-400 font-bold mb-2 uppercase tracking-wide text-sm">Your Coins</h2>
        <div className="flex items-center justify-center gap-3">
          <Coins className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <span className="text-5xl font-black text-white">{coins.toLocaleString()}</span>
        </div>
      </div>
      
      {status === 'success' && (
        <div className="bg-emerald-500/20 border border-emerald-500 rounded-2xl p-6 mb-8 text-center animate-in zoom-in-95 fade-in duration-300">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-emerald-400 font-black text-lg">{message}</h3>
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-8 flex items-center justify-center gap-2 font-bold animate-in shake">
          <AlertCircle className="w-5 h-5 shrink-0" /> <span>{message}</span>
        </div>
      )}

      <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-center shrink-0">Select Amount</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 shrink-0">
        {REDEEM_OPTIONS.map((option, idx) => {
          const rewardLabel = formatRewardAmount(option.inr, currentCurrency);
          const isSelected = selectedOption?.coins === option.coins;
          const canAfford = coins >= option.coins;
          
          return (
          <button 
            key={idx}
            disabled={!canAfford}
            onClick={() => {
              audio.playClick();
              setSelectedOption(option);
              setStatus('idle');
            }}
            className={cn(
              "rounded-3xl p-5 border flex flex-col items-center relative overflow-hidden transition-all",
              isSelected ? "bg-emerald-900/40 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] scale-105" : 
              canAfford ? "bg-slate-800 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-700" :
              "bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed"
            )}
          >
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-2 drop-shadow-sm">
              {rewardLabel}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-700">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-100 font-bold text-xs sm:text-sm">{option.coins.toLocaleString()}</span>
            </div>
          </button>
        )})}
      </div>

      {selectedOption && (
        <div className="bg-slate-800/80 border border-emerald-500/30 rounded-3xl p-6 mb-12 animate-in slide-in-from-bottom-4">
          <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider">Payment Details</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-slate-400 font-bold text-sm mb-2 uppercase tracking-wide">UPI QR CODE</label>
              
              {!qrPreview ? (
                <label className="border-2 border-dashed border-slate-600 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700/30 hover:border-emerald-500/50 transition-colors group">
                  <Upload className="w-10 h-10 text-slate-500 mb-3 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-white font-bold mb-1">Upload QR Code</span>
                  <span className="text-slate-500 text-xs text-center max-w-[200px]">Supports JPG, JPEG, PNG, WEBP</span>
                  <input type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={handleImageUpload} />
                </label>
              ) : (
                <div className="relative border-2 border-emerald-500/30 rounded-2xl p-4 bg-slate-900 flex flex-col items-center">
                  <img src={qrPreview} alt="QR Preview" className="max-h-[200px] object-contain rounded-xl mb-4" />
                  <button 
                    onClick={() => setQrPreview(null)}
                    className="text-red-400 text-sm font-bold hover:text-red-300"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleRedeem}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-lg py-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-[0.98] transition-all uppercase tracking-wide mt-4"
            >
              REQUEST UPI PAYMENT
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-center shrink-0 mt-8">Redemption History</h2>
      
      <div className="space-y-4 pb-12 max-w-3xl mx-auto w-full shrink-0">
        {history.length === 0 ? (
          <div className="text-center text-slate-500 py-8 font-medium bg-slate-800/30 rounded-2xl border border-slate-700/50">
            No redemptions yet.
          </div>
        ) : (
          history.map((record, i) => (
            <div key={record.id || i} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{record.date}</span>
                   </div>
                   <h3 className="text-2xl font-black text-white mb-2">{record.reward}</h3>
                   <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium bg-slate-900/50 inline-flex px-3 py-1.5 rounded-lg border border-slate-700">
                     <Coins className="w-4 h-4 text-yellow-400" />
                     {record.coinsSpent.toLocaleString()} Coins Used
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-2">
                   {record.status === 'pending' ? (
                     <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-3 py-1.5 rounded-full font-bold text-sm uppercase tracking-wider">
                       <Clock className="w-4 h-4" /> Pending
                     </div>
                   ) : (
                     <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full font-bold text-sm uppercase tracking-wider">
                       <CheckCircle2 className="w-4 h-4" /> Approved
                     </div>
                   )}
                 </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

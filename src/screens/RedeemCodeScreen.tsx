import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, Gift, Coins, CheckCircle2, XCircle, AlertCircle, Gem } from 'lucide-react';
import { audio } from '../lib/audio';
import { cn } from '../lib/utils';

export default function RedeemCodeScreen({ onBack }: { onBack: () => void }) {
  const { coins, useRedeemCode } = useUserStore();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'used'>('idle');
  const [message, setMessage] = useState('');
  const [rewardCoins, setRewardCoins] = useState(0);

  const handleRedeem = () => {
    if (!code.trim()) return;
    
    audio.playClick();
    const result = useRedeemCode(code.trim().toUpperCase());
    
    if (result.success) {
      audio.playWin();
      setStatus('success');
      setMessage(result.message);
      setRewardCoins(result.coins || 0);
      setCode('');
    } else {
      if (result.message.includes('Already Used')) {
        setStatus('used');
      } else {
        setStatus('error');
      }
      setMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
      <div className="w-full flex items-center mb-8">
        <button onClick={() => { audio.playClick(); onBack(); }} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-slate-800/60 border border-fuchsia-500/30 rounded-3xl p-8 text-center mb-8 shadow-xl w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Gift className="w-32 h-32 text-fuchsia-400" />
        </div>
        
        <Gift className="w-16 h-16 text-fuchsia-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(232,121,249,0.5)]" />
        <h1 className="text-3xl font-black text-white mb-2 tracking-wide uppercase">Redeem Code Center</h1>
        
        <p className="text-slate-300 mb-8 font-medium">Enter your redeem code and receive Coins</p>

        {status === 'success' && (
          <div className="bg-emerald-500/20 border border-emerald-500 rounded-2xl p-6 mb-8 animate-in zoom-in-95 fade-in duration-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            <h3 className="text-emerald-400 font-black text-xl mb-2">{message}</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coins className="w-6 h-6 text-yellow-400" />
              <span className="text-3xl font-black text-yellow-400">+{rewardCoins.toLocaleString()} COINS</span>
            </div>
            <div className="text-slate-300 text-sm font-medium">
              Your new Coin balance: <span className="text-white font-bold">{coins.toLocaleString()}</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-8 flex items-center justify-center gap-2 font-bold animate-in shake">
            <XCircle className="w-5 h-5 shrink-0" /> <span>{message}</span>
          </div>
        )}

        {status === 'used' && (
          <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 p-4 rounded-xl mb-8 flex items-center justify-center gap-2 font-bold animate-in shake">
            <AlertCircle className="w-5 h-5 shrink-0" /> <span>{message}</span>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="BR-XXXX-XXXX-XXXX"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (status !== 'idle') setStatus('idle');
            }}
            className="w-full bg-slate-900/80 border-2 border-slate-600 focus:border-fuchsia-500 rounded-xl p-4 text-white font-mono text-center text-lg font-bold tracking-widest placeholder:text-slate-500 focus:outline-none transition-colors uppercase shadow-inner"
          />
          
          <button
            onClick={handleRedeem}
            disabled={!code.trim()}
            className={cn(
              "w-full font-black py-4 rounded-xl text-lg uppercase tracking-wide transition-all flex items-center justify-center gap-2",
              !code.trim()
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            Redeem Code
          </button>
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 w-full text-left">
        <h3 className="text-slate-400 font-bold uppercase text-sm mb-4 tracking-wider">How it works:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="bg-cyan-500/20 p-1.5 rounded-lg shrink-0 mt-0.5">
              <Gem className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-slate-300 text-sm">Get a redeem code from Diamond Rewards</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-fuchsia-500/20 p-1.5 rounded-lg shrink-0 mt-0.5">
              <Gift className="w-4 h-4 text-fuchsia-400" />
            </div>
            <span className="text-slate-300 text-sm">Enter the code here</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-yellow-500/20 p-1.5 rounded-lg shrink-0 mt-0.5">
              <Coins className="w-4 h-4 text-yellow-400" />
            </div>
            <span className="text-slate-300 text-sm">Receive Coins</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

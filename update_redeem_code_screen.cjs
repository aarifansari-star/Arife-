const fs = require('fs');

const content = `import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, Coins, CheckCircle2, AlertCircle, Clock, Gift, Copy } from 'lucide-react';
import { audio } from '../lib/audio';
import { cn } from '../lib/utils';

// We format the amount directly here instead of relying on external currency libraries
// since we just want a strict ₹10, ₹20, etc. format.
const REDEEM_OPTIONS = [
  { coins: 2000, inr: 10, tier: 'low' },
  { coins: 4000, inr: 20, tier: 'low' },
  { coins: 8000, inr: 30, tier: 'medium' },
  { coins: 16000, inr: 40, tier: 'medium' },
  { coins: 32000, inr: 50, tier: 'high' },
];

interface RedeemHistoryRecord {
  id: string;
  date: string;
  coinsSpent: number;
  reward: string;
  code: string;
}

export default function RedeemCodeScreen({ onBack }: { onBack: () => void }) {
  const { coins, addCoins } = useUserStore();
  const [selectedOption, setSelectedOption] = useState<typeof REDEEM_OPTIONS[0] | null>(null);
  
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  
  const [history, setHistory] = useState<RedeemHistoryRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('redeem-code-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleGenerateCode = () => {
    if (!selectedOption) return;
    if (coins < selectedOption.coins) {
      setStatus('error');
      setMessage('Not enough coins!');
      return;
    }
    
    audio.playClick();
    
    // Deduct coins
    addCoins(-selectedOption.coins);
    
    // Generate code
    const generatePart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const newCode = \`BR-\${generatePart()}-\${generatePart()}-\${generatePart()}\`;
    
    const newRecord: RedeemHistoryRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      coinsSpent: selectedOption.coins,
      reward: \`₹\${selectedOption.inr} Redeem Code\`,
      code: newCode
    };
    
    const newHistory = [newRecord, ...history];
    setHistory(newHistory);
    localStorage.setItem('redeem-code-history', JSON.stringify(newHistory));
    
    setGeneratedCode(newCode);
    setStatus('success');
    setMessage(\`Successfully generated your ₹\${selectedOption.inr} Redeem Code!\`);
    
    // Clear selection after generation
    setSelectedOption(null);
  };
  
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    audio.playClick();
    // Quick toast could go here
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col max-w-5xl mx-auto w-full h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <button onClick={() => { audio.playClick(); onBack(); }} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
           <Gift className="w-6 h-6" /> REDEEM CODE CENTER
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
          <h3 className="text-emerald-400 font-black text-lg mb-4">{message}</h3>
          
          {generatedCode && (
            <div className="bg-slate-900 border border-emerald-500/50 p-4 rounded-xl flex items-center justify-between max-w-sm mx-auto">
              <span className="font-mono text-xl font-bold text-white tracking-widest">{generatedCode}</span>
              <button 
                onClick={() => copyToClipboard(generatedCode)}
                className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                title="Copy Code"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          )}
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
          const rewardLabel = \`₹\${option.inr} Code\`;
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
                setGeneratedCode(null);
              }}
              className={cn(
                "rounded-3xl p-5 border flex flex-col items-center relative overflow-hidden transition-all",
                isSelected ? "bg-emerald-900/40 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] scale-105" : 
                canAfford ? "bg-slate-800 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-700" :
                "bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed"
              )}
            >
              <div className="text-2xl sm:text-2xl font-black text-emerald-400 mb-2 drop-shadow-sm text-center">
                {rewardLabel}
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-700">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-100 font-bold text-xs sm:text-sm">{option.coins.toLocaleString()}</span>
              </div>
            </button>
          )
        })}
      </div>

      {selectedOption && (
        <div className="bg-slate-800/80 border border-emerald-500/30 rounded-3xl p-6 mb-12 animate-in slide-in-from-bottom-4">
          <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wider text-center">Generate Your Code</h3>
          <p className="text-slate-400 text-sm text-center mb-6">
            You are exchanging <strong className="text-yellow-400">{selectedOption.coins.toLocaleString()} Coins</strong> for a <strong className="text-emerald-400">₹{selectedOption.inr} Redeem Code</strong>.
          </p>
          
          <button 
            onClick={handleGenerateCode}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-lg py-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-[0.98] transition-all uppercase tracking-wide"
          >
            CONFIRM & GENERATE
          </button>
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
                 
                 <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-mono font-bold text-lg tracking-widest">
                     {record.code}
                   </div>
                   <button 
                     onClick={() => copyToClipboard(record.code)}
                     className="text-xs text-slate-400 hover:text-white font-bold uppercase tracking-widest flex items-center gap-1"
                   >
                     <Copy className="w-3 h-3" /> Copy
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
`;

fs.writeFileSync('src/screens/RedeemCodeScreen.tsx', content);

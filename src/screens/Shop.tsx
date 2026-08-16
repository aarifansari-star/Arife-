import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { GOTI_SKINS } from '../types';
import { ArrowLeft, Coins, Check, Lock, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { audio } from '../lib/audio';
import { GotiPiece } from '../components/GotiPiece';

export default function Shop({ onBack }: { onBack: () => void }) {
  const { coins, unlockedGotis, equippedGotiId, buyGoti, equipGoti } = useUserStore();
  const [errorId, setErrorId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'affordable' | 'premium' | 'legendary'>('all');

  const handleAction = (id: string, price: number) => {
    if (unlockedGotis.includes(id)) {
      equipGoti(id);
      audio.playClick();
      setErrorId(null);
    } else {
      if (coins >= price) {
        if (buyGoti(id, price)) {
          audio.playWin();
          setErrorId(null);
        }
      } else {
        setErrorId(id);
        audio.playClick();
        setTimeout(() => setErrorId(null), 3000);
      }
    }
  };

  const filteredSkins = GOTI_SKINS.filter(skin => {
    if (filter === 'affordable') return skin.price <= coins || unlockedGotis.includes(skin.id);
    if (filter === 'premium') return skin.price >= 5000 && skin.price < 150000;
    if (filter === 'legendary') return skin.price >= 150000;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col max-w-7xl mx-auto w-full">
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md p-4 sm:p-6 pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Goti Shop</h1>
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-yellow-500/30">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-yellow-400">{coins.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(['all', 'affordable', 'premium', 'legendary'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors",
                filter === f ? "bg-cyan-500 text-slate-900" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20">
          {filteredSkins.map((skin) => {
            const isUnlocked = unlockedGotis.includes(skin.id);
            const isEquipped = equippedGotiId === skin.id;
            const canAfford = coins >= skin.price;
            const isError = errorId === skin.id;

            return (
              <div 
                key={skin.id}
                className={cn(
                  "flex flex-col items-center p-4 sm:p-6 rounded-2xl border transition-all relative overflow-hidden",
                  isEquipped ? "bg-slate-800/80 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
                )}
              >
                {/* Visual Premium Glow Background */}
                {skin.price >= 50000 && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${skin.price >= 150000 ? '#fde047' : '#a855f7'}, transparent 70%)` }} />
                )}
                
                <div className="h-28 flex items-center justify-center mb-4 relative w-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative">
                    <GotiPiece color="red" skinId={skin.id} />
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center z-10 backdrop-blur-[1px]">
                        <Lock className="w-6 h-6 text-white/80" />
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="font-bold text-lg sm:text-xl mb-1 text-center">{skin.name}</h3>
                
                {isError ? (
                  <div className="text-red-400 text-[10px] sm:text-xs font-bold text-center h-8 flex flex-col items-center justify-center mb-2 animate-in slide-in-from-bottom-2">
                    <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Not enough coins</span>
                    <span>{(skin.price - coins).toLocaleString()} more needed</span>
                  </div>
                ) : (
                  <div className="text-slate-400 text-sm font-medium h-8 flex items-center justify-center mb-2">
                    {isUnlocked ? (
                      <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Owned</span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-400 font-bold">
                        <Coins className="w-4 h-4" /> {skin.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => handleAction(skin.id, skin.price)}
                  disabled={isEquipped}
                  className={cn(
                    "w-full py-2 sm:py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all uppercase tracking-wider text-xs sm:text-sm",
                    isEquipped ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50" :
                    isUnlocked ? "bg-slate-700 text-white hover:bg-slate-600 shadow-md hover:shadow-lg" :
                    canAfford ? "bg-gradient-to-b from-yellow-400 to-yellow-600 text-slate-900 hover:from-yellow-300 hover:to-yellow-500 shadow-lg hover:shadow-xl hover:scale-[1.02]" :
                    "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed hover:bg-slate-700/50"
                  )}
                >
                  {isEquipped ? (
                    <><Check className="w-4 h-4" /> Equipped</>
                  ) : isUnlocked ? (
                    'Equip'
                  ) : (
                    'Buy'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { PREMIUM_AVATARS } from './PremiumAvatars';
import { useUserStore } from '../store/userStore';
import { Gem, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { audio } from '../lib/audio';

interface Props {
  onEquip: (id: string) => void;
  currentAvatarId?: string;
}

export function AvatarShop({ onEquip, currentAvatarId }: Props) {
  const { diamonds, unlockedAvatars, buyAvatar } = useUserStore();
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const handleBuy = (id: string, price: number) => {
    audio.playClick();
    if (buyAvatar(id, price)) {
      setShowSuccess(id);
      setTimeout(() => setShowSuccess(null), 2000);
      // Auto equip on buy
      onEquip(id);
    }
  };

  const handleEquip = (id: string) => {
    audio.playClick();
    onEquip(id);
  };

  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Gem className="w-5 h-5 text-cyan-400" /> PREMIUM AVATARS
        </h3>
        <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700">
          <Gem className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-cyan-400 text-sm">{diamonds.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 pb-4 custom-scrollbar">
        {PREMIUM_AVATARS.map((avatar) => {
          const isOwned = unlockedAvatars?.includes(avatar.id);
          const isEquipped = currentAvatarId === avatar.id;
          const canAfford = diamonds >= avatar.price;

          return (
            <div 
              key={avatar.id} 
              className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex flex-col items-center relative overflow-hidden group"
            >
              {/* Avatar Preview */}
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 border-2 transition-transform group-hover:scale-110", avatar.themeClass, avatar.borderClass)}>
                {avatar.emoji}
              </div>
              
              <div className="font-black text-white text-xs text-center mb-2 h-8 flex items-center justify-center leading-tight">
                {avatar.name}
              </div>

              {isOwned ? (
                isEquipped ? (
                  <button disabled className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black text-[10px] py-2 rounded-xl flex items-center justify-center gap-1 uppercase tracking-wide">
                    <CheckCircle2 className="w-3 h-3" /> EQUIPPED
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEquip(avatar.id)}
                    className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-black text-[10px] py-2 rounded-xl uppercase tracking-wider transition-colors shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                  >
                    EQUIP
                  </button>
                )
              ) : (
                <div className="w-full flex flex-col gap-1.5">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-cyan-400 bg-slate-900/50 py-1 rounded-lg">
                    <Gem className="w-3 h-3" /> {avatar.price.toLocaleString()}
                  </div>
                  
                  <button
                    onClick={() => handleBuy(avatar.id, avatar.price)}
                    disabled={!canAfford}
                    className={cn(
                      "w-full font-black text-[10px] py-2 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1",
                      canAfford 
                        ? "bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_10px_rgba(34,211,238,0.4)] active:scale-95" 
                        : "bg-slate-700 text-slate-400 cursor-not-allowed opacity-80"
                    )}
                  >
                    {canAfford ? 'BUY' : <><Lock className="w-3 h-3" /> LOCKED</>}
                  </button>
                  
                  {!canAfford && (
                    <div className="text-[9px] text-center text-rose-400 font-bold mt-0.5">
                      Need {(avatar.price - diamonds).toLocaleString()} more
                    </div>
                  )}
                </div>
              )}

              {showSuccess === avatar.id && (
                <div className="absolute inset-0 bg-emerald-500/90 flex flex-col items-center justify-center text-white z-10 animate-in fade-in zoom-in">
                  <CheckCircle2 className="w-8 h-8 mb-1" />
                  <span className="font-black text-[10px] uppercase tracking-wider">UNLOCKED!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

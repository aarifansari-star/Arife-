import React, { useState } from 'react';
import { AppScreen, GameType } from '../types';
import { useUserStore } from '../store/userStore';
import { Coins, Settings, ShoppingCart, BarChart3, Play, Dices, HelpCircle, Gem, User, Gift } from 'lucide-react';
import { cn } from '../lib/utils';
import { audio } from '../lib/audio';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  onPlay: (game: GameType) => void;
}

export default function MainMenu({ onNavigate, onPlay }: Props) {
  const { coins, diamonds, profile } = useUserStore();
  const [showProfileAlert, setShowProfileAlert] = useState(false);

  const handleDiamondLudo = () => {
    audio.playClick();
    if (!profile || !profile.name || !profile.age || !profile.country) {
      setShowProfileAlert(true);
    } else {
      onNavigate('diamondSetup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
      
      {showProfileAlert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-in fade-in">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
            <User className="w-16 h-16 text-indigo-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Profile Required</h2>
            <p className="text-slate-300 mb-8 font-medium">
              Please create your profile before playing Diamond Ludo.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                   audio.playClick();
                   setShowProfileAlert(false);
                   onNavigate('profile');
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black py-4 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wide"
              >
                Create Profile
              </button>
              <button 
                onClick={() => { audio.playClick(); setShowProfileAlert(false); }}
                className="w-full bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6">
        {profile && (
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-600/50 shadow-md cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => onNavigate('profile')}>
            <User className="w-5 h-5 text-slate-300" />
            <span className="font-bold text-slate-200">{profile.name}</span>
          </div>
        )}
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-yellow-400">{coins.toLocaleString()}</span>
        </div>
        <button 
          onClick={() => onNavigate('diamondCenter')}
          className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 active:scale-95 transition-all"
        >
          <Gem className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-cyan-400">{diamonds.toLocaleString()}</span>
        </button>
      </div>

      <div className="mb-12 text-center mt-12 px-2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 filter drop-shadow-[0_0_10px_rgba(192,38,211,0.5)]">
          LOUDO MAX REDEEM CODE
        </h1>
        <p className="text-slate-400 text-lg tracking-widest uppercase">Classic Multiplayer</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button 
          onClick={() => onPlay('ludo')}
          className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-2xl font-bold text-xl shadow-[0_4px_20px_rgba(225,29,72,0.4)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <Play className="w-6 h-6 fill-current" /> Play Ludo
        </button>

        <button 
          onClick={handleDiamondLudo}
          className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 p-4 rounded-2xl font-bold text-xl shadow-[0_4px_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-all overflow-hidden border border-cyan-400/30"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <Gem className="w-6 h-6 text-cyan-200" /> Diamond Ludo
        </button>

        <button 
          onClick={() => onPlay('snakes')}
          className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl font-bold text-xl shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <Dices className="w-6 h-6" /> Play Snakes & Ladders
        </button>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <MenuButton icon={<Gift />} label="Redeem Code" onClick={() => onNavigate('redeemCode')} color="fuchsia" />
          <MenuButton icon={<User />} label="Profile" onClick={() => onNavigate('profile')} color="indigo" />
          <MenuButton icon={<ShoppingCart />} label="Shop" onClick={() => onNavigate('shop')} color="blue" />
          <MenuButton icon={<BarChart3 />} label="Stats" onClick={() => onNavigate('stats')} color="purple" />
          <MenuButton icon={<Settings />} label="Settings" onClick={() => onNavigate('settings')} color="slate" />
          <MenuButton icon={<HelpCircle />} label="How to Play" onClick={() => onNavigate('howToPlay')} color="green" />
        </div>
      </div>
    </div>
  );
}

function MenuButton({ icon, label, onClick, color }: { icon: React.ReactNode, label: string, onClick: () => void, color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600/20 text-blue-400 border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-500/50',
    purple: 'bg-purple-600/20 text-purple-400 border-purple-500/30 hover:bg-purple-600/30 hover:border-purple-500/50',
    slate: 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50',
    green: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/30 hover:border-emerald-500/50',
    indigo: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-600/30 hover:border-indigo-500/50',
    fuchsia: 'bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-600/30 hover:border-fuchsia-500/50',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border backdrop-blur-sm transition-all hover:scale-105 active:scale-95",
        colorMap[color]
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

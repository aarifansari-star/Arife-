import React, { useState } from 'react';
import { useLudoStore } from '../store/ludoStore';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, Gem, Bot, Play, User } from 'lucide-react';
import { audio } from '../lib/audio';
import { AvatarDisplay } from '../components/AvatarDisplay';

const OPPONENT_NAMES = [
  "Rahul", "Aman", "Arjun", "Rohit", "Karan", "Vikash", "Aditya", 
  "Sameer", "Akash", "Yash", "Rohan", "Aryan", "Kabir", "Dev", 
  "Raj", "Ankit", "Saurabh", "Varun", "Mohit", "Nikhil", "Ravi", 
  "Vivek", "Manish", "Harsh", "Abhishek", "Siddharth", "Ayush", 
  "Krishna", "Rajesh", "Deepak"
];

interface Props {
  onBack: () => void;
  onStart: () => void;
}

export default function DiamondSetup({ onBack, onStart }: Props) {
  const setupGame = useLudoStore(state => state.setupGame);
  const { equippedGotiId, profile } = useUserStore();
  
  const playerName = profile?.name || 'You';
  
  const [opponentName] = useState(() => {
    return OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)];
  });

  const handleStart = () => {
    audio.playClick();
    
    // Set up 1 Human vs 1 Bot
    setupGame([
      { id: 'p1', name: playerName, color: 'red', gotiId: equippedGotiId, isBot: false },
      { id: 'p2', name: opponentName, color: 'yellow', gotiId: 'classic', isBot: true }
    ], 'diamondLudo');
    
    onStart();
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
      <div className="w-full flex items-center mb-8">
        <button onClick={onBack} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-slate-800/60 border border-cyan-500/30 rounded-3xl p-8 text-center mb-8 shadow-xl w-full">
        <Gem className="w-16 h-16 text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        <h1 className="text-3xl font-black text-white mb-2 tracking-wide uppercase">Diamond Ludo</h1>
        
        <p className="text-slate-300 mb-8 font-medium">{playerName} vs {opponentName}.</p>

        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="flex flex-col items-center gap-1">
             <span className="font-black text-white text-lg tracking-wide truncate max-w-[100px]">{playerName}</span>
             <AvatarDisplay profile={profile} className="w-14 h-14 border-[3px] border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] mb-1" emojiSizeClass="text-2xl" />
             <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Red</span>
          </div>

          <span className="font-black text-slate-500 text-xl italic">VS</span>

          <div className="flex flex-col items-center gap-1">
             <span className="font-black text-white text-lg tracking-wide flex items-center gap-1 truncate max-w-[100px]">
               {opponentName} <Bot className="w-4 h-4 text-slate-400" />
             </span>
             <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center border-[3px] border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] mb-1">
               <Bot className="w-6 h-6 text-yellow-400" />
             </div>
             <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Yellow</span>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 text-center border border-slate-700 mb-8">
          <p className="text-slate-400 font-bold uppercase text-xs mb-1">Reward</p>
          <p className="text-white font-black text-xl flex items-center justify-center gap-2">
            🏆 Winner: <Gem className="w-5 h-5 text-cyan-400" /> <span className="text-cyan-400">+10 Diamonds</span>
          </p>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black text-lg py-4 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          <Play className="w-5 h-5" /> Start Game
        </button>
      </div>
    </div>
  );
}

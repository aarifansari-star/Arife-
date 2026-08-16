import React, { useState } from 'react';
import { GameType, Player, PlayerColor } from '../types';
import { ArrowLeft, Users, Play } from 'lucide-react';
import { cn, colorMap } from '../lib/utils';
import { useUserStore } from '../store/userStore';
import { useLudoStore } from '../store/ludoStore';
import { useSnakesStore } from '../store/snakesStore';
import { audio } from '../lib/audio';

interface Props {
  gameType: GameType;
  onBack: () => void;
  onStart: () => void;
}

const AVAILABLE_COLORS: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];

export default function GameSetup({ gameType, onBack, onStart }: Props) {
  const [playerCount, setPlayerCount] = useState<number>(4);
  const { equippedGotiId, profile } = useUserStore();
  const [playerNames, setPlayerNames] = useState<string[]>([
    profile?.name || 'Player 1', 
    'Player 2', 
    'Player 3', 
    'Player 4'
  ]);
  
  const setupLudo = useLudoStore(state => state.setupGame);
  const setupSnakes = useSnakesStore(state => state.setupGame);

  const assignedColors: PlayerColor[] = playerCount === 2 ? ['red', 'yellow'] : 
                                        playerCount === 3 ? ['red', 'green', 'yellow'] : 
                                        ['red', 'green', 'yellow', 'blue'];

  const handleStart = () => {
    audio.playClick();
    
    const players: Player[] = Array.from({ length: playerCount }).map((_, i) => ({
      id: `p${i+1}`,
      name: playerNames[i] || `Player ${i+1}`,
      color: assignedColors[i],
      gotiId: i === 0 ? equippedGotiId : 'classic', // Only P1 gets equipped skin for simplicity, others could be classic or random
    }));

    if (gameType === 'ludo') {
      setupLudo(players);
    } else {
      setupSnakes(players);
    }
    
    onStart();
  };

  const updateName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold ml-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
            {gameType === 'ludo' ? 'Ludo Setup' : 'Snakes & Ladders'}
          </h1>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-cyan-400" />
            <h2 className="text-xl font-bold">Number of Players</h2>
          </div>
          
          <div className="flex gap-4">
            {[2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => { audio.playClick(); setPlayerCount(num); }}
                className={cn(
                  "flex-1 py-3 rounded-xl font-bold text-lg transition-all border-2",
                  playerCount === num 
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
                    : "bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700"
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {Array.from({ length: playerCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30">
              <div className={cn("w-10 h-10 rounded-full border-4 shadow-lg flex-shrink-0", colorMap[assignedColors[i]].bg, colorMap[assignedColors[i]].border)} />
              <input
                type="text"
                value={playerNames[i]}
                onChange={(e) => updateName(i, e.target.value)}
                maxLength={12}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-cyan-500 font-semibold text-lg"
                placeholder={`Player ${i+1}`}
              />
            </div>
          ))}
        </div>

        <button 
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-2xl font-bold text-xl shadow-[0_4px_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Play className="w-6 h-6 fill-current" /> Start Game
        </button>
      </div>
    </div>
  );
}

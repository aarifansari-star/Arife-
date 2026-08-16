import React from 'react';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, Trophy, Gamepad2, Dices, Coins } from 'lucide-react';

export default function Stats({ onBack }: { onBack: () => void }) {
  const { stats } = useUserStore();

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold ml-4">Statistics</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<Gamepad2 className="text-blue-400" />} label="Games Played" value={stats.gamesPlayed} />
          <StatCard icon={<Trophy className="text-yellow-400" />} label="Games Won" value={stats.gamesWon} />
          <StatCard icon={<Trophy className="text-red-400" />} label="Ludo Wins" value={stats.ludoWins} />
          <StatCard icon={<Dices className="text-green-400" />} label="Snakes Wins" value={stats.snakesWins} />
          <StatCard icon={<Coins className="text-yellow-400" />} label="Total Coins Earned" value={stats.totalCoinsEarned} className="col-span-2" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, className = '' }: { icon: React.ReactNode, label: string, value: number, className?: string }) {
  return (
    <div className={`bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center gap-2 ${className}`}>
      <div className="p-3 bg-slate-900 rounded-full shadow-inner mb-2">
        {icon}
      </div>
      <span className="text-3xl font-black">{value}</span>
      <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{label}</span>
    </div>
  );
}

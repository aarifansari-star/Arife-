import React from 'react';
import { ArrowLeft, Dice5, Trophy, Coins, Users } from 'lucide-react';

export default function HowToPlay({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold ml-4">How to Play</h1>
        </div>

        <div className="space-y-8 pb-12">
          
          <section className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
              <Users /> Ludo Rules
            </h2>
            <ul className="space-y-3 text-slate-300 list-disc list-inside">
              <li>Each player has 4 tokens (gotis) starting in their home area.</li>
              <li>You must roll a <strong>6</strong> to move a token out of the home area.</li>
              <li>Rolling a 6 grants you an extra turn.</li>
              <li>If your token lands on an opponent's token, the opponent's token is captured and returned to its home area, and you get an extra turn.</li>
              <li>Tokens on <strong>Safe zones</strong> (marked with a ★ or starting squares) cannot be captured.</li>
              <li>The first player to move all 4 tokens to the center finishing area wins.</li>
            </ul>
          </section>

          <section className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
              <Dice5 /> Snakes & Ladders Rules
            </h2>
            <ul className="space-y-3 text-slate-300 list-disc list-inside">
              <li>All players start off the board. Roll the dice to enter and move forward.</li>
              <li>If you land exactly at the bottom of a <strong>Ladder</strong>, you automatically climb to the top.</li>
              <li>If you land exactly on the head of a <strong>Snake</strong>, you slide down to its tail.</li>
              <li>The first player to reach square exactly <strong>100</strong> wins the game.</li>
              <li>Rolling a 6 grants you an extra turn.</li>
            </ul>
          </section>

          <section className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
              <Coins /> Coins & Shop
            </h2>
            <ul className="space-y-3 text-slate-300 list-disc list-inside">
              <li>Winning games earns you <strong>Coins</strong> (10 for Ludo, 75 for Snakes & Ladders).</li>
              <li>Use coins in the <strong>Shop</strong> to purchase new, unique token skins.</li>
              <li>Equip your purchased skins from the shop before starting a new game to show them off!</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}

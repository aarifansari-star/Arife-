import React, { useEffect, useState } from 'react';
import { useSnakesStore, SNAKES, LADDERS } from '../store/snakesStore';
import { useUserStore } from '../store/userStore';
import { GOTI_SKINS } from '../types';
import { colorMap, cn } from '../lib/utils';
import { ArrowLeft, Dices, Trophy, Gem, User, Bot } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AvatarDisplay } from '../components/AvatarDisplay';
import { GotiPiece } from '../components/GotiPiece';

export default function SnakesGame({ onExit }: { onExit: () => void }) {
  const { players, positions, turnIndex, diceValue, diceRolled, rollDice, resetGame, winners } = useSnakesStore();
  const { addCoins, addDiamonds, equippedGotiId } = useUserStore();
  const [showResult, setShowResult] = useState(false);

  const currentPlayer = players[turnIndex];

  useEffect(() => {
    if (winners.length >= players.length - 1 && players.length > 0) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setShowResult(true);
      
      const isHumanWinner = winners[0]?.isBot === false || winners[0]?.id === 'p1';
      
      const wonCoins = 75; // First place gets 75.
      if (isHumanWinner) {
        addCoins(wonCoins);
        addDiamonds(5);
      }
      
      useUserStore.getState().updateStats({
        gamesPlayed: useUserStore.getState().stats.gamesPlayed + 1,
        gamesWon: useUserStore.getState().stats.gamesWon + (isHumanWinner ? 1 : 0),
        snakesWins: useUserStore.getState().stats.snakesWins + (isHumanWinner ? 1 : 0),
      });
    }
  }, [winners.length, players.length]);

  const handleExit = () => {
    resetGame();
    onExit();
  };

  const getCellCoords = (cell: number) => {
    if (cell < 1) return null;
    const idx = cell - 1;
    const r = 9 - Math.floor(idx / 10);
    const c = Math.floor(idx / 10) % 2 === 0 ? idx % 10 : 9 - (idx % 10);
    return { r, c };
  };

  const renderDiceIndicator = (color: string) => {
    const player = players.find(p => p.color === color);
    if (!player || showResult) return <div className="w-20 h-20 sm:w-28 sm:h-28" />;

    const isActive = currentPlayer?.color === color;

    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 relative",
        isActive ? "shadow-xl animate-in zoom-in-95 border-[3px] sm:border-4 scale-100 opacity-100" : "border-2 scale-90 opacity-60 grayscale",
        isActive ? colorMap[color as keyof typeof colorMap].bg : "bg-slate-800",
        isActive ? colorMap[color as keyof typeof colorMap].border : "border-slate-700",
      )}>
         <h2 className={cn(
           "text-[10px] sm:text-xs mb-1 uppercase tracking-wider drop-shadow-md truncate w-full text-center font-bold flex items-center justify-center gap-1",
           isActive ? "text-black" : colorMap[color as keyof typeof colorMap].text
         )}>
           {player.isBot ? <Bot className="w-3 h-3" /> : (player.id === 'p1' ? <AvatarDisplay profile={useUserStore.getState().profile} className="w-4 h-4 border-none" emojiSizeClass="text-[10px]" /> : <User className="w-3 h-3" />)} {player.name}
         </h2>
         <button
           onClick={rollDice}
           disabled={!isActive || diceRolled}
           className={cn(
             "w-10 h-10 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black shadow-inner transition-all",
             isActive ? "bg-white" : "bg-slate-700",
             (isActive && !diceRolled) ? cn(colorMap[color as keyof typeof colorMap].text, "hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-white/50 animate-pulse") : "text-slate-400 opacity-90 cursor-not-allowed"
           )}
         >
           {(isActive && diceValue) ? diceValue : <Dices className={cn("w-5 h-5 sm:w-8 sm:h-8", !isActive && "opacity-50")} />}
         </button>
         {isActive && (
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
             YOUR TURN
           </div>
         )}
      </div>
    );
  };

  // Generate Board Cells
  const cells = [];
  for (let i = 100; i >= 1; i--) {
    const coords = getCellCoords(i)!;
    const isSnakeStart = SNAKES[i] !== undefined;
    const isLadderStart = LADDERS[i] !== undefined;
    
    cells.push(
      <div 
        key={i}
        className={cn(
          "border border-slate-700/30 flex items-center justify-center font-bold text-xs sm:text-sm text-slate-500 relative",
          (coords.r + coords.c) % 2 === 0 ? "bg-amber-100" : "bg-amber-50"
        )}
        style={{ gridRow: coords.r + 1, gridColumn: coords.c + 1 }}
      >
        <span className="absolute top-1 left-1 opacity-50">{i}</span>
      </div>
    );
  }

  // Generate SVG lines for snakes and ladders for better visual
  const renderSVG = () => {
    const graphics = [];
    
    const getPoint = (cell: number) => {
      const coords = getCellCoords(cell);
      if (!coords) return { x: 0, y: 0 };
      // Center of cell in 0-100 coordinate space
      return { x: coords.c * 10 + 5, y: coords.r * 10 + 5 };
    };

    // Draw Ladders first (so they are under snakes)
    Object.entries(LADDERS).forEach(([start, end]) => {
      const p1 = getPoint(parseInt(start)); // Bottom
      const p2 = getPoint(end); // Top
      
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // Normal vector for width
      const nx = -dy / length * 2.5; 
      const ny = dx / length * 2.5; 
      
      const numRungs = Math.floor(length / 4);
      
      graphics.push(
        <g key={`l-${start}`}>
           {/* Left rail */}
           <line x1={p1.x - nx} y1={p1.y - ny} x2={p2.x - nx} y2={p2.y - ny} stroke="#92400e" strokeWidth="1.2" strokeLinecap="round" />
           {/* Right rail */}
           <line x1={p1.x + nx} y1={p1.y + ny} x2={p2.x + nx} y2={p2.y + ny} stroke="#92400e" strokeWidth="1.2" strokeLinecap="round" />
           {/* Rungs */}
           {Array.from({ length: numRungs }).map((_, i) => {
             const t = (i + 1) / (numRungs + 1);
             const rx = p1.x + dx * t;
             const ry = p1.y + dy * t;
             return (
               <line 
                 key={`r-${i}`} 
                 x1={rx - nx} y1={ry - ny} 
                 x2={rx + nx} y2={ry + ny} 
                 stroke="#b45309" strokeWidth="0.8" 
               />
             );
           })}
        </g>
      );
    });

    // Draw Snakes
    Object.entries(SNAKES).forEach(([start, end]) => {
      const p1 = getPoint(parseInt(start)); // Head
      const p2 = getPoint(end); // Tail
      
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Normal vector
      const nx = -dy / dist;
      const ny = dx / dist;
      
      // Curvy path with two control points to make an "S" shape
      const cp1x = p1.x + dx * 0.33 + nx * 12;
      const cp1y = p1.y + dy * 0.33 + ny * 12;
      const cp2x = p1.x + dx * 0.66 - nx * 12;
      const cp2y = p1.y + dy * 0.66 - ny * 12;

      const pathData = `M ${p1.x} ${p1.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;

      graphics.push(
        <g key={`s-${start}`}>
           {/* Snake body shadow */}
           <path d={pathData} fill="none" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" transform="translate(0.5, 0.5)" />
           {/* Snake body */}
           <path d={pathData} fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
           {/* Snake belly / stripes */}
           <path d={pathData} fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="1.5,2.5" strokeLinecap="round" />
           
           {/* Snake Head */}
           {/* Head shape */}
           <circle cx={p1.x} cy={p1.y} r="2.2" fill="#15803d" />
           {/* Eyes */}
           <circle cx={p1.x - 0.8} cy={p1.y - 0.8} r="0.4" fill="#ffffff" />
           <circle cx={p1.x + 0.8} cy={p1.y - 0.8} r="0.4" fill="#ffffff" />
           {/* Pupils */}
           <circle cx={p1.x - 0.8} cy={p1.y - 0.8} r="0.2" fill="#000000" />
           <circle cx={p1.x + 0.8} cy={p1.y - 0.8} r="0.2" fill="#000000" />
           {/* Tongue */}
           <path d={`M ${p1.x} ${p1.y + 2.2} L ${p1.x - 0.5} ${p1.y + 3.5} M ${p1.x} ${p1.y + 2.2} L ${p1.x + 0.5} ${p1.y + 3.5}`} stroke="#ef4444" strokeWidth="0.3" fill="none" />
           
           {/* Snake Tail */}
           <circle cx={p2.x} cy={p2.y} r="0.8" fill="#16a34a" />
        </g>
      );
    });

    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {graphics}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-[600px] flex items-center justify-between mb-2">
        <button onClick={handleExit} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full max-w-[600px] flex justify-between mb-2 px-2">
         {renderDiceIndicator('red')}
         {renderDiceIndicator('green')}
      </div>

      <div className="w-full max-w-[600px] aspect-square bg-slate-200 rounded-xl shadow-2xl p-2 relative overflow-hidden">
        <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-0 border-2 border-amber-900">
          {cells}
          {renderSVG()}
          
          {/* Render Players */}
          {players.map((p, idx) => {
            const pos = positions[p.id];
            if (pos < 1 || pos > 100) return null;
            
            const coords = getCellCoords(pos)!;
            const skinId = p.gotiId || 'classic';
            const skin = GOTI_SKINS.find(s => s.id === skinId) || GOTI_SKINS[0];
            
            // Offset slightly so multiple players on same cell are visible
            const offsetX = (idx % 2 === 0 ? -15 : 15) + '%';
            const offsetY = (idx < 2 ? -15 : 15) + '%';

            return (
              <div 
                key={p.id}
                className={cn(
                  "absolute z-10 w-[6%] h-[6%] transition-all duration-300 ease-in-out flex items-center justify-center p-[2px]"
                )}
                style={{ 
                  left: `calc(${(coords.c / 10) * 100}% + 2%)`, 
                  top: `calc(${(coords.r / 10) * 100}% + 2%)`,
                  transform: `translate(${offsetX}, ${offsetY})`
                }}
              >
                <div className={cn(
                  "w-full h-full flex items-center justify-center rounded-full",
                  skin.id !== 'classic' && skin.styleClass
                )}>
                  <GotiPiece color={p.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-[600px] flex justify-between mt-2 px-2">
         {renderDiceIndicator('blue')}
         {renderDiceIndicator('yellow')}
      </div>

      {showResult && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-6 text-center">
          <Trophy className="w-24 h-24 text-yellow-400 mb-6" />
          <h2 className="text-4xl font-black text-white mb-2">Game Over!</h2>
          <div className="text-xl text-yellow-400 font-bold mb-8 flex flex-col items-center justify-center gap-2">
            <span>{winners[0]?.name} wins +75 Coins!</span>
            {(winners[0]?.isBot === false || winners[0]?.id === 'p1') && (
              <span className="flex items-center gap-2 text-cyan-400 bg-cyan-400/20 px-4 py-2 rounded-full border border-cyan-400/30">
                <Gem className="w-5 h-5" /> +5 Diamonds
              </span>
            )}
          </div>
          
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {winners.map((w, i) => (
              <div key={w.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                <span className="font-bold text-lg text-slate-300">#{i + 1}</span>
                <span className={cn("font-bold text-xl", colorMap[w.color].text)}>{w.name}</span>
              </div>
            ))}
            
            <button 
              onClick={handleExit}
              className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-xl p-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Return to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useLudoStore, LUDO_OFFSETS, SAFE_CELLS } from '../store/ludoStore';
import { useUserStore } from '../store/userStore';
import { PATH_COORDS, HOME_COLS, HOME_BOX, HOME_GOTI_OFFSETS } from '../lib/ludoLayout';
import { PlayerColor, GOTI_SKINS } from '../types';
import { colorMap, cn } from '../lib/utils';
import { ArrowLeft, Dices, Trophy, Bot, Gem } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GotiPiece } from '../components/GotiPiece';

export default function LudoGame({ onExit }: { onExit: () => void }) {
  const { gameMode, players, gotis, turnIndex, diceValue, diceRolled, rollDice, moveGoti, getValidMoves, resetGame, winners } = useLudoStore();
  const { addCoins, addDiamonds, equippedGotiId } = useUserStore();
  const [showResult, setShowResult] = useState(false);

  const currentPlayer = players[turnIndex];
  const validMoves = getValidMoves();

  useEffect(() => {
    if (winners.length >= players.length - 1 && players.length > 0) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setShowResult(true);
      
      const isHumanWinner = winners[0]?.isBot === false || winners[0]?.id === 'p1';
      
      // Award coins
      const wonCoins = gameMode === 'ludo' ? 10 : 100;
      if (isHumanWinner) {
        addCoins(wonCoins);
        if (gameMode === 'diamondLudo') {
          addDiamonds(10);
        }
      }
      
      useUserStore.getState().updateStats({
        gamesPlayed: useUserStore.getState().stats.gamesPlayed + 1,
        gamesWon: useUserStore.getState().stats.gamesWon + (isHumanWinner ? 1 : 0),
        ludoWins: gameMode === 'ludo' ? (useUserStore.getState().stats.ludoWins + (isHumanWinner ? 1 : 0)) : useUserStore.getState().stats.ludoWins,
        diamondLudoWins: gameMode === 'diamondLudo' ? (useUserStore.getState().stats.diamondLudoWins + (isHumanWinner ? 1 : 0)) : (useUserStore.getState().stats.diamondLudoWins || 0),
      });
    }
  }, [winners.length, players.length]);

  const handleExit = () => {
    resetGame();
    onExit();
  };

  const renderDiceIndicator = (color: PlayerColor) => {
    const isActive = currentPlayer?.color === color;
    const player = players.find(p => p.color === color);
    
    if (!player || showResult) return <div className="w-20 h-20 sm:w-28 sm:h-28" />;

    if (!isActive) {
      return (
        <div className="w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center opacity-50 transition-opacity">
          <div className={cn("px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 flex items-center gap-1")}>
            {player.isBot && <Bot className="w-3 h-3" />} {player.name}
          </div>
        </div>
      );
    }

    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-2 rounded-2xl shadow-xl animate-in zoom-in-95 duration-300 border-[3px] sm:border-4 relative",
        colorMap[color].bg,
        colorMap[color].border,
        "w-20 h-20 sm:w-28 sm:h-28 z-20"
      )}>
         <h2 className="text-white font-black text-[10px] sm:text-xs mb-1 uppercase tracking-wider drop-shadow-md truncate w-full text-center flex items-center justify-center gap-1">
           {player.isBot && <Bot className="w-3 h-3" />} {player.name}
         </h2>
         <button
           onClick={rollDice}
           disabled={diceRolled || player.isBot}
           className={cn(
             "w-10 h-10 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black shadow-inner transition-all bg-white",
             !diceRolled && !player.isBot ? cn(colorMap[color].text, "hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-white/50 animate-pulse") : "text-slate-400 opacity-90 grayscale cursor-default"
           )}
         >
           {diceValue || <Dices className="w-5 h-5 sm:w-8 sm:h-8" />}
         </button>
         {player.isBot && !diceRolled && (
           <span className="absolute -bottom-6 text-white text-[10px] sm:text-xs font-bold whitespace-nowrap bg-black/80 px-2 py-1 rounded-full animate-in fade-in">Thinking...</span>
         )}
         {diceRolled && validMoves.length === 0 && (
           <span className="absolute -bottom-6 text-white text-[10px] sm:text-xs font-bold whitespace-nowrap bg-black/80 px-2 py-1 rounded-full animate-in fade-in">No moves</span>
         )}
      </div>
    );
  };

  const renderCell = (r: number, c: number, key: string, bgColor: string, isSafe = false, isStar = false) => (
    <div
      key={key}
      className={cn("border border-slate-700/50 flex items-center justify-center relative", bgColor)}
      style={{ gridRow: r + 1, gridColumn: c + 1 }}
    >
      {isStar && <div className="absolute text-slate-300/30 text-2xl">★</div>}
    </div>
  );

  const cells = [];
  
  // Render Homes (6x6)
  (['red', 'green', 'yellow', 'blue'] as PlayerColor[]).forEach(color => {
    const box = HOME_BOX[color];
    cells.push(
      <div 
        key={`home-${color}`}
        className={cn("border-2 flex items-center justify-center relative", colorMap[color].bg, colorMap[color].border)}
        style={{ gridRow: `${box.r + 1} / span 6`, gridColumn: `${box.c + 1} / span 6` }}
      >
         <div className="absolute inset-[14%] bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="flex-1 flex w-full">
              <div className={cn("flex-1 border-r-[3px] border-b-[3px] opacity-40", colorMap[color].border)} />
              <div className={cn("flex-1 border-b-[3px] opacity-40", colorMap[color].border)} />
            </div>
            <div className="flex-1 flex w-full">
              <div className={cn("flex-1 border-r-[3px] opacity-40", colorMap[color].border)} />
              <div className="flex-1" />
            </div>
         </div>
      </div>
    );
  });

  // Render Path
  PATH_COORDS.forEach((pos, idx) => {
    let bgColor = "bg-white";
    let isStar = SAFE_CELLS.includes(idx);
    
    if (idx === LUDO_OFFSETS.red) bgColor = colorMap.red.bg;
    else if (idx === 50) bgColor = colorMap.red.bg;
    else if (idx === LUDO_OFFSETS.green) bgColor = colorMap.green.bg;
    else if (idx === 11) bgColor = colorMap.green.bg;
    else if (idx === LUDO_OFFSETS.yellow) bgColor = colorMap.yellow.bg;
    else if (idx === 24) bgColor = colorMap.yellow.bg;
    else if (idx === LUDO_OFFSETS.blue) bgColor = colorMap.blue.bg;
    else if (idx === 37) bgColor = colorMap.blue.bg;

    cells.push(renderCell(pos.r, pos.c, `path-${idx}`, bgColor, isStar, isStar));
  });

  // Render Home Columns
  Object.entries(HOME_COLS).forEach(([color, coords]) => {
    coords.forEach((pos, idx) => {
      cells.push(renderCell(pos.r, pos.c, `homeCol-${color}-${idx}`, colorMap[color as PlayerColor].bg));
    });
  });
  
  // Render Center
  cells.push(
    <div key="center" className="relative border-2 border-slate-800 overflow-hidden bg-slate-900" style={{ gridRow: '7 / span 3', gridColumn: '7 / span 3' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 100,0 50,50" fill="#22c55e" />
        <polygon points="100,0 100,100 50,50" fill="#facc15" />
        <polygon points="0,100 100,100 50,50" fill="#3b82f6" />
        <polygon points="0,0 0,100 50,50" fill="#ef4444" />
        <line x1="0" y1="0" x2="100" y2="100" stroke="#1e293b" strokeWidth="2" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#1e293b" strokeWidth="2" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-[600px] flex items-center justify-between mb-2">
        <button onClick={handleExit} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        {gameMode === 'diamondLudo' && (
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Gem className="w-5 h-5" /> Diamond Ludo
            </h1>
            <div className="text-slate-400 text-xs font-bold flex items-center gap-1">
               <Gem className="w-3 h-3 text-cyan-500" /> {useUserStore.getState().diamonds.toLocaleString()} Diamonds
            </div>
          </div>
        )}
        <div className="w-10" />
      </div>

      <div className="w-full max-w-[600px] flex justify-between mb-2 px-2">
         {renderDiceIndicator('red')}
         {renderDiceIndicator('green')}
      </div>

      <div className="w-full max-w-[600px] aspect-square bg-white rounded-xl shadow-2xl p-2 relative overflow-hidden">
        <div className="w-full h-full grid grid-cols-15 grid-rows-15 gap-[1px] bg-slate-200">
          {cells}
          
          {/* Render Gotis */}
          {gotis.map((goti) => {
            let r, c;
            const pIndex = parseInt(goti.id.split('-')[1]);
            
            if (goti.state === 'home') {
              const hBox = HOME_BOX[goti.color];
              const offset = HOME_GOTI_OFFSETS[pIndex];
              r = hBox.r + offset.r;
              c = hBox.c + offset.c;
            } else if (goti.state === 'path') {
              const absPos = (goti.position + LUDO_OFFSETS[goti.color]) % 52;
              const pos = PATH_COORDS[absPos];
              r = pos.r;
              c = pos.c;
            } else if (goti.state === 'homeColumn') {
              const pos = HOME_COLS[goti.color][goti.position];
              r = pos.r;
              c = pos.c;
            } else {
              // finished state
              const FINISHED_OFFSETS: Record<PlayerColor, {r: number, c: number}[]> = {
                red: [
                  { r: 6.7, c: 6.1 }, { r: 7.3, c: 6.1 },
                  { r: 6.7, c: 6.6 }, { r: 7.3, c: 6.6 }
                ],
                green: [
                  { r: 6.1, c: 6.7 }, { r: 6.1, c: 7.3 },
                  { r: 6.6, c: 6.7 }, { r: 6.6, c: 7.3 }
                ],
                yellow: [
                  { r: 6.7, c: 8.4 }, { r: 7.3, c: 8.4 },
                  { r: 6.7, c: 8.9 }, { r: 7.3, c: 8.9 }
                ],
                blue: [
                  { r: 8.4, c: 6.7 }, { r: 8.4, c: 7.3 },
                  { r: 8.9, c: 6.7 }, { r: 8.9, c: 7.3 }
                ]
              };
              const fPos = FINISHED_OFFSETS[goti.color][pIndex];
              r = fPos.r;
              c = fPos.c;
            }

            const isSelectable = validMoves.some(v => v.id === goti.id);
            const p = players.find(pl => pl.color === goti.color);
            const skinId = p?.gotiId || 'classic';
            const skin = GOTI_SKINS.find(s => s.id === skinId) || GOTI_SKINS[0];

            return (
              <div 
                key={goti.id}
                onClick={() => isSelectable && moveGoti(goti.id)}
                className={cn(
                  "absolute z-10 w-[6.66%] h-[6.66%] transition-all duration-200 flex items-center justify-center",
                  isSelectable && "cursor-pointer scale-110 drop-shadow-xl z-20 animate-pulse",
                  goti.state === 'finished' && "scale-75 z-0"
                )}
                style={{ 
                  left: `${(c / 15) * 100}%`, 
                  top: `${(r / 15) * 100}%`,
                }}
              >
                <div className={cn(
                  "w-full h-full flex items-center justify-center rounded-full",
                  skin.id !== 'classic' && skin.styleClass
                )}>
                  <GotiPiece color={goti.color} />
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
            <span>{winners[0]?.name} wins +{gameMode === 'ludo' ? 10 : 100} Coins!</span>
            {(winners[0]?.isBot === false || winners[0]?.id === 'p1') && gameMode === 'diamondLudo' && (
              <span className="flex items-center gap-2 text-cyan-400 bg-cyan-400/20 px-4 py-2 rounded-full border border-cyan-400/30">
                <Gem className="w-5 h-5" /> +10 Diamonds
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

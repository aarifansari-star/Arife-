import { create } from 'zustand';
import { Player, PlayerColor, GameType } from '../types';
import { audio } from '../lib/audio';

const MOVEMENT_DURATION = 180;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type GotiState = 'home' | 'path' | 'homeColumn' | 'finished';

export interface Goti {
  id: string;
  color: PlayerColor;
  state: GotiState;
  position: number; // 0-51 for path, 0-4 for homeColumn
}

export const LUDO_OFFSETS: Record<PlayerColor, number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39
};

export const SAFE_CELLS = [0, 8, 13, 21, 26, 34, 39, 47];

export interface LudoState {
  gameMode: GameType;
  players: Player[];
  gotis: Goti[];
  turnIndex: number;
  diceValue: number | null;
  diceRolled: boolean;
  extraTurn: boolean;
  winners: Player[];
  isMoving: boolean;
  
  setupGame: (players: Player[], gameMode?: GameType) => void;
  rollDice: () => void;
  moveGoti: (gotiId: string) => Promise<void>;
  nextTurn: () => void;
  getValidMoves: () => Goti[];
  resetGame: () => void;
  playComputerTurn: () => Promise<void>;
}

export const useLudoStore = create<LudoState>((set, get) => ({
  gameMode: 'ludo',
  players: [],
  gotis: [],
  turnIndex: 0,
  diceValue: null,
  diceRolled: false,
  extraTurn: false,
  winners: [],
  isMoving: false,

  setupGame: (players, gameMode = 'ludo') => {
    const gotis: Goti[] = [];
    players.forEach(p => {
      for (let i = 0; i < 4; i++) {
        gotis.push({ id: `${p.color}-${i}`, color: p.color, state: 'home', position: -1 });
      }
    });
    set({ gameMode, players, gotis, turnIndex: 0, diceValue: null, diceRolled: false, extraTurn: false, winners: [], isMoving: false });
    
    // Check if first player is bot
    if (players[0]?.isBot) {
      setTimeout(() => get().playComputerTurn(), 1000);
    }
  },

  playComputerTurn: async () => {
    const state = get();
    if (state.winners.length >= state.players.length - 1 || state.isMoving) return;
    
    await delay(800 + Math.random() * 400); // 800-1200ms delay
    
    // 1. Roll Dice
    audio.playDiceRoll();
    const val = Math.floor(Math.random() * 6) + 1;
    set({ diceValue: val, diceRolled: true, extraTurn: val === 6 });
    
    await delay(600); // Wait for dice animation
    
    // 2. Determine moves
    const validMoves = get().getValidMoves();
    
    if (validMoves.length === 0) {
      await delay(800);
      get().nextTurn();
      return;
    }
    
    // 3. AI Logic
    let chosenGoti = validMoves[0];
    
    if (validMoves.length > 1) {
       // Evaluate moves
       const evaluateMove = (goti: Goti) => {
         let score = 0;
         
         if (goti.state === 'home') score += 10; // good to get out
         
         if (goti.state === 'path') {
            const absolutePos = (goti.position + val + LUDO_OFFSETS[goti.color]) % 52;
            
            // Can capture?
            if (!SAFE_CELLS.includes(absolutePos)) {
              const currentGotis = get().gotis;
              const canCapture = currentGotis.some(other => 
                other.color !== goti.color && other.state === 'path' && ((other.position + LUDO_OFFSETS[other.color]) % 52) === absolutePos
              );
              if (canCapture) score += 50;
            }
            
            // Reaches home column
            if (goti.position + val > 50) score += 20;
            
            // Reaches safe cell
            if (SAFE_CELLS.includes(absolutePos)) score += 5;
         }
         
         if (goti.state === 'homeColumn') {
            if (goti.position + val === 5) score += 30; // finishes
         }
         
         return score;
       };
       
       const scoredMoves = validMoves.map(m => ({ goti: m, score: evaluateMove(m) }));
       scoredMoves.sort((a, b) => b.score - a.score);
       chosenGoti = scoredMoves[0].goti;
    }
    
    await delay(300);
    get().moveGoti(chosenGoti.id);
  },

  rollDice: () => {
    const { diceRolled, winners, players, turnIndex, isMoving } = get();
    if (diceRolled || winners.length >= players.length - 1 || isMoving) return;

    audio.playDiceRoll();
    const val = Math.floor(Math.random() * 6) + 1;
    
    set({ diceValue: val, diceRolled: true, extraTurn: val === 6 });
    
    // Check valid moves after a short delay for animation
    setTimeout(() => {
      const state = get();
      const validMoves = state.getValidMoves();
      if (validMoves.length === 0) {
        setTimeout(() => get().nextTurn(), 1000);
      } else if (validMoves.length === 1) {
        setTimeout(() => get().moveGoti(validMoves[0].id), 500);
      }
    }, 600);
  },

  getValidMoves: () => {
    const { players, turnIndex, gotis, diceValue, diceRolled, isMoving } = get();
    if (!diceRolled || diceValue === null || isMoving) return [];
    
    const currentPlayer = players[turnIndex];
    return gotis.filter(goti => {
      if (goti.color !== currentPlayer.color) return false;
      
      if (goti.state === 'home') {
        return diceValue === 6;
      }
      
      if (goti.state === 'path') {
        const remainingOnPath = 50 - goti.position;
        if (diceValue <= remainingOnPath) return true;
        
        // Entering home column
        const over = diceValue - remainingOnPath;
        if (over <= 5) return true;
        return false;
      }
      
      if (goti.state === 'homeColumn') {
        return goti.position + diceValue <= 5; // 5 is finished
      }
      
      return false;
    });
  },

  moveGoti: async (gotiId: string) => {
    const { gotis, diceValue, players, turnIndex, extraTurn, winners, isMoving } = get();
    if (diceValue === null || isMoving) return;
    
    const gotiIndex = gotis.findIndex(g => g.id === gotiId);
    if (gotiIndex === -1) return;
    
    set({ isMoving: true });
    
    let goti = { ...gotis[gotiIndex] };
    let captureOccurred = false;
    let finishedOccurred = false;

    if (goti.state === 'home') {
      goti.state = 'path';
      goti.position = 0;
      audio.playMove();
      
      const newGotis = [...get().gotis];
      newGotis[gotiIndex] = goti;
      set({ gotis: newGotis });
      await delay(MOVEMENT_DURATION);
    } else {
      // Step by step
      for (let step = 1; step <= diceValue; step++) {
        if (goti.state === 'path') {
          if (goti.position === 50) {
            goti.state = 'homeColumn';
            goti.position = 0;
          } else {
            goti.position += 1;
          }
        } else if (goti.state === 'homeColumn') {
          goti.position += 1;
        }

        if (goti.state === 'homeColumn' && goti.position === 5) {
          goti.state = 'finished';
          finishedOccurred = true;
          audio.playHome();
        } else {
          audio.playMove();
        }

        const newGotis = [...get().gotis];
        newGotis[gotiIndex] = { ...goti };
        set({ gotis: newGotis });
        
        await delay(MOVEMENT_DURATION);
        
        if (goti.state === 'finished') break;
      }
      
      // Capture logic after the final step
      if (goti.state === 'path') {
        const absolutePos = (goti.position + LUDO_OFFSETS[goti.color]) % 52;
        if (!SAFE_CELLS.includes(absolutePos)) {
          const currentGotis = [...get().gotis];
          let captured = false;

          currentGotis.forEach((other, idx) => {
            if (other.color !== goti.color && other.state === 'path') {
              const otherAbsolute = (other.position + LUDO_OFFSETS[other.color]) % 52;
              if (absolutePos === otherAbsolute) {
                currentGotis[idx] = { ...other, state: 'home', position: -1 };
                captured = true;
              }
            }
          });

          if (captured) {
            captureOccurred = true;
            audio.playCapture();
            set({ gotis: currentGotis });
            await delay(300); // Small pause for capture effect
          }
        }
      }
    }

    // Check if player won
    let newWinners = [...get().winners];
    const finalGotis = get().gotis;
    const playerFinishedGotis = finalGotis.filter(g => g.color === goti.color && g.state === 'finished').length;

    if (playerFinishedGotis === 4 && !newWinners.some(w => w.color === goti.color)) {
       newWinners.push(players[turnIndex]);
       audio.playWin();
    }

    set({ 
       isMoving: false,
      extraTurn: get().extraTurn || captureOccurred || finishedOccurred,
      winners: newWinners
    });
    
    setTimeout(() => {
      get().nextTurn();
    }, 200);
  },

  nextTurn: () => {
    const { players, turnIndex, extraTurn, winners } = get();
    
    let nextIdx = turnIndex;
    
    if (extraTurn && winners.findIndex(w => w.color === players[turnIndex].color) === -1) {
      // Keep turn
      set({ diceRolled: false, diceValue: null, extraTurn: false });
    } else {
      // Next player who hasn't won yet
      nextIdx = (turnIndex + 1) % players.length;
      while (winners.some(w => w.color === players[nextIdx].color) && winners.length < players.length - 1) {
        nextIdx = (nextIdx + 1) % players.length;
      }
      set({ turnIndex: nextIdx, diceRolled: false, diceValue: null, extraTurn: false });
    }
    
    // Trigger computer turn if next player is bot
    const state = get();
    if (state.players[nextIdx]?.isBot && state.winners.length < state.players.length - 1) {
       setTimeout(() => get().playComputerTurn(), 500);
    }
  },

  resetGame: () => {
    set({ players: [], gotis: [], turnIndex: 0, diceValue: null, diceRolled: false, extraTurn: false, winners: [], isMoving: false });
  }
}));

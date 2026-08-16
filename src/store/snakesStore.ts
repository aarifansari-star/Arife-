import { create } from 'zustand';
import { Player } from '../types';
import { audio } from '../lib/audio';

export const SNAKES: Record<number, number> = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78
};

export const LADDERS: Record<number, number> = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100
};

export interface SnakesState {
  players: Player[];
  positions: Record<string, number>;
  turnIndex: number;
  diceValue: number | null;
  diceRolled: boolean;
  isMoving: boolean;
  winners: Player[];
  
  setupGame: (players: Player[]) => void;
  rollDice: () => void;
  nextTurn: () => void;
  resetGame: () => void;
}

export const useSnakesStore = create<SnakesState>((set, get) => ({
  players: [],
  positions: {},
  turnIndex: 0,
  diceValue: null,
  diceRolled: false,
  isMoving: false,
  winners: [],

  setupGame: (players) => {
    const positions: Record<string, number> = {};
    players.forEach(p => positions[p.id] = 0); // 0 means not yet on board (need 1 to enter, or just start at 1? Standard is start at 1 or 0 and just add dice)
    // Let's start at 0. Roll 5 -> move to 5.
    set({ players, positions, turnIndex: 0, diceValue: null, diceRolled: false, isMoving: false, winners: [] });
  },

  rollDice: async () => {
    const { diceRolled, winners, players, turnIndex, positions, isMoving } = get();
    if (diceRolled || winners.length >= players.length - 1 || isMoving) return;

    set({ isMoving: true });
    audio.playDiceRoll();
    const val = Math.floor(Math.random() * 6) + 1;
    set({ diceValue: val, diceRolled: true });

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    await delay(600); // Wait for dice roll animation

    const currentPlayer = players[turnIndex];
    let currentPos = positions[currentPlayer.id];
    let newPos = currentPos + val;

    if (newPos > 100) {
      // Bounce back or stay? Standard: need exact roll. Let's just stay.
      newPos = currentPos;
      audio.playMove();
      await delay(300);
    } else {
      // Step-by-step movement
      for (let step = 1; step <= val; step++) {
        currentPos += 1;
        set((state) => ({
          positions: { ...state.positions, [currentPlayer.id]: currentPos }
        }));
        audio.playMove();
        await delay(300);
      }
    }

    // Check snakes/ladders after small delay
    await delay(200);
    let finalPos = currentPos;
    if (SNAKES[currentPos]) {
      finalPos = SNAKES[currentPos];
      audio.playSnake();
      await delay(400); // Give player time to realize they hit a snake
      set((state) => ({
        positions: { ...state.positions, [currentPlayer.id]: finalPos }
      }));
      await delay(500); // Wait for snake animation
    } else if (LADDERS[currentPos]) {
      finalPos = LADDERS[currentPos];
      audio.playLadder();
      await delay(400); // Give player time to realize they hit a ladder
      set((state) => ({
        positions: { ...state.positions, [currentPlayer.id]: finalPos }
      }));
      await delay(500); // Wait for ladder animation
    }

    // Check win
    if (finalPos === 100) {
      const newWinners = [...get().winners, currentPlayer];
      audio.playWin();
      set({ winners: newWinners });
    }

    set({ isMoving: false });
    
    setTimeout(() => get().nextTurn(), 200);
  },

  nextTurn: () => {
    const { players, turnIndex, winners, diceValue } = get();
    
    // Extra turn on 6? Optional, let's keep it simple and standard without extra turn, or with?
    // Let's add extra turn on 6
    const hasWon = winners.some(w => w.id === players[turnIndex].id);
    
    if (diceValue === 6 && !hasWon) {
      set({ diceRolled: false, diceValue: null });
    } else {
      let nextIdx = (turnIndex + 1) % players.length;
      while (winners.some(w => w.id === players[nextIdx].id) && winners.length < players.length - 1) {
        nextIdx = (nextIdx + 1) % players.length;
      }
      set({ turnIndex: nextIdx, diceRolled: false, diceValue: null });
    }
  },

  resetGame: () => {
    set({ players: [], positions: {}, turnIndex: 0, diceValue: null, diceRolled: false, isMoving: false, winners: [] });
  }
}));

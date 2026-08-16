export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
  gotiId: string;
  isBot?: boolean;
}

export type GameType = 'ludo' | 'snakes' | 'diamondLudo';

export type AppScreen = 'menu' | 'setup' | 'diamondSetup' | 'ludo' | 'snakes' | 'shop' | 'settings' | 'stats' | 'howToPlay' | 'diamondCenter' | 'profile' | 'redeemCode';

export interface UserProfile {
  name: string;
  age: number | null;
  country: string;
}

export interface RedemptionRecord {
  id: string;
  date: string;
  diamondsSpent: number;
  reward: string;
  code: string;
  status: string;
}

export interface GotiSkin {
  id: string;
  name: string;
  price: number;
  icon?: string;
  styleClass: string;
}

export const GOTI_SKINS: GotiSkin[] = [
  { id: 'classic', name: 'Classic', price: 500, icon: 'Circle', styleClass: 'border-2 border-white/50' },
  { id: 'silver', name: 'Silver', price: 1000, icon: 'Circle', styleClass: 'border-2 border-slate-300 shadow-[0_0_10px_#cbd5e1]' },
  { id: 'gold', name: 'Gold', price: 2500, icon: 'Coins', styleClass: 'border-2 border-yellow-300 shadow-[0_0_10px_#fde047]' },
  { id: 'ruby', name: 'Ruby', price: 5000, icon: 'Hexagon', styleClass: 'border-2 border-red-500 shadow-[0_0_15px_#ef4444]' },
  { id: 'emerald', name: 'Emerald', price: 7500, icon: 'Hexagon', styleClass: 'border-2 border-emerald-400 shadow-[0_0_15px_#34d399]' },
  { id: 'sapphire', name: 'Sapphire', price: 10000, icon: 'Hexagon', styleClass: 'border-2 border-blue-400 shadow-[0_0_15px_#60a5fa]' },
  { id: 'diamond', name: 'Diamond', price: 15000, icon: 'Diamond', styleClass: 'border-2 border-cyan-300 shadow-[0_0_20px_#67e8f9]' },
  { id: 'fire', name: 'Fire', price: 20000, icon: 'Flame', styleClass: 'border-2 border-orange-500 shadow-[0_0_20px_#f97316]' },
  { id: 'ice', name: 'Ice', price: 25000, icon: 'Snowflake', styleClass: 'border-2 border-cyan-200 shadow-[0_0_20px_#a5f3fc]' },
  { id: 'lightning', name: 'Lightning', price: 35000, icon: 'Zap', styleClass: 'border-2 border-yellow-400 shadow-[0_0_25px_#facc15]' },
  { id: 'galaxy', name: 'Galaxy', price: 50000, icon: 'Sparkles', styleClass: 'border-2 border-purple-500 shadow-[0_0_25px_#a855f7]' },
  { id: 'royal', name: 'Royal', price: 75000, icon: 'Crown', styleClass: 'border-[3px] border-yellow-400 shadow-[0_0_30px_#facc15]' },
  { id: 'shadow', name: 'Shadow', price: 100000, icon: 'Moon', styleClass: 'border-2 border-slate-900 shadow-[0_0_30px_#0f172a]' },
  { id: 'cosmic', name: 'Cosmic', price: 150000, icon: 'Rocket', styleClass: 'border-[3px] border-indigo-500 shadow-[0_0_40px_#6366f1]' },
  { id: 'legendary', name: 'Legendary', price: 250000, icon: 'Trophy', styleClass: 'border-[4px] border-yellow-300 shadow-[0_0_50px_#fde047]' }
];

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  ludoWins: number;
  snakesWins: number;
  diamondLudoWins: number;
  totalCoinsEarned: number;
}

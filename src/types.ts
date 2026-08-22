export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
  gotiId: string;
  isBot?: boolean;
}

export type GameType = 'ludo' | 'snakes' | 'diamondLudo';

export type AppScreen = 'login' | 'upiRedeem' | 'startupProfile' | 'menu' | 'setup' | 'diamondSetup' | 'ludo' | 'snakes' | 'shop' | 'settings' | 'stats' | 'howToPlay' | 'diamondCenter' | 'profile' | 'redeemCode';

export interface UserProfile {
  name: string;
  age: number | null;
  country: string;
  avatarType?: 'gallery' | 'builtin' | 'premium' | 'default';
  avatarId?: string;
  avatarImage?: string;
}

export interface RedemptionRecord {
  id: string;
  date: string;
  diamondsSpent: number;
  reward: string;
  code: string;
  status: string;
  country?: string;
  currencyCode?: string;
  currencySymbol?: string;
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
  { id: 'legendary', name: 'Legendary', price: 250000, icon: 'Trophy', styleClass: 'border-[4px] border-yellow-300 shadow-[0_0_50px_#fde047]' },
  
  // 20 NEW PREMIUM SKINS
  { id: 'lava_king', name: 'Lava King', price: 500000, icon: 'Flame', styleClass: 'border-2 border-red-500 shadow-[0_0_15px_#ef4444]' },
  { id: 'ice_crystal', name: 'Ice Crystal', price: 750000, icon: 'Snowflake', styleClass: 'border-2 border-cyan-300 shadow-[0_0_15px_#67e8f9]' },
  { id: 'thunder_lord', name: 'Thunder Lord', price: 1000000, icon: 'Zap', styleClass: 'border-[3px] border-yellow-400 shadow-[0_0_20px_#facc15]' },
  { id: 'golden_emperor', name: 'Golden Emperor', price: 1500000, icon: 'Crown', styleClass: 'border-[3px] border-amber-400 shadow-[0_0_25px_#fbbf24]' },
  { id: 'dark_shadow_premium', name: 'Dark Shadow', price: 2000000, icon: 'Moon', styleClass: 'border-[3px] border-purple-900 shadow-[0_0_25px_#581c87]' },
  { id: 'emerald_master', name: 'Emerald Master', price: 2500000, icon: 'Hexagon', styleClass: 'border-[3px] border-emerald-500 shadow-[0_0_25px_#10b981]' },
  { id: 'ruby_dragon', name: 'Ruby Dragon', price: 3000000, icon: 'Flame', styleClass: 'border-[3px] border-red-600 shadow-[0_0_30px_#dc2626]' },
  { id: 'sapphire_king', name: 'Sapphire King', price: 4000000, icon: 'Diamond', styleClass: 'border-[3px] border-blue-500 shadow-[0_0_30px_#3b82f6]' },
  { id: 'solar_flame', name: 'Solar Flame', price: 5000000, icon: 'Sun', styleClass: 'border-[4px] border-orange-500 shadow-[0_0_35px_#f97316]' },
  { id: 'lunar_glow', name: 'Lunar Glow', price: 6000000, icon: 'Moon', styleClass: 'border-[4px] border-indigo-300 shadow-[0_0_35px_#a5b4fc]' },
  { id: 'galaxy_star', name: 'Galaxy Star', price: 7500000, icon: 'Star', styleClass: 'border-[4px] border-fuchsia-500 shadow-[0_0_40px_#d946ef]' },
  { id: 'cosmic_void', name: 'Cosmic Void', price: 10000000, icon: 'Rocket', styleClass: 'border-[4px] border-violet-700 shadow-[0_0_40px_#6d28d9]' },
  { id: 'royal_crown_premium', name: 'Royal Crown', price: 12500000, icon: 'Crown', styleClass: 'border-[4px] border-yellow-500 shadow-[0_0_45px_#eab308]' },
  { id: 'mystic_wizard', name: 'Mystic Wizard', price: 15000000, icon: 'Wand', styleClass: 'border-[4px] border-purple-400 shadow-[0_0_45px_#c084fc]' },
  { id: 'neon_electric', name: 'Neon Electric', price: 20000000, icon: 'Zap', styleClass: 'border-[4px] border-green-400 shadow-[0_0_50px_#4ade80]' },
  { id: 'phoenix_fire', name: 'Phoenix Fire', price: 25000000, icon: 'Flame', styleClass: 'border-[4px] border-rose-500 shadow-[0_0_50px_#f43f5e]' },
  { id: 'dragon_emperor', name: 'Dragon Emperor', price: 30000000, icon: 'Shield', styleClass: 'border-[5px] border-amber-600 shadow-[0_0_60px_#d97706]' },
  { id: 'diamond_king', name: 'Diamond King', price: 50000000, icon: 'Diamond', styleClass: 'border-[5px] border-cyan-200 shadow-[0_0_60px_#a5f3fc]' },
  { id: 'infinity_legend', name: 'Infinity Legend', price: 75000000, icon: 'Infinity', styleClass: 'border-[5px] border-transparent bg-clip-border shadow-[0_0_70px_#ec4899] rainbow-border' },
  { id: 'ultimate_god', name: 'Ultimate God', price: 100000000, icon: 'Sun', styleClass: 'border-[6px] border-white shadow-[0_0_100px_#ffffff]' }
];

export interface DailyMissions {
  date: string;
  ludoPlayed: number;
  ludoWon: number;
  snakesPlayed: number;
  claimedLudoPlayed: boolean;
  claimedLudoWon: boolean;
  claimedSnakesPlayed: boolean;
}

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  ludoWins: number;
  snakesWins: number;
  diamondLudoWins: number;
  totalCoinsEarned: number;
  winStreak: number;
}

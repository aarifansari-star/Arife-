import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStats, GotiSkin, GOTI_SKINS, RedemptionRecord, UserProfile, DailyMissions } from '../types';
import { audio } from '../lib/audio';

interface UserState {
  coins: number;
  diamonds: number;
  earnedDiamonds: number;
  stats: UserStats;
  profile: UserProfile | null;
  isGuest: boolean;
  unlockedGotis: string[];
  equippedGotiId: string;
  unlockedAvatars: string[];
  redemptions: RedemptionRecord[];
  lastDailyRewardDate: string | null;
  dailyMissions: DailyMissions;
  settings: {
    sound: boolean;
    music: boolean;
    vibrate: boolean;
  };
  addCoins: (amount: number) => void;
  addDiamonds: (amount: number) => void;
  addEarnedDiamonds: (amount: number) => void;
  buyGoti: (id: string, price: number) => boolean;
  equipGoti: (id: string) => void;
  buyAvatar: (id: string, price: number) => boolean;
  updateStats: (updates: Partial<UserStats>) => void;
  updateProfile: (profile: UserProfile) => void;
  setGuestMode: (isGuest: boolean) => void;
  toggleSetting: (key: keyof UserState['settings']) => void;
  redeemDiamonds: (cost: number, rewardLabel: string, currencyDetails?: { country: string, currencyCode: string, currencySymbol: string }) => RedemptionRecord | null;
  useRedeemCode: (code: string) => { success: boolean; message: string; coins?: number };
  claimDailyReward: () => boolean;
  claimMissionReward: (mission: 'ludoPlayed' | 'ludoWon' | 'snakesPlayed') => boolean;
}

export const CODE_REWARDS: Record<number, number> = {
  1400: 100,
  2800: 1000,
  7000: 5000,
  14000: 10000,
  28000: 25000,
  70000: 100000
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      coins: 500, // Starting coins
      diamonds: 0,
      earnedDiamonds: 0,
      profile: null,
      isGuest: false,
      redemptions: [],
      lastDailyRewardDate: null,
      dailyMissions: {
        date: new Date().toLocaleDateString(),
        ludoPlayed: 0,
        ludoWon: 0,
        snakesPlayed: 0,
        claimedLudoPlayed: false,
        claimedLudoWon: false,
        claimedSnakesPlayed: false,
      },
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        ludoWins: 0,
        snakesWins: 0,
        diamondLudoWins: 0,
        totalCoinsEarned: 0,
        winStreak: 0,
      },
      unlockedGotis: ['classic'],
      equippedGotiId: 'classic',
      unlockedAvatars: [],
      settings: {
        sound: true,
        music: true,
        vibrate: true,
      },
      
      addCoins: (amount) => set((state) => ({
        coins: state.coins + amount,
        stats: {
          ...state.stats,
          totalCoinsEarned: amount > 0 ? state.stats.totalCoinsEarned + amount : state.stats.totalCoinsEarned
        }
      })),
      
      addEarnedDiamonds: (amount) => set((state) => ({ earnedDiamonds: (state.earnedDiamonds || 0) + amount })),

      addDiamonds: (amount) => set((state) => ({
        diamonds: state.diamonds + amount
      })),
      
      redeemDiamonds: (cost, rewardLabel, currencyDetails) => {
        const state = get();
        if (state.diamonds >= cost) {
          const generatePart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
          const code = `BR-${generatePart()}-${generatePart()}-${generatePart()}`;
          const newRecord: RedemptionRecord = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            diamondsSpent: cost,
            reward: rewardLabel,
            code,
            status: 'REDEEMED',
            ...(currencyDetails ? currencyDetails : {})
          };
          
          set((state) => ({
            diamonds: state.diamonds - cost,
            redemptions: [newRecord, ...state.redemptions]
          }));
          return newRecord;
        }
        return null;
      },
      
      useRedeemCode: (code) => {
        const state = get();
        const recordIndex = state.redemptions.findIndex(r => r.code === code);
        
        if (recordIndex === -1) {
          return { success: false, message: 'Invalid Redeem Code' };
        }
        
        const record = state.redemptions[recordIndex];
        
        if (record.status === 'USED') {
          return { success: false, message: 'Code Already Used' };
        }
        
        const rewardCoins = CODE_REWARDS[record.diamondsSpent] || 0;
        
        if (rewardCoins === 0) {
           return { success: false, message: 'Invalid Reward Code' };
        }
        
        const updatedRedemptions = [...state.redemptions];
        updatedRedemptions[recordIndex] = { ...record, status: 'USED' };
        
        set((state) => ({
          coins: state.coins + rewardCoins,
          redemptions: updatedRedemptions,
          stats: {
            ...state.stats,
            totalCoinsEarned: state.stats.totalCoinsEarned + rewardCoins
          }
        }));
        
        return { success: true, message: 'CODE REDEEMED!', coins: rewardCoins };
      },

      buyGoti: (id, price) => {
        const state = get();
        if (state.coins >= price && !state.unlockedGotis.includes(id)) {
          set((state) => ({
            coins: state.coins - price,
            unlockedGotis: [...state.unlockedGotis, id],
            equippedGotiId: id
          }));
          return true;
        }
        return false;
      },
      
      equipGoti: (id) => set({ equippedGotiId: id }),

      buyAvatar: (id, price) => {
        const state = get();
        if (state.diamonds >= price && !state.unlockedAvatars?.includes(id)) {
          set((state) => ({
            diamonds: state.diamonds - price,
            unlockedAvatars: [...(state.unlockedAvatars || []), id]
          }));
          return true;
        }
        return false;
      },
      
      updateStats: (updates) => set((state) => {
        let newStreak = state.stats.winStreak || 0;
        
        // Check if a game was played
        if (updates.gamesPlayed && updates.gamesPlayed > state.stats.gamesPlayed) {
           const isWin = updates.gamesWon && updates.gamesWon > state.stats.gamesWon;
           
           if (isWin) {
             newStreak += 1;
           } else {
             newStreak = 0;
           }
        }
        
        return {
          stats: { ...state.stats, ...updates, winStreak: newStreak }
        };
      }),
      
      updateProfile: (profile) => set({ profile, isGuest: false }),
      
      setGuestMode: (isGuest) => set({ isGuest }),
      
      claimDailyReward: () => {
        const state = get();
        const today = new Date().toLocaleDateString();
        if (state.lastDailyRewardDate === today) return false;
        
        set((state) => ({
          coins: state.coins + 200, // Daily reward amount
          lastDailyRewardDate: today
        }));
        return true;
      },
      
      
      toggleSetting: (key) => set((state) => {
        const newSettings = { ...state.settings, [key]: !state.settings[key] };
        audio.setSettings(newSettings.sound, newSettings.music, newSettings.vibrate);
        return { settings: newSettings };
      }),
    }),
    {
      name: 'ludo-user-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
           audio.setSettings(state.settings.sound, state.settings.music, state.settings.vibrate);
        }
      }
    }
  )
);

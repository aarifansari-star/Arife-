const fs = require('fs');

let content = fs.readFileSync('src/store/userStore.ts', 'utf8');

// Remove persist import
content = content.replace("import { persist } from 'zustand/middleware';", "");

// Change interface
content = content.replace("interface UserState {", "interface UserState {\n  uid: string | null;\n  setUid: (uid: string | null) => void;\n  setStoreData: (data: Partial<UserState>) => void;\n  resetStore: () => void;");

// Find the export const useUserStore = create<UserState>()(
//   persist(
//     (set, get) => ({
content = content.replace(/export const useUserStore = create<UserState>\(\)\([\s\S]*?persist\([\s\S]*?\(set, get\) => \(\{/, "export const useUserStore = create<UserState>()((set, get) => ({\n  uid: null,\n  setUid: (uid) => set({ uid }),\n  setStoreData: (data) => set(data),\n  resetStore: () => set({\n    uid: null,\n    coins: 500,\n    diamonds: 0,\n    earnedDiamonds: 0,\n    profile: null,\n    isGuest: false,\n    redemptions: [],\n    lastDailyRewardDate: null,\n    unlockedGotis: ['classic'],\n    equippedGotiId: 'classic',\n    unlockedAvatars: [],\n    stats: {\n      gamesPlayed: 0,\n      gamesWon: 0,\n      ludoWins: 0,\n      snakesWins: 0,\n      diamondLudoWins: 0,\n      totalCoinsEarned: 0,\n      winStreak: 0,\n    }\n  }),");

// Remove the end of persist: 
// }), { name: 'ludo-user-storage', ... } ));
content = content.replace(/\},\s*\{\s*name:\s*'ludo-user-storage'[\s\S]*?\}\s*\)\s*\);/g, "}));");

fs.writeFileSync('src/store/userStore.ts', content);

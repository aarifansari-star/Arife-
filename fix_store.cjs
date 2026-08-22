const fs = require('fs');

let content = fs.readFileSync('src/store/userStore.ts', 'utf8');

const interfaceInsertion = `
  claimDailyReward: () => boolean;
  claimMissionReward: (mission: 'ludoPlayed' | 'ludoWon' | 'snakesPlayed') => boolean;
}`;
content = content.replace(/claimDailyReward:\s*\(\)\s*=>\s*boolean;\s*\}/, interfaceInsertion.trim());

const implInsertion = `
  claimDailyReward: () => {
    const state = get();
    const today = new Date().toLocaleDateString();
    if (state.lastDailyRewardDate === today) return false;
    
    set((state) => ({
      coins: state.coins + 200,
      lastDailyRewardDate: today
    }));
    return true;
  },
  
  claimMissionReward: (mission) => {
    const state = get();
    if (state.dailyMissions['claimed' + mission.charAt(0).toUpperCase() + mission.slice(1)] || state.dailyMissions[mission] === 0) {
      return false;
    }
    
    set((state) => ({
      coins: state.coins + 100, // 100 coins per mission
      dailyMissions: {
        ...state.dailyMissions,
        ['claimed' + mission.charAt(0).toUpperCase() + mission.slice(1)]: true
      }
    }));
    return true;
  },
  
  toggleSetting: (key) => set((state) => {
`;
content = content.replace(/claimDailyReward:[\s\S]*?toggleSetting:\s*\(\s*key\s*\)\s*=>\s*set\(\(\s*state\s*\)\s*=>\s*\{/, implInsertion.trim());

fs.writeFileSync('src/store/userStore.ts', content);

const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        const dataToSave = {
          coins: state.coins,
          diamonds: state.diamonds,
          earnedDiamonds: state.earnedDiamonds,
          profile: state.profile,
          unlockedGotis: state.unlockedGotis,
          equippedGotiId: state.equippedGotiId,
          unlockedAvatars: state.unlockedAvatars,
          redemptions: state.redemptions,
          lastDailyRewardDate: state.lastDailyRewardDate,
          dailyMissions: state.dailyMissions,
          stats: state.stats,
          settings: state.settings,
        };
        setDoc(doc(db, 'users', state.uid), dataToSave, { merge: true }).catch(err => {`;

const replacement = `        const dataToSave = {
          coins: state.coins,
          diamonds: state.diamonds,
          earnedDiamonds: state.earnedDiamonds,
          profile: state.profile,
          unlockedGotis: state.unlockedGotis,
          equippedGotiId: state.equippedGotiId,
          unlockedAvatars: state.unlockedAvatars,
          redemptions: state.redemptions,
          lastDailyRewardDate: state.lastDailyRewardDate,
          dailyMissions: state.dailyMissions,
          stats: state.stats,
          settings: state.settings,
        };
        // Firestore crashes if it encounters \`undefined\` values. 
        // JSON stringify/parse safely strips all undefined properties from the nested objects.
        const sanitizedData = JSON.parse(JSON.stringify(dataToSave));
        setDoc(doc(db, 'users', state.uid), sanitizedData, { merge: true }).catch(err => {`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);

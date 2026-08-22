const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `          if (snapshot.exists()) {
            useUserStore.getState().setStoreData({ ...snapshot.data(), uid: user.uid });
            setCurrentScreen('menu');
          } else {
            useUserStore.getState().resetStore();
            useUserStore.getState().setUid(user.uid);
            setCurrentScreen('startupProfile');
          }`;

const replacement = `          if (snapshot.exists()) {
            useUserStore.getState().setStoreData({ ...snapshot.data(), uid: user.uid });
            setCurrentScreen('menu');
          } else {
            useUserStore.getState().resetStore();
            useUserStore.getState().setUid(user.uid);
            
            useUserStore.getState().updateProfile({
              name: user.displayName || user.email?.split('@')[0] || 'Player',
              age: null,
              country: 'Other',
              avatarType: 'gallery',
              avatarImage: user.photoURL || undefined
            });
            
            setCurrentScreen('menu');
          }`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);

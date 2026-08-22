sed -i '/Normal Ludo can still be played as a Guest/d' src/screens/HowToPlay.tsx
sed -i '/Can be played without a profile as Guest/d' src/screens/HowToPlay.tsx
sed -i "s/{profile ? profile.name : 'Guest'}/{profile?.name}/g" src/screens/MainMenu.tsx
sed -i "s/, setGuestMode //g" src/screens/StartupProfileScreen.tsx
sed -i '/setGuestMode/d' src/screens/StartupProfileScreen.tsx

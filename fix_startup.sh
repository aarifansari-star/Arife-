sed -i '/handleGuest/d' src/screens/StartupProfileScreen.tsx
sed -i '/CONTINUE AS GUEST/,+3d' src/screens/StartupProfileScreen.tsx
sed -i '/<button/!b; /handleGuest/!b; /,/<\/button>/d' src/screens/StartupProfileScreen.tsx

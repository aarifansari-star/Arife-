sed -i 's/<div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-1 shadow-2xl mb-6">/<img src="\/icon.png" alt="LOUDO MAX EARN MONEY" className="w-32 h-32 object-contain drop-shadow-2xl mb-6" \/>/g' src/screens/LoginScreen.tsx
sed -i '/<div className="w-full h-full bg-slate-900 rounded-\[1.4rem\] flex flex-col items-center justify-center">/d' src/screens/LoginScreen.tsx
sed -i '/<span className="text-4xl">🎲<\/span>/d' src/screens/LoginScreen.tsx
sed -i '/<\/div>/,/<\/div>/s/<\/div>//' src/screens/LoginScreen.tsx
# Note: Since I deleted three lines, I need to clean up the </div> tags. It's better to just write a node script.

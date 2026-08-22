const fs = require('fs');

let content = fs.readFileSync('src/screens/LoginScreen.tsx', 'utf8');

const diceRegex = /<div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-1 shadow-2xl mb-6">[\s\S]*?<\/div>\s*<\/div>/;

content = content.replace(diceRegex, '<img src="/icon.png" alt="LOUDO MAX EARN MONEY" className="w-32 h-32 object-contain drop-shadow-2xl mb-6" />');

content = content.replace(/<h2 className="text-center text-xl font-bold text-yellow-400 uppercase tracking-widest">\s*Redeem Code\s*<\/h2>/, '<h2 className="text-center text-xl font-bold text-yellow-400 uppercase tracking-widest">\n          EARN MONEY\n        </h2>');

fs.writeFileSync('src/screens/LoginScreen.tsx', content);

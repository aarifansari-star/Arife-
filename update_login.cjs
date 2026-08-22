const fs = require('fs');
let content = fs.readFileSync('src/screens/LoginScreen.tsx', 'utf8');
content = content.replace(
  /<img src="\/loudomax-icon\.png" alt="" className="w-32 h-32 object-contain drop-shadow-2xl mb-6" \/>/,
  '<img src="/loudomax-icon.png" alt="LOUDO MAX ICON" className="w-24 h-24 sm:w-[120px] sm:h-[120px] object-contain drop-shadow-2xl mb-6" />'
);
fs.writeFileSync('src/screens/LoginScreen.tsx', content);

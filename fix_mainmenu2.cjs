const fs = require('fs');

let content = fs.readFileSync('src/screens/MainMenu.tsx', 'utf8');

content = content.replace(
  /<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 filter drop-shadow-\[0_0_10px_rgba\(192,38,211,0.5\)\] leading-tight">\s*LOUDO MAX\s*<\/h1>/,
  `<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 filter drop-shadow-[0_0_10px_rgba(192,38,211,0.5)] leading-tight flex items-center justify-center md:justify-start gap-4">
              <img src="/icon.png" alt="LOUDO MAX" className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-2xl drop-shadow-lg" />
              LOUDO MAX EARN MONEY
            </h1>`
);

fs.writeFileSync('src/screens/MainMenu.tsx', content);

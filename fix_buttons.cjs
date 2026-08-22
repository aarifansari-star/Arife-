const fs = require('fs');
let content = fs.readFileSync('src/screens/MainMenu.tsx', 'utf8');

const target1 = `<MenuButton icon={<div className="text-2xl">💰</div>} title="Redeem Code" subtitle="Use reward codes" onClick={() => onNavigate('redeemCode')} color="green" />
          <MenuButton icon={<Gift />} title="Redeem Code" subtitle="Use reward codes" onClick={() => onNavigate('redeemCode')} color="fuchsia" />`;
          
const replacement1 = `<MenuButton icon={<div className="text-2xl">💰</div>} title="Redeem Code" subtitle="Use reward codes" onClick={() => onNavigate('redeemCode')} color="green" />`;

content = content.replace(target1, replacement1);
content = content.replace('lg:grid-cols-5', 'lg:grid-cols-4');

fs.writeFileSync('src/screens/MainMenu.tsx', content);

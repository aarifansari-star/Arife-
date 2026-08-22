const fs = require('fs');
let content = fs.readFileSync('src/screens/MainMenu.tsx', 'utf8');

const target = `<MenuButton icon={<div className="text-2xl">💰</div>} title="UPI Redeem" subtitle="Redeem your eligible Coins" onClick={() => onNavigate('upiRedeem' as any)} color="green" />`;
const replacement = `<MenuButton icon={<div className="text-2xl">💰</div>} title="Redeem Code" subtitle="Use reward codes" onClick={() => onNavigate('redeemCode')} color="green" />`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    // Let's also check if there is a redundant Redeem Code button. 
    // The instructions say "Do not change any other buttons", so we should leave the second one, 
    // or we can remove the second one to keep it exactly 4 buttons (but it was a 5-column grid).
    // Let's just follow instructions strictly and just do the replacement.
    fs.writeFileSync('src/screens/MainMenu.tsx', content);
} else {
    console.log("Target not found!");
}

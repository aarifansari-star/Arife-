const fs = require('fs');

let content = fs.readFileSync('src/screens/StartupProfileScreen.tsx', 'utf8');

content = content.replace(/const handleGuest = \(\) => \{[\s\S]*?\};\n/, '');

const guestBtnRegex = /<button[\s\S]*?onClick=\{handleGuest\}[\s\S]*?CONTINUE AS GUEST[\s\S]*?<\/button>/;
content = content.replace(guestBtnRegex, '');

fs.writeFileSync('src/screens/StartupProfileScreen.tsx', content);

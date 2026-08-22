const fs = require('fs');
let content = fs.readFileSync('src/screens/Settings.tsx', 'utf8');

const target = `signOut(auth).then(() => {
          // Success
          // A global toast or message can be handled if needed, or Login screen can detect it.
        });`;
        
const replacement = `sessionStorage.setItem('logout_success', 'true');
        signOut(auth);`;

content = content.replace(target, replacement);
fs.writeFileSync('src/screens/Settings.tsx', content);

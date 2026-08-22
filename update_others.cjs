const fs = require('fs');

const hideImageOnError = "onError={(e) => { e.currentTarget.style.display = 'none' }}";

function updateFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<img src="\/loudomax-icon\.png" alt="" /, `<img src="/loudomax-icon.png" alt="" ${hideImageOnError} `);
  fs.writeFileSync(file, content);
}

updateFile('src/screens/MainMenu.tsx');
updateFile('src/screens/StartupProfileScreen.tsx');
updateFile('src/screens/ProfileScreen.tsx');

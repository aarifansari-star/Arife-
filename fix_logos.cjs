const fs = require('fs');

function replaceInFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes("import Logo")) {
    content = content.replace("import React", "import Logo from '../components/Logo';\nimport React");
  }
  
  content = content.replace(
    /<img src="\/loudomax-icon\.png" alt="" onError=\{\(e\) => \{ e\.currentTarget\.style\.display = 'none' \}\} className="([^"]+)" \/>/g,
    '<Logo className="$1" />'
  );
  
  fs.writeFileSync(file, content);
}

replaceInFile('src/screens/LoginScreen.tsx');
replaceInFile('src/screens/MainMenu.tsx');
replaceInFile('src/screens/ProfileScreen.tsx');
replaceInFile('src/screens/StartupProfileScreen.tsx');

const fs = require('fs');
let content = fs.readFileSync('src/screens/ProfileScreen.tsx', 'utf8');

content = content.replace("import { ArrowLeft, User, Cake, Globe, CheckCircle2 } from 'lucide-react';", "import { ArrowLeft, User, Cake, Globe, CheckCircle2, LogOut } from 'lucide-react';");

fs.writeFileSync('src/screens/ProfileScreen.tsx', content);

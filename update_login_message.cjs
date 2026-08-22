const fs = require('fs');
let content = fs.readFileSync('src/screens/LoginScreen.tsx', 'utf8');

const target1 = `  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);`;

const replacement1 = `  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);`;

const target2 = `  useEffect(() => {
    // Handle redirect sign-in result`;
    
const replacement2 = `  useEffect(() => {
    if (sessionStorage.getItem('logout_success')) {
      setSuccessMsg('Signed out successfully.');
      sessionStorage.removeItem('logout_success');
    }
    
    // Handle redirect sign-in result`;

const target3 = `        <p className="text-slate-300 font-medium text-center mb-8">
          Sign in with your Google Account to continue
        </p>
        
        {error && (`;
        
const replacement3 = `        <p className="text-slate-300 font-medium text-center mb-8">
          Sign in with your Google Account to continue
        </p>
        
        {successMsg && (
          <div className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center justify-center gap-3 mb-6 font-bold">
            <span className="text-sm">{successMsg}</span>
          </div>
        )}

        {error && (`;

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);
content = content.replace(target3, replacement3);
fs.writeFileSync('src/screens/LoginScreen.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/screens/ProfileScreen.tsx', 'utf8');

if (!content.includes('import { LogOut } from \'lucide-react\'')) {
    content = content.replace('import { User, Cake, Globe, ArrowLeft, CheckCircle2 }', 'import { User, Cake, Globe, ArrowLeft, CheckCircle2, LogOut }');
}

const targetState = `  const [showSuccess, setShowSuccess] = useState(false);`;
const replacementState = `  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const confirmLogout = () => {
    audio.playClick();
    sessionStorage.setItem('logout_success', 'true');
    import('firebase/auth').then(({signOut}) => {
      import('../lib/firebase').then(({auth}) => signOut(auth));
    });
  };`;
  
content = content.replace(targetState, replacementState);

const targetButton = `            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-slate-700 text-white font-black py-4 rounded-xl hover:bg-slate-600 transition-colors uppercase tracking-wide mb-4"
            >
              Edit Profile
            </button>`;
            
const replacementButton = `            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-slate-700 text-white font-black py-4 rounded-xl hover:bg-slate-600 transition-colors uppercase tracking-wide mb-4"
            >
              Edit Profile
            </button>
            <button
              onClick={() => { audio.playClick(); setShowLogoutConfirm(true); }}
              className="w-full bg-red-500/10 text-red-500 border border-red-500/30 font-black py-4 rounded-xl hover:bg-red-500/20 transition-colors uppercase tracking-wide flex items-center justify-center gap-2 mb-4"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>`;

content = content.replace(targetButton, replacementButton);

const targetDialog = `      </div>
    </div>
  );
}`;

const replacementDialog = `      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Log Out</h3>
            <p className="text-slate-300 text-center mb-8 font-medium">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => { audio.playClick(); setShowLogoutConfirm(false); }}
                className="flex-1 py-3 rounded-xl font-bold bg-slate-700 text-white hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(targetDialog, replacementDialog);

fs.writeFileSync('src/screens/ProfileScreen.tsx', content);

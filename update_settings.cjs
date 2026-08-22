const fs = require('fs');
let content = fs.readFileSync('src/screens/Settings.tsx', 'utf8');

const target1 = `  const handleLogout = () => {
    audio.playClick();
    import('firebase/auth').then(({signOut}) => {
      import('../lib/firebase').then(({auth}) => signOut(auth));
    });
  };`;

const replacement1 = `  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const handleLogoutClick = () => {
    audio.playClick();
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    audio.playClick();
    import('firebase/auth').then(({signOut}) => {
      import('../lib/firebase').then(({auth}) => {
        signOut(auth).then(() => {
          // Success
          // A global toast or message can be handled if needed, or Login screen can detect it.
        });
      });
    });
  };`;

const target2 = `            <button
              onClick={handleLogout}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-4 rounded-xl border border-red-500/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <LogOut className="w-5 h-5" />
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`;

const replacement2 = `            <button
              onClick={handleLogoutClick}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-4 rounded-xl border border-red-500/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <LogOut className="w-5 h-5" />
              LOG OUT
            </button>
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Log Out</h3>
            <p className="text-slate-300 text-center mb-8">
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

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);
fs.writeFileSync('src/screens/Settings.tsx', content);

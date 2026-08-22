const fs = require('fs');
let content = fs.readFileSync('src/screens/Settings.tsx', 'utf8');

content = content.replace(
  /(\s*)<\/div>\s*<\/div>\s*<\/div>\s*\)\;\s*\}/, 
  `$1</div>
          <div className="mt-8">
            <button
              onClick={() => { 
                import('firebase/auth').then(({signOut}) => {
                  import('../lib/firebase').then(({auth}) => signOut(auth));
                });
              }}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold py-4 rounded-xl border border-red-500/50 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              🚪 LOG OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`
);

fs.writeFileSync('src/screens/Settings.tsx', content);

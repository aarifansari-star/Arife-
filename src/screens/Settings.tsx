import React from 'react';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, Volume2, VolumeX, Music, Vibrate, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { audio } from '../lib/audio';

export default function Settings({ onBack }: { onBack: () => void }) {
  const { settings, toggleSetting } = useUserStore();

  const handleToggle = (key: keyof typeof settings) => {
    audio.playClick();
    toggleSetting(key);
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const handleLogoutClick = () => {
    audio.playClick();
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    audio.playClick();
    import('firebase/auth').then(({signOut}) => {
      import('../lib/firebase').then(({auth}) => {
        sessionStorage.setItem('logout_success', 'true');
        signOut(auth);
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold ml-4">Settings</h1>
        </div>

        <div className="space-y-4">
          <SettingItem 
            icon={<Volume2 />} 
            label="Sound Effects" 
            enabled={settings.sound} 
            onToggle={() => handleToggle('sound')} 
          />
          <SettingItem 
            icon={<Music />} 
            label="Music" 
            enabled={settings.music} 
            onToggle={() => handleToggle('music')} 
          />
          <SettingItem 
            icon={<Vibrate />} 
            label="Vibration" 
            enabled={settings.vibrate} 
            onToggle={() => handleToggle('vibrate')} 
          />

          <div className="mt-12">
            <button
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
}

function SettingItem({ icon, label, enabled, onToggle }: { icon: React.ReactNode, label: string, enabled: boolean, onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      <div className="flex items-center gap-4">
        <div className={cn("p-2 rounded-lg", enabled ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-700 text-slate-400")}>
          {icon}
        </div>
        <span className="font-semibold text-lg">{label}</span>
      </div>
      
      <button 
        onClick={onToggle}
        className={cn(
          "relative w-14 h-8 rounded-full transition-colors duration-300",
          enabled ? "bg-cyan-500" : "bg-slate-700"
        )}
      >
        <div className={cn(
          "absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 shadow-sm",
          enabled ? "left-7" : "left-1"
        )} />
      </button>
    </div>
  );
}

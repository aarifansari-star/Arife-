import React from 'react';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, Volume2, VolumeX, Music, Vibrate } from 'lucide-react';
import { cn } from '../lib/utils';
import { audio } from '../lib/audio';

export default function Settings({ onBack }: { onBack: () => void }) {
  const { settings, toggleSetting } = useUserStore();

  const handleToggle = (key: keyof typeof settings) => {
    audio.playClick();
    toggleSetting(key);
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
        </div>
      </div>
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

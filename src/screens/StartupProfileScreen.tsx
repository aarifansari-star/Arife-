import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { User, Cake, Globe } from 'lucide-react';
import { audio } from '../lib/audio';
import { cn } from '../lib/utils';
import { AvatarPicker } from '../components/AvatarPicker';

const COUNTRIES = [
  "India 🇮🇳",
  "Pakistan 🇵🇰",
  "Bangladesh 🇧🇩",
  "Nepal 🇳🇵",
  "Sri Lanka 🇱🇰",
  "United States 🇺🇸",
  "United Kingdom 🇬🇧",
  "Canada 🇨🇦",
  "Australia 🇦🇺",
  "United Arab Emirates 🇦🇪",
  "Saudi Arabia 🇸🇦",
  "Qatar 🇶🇦",
  "Germany 🇩🇪",
  "France 🇫🇷",
  "Italy 🇮🇹",
  "Spain 🇪🇸",
  "Japan 🇯🇵",
  "South Korea 🇰🇷",
  "China 🇨🇳",
  "Russia 🇷🇺",
  "Brazil 🇧🇷",
  "South Africa 🇿🇦",
  "Other"
];

export default function StartupProfileScreen({ onComplete }: { onComplete: () => void }) {
  const { updateProfile, setGuestMode } = useUserStore();
  const [name, setName] = useState('');
  const [age, setAge] = useState<string>('');
  const [country, setCountry] = useState('');
  
  const [avatarType, setAvatarType] = useState<'gallery'|'builtin'|'default'>('default');
  const [avatarId, setAvatarId] = useState<string | undefined>();
  const [avatarImage, setAvatarImage] = useState<string | undefined>();

  const handleSave = () => {
    if (!name.trim()) return;
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0) return;
    if (!country) return;
    
    audio.playClick();
    updateProfile({
      name: name.trim(),
      age: parsedAge,
      country,
      avatarType,
      avatarId,
      avatarImage
    });
    onComplete();
  };

  const handleGuest = () => {
    audio.playClick();
    setGuestMode(true);
    onComplete();
  };

  const handleAvatarChange = (type: 'gallery' | 'builtin' | 'default', id?: string, image?: string) => {
    setAvatarType(type);
    if (id !== undefined) setAvatarId(id);
    if (image !== undefined) setAvatarImage(image);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
      <div className="w-full flex items-center justify-center mb-8">
        <h1 className="text-center text-2xl font-black text-white flex justify-center items-center gap-2 uppercase">
          <User className="w-6 h-6" /> CREATE YOUR PROFILE
        </h1>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 shadow-xl w-full">
        <div className="flex flex-col gap-5">
          <AvatarPicker 
            avatarType={avatarType} 
            avatarId={avatarId} 
            avatarImage={avatarImage} 
            onChange={handleAvatarChange} 
          />

          <div>
            <label className="text-slate-400 font-bold text-sm mb-1.5 flex items-center gap-2 uppercase tracking-wide">
              <User className="w-4 h-4" /> Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3.5 text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              maxLength={20}
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold text-sm mb-1.5 flex items-center gap-2 uppercase tracking-wide">
              <Cake className="w-4 h-4" /> Age
            </label>
            <input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="1"
              max="120"
              className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3.5 text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold text-sm mb-1.5 flex items-center gap-2 uppercase tracking-wide">
              <Globe className="w-4 h-4" /> Country
            </label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3.5 text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors appearance-none pr-10"
              >
                <option value="" disabled>Select Country ▼</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <span className="text-xs">▼</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!name.trim() || !age || isNaN(parseInt(age)) || !country}
            className={cn(
              "w-full font-black py-4 rounded-xl mt-4 transition-all uppercase tracking-wide flex items-center justify-center gap-2",
              (!name.trim() || !age || isNaN(parseInt(age)) || !country)
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:brightness-110 shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-[0.98]"
            )}
          >
            SAVE PROFILE
          </button>
          
          <button
            onClick={handleGuest}
            className="w-full font-bold py-3 rounded-xl transition-all uppercase tracking-wide text-slate-400 hover:text-white hover:bg-slate-800"
          >
            CONTINUE AS GUEST
          </button>
        </div>
      </div>
    </div>
  );
}

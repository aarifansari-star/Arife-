import Logo from '../components/Logo';
import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { ArrowLeft, User, Cake, Globe, CheckCircle2 } from 'lucide-react';
import { audio } from '../lib/audio';
import { cn } from '../lib/utils';
import { AvatarPicker } from '../components/AvatarPicker';
import { AvatarDisplay } from '../components/AvatarDisplay';
import { AvatarShop } from '../components/AvatarShop';

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

export default function ProfileScreen({ onBack }: { onBack: () => void }) {
  const { profile, updateProfile } = useUserStore();
  const [isEditing, setIsEditing] = useState(!profile);
  
  const [name, setName] = useState(profile?.name || '');
  const [age, setAge] = useState<string>(profile?.age ? profile.age.toString() : '');
  const [country, setCountry] = useState(profile?.country || '');
  const [avatarType, setAvatarType] = useState<'gallery'|'builtin'|'premium'|'default'>(profile?.avatarType || 'default');
  const [avatarId, setAvatarId] = useState<string | undefined>(profile?.avatarId);
  const [avatarImage, setAvatarImage] = useState<string | undefined>(profile?.avatarImage);

  const [showSuccess, setShowSuccess] = useState(false);

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
    
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAvatarChange = (type: 'gallery' | 'builtin' | 'premium' | 'default', id?: string, image?: string) => {
    setAvatarType(type);
    if (id !== undefined) setAvatarId(id);
    if (image !== undefined) setAvatarImage(image);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
      <div className="w-full flex items-center mb-8">
        <button onClick={() => { audio.playClick(); onBack(); }} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-black text-white mr-10 flex justify-center items-center gap-2">
          <Logo className="w-6 h-6 object-contain rounded-md" /> MY PROFILE
        </h1>
      </div>

      {showSuccess && (
        <div className="w-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-3 rounded-xl mb-6 flex items-center justify-center gap-2 font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" /> Profile Saved
        </div>
      )}

      <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 shadow-xl w-full">
        {isEditing ? (
          <div className="flex flex-col gap-5">
            <AvatarPicker 
              avatarType={avatarType} 
              avatarId={avatarId} 
              avatarImage={avatarImage} 
              onChange={handleAvatarChange} 
            />

            <div>
              <label className="text-slate-400 font-bold text-sm mb-1.5 flex items-center gap-2 uppercase tracking-wide">
                <User className="w-4 h-4" /> Player Name
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
              Save Profile
            </button>
            
            {profile && (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <AvatarDisplay profile={profile} className="w-24 h-24" emojiSizeClass="text-5xl" />
            </div>
            
            <h2 className="text-3xl font-black text-white mb-6">{profile?.name}</h2>
            
            <div className="w-full space-y-3 mb-8">
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
                <Cake className="w-5 h-5 text-fuchsia-400" />
                <span className="text-slate-300 font-medium">Age:</span>
                <span className="text-white font-bold">{profile?.age}</span>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300 font-medium">Country:</span>
                <span className="text-white font-bold">{profile?.country}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-slate-700 text-white font-black py-4 rounded-xl hover:bg-slate-600 transition-colors uppercase tracking-wide mb-4"
            >
              Edit Profile
            </button>
            
            <div className="w-full">
              <AvatarShop 
                onEquip={(id) => {
                  updateProfile({ ...profile, avatarType: 'premium', avatarId: id, avatarImage: undefined } as any);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);
                }}
                currentAvatarId={profile?.avatarType === 'premium' ? profile.avatarId : undefined}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

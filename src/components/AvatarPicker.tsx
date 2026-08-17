import React, { useRef } from 'react';
import { Camera, Palette } from 'lucide-react';
import { cn } from '../lib/utils';
import { BUILTIN_AVATARS, AvatarDisplay } from './AvatarDisplay';

interface AvatarPickerProps {
  avatarType: 'gallery' | 'builtin' | 'premium' | 'default';
  avatarId: string | undefined;
  avatarImage: string | undefined;
  onChange: (type: 'gallery' | 'builtin' | 'premium' | 'default', id?: string, image?: string) => void;
}

export function AvatarPicker({ avatarType, avatarId, avatarImage, onChange }: AvatarPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showBuiltin, setShowBuiltin] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 256;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
          
          onChange('gallery', undefined, resizedImage);
          setShowBuiltin(false);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBuiltinSelect = (id: string) => {
    onChange('builtin', id, undefined);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="relative">
        <AvatarDisplay
          profile={{ name: '', age: 0, country: '', avatarType, avatarId, avatarImage }}
          className="w-24 h-24"
          emojiSizeClass="text-5xl"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm font-bold text-white transition-colors"
        >
          <Camera className="w-4 h-4" /> GALLERY
        </button>
        <button
          onClick={() => setShowBuiltin(!showBuiltin)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors",
            showBuiltin ? "bg-indigo-500 text-white" : "bg-slate-700 hover:bg-slate-600 text-white"
          )}
        >
          <Palette className="w-4 h-4" /> AVATAR
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
        />
      </div>

      {showBuiltin && (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 w-full mt-2 animate-in fade-in zoom-in-95">
          <div className="grid grid-cols-4 gap-3">
            {BUILTIN_AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => handleBuiltinSelect(avatar.id)}
                className={cn(
                  "aspect-square flex items-center justify-center text-3xl rounded-xl transition-all",
                  avatarType === 'builtin' && avatarId === avatar.id
                    ? "bg-indigo-500/40 border-2 border-indigo-400 scale-110"
                    : "bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:scale-105"
                )}
              >
                {avatar.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

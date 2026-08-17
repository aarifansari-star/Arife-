import React from 'react';
import { UserProfile } from '../types';
import { User } from 'lucide-react';
import { cn } from '../lib/utils';
import { PREMIUM_AVATARS } from './PremiumAvatars';

export const BUILTIN_AVATARS = [
  { id: 'gamer', emoji: '🎮' },
  { id: 'king', emoji: '👑' },
  { id: 'star', emoji: '⭐' },
  { id: 'fire', emoji: '🔥' },
  { id: 'lightning', emoji: '⚡' },
  { id: 'diamond', emoji: '💎' },
  { id: 'tiger', emoji: '🐯' },
  { id: 'lion', emoji: '🦁' },
  { id: 'panda', emoji: '🐼' },
  { id: 'fox', emoji: '🦊' },
  { id: 'robot', emoji: '🤖' },
  { id: 'dragon', emoji: '🐉' },
];

export function AvatarDisplay({ profile, className, emojiSizeClass = "text-2xl" }: { profile: UserProfile | null | undefined, className?: string, emojiSizeClass?: string }) {
  if (!profile) {
    return (
      <div className={cn("bg-slate-700 flex items-center justify-center rounded-full overflow-hidden border border-slate-500", className)}>
        <User className="w-1/2 h-1/2 text-slate-400" />
      </div>
    );
  }

  if (profile.avatarType === 'gallery' && profile.avatarImage) {
    return (
      <div className={cn("rounded-full overflow-hidden flex-shrink-0 border-2 border-indigo-400", className)}>
        <img src={profile.avatarImage} alt={profile.name} className="w-full h-full object-cover" />
      </div>
    );
  }

  if (profile.avatarType === 'premium' && profile.avatarId) {
    const avatar = PREMIUM_AVATARS.find(a => a.id === profile.avatarId);
    if (avatar) {
      return (
        <div className={cn("flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 border-2", avatar.themeClass, avatar.borderClass, className)}>
          <span className={emojiSizeClass}>{avatar.emoji}</span>
        </div>
      );
    }
  }

  if (profile.avatarType === 'builtin' && profile.avatarId) {
    const avatar = BUILTIN_AVATARS.find(a => a.id === profile.avatarId);
    if (avatar) {
      return (
        <div className={cn("bg-indigo-900/50 border-2 border-indigo-400 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0", className)}>
          <span className={emojiSizeClass}>{avatar.emoji}</span>
        </div>
      );
    }
  }

  // Default fallback
  return (
    <div className={cn("bg-indigo-900/50 border-2 border-indigo-400 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0", className)}>
      <User className="w-1/2 h-1/2 text-indigo-400" />
    </div>
  );
}

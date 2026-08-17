export interface PremiumAvatar {
  id: string;
  name: string;
  price: number;
  emoji: string;
  themeClass: string;
  borderClass: string;
}

export const PREMIUM_AVATARS: PremiumAvatar[] = [
  { id: 'galaxy_hero', name: 'Galaxy Hero', price: 5000, emoji: '🌌', themeClass: 'bg-gradient-to-br from-indigo-900 to-purple-900', borderClass: 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' },
  { id: 'inferno_king', name: 'Inferno King', price: 10000, emoji: '🔥', themeClass: 'bg-gradient-to-br from-red-900 to-orange-900', borderClass: 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' },
  { id: 'ice_emperor', name: 'Ice Emperor', price: 15000, emoji: '❄️', themeClass: 'bg-gradient-to-br from-cyan-900 to-blue-900', borderClass: 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' },
  { id: 'thunder_king', name: 'Thunder King', price: 20000, emoji: '⚡', themeClass: 'bg-gradient-to-br from-yellow-900 to-amber-900', borderClass: 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]' },
  { id: 'shadow_lord', name: 'Shadow Lord', price: 30000, emoji: '🌑', themeClass: 'bg-gradient-to-br from-slate-900 to-black', borderClass: 'border-slate-500 shadow-[0_0_15px_rgba(100,116,139,0.5)]' },
  { id: 'royal_emperor', name: 'Royal Emperor', price: 40000, emoji: '👑', themeClass: 'bg-gradient-to-br from-yellow-700 to-amber-900', borderClass: 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.6)]' },
  { id: 'dragon_lord', name: 'Dragon Lord', price: 50000, emoji: '🐉', themeClass: 'bg-gradient-to-br from-emerald-900 to-green-900', borderClass: 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]' },
  { id: 'crystal_master', name: 'Crystal Master', price: 75000, emoji: '💠', themeClass: 'bg-gradient-to-br from-fuchsia-900 to-pink-900', borderClass: 'border-fuchsia-400 shadow-[0_0_20px_rgba(232,121,249,0.6)]' },
  { id: 'cosmic_warrior', name: 'Cosmic Warrior', price: 100000, emoji: '🌠', themeClass: 'bg-gradient-to-br from-blue-900 to-indigo-900', borderClass: 'border-blue-400 shadow-[0_0_25px_rgba(96,165,250,0.7)]' },
  { id: 'phoenix_lord', name: 'Phoenix Lord', price: 150000, emoji: '🦅', themeClass: 'bg-gradient-to-br from-orange-600 to-red-900', borderClass: 'border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.7)]' },
  { id: 'infinity_king', name: 'Infinity King', price: 250000, emoji: '♾️', themeClass: 'bg-gradient-to-br from-violet-600 to-fuchsia-900', borderClass: 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.8)]' },
  { id: 'ultimate_legend', name: 'Ultimate Legend', price: 500000, emoji: '👑', themeClass: 'bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-700', borderClass: 'border-white shadow-[0_0_40px_rgba(255,255,255,0.9)]' },
];

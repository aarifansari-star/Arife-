import React from 'react';
import { PlayerColor } from '../types';

export const GotiPiece = ({ color, skinId = 'classic' }: { color: PlayerColor, skinId?: string }) => {
  const baseHex = {
    red: '#ef4444',
    green: '#22c55e',
    yellow: '#eab308',
    blue: '#3b82f6'
  }[color];

  let hex = baseHex;
  let highlight = '#ffffff';
  let shadow = '#000000';
  let filter = 'drop-shadow(0px 4px 3px rgba(0,0,0,0.4))';
  
  const isGem = ['ruby', 'emerald', 'sapphire', 'diamond', 'ice_crystal', 'emerald_master', 'ruby_dragon', 'sapphire_king', 'diamond_king'].includes(skinId);
  const isMetallic = ['silver', 'gold', 'royal', 'thunder_lord', 'golden_emperor', 'royal_crown_premium', 'dragon_emperor'].includes(skinId);
  const isGlow = ['fire', 'ice', 'lightning', 'galaxy', 'cosmic', 'legendary', 'lava_king', 'solar_flame', 'lunar_glow', 'galaxy_star', 'cosmic_void', 'mystic_wizard', 'neon_electric', 'phoenix_fire', 'infinity_legend', 'ultimate_god'].includes(skinId);

  if (skinId === 'silver') { hex = '#cbd5e1'; highlight = '#ffffff'; shadow = '#475569'; }
  if (skinId === 'gold' || skinId === 'royal' || skinId === 'golden_emperor' || skinId === 'royal_crown_premium') { hex = '#fbbf24'; highlight = '#fef08a'; shadow = '#713f12'; }
  if (skinId === 'shadow' || skinId === 'dark_shadow_premium') { hex = '#1e293b'; highlight = skinId === 'dark_shadow_premium' ? '#9333ea' : baseHex; shadow = '#020617'; }
  if (skinId === 'diamond' || skinId === 'diamond_king') { highlight = '#ffffff'; shadow = '#64748b'; filter = `drop-shadow(0px 0px ${skinId === 'diamond_king' ? '15px' : '6px'} #67e8f9)`; }
  if (skinId === 'dragon_emperor') { hex = '#064e3b'; highlight = '#34d399'; shadow = '#022c22'; }
  if (skinId === 'ultimate_god') { hex = '#ffffff'; highlight = '#fde047'; shadow = '#cbd5e1'; }
  if (skinId === 'neon_electric') { hex = '#22c55e'; highlight = '#86efac'; shadow = '#14532d'; }
  
  if (isGlow) {
    if (skinId === 'fire' || skinId === 'lava_king' || skinId === 'phoenix_fire') filter = `drop-shadow(0px -4px ${skinId === 'fire' ? '10px' : '15px'} #f97316)`;
    if (skinId === 'ice' || skinId === 'ice_crystal') filter = `drop-shadow(0px 0px 10px #67e8f9)`;
    if (skinId === 'lightning' || skinId === 'thunder_lord') filter = `drop-shadow(0px 0px 15px #fde047)`;
    if (skinId === 'galaxy' || skinId === 'galaxy_star') filter = `drop-shadow(0px 0px 15px #a855f7)`;
    if (skinId === 'cosmic' || skinId === 'cosmic_void') filter = `drop-shadow(0px 0px 20px #6366f1)`;
    if (skinId === 'legendary' || skinId === 'infinity_legend') filter = `drop-shadow(0px 0px 25px #ec4899)`;
    if (skinId === 'solar_flame') filter = `drop-shadow(0px 0px 20px #fbbf24)`;
    if (skinId === 'lunar_glow') filter = `drop-shadow(0px 0px 20px #e0e7ff)`;
    if (skinId === 'mystic_wizard') filter = `drop-shadow(0px 0px 20px #d946ef)`;
    if (skinId === 'neon_electric') filter = `drop-shadow(0px 0px 25px #4ade80)`;
    if (skinId === 'ultimate_god') filter = `drop-shadow(0px 0px 30px #ffffff)`;
  }

  const accentHex = baseHex;

  return (
    <svg viewBox="0 0 100 120" className="w-full h-full" style={{ filter }}>
      <defs>
        <radialGradient id={`head-${color}-${skinId}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor={highlight} stopOpacity={isGem ? "0.9" : "0.8"} />
          <stop offset="20%" stopColor={hex} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id={`body-${color}-${skinId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadow} stopOpacity="0.4" />
          <stop offset="20%" stopColor={hex} />
          <stop offset="80%" stopColor={hex} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`base-${color}-${skinId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={highlight} stopOpacity="0.5" />
          <stop offset="50%" stopColor={hex} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      
      {/* Base thickness */}
      <path d="M 20,100 Q 50,115 80,100 L 80,108 Q 50,123 20,108 Z" fill={shadow} opacity="0.6" />
      
      {/* Base top */}
      <ellipse cx="50" cy="100" rx="30" ry="12" fill={`url(#base-${color}-${skinId})`} />
      
      {/* Body */}
      {isGem ? (
        <path d="M 35,98 L 42,45 L 58,45 L 65,98 Z" fill={`url(#body-${color}-${skinId})`} stroke={highlight} strokeWidth="1" opacity="0.9" />
      ) : (
        <path d="M 35,98 L 42,45 L 58,45 L 65,98 Z" fill={`url(#body-${color}-${skinId})`} />
      )}
      
      {/* Body Color Band for Metallic/Shadow */}
      {(isMetallic || skinId === 'shadow') && (
        <path d="M 38,70 L 40,55 L 60,55 L 62,70 Z" fill={accentHex} opacity="0.9" />
      )}
      
      {/* Collar */}
      <ellipse cx="50" cy="45" rx="14" ry="5" fill={(isMetallic || skinId === 'shadow') ? accentHex : `url(#base-${color}-${skinId})`} />
      <path d="M 36,45 Q 50,53 64,45 L 64,48 Q 50,56 36,48 Z" fill={shadow} opacity="0.3" />
      
      {/* Head */}
      {isGem ? (
        <path d="M 50,4 L 72,26 L 50,48 L 28,26 Z" fill={`url(#head-${color}-${skinId})`} stroke={highlight} strokeWidth="1" />
      ) : (
        <circle cx="50" cy="26" r="22" fill={`url(#head-${color}-${skinId})`} />
      )}

      {/* Overlays */}
      {(skinId === 'royal' || skinId === 'royal_crown_premium') && (
        <path d="M 38,10 L 44,20 L 50,8 L 56,20 L 62,10 L 58,26 L 42,26 Z" fill="#fbbf24" stroke="#713f12" strokeWidth={skinId === 'royal_crown_premium' ? "1.5" : "0.5"} />
      )}
      {(skinId === 'galaxy' || skinId === 'galaxy_star') && (
        <g fill="#ffffff" opacity={skinId === 'galaxy_star' ? "1" : "0.8"}>
          <circle cx="45" cy="20" r={skinId === 'galaxy_star' ? "2" : "1.5"} />
          <circle cx="55" cy="30" r={skinId === 'galaxy_star' ? "1.5" : "1"} />
          <circle cx="40" cy="35" r="2" />
          <circle cx="60" cy="15" r="1.5" />
          <circle cx="50" cy="70" r={skinId === 'galaxy_star' ? "2" : "1"} />
          <circle cx="45" cy="85" r="1.5" />
          {skinId === 'galaxy_star' && <path d="M 50,5 L 52,15 L 62,17 L 52,19 L 50,29 L 48,19 L 38,17 L 48,15 Z" fill="#ffffff" opacity="0.9" />}
        </g>
      )}
      {(skinId === 'cosmic' || skinId === 'cosmic_void') && (
        <g fill={accentHex} opacity="0.9">
          <circle cx="50" cy="26" r={skinId === 'cosmic_void' ? "10" : "8"} filter="blur(2px)" />
          <circle cx="50" cy="26" r="3" fill="#ffffff" />
          {skinId === 'cosmic_void' && <circle cx="50" cy="26" r="1" fill="#000000" />}
        </g>
      )}
      {(skinId === 'legendary' || skinId === 'infinity_legend') && (
        <g fill="none" stroke={skinId === 'infinity_legend' ? '#ffffff' : highlight} strokeWidth={skinId === 'infinity_legend' ? "3" : "2"} opacity={skinId === 'infinity_legend' ? "0.9" : "0.7"}>
          <path d="M 30,10 Q 50,-10 70,10" />
          <path d="M 30,42 Q 50,62 70,42" />
          {skinId === 'infinity_legend' && <path d="M 35,70 Q 50,50 65,70" strokeWidth="2" />}
        </g>
      )}
      {(skinId === 'lightning' || skinId === 'thunder_lord') && (
        <path d="M 55,10 L 45,26 L 55,26 L 45,42 L 52,28 L 42,28 Z" fill={skinId === 'thunder_lord' ? "#ffffff" : "#fde047"} stroke={skinId === 'thunder_lord' ? "#3b82f6" : "none"} strokeWidth="1" />
      )}
      {(skinId === 'fire' || skinId === 'lava_king' || skinId === 'phoenix_fire') && (
        <g>
          <path d="M 40,26 Q 50,10 60,26 Q 55,40 50,40 Q 45,40 40,26 Z" fill={skinId === 'phoenix_fire' ? "#fde047" : "#f97316"} opacity={skinId === 'lava_king' ? "0.9" : "0.8"} />
          {(skinId === 'lava_king' || skinId === 'phoenix_fire') && <path d="M 45,26 Q 50,15 55,26 Q 52,35 50,35 Q 48,35 45,26 Z" fill="#ffffff" opacity="0.8" />}
        </g>
      )}
      {(skinId === 'ice' || skinId === 'ice_crystal') && (
        <g>
          <path d="M 50,10 L 55,26 L 70,26 L 58,35 L 62,50 L 50,40 L 38,50 L 42,35 L 30,26 L 45,26 Z" fill="#cffafe" opacity={skinId === 'ice_crystal' ? "0.9" : "0.6"} />
          {skinId === 'ice_crystal' && <path d="M 50,15 L 53,24 L 62,24 L 54,30 L 57,40 L 50,34 L 43,40 L 46,30 L 38,24 L 47,24 Z" fill="#ffffff" />}
        </g>
      )}
      {skinId === 'mystic_wizard' && (
        <path d="M 35,26 L 65,26 L 50,5 Z" fill="#4c1d95" opacity="0.8" stroke="#a855f7" strokeWidth="1.5" />
      )}
      {skinId === 'dragon_emperor' && (
        <g fill="#10b981" stroke="#fcd34d" strokeWidth="1" opacity="0.8">
          <polygon points="50,15 55,25 50,35 45,25" />
          <polygon points="50,50 55,60 50,70 45,60" />
        </g>
      )}
      {skinId === 'solar_flame' && (
        <g fill="#fde047" opacity="0.9">
          <circle cx="50" cy="26" r="10" fill="#fb923c" />
          <path d="M 50,5 L 52,12 L 50,15 L 48,12 Z" />
          <path d="M 50,47 L 52,40 L 50,37 L 48,40 Z" />
          <path d="M 29,26 L 36,24 L 39,26 L 36,28 Z" />
          <path d="M 71,26 L 64,24 L 61,26 L 64,28 Z" />
        </g>
      )}
      {skinId === 'lunar_glow' && (
        <path d="M 55,10 A 15 15 0 0 0 55,42 A 18 18 0 0 1 55,10 Z" fill="#ffffff" opacity="0.9" />
      )}
      {skinId === 'ultimate_god' && (
        <g fill="#ffffff" opacity="0.9">
          <circle cx="50" cy="26" r="5" />
          <path d="M 50,0 L 52,15 L 50,20 L 48,15 Z M 50,52 L 52,37 L 50,32 L 48,37 Z M 24,26 L 39,24 L 44,26 L 39,28 Z M 76,26 L 61,24 L 56,26 L 61,28 Z" />
        </g>
      )}
    </svg>
  );
};

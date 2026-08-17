import React, { useState, useEffect } from 'react';
import { AppScreen, GameType } from '../types';
import { useUserStore } from '../store/userStore';
import { Coins, Settings, ShoppingCart, BarChart3, Play, Dices, HelpCircle, Gem, User, Gift, Trophy, Star, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { audio } from '../lib/audio';
import { GOTI_SKINS } from '../types';
import { GotiPiece } from '../components/GotiPiece';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  onPlay: (game: GameType) => void;
}

export default function MainMenu({ onNavigate, onPlay }: Props) {
  const { coins, diamonds, profile, stats, dailyMissions, lastDailyRewardDate, claimDailyReward, claimMissionReward } = useUserStore();
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false);
  const [featuredGoti, setFeaturedGoti] = useState(GOTI_SKINS[1]);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setDailyRewardClaimed(lastDailyRewardDate === today);
    
    // Pick a random featured goti that isn't classic
    const premiumGotis = GOTI_SKINS.filter(g => g.price >= 5000);
    setFeaturedGoti(premiumGotis[Math.floor(Math.random() * premiumGotis.length)] || GOTI_SKINS[1]);
  }, [lastDailyRewardDate]);

  const handleDiamondLudo = () => {
    audio.playClick();
    if (!profile || !profile.name || !profile.age || !profile.country) {
      setShowProfileAlert(true);
    } else {
      onNavigate('diamondSetup');
    }
  };

  const handleClaimDaily = () => {
    if (claimDailyReward()) {
      audio.playWin();
      setDailyRewardClaimed(true);
    }
  };

  const handleClaimMission = (mission: 'ludoPlayed' | 'ludoWon' | 'snakesPlayed') => {
    if (claimMissionReward(mission)) {
      audio.playWin();
    }
  };

  // Mock Level System based on games played
  const level = Math.floor(stats.gamesPlayed / 10) + 1;
  const currentXP = (stats.gamesPlayed % 10) * 50;
  const maxXP = 500;
  const xpPercentage = (currentXP / maxXP) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-900 relative overflow-y-auto overflow-x-hidden pb-12 w-full">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
         <div className="absolute top-[10%] left-[20%] w-32 h-32 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-[80px] animate-pulse"></div>
         <div className="absolute top-[40%] right-[20%] w-40 h-40 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
         <div className="absolute bottom-[20%] left-[30%] w-48 h-48 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {showProfileAlert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-in fade-in">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                <User className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Profile Required</h2>
              <p className="text-slate-300 mb-8 font-medium">
                Please create your profile before playing Diamond Ludo.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { 
                    audio.playClick();
                    setShowProfileAlert(false);
                    onNavigate('profile');
                  }}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black py-4 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wide"
                >
                  Create Profile
                </button>
                <button 
                  onClick={() => { audio.playClick(); setShowProfileAlert(false); }}
                  className="w-full bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition-colors uppercase tracking-wide"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <User className={cn("w-6 h-6", profile ? "text-indigo-400" : "text-slate-400")} />
              </div>
            </div>
            <div>
              <div className="text-white font-black text-lg">{profile ? profile.name : 'Guest'}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">LVL {level}</span>
                <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${xpPercentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="font-bold text-yellow-400 text-sm sm:text-base">{coins.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => onNavigate('diamondCenter')}
              className="flex items-center gap-2 bg-slate-800/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:scale-105 active:scale-95 transition-all"
            >
              <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              <span className="font-bold text-cyan-400 text-sm sm:text-base">{diamonds.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 mt-6 z-10 relative flex flex-col md:flex-row gap-6">
        
        {/* Left Column - Main Play Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Welcome & Branding */}
          <div className="text-center md:text-left pt-2 pb-4">
            <h2 className="text-slate-400 text-lg sm:text-xl font-medium mb-1">
              Welcome{profile ? ' back' : ''}, <span className="text-white font-bold">{profile ? profile.name : 'Guest'}</span>!
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 filter drop-shadow-[0_0_10px_rgba(192,38,211,0.5)] leading-tight">
              LOUDO MAX
            </h1>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => { audio.playClick(); onPlay('ludo'); }}
              className="group relative flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-[2rem] font-black text-2xl sm:text-3xl shadow-[0_10px_30px_rgba(225,29,72,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden border-b-4 border-red-800 animate-[pulse_3s_ease-in-out_infinite]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 relative z-10">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current" /> PLAY LUDO
              </div>
              <span className="text-sm sm:text-base font-bold text-red-100 bg-red-900/30 px-4 py-1 rounded-full relative z-10">Classic Multiplayer</span>
            </button>

            <button 
              onClick={handleDiamondLudo}
              className="group relative flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 p-5 rounded-[2rem] font-black text-xl sm:text-2xl shadow-[0_8px_25px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden border border-cyan-400/50 border-b-4 border-blue-800"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-cyan-400/30 rounded-full blur-xl animate-pulse" />
              <div className="absolute top-2 right-4 flex items-center gap-1 bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Premium
              </div>
              <div className="flex items-center gap-3 relative z-10 text-white mt-2">
                <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-200 fill-cyan-400/20 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" /> DIAMOND LUDO
              </div>
              <span className="text-xs sm:text-sm font-bold text-cyan-100 bg-blue-900/50 px-3 py-1 rounded-full relative z-10 flex items-center gap-1">
                🏆 Win +10 Diamonds
              </span>
            </button>

            <button 
              onClick={() => { audio.playClick(); onPlay('snakes'); }}
              className="group relative flex flex-col items-center justify-center gap-1 bg-slate-800 p-5 rounded-[1.5rem] font-black text-lg sm:text-xl shadow-lg hover:bg-slate-700 active:scale-[0.98] transition-all overflow-hidden border border-emerald-500/30 border-b-4 border-slate-900"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-3 relative z-10 text-emerald-400">
                <Dices className="w-6 h-6" /> PLAY SNAKES & LADDERS
              </div>
              <span className="text-xs font-bold text-slate-400 relative z-10 uppercase tracking-widest mt-1">Roll • Climb • Slide • Win</span>
            </button>
          </div>
          
          {/* Quick Stats & Win Streak */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
               <Flame className={cn("w-8 h-8 mb-2 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]", stats.winStreak > 0 ? "text-orange-400 animate-pulse" : "text-slate-500")} />
               <div className="text-2xl font-black text-white">{stats.winStreak || 0}</div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Win Streak</div>
            </div>
            
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex flex-col justify-center">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1"><BarChart3 className="w-3 h-3"/> Quick Stats</div>
               <div className="flex justify-between items-center mb-1">
                 <span className="text-slate-300 text-sm">Matches:</span>
                 <span className="text-white font-bold">{stats.gamesPlayed}</span>
               </div>
               <div className="flex justify-between items-center mb-1">
                 <span className="text-slate-300 text-sm">Wins:</span>
                 <span className="text-emerald-400 font-bold">{stats.gamesWon}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-slate-300 text-sm">Win Rate:</span>
                 <span className="text-white font-bold">{stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}%</span>
               </div>
            </div>
          </div>
          
        </div>

        {/* Right Column - Dashboard */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          
          {/* Daily Reward */}
          <div className="bg-gradient-to-b from-indigo-900/40 to-slate-800 border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden">
             <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-500/20 rounded-full blur-xl" />
             <div className="flex items-center gap-2 mb-3">
               <Gift className="w-5 h-5 text-indigo-400" />
               <h3 className="font-black text-white uppercase tracking-wider">Daily Reward</h3>
             </div>
             <p className="text-slate-300 text-sm mb-4 leading-snug">Come back every day and collect your reward.</p>
             <button
               onClick={handleClaimDaily}
               disabled={dailyRewardClaimed}
               className={cn(
                 "w-full py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                 dailyRewardClaimed 
                   ? "bg-slate-900/50 text-slate-500 border border-slate-700 cursor-not-allowed" 
                   : "bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] active:scale-95"
               )}
             >
               {dailyRewardClaimed ? <><CheckCircle2 className="w-4 h-4" /> Claimed</> : "CLAIM REWARD"}
             </button>
          </div>

          {/* Daily Missions */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5">
             <div className="flex items-center gap-2 mb-4">
               <Trophy className="w-5 h-5 text-yellow-400" />
               <h3 className="font-black text-white uppercase tracking-wider">Daily Missions</h3>
             </div>
             <div className="flex flex-col gap-3">
               <MissionRow 
                 title="Play 1 Ludo Match" 
                 reward="+100 Coins" 
                 progress={Math.min(dailyMissions.ludoPlayed, 1)} 
                 target={1} 
                 claimed={dailyMissions.claimedLudoPlayed} 
                 onClaim={() => handleClaimMission('ludoPlayed')}
                 rewardType="coins"
               />
               <MissionRow 
                 title="Win 1 Ludo Match" 
                 reward="+10 Diamonds" 
                 progress={Math.min(dailyMissions.ludoWon, 1)} 
                 target={1} 
                 claimed={dailyMissions.claimedLudoWon} 
                 onClaim={() => handleClaimMission('ludoWon')}
                 rewardType="diamonds"
               />
               <MissionRow 
                 title="Play 1 Snake Match" 
                 reward="+50 Coins" 
                 progress={Math.min(dailyMissions.snakesPlayed, 1)} 
                 target={1} 
                 claimed={dailyMissions.claimedSnakesPlayed} 
                 onClaim={() => handleClaimMission('snakesPlayed')}
                 rewardType="coins"
               />
             </div>
          </div>

          {/* Featured Goti */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 flex flex-col items-center relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('shop')}>
             <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-wider z-10">
               Featured Goti
             </div>
             <div className="w-16 h-16 mb-2 relative mt-2 group-hover:scale-110 transition-transform">
               <GotiPiece color="yellow" skinId={featuredGoti.id} />
             </div>
             <div className="font-black text-white text-lg mb-1">{featuredGoti.name}</div>
             <div className="text-yellow-400 text-sm font-bold flex items-center gap-1 mb-3">
               <Coins className="w-3.5 h-3.5" /> {featuredGoti.price.toLocaleString()}
             </div>
             <button className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors">
               [ View in Shop ]
             </button>
          </div>

        </div>
      </div>
      
      {/* Footer Navigation Grid */}
      <div className="max-w-4xl mx-auto w-full px-4 mt-6 z-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <MenuButton icon={<Gift />} title="Redeem Code" subtitle="Use reward codes" onClick={() => onNavigate('redeemCode')} color="fuchsia" />
          <MenuButton icon={<ShoppingCart />} title="Shop" subtitle="Premium Gotis" onClick={() => onNavigate('shop')} color="blue" />
          <MenuButton icon={<Settings />} title="Settings" subtitle="Preferences" onClick={() => onNavigate('settings')} color="slate" />
          <MenuButton icon={<HelpCircle />} title="How to Play" subtitle="Rules & Guide" onClick={() => onNavigate('howToPlay')} color="green" />
        </div>
      </div>

    </div>
  );
}

function MissionRow({ title, reward, progress, target, claimed, onClaim, rewardType }: { title: string, reward: string, progress: number, target: number, claimed: boolean, onClaim: () => void, rewardType: 'coins'|'diamonds' }) {
  const isComplete = progress >= target;
  
  return (
    <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
      <div>
        <div className="text-sm font-bold text-white leading-tight">{title}</div>
        <div className={cn("text-xs font-bold flex items-center gap-1 mt-0.5", rewardType === 'coins' ? "text-yellow-400" : "text-cyan-400")}>
          {rewardType === 'coins' ? <Coins className="w-3 h-3"/> : <Gem className="w-3 h-3" />} {reward}
        </div>
      </div>
      <div>
        {claimed ? (
          <div className="text-[10px] font-black text-emerald-400 flex items-center gap-1 uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded">
            <CheckCircle2 className="w-3 h-3" /> Done
          </div>
        ) : isComplete ? (
          <button 
            onClick={(e) => { e.stopPropagation(); onClaim(); }}
            className="text-[10px] font-black text-slate-900 bg-yellow-400 hover:bg-yellow-300 px-3 py-1.5 rounded uppercase tracking-wider shadow-[0_0_10px_rgba(250,204,21,0.4)] active:scale-95 transition-all"
          >
            Claim
          </button>
        ) : (
          <div className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded">
            {progress}/{target}
          </div>
        )}
      </div>
    </div>
  );
}

function MenuButton({ icon, title, subtitle, onClick, color }: { icon: React.ReactNode, title: string, subtitle: string, onClick: () => void, color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-900/20 text-blue-400 border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-500/50',
    purple: 'bg-purple-900/20 text-purple-400 border-purple-500/30 hover:bg-purple-600/30 hover:border-purple-500/50',
    slate: 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:bg-slate-700/80',
    green: 'bg-emerald-900/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/30 hover:border-emerald-500/50',
    indigo: 'bg-indigo-900/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-600/30 hover:border-indigo-500/50',
    fuchsia: 'bg-fuchsia-900/20 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-600/30 hover:border-fuchsia-500/50',
  };

  return (
    <button
      onClick={() => { audio.playClick(); onClick(); }}
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 p-4 rounded-[1.5rem] border backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-95 group",
        colorMap[color]
      )}
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 mb-1" })}
      </div>
      <span className="font-black text-sm text-slate-100 uppercase tracking-wide leading-none">{title}</span>
      <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">{subtitle}</span>
    </button>
  );
}

import React, { useState } from 'react';
import { ArrowLeft, Dice5, Trophy, Coins, Users, Gem, User, Bot, Play, Gift, Key, Globe, LayoutList, CheckCircle2, XCircle, Gamepad2, ScrollText, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { audio } from '../lib/audio';

export default function HowToPlay({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'classic' | 'diamond'>('diamond');

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => { audio.playClick(); onBack(); }}
            className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black ml-2 uppercase tracking-wide text-white">How to Play</h1>
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl mx-auto p-4 flex flex-col gap-6 pb-12">
        
        {/* Tab Switcher */}
        <div className="flex bg-slate-800 p-1 rounded-xl gap-1">
          <button
            onClick={() => { audio.playClick(); setActiveTab('classic'); }}
            className={cn(
              "flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2",
              activeTab === 'classic' 
                ? "bg-slate-700 text-white shadow-md" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            )}
          >
            <Gamepad2 className="w-4 h-4" /> Classic Modes
          </button>
          <button
            onClick={() => { audio.playClick(); setActiveTab('diamond'); }}
            className={cn(
              "flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2",
              activeTab === 'diamond' 
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20 border border-cyan-400/30" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            )}
          >
            <Gem className="w-4 h-4" /> Diamond Ludo
          </button>
        </div>

        {activeTab === 'classic' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <section className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-red-400 uppercase tracking-wide">
                <Users /> Normal Ludo
              </h2>
              <ul className="space-y-3 text-slate-300 list-none">
                <li className="flex gap-3"><span className="text-red-400">●</span> Each player has 4 tokens (gotis) starting in their home area.</li>
                <li className="flex gap-3"><span className="text-red-400">●</span> You must roll a <strong>6</strong> to move a token out of the home area.</li>
                <li className="flex gap-3"><span className="text-red-400">●</span> Rolling a 6 grants you an extra turn.</li>
                <li className="flex gap-3"><span className="text-red-400">●</span> If your token lands on an opponent's token, the opponent's token is captured and returned to its home area, and you get an extra turn.</li>
                <li className="flex gap-3"><span className="text-red-400">●</span> Tokens on <strong>Safe zones</strong> (marked with a ★ or starting squares) cannot be captured.</li>
                <li className="flex gap-3"><span className="text-red-400">●</span> The first player to move all 4 tokens to the center finishing area wins.</li>
              </ul>
            </section>
            
            <section className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-emerald-400 uppercase tracking-wide">
                <Dice5 /> Snakes & Ladders
              </h2>
              <ul className="space-y-3 text-slate-300 list-none">
                <li className="flex gap-3"><span className="text-emerald-400">●</span> All players start off the board. Roll the dice to enter and move forward.</li>
                <li className="flex gap-3"><span className="text-emerald-400">●</span> If you land exactly at the bottom of a <strong>Ladder</strong>, you automatically climb to the top.</li>
                <li className="flex gap-3"><span className="text-emerald-400">●</span> If you land exactly on the head of a <strong>Snake</strong>, you slide down to its tail.</li>
                <li className="flex gap-3"><span className="text-emerald-400">●</span> The first player to reach square exactly <strong>100</strong> wins the game.</li>
                <li className="flex gap-3"><span className="text-emerald-400">●</span> Rolling a 6 grants you an extra turn.</li>
              </ul>
            </section>
            
            <section className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-yellow-400 uppercase tracking-wide">
                <Coins /> Coins & Shop
              </h2>
              <ul className="space-y-3 text-slate-300 list-none">
                <li className="flex gap-3"><span className="text-yellow-400">●</span> Winning games earns you <strong>Coins</strong> (10 for Normal Ludo, 75 for Snakes & Ladders).</li>
                <li className="flex gap-3"><span className="text-yellow-400">●</span> Use coins in the <strong>Shop</strong> to purchase new, unique premium goti skins.</li>
                <li className="flex gap-3"><span className="text-yellow-400">●</span> Equip your purchased skins from the shop before starting a new game to show them off!</li>
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'diamond' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Quick Guide */}
            <section className="bg-gradient-to-br from-indigo-900/50 to-slate-800 p-6 rounded-2xl border border-indigo-500/30 text-center relative overflow-hidden">
              <h2 className="text-lg font-black mb-6 text-white uppercase tracking-widest">Simple Quick Guide</h2>
              <div className="flex flex-col gap-2 relative z-10 max-w-sm mx-auto">
                <GuideStep icon={<User />} label="Create Name + Age + Country" title="PROFILE" color="indigo" />
                <ArrowDown />
                <GuideStep icon={<Gem />} label="Play against Computer" title="DIAMOND LUDO" color="cyan" />
                <ArrowDown />
                <GuideStep icon={<Trophy />} label="Receive +10 Diamonds" title="WIN" color="yellow" />
                <ArrowDown />
                <GuideStep icon={<Gem />} label="Use Diamonds for available redemption rewards" title="DIAMOND CENTER" color="blue" />
                <ArrowDown />
                <GuideStep icon={<Key />} label="Receive unique in-game code" title="REDEEM CODE" color="fuchsia" />
                <ArrowDown />
                <GuideStep icon={<Gift />} label="Enter code" title="REDEEM CODE CENTER" color="rose" />
                <ArrowDown />
                <GuideStep icon={<Coins />} label="Receive the configured Coin reward" title="RECEIVE COINS" color="amber" />
              </div>
            </section>

            {/* What is Diamond Ludo? */}
            <InfoCard icon={<Gem />} title="Diamond Ludo" color="cyan">
              <p>Diamond Ludo is a special Ludo mode where you play against a computer opponent and can earn Diamonds by winning.</p>
              <ul className="mt-3 space-y-1.5 list-none">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0"/> 1 Human Player vs 1 Computer</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0"/> Human controls their own gotis</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0"/> Computer plays automatically</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0"/> The computer opponent gets a random name</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0"/> Diamond Ludo is completely separate from Normal Ludo</li>
              </ul>
            </InfoCard>

            {/* Profile Required */}
            <InfoCard icon={<User />} title="Profile Required" color="indigo">
              <p>Diamond Ludo requires a completed profile. If no profile exists, Diamond Ludo will remain locked.</p>
              <div className="bg-slate-900/50 p-4 rounded-xl mt-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-300 flex-wrap">
                <span className="text-white">👤 Create Profile</span> <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="text-white">Name + Age + Country</span> <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="text-white">Save Profile</span> <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="text-indigo-400">Diamond Ludo unlocked</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">Normal Ludo can still be played as a Guest without creating a profile.</p>
            </InfoCard>

            {/* How to Start */}
            <InfoCard icon={<Play />} title="How to Start" color="green">
              <ol className="space-y-2 list-decimal list-inside text-slate-300">
                <li>Open the main menu.</li>
                <li>Tap <strong>💎 Diamond Ludo</strong>.</li>
                <li>Make sure your profile is completed.</li>
                <li>Tap <strong>START GAME</strong>.</li>
                <li>You will be matched automatically with a computer opponent.</li>
                <li>The computer opponent receives a random name.</li>
                <li>You play as your own color.</li>
              </ol>
            </InfoCard>

            {/* How the Game Works */}
            <InfoCard icon={<Dice5 />} title="How to Play" color="purple">
              <ul className="space-y-2 list-none text-slate-300">
                <li className="flex gap-2"><span className="text-purple-400">●</span> Human rolls the dice manually.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> Human selects a valid goti.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> The goti moves one cell at a time.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> Computer takes its own turn automatically.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> Computer rolls its own dice automatically.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> Computer chooses a valid goti automatically.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> Turns alternate normally.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> Captures work according to Ludo rules.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> Gotis enter home using the normal Ludo rules.</li>
                <li className="flex gap-2"><span className="text-purple-400">●</span> First player to get all 4 gotis home wins.</li>
              </ul>
            </InfoCard>

            {/* Computer Opponent */}
            <InfoCard icon={<Bot />} title="Computer Opponent" color="rose">
              <p>You are playing against an AI-controlled computer player.</p>
              <p className="mt-2">The computer:</p>
              <ul className="mt-2 space-y-1.5 list-none text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-400 mt-1 shrink-0"/> Rolls automatically</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-400 mt-1 shrink-0"/> Selects valid moves</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-400 mt-1 shrink-0"/> Moves its own gotis</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-400 mt-1 shrink-0"/> Can capture your goti</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-400 mt-1 shrink-0"/> Can move gotis into home</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-400 mt-1 shrink-0"/> Tries to win the match</li>
              </ul>
              <p className="mt-3 font-bold text-rose-400">The player cannot control the computer's gotis.</p>
            </InfoCard>

            {/* Diamond Reward */}
            <InfoCard icon={<Trophy />} title="Win Reward" color="yellow">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-yellow-500/20 text-center mb-4">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Win Diamond Ludo</div>
                <div className="text-2xl font-black text-cyan-400">💎 +10 DIAMONDS</div>
              </div>
              <ul className="space-y-2 list-none text-slate-300">
                <li className="flex gap-2"><span className="text-yellow-400">●</span> The +10 Diamonds are awarded only when the <strong>HUMAN PLAYER</strong> wins.</li>
                <li className="flex gap-2"><span className="text-yellow-400">●</span> If the computer wins, the player does not receive the +10 Diamond win reward.</li>
              </ul>
            </InfoCard>

            {/* Diamonds */}
            <InfoCard icon={<Gem />} title="Diamonds" color="cyan">
              <p>Your Diamond balance is displayed at the top of the game.</p>
              <div className="flex items-center gap-2 bg-slate-900/50 p-3 rounded-xl border border-cyan-500/20 w-max mt-3 mb-3">
                <Gem className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-white">Diamonds: 100</span>
              </div>
              <p className="text-slate-300">Diamonds are a separate currency from Coins. Coins and Diamonds must not be confused.</p>
            </InfoCard>

            {/* Diamond Center */}
            <InfoCard icon={<LayoutList />} title="Diamond Center" color="blue">
              <p>Tap the Diamond balance to open the Diamond Center.</p>
              <p className="mt-2 mb-2 text-slate-300">Inside Diamond Center, the player can:</p>
              <ul className="space-y-1.5 list-none text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0"/> View Diamond balance</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0"/> View available redemption rewards</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0"/> Redeem Diamonds for the available reward options</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0"/> View Redemption History</li>
              </ul>
            </InfoCard>

            {/* Redemption */}
            <InfoCard icon={<Gift />} title="Redemption" color="fuchsia">
              <p className="mb-3">Redemption options:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                <RedeemOption d="1,400" v="₹10" />
                <RedeemOption d="2,800" v="₹20" />
                <RedeemOption d="7,000" v="₹50" />
                <RedeemOption d="14,000" v="₹100" />
                <RedeemOption d="28,000" v="₹200" />
                <RedeemOption d="70,000" v="₹500" />
              </div>
              <p className="text-slate-300 text-sm">
                The player needs the required number of Diamonds before the REDEEM button becomes available. 
                The maximum available reward is ₹500.
              </p>
            </InfoCard>

            {/* Redeem Code */}
            <InfoCard icon={<Key />} title="Redeem Code" color="amber">
              <p>When you successfully redeem Diamonds, the game generates a unique random in-game redeem code.</p>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700 font-mono text-center text-amber-400 my-3 font-bold tracking-widest">
                BR-X8A2-9K1M-P4L5
              </div>
              <ul className="space-y-1.5 list-none text-slate-300 text-sm">
                <li className="flex gap-2"><span className="text-amber-400">●</span> Is generated automatically.</li>
                <li className="flex gap-2"><span className="text-amber-400">●</span> Is different for every successful redemption.</li>
                <li className="flex gap-2"><span className="text-amber-400">●</span> Is saved in Redemption History.</li>
                <li className="flex gap-2"><span className="text-amber-400">●</span> Can be copied using COPY CODE.</li>
                <li className="flex gap-2"><span className="text-amber-400">●</span> Can be entered into the game's Redeem Code Center.</li>
              </ul>
            </InfoCard>

            {/* Redeem Code Center */}
            <InfoCard icon={<Gift />} title="Redeem Code Center" color="rose">
              <p className="mb-2">Open Redeem Code Center from the main menu.</p>
              <ol className="space-y-2 list-decimal list-inside text-slate-300">
                <li>Enter your redeem code.</li>
                <li>Tap <strong>REDEEM CODE</strong>.</li>
                <li>If the code is valid and unused, the corresponding Coin reward is added.</li>
                <li>A code can only be used once.</li>
                <li>Invalid or already-used codes do not give Coins.</li>
              </ol>
            </InfoCard>

            {/* Country and Currency */}
            <InfoCard icon={<Globe />} title="Country and Currency" color="emerald">
              <p className="mb-3">The currency displayed in Diamond Redemption depends on the country selected in your Profile.</p>
              
              <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden text-sm">
                <div className="grid grid-cols-2 bg-slate-800 p-2 font-bold text-slate-300">
                  <div>Country</div>
                  <div>Currency</div>
                </div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">India 🇮🇳</div><div className="font-bold text-white">₹</div></div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">United States 🇺🇸</div><div className="font-bold text-white">$</div></div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">United Kingdom 🇬🇧</div><div className="font-bold text-white">£</div></div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">Pakistan 🇵🇰</div><div className="font-bold text-white">₨ / PKR</div></div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">Sri Lanka 🇱🇰</div><div className="font-bold text-white">LKR</div></div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">Bangladesh 🇧🇩</div><div className="font-bold text-white">৳</div></div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">Nepal 🇳🇵</div><div className="font-bold text-white">NPR</div></div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">UAE 🇦🇪</div><div className="font-bold text-white">AED</div></div>
                <div className="grid grid-cols-2 p-2 border-t border-slate-800 text-slate-300"><div className="flex items-center gap-2">Japan 🇯🇵</div><div className="font-bold text-white">¥</div></div>
              </div>
              <p className="mt-3 text-sm text-slate-400">Changing the Profile country updates the displayed currency accordingly.</p>
            </InfoCard>

            {/* Diamond Ludo vs Normal Ludo */}
            <InfoCard icon={<ScrollText />} title="Mode Comparison" color="indigo">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <h4 className="font-black text-white uppercase tracking-wider mb-3">Normal Ludo</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Existing normal multiplayer mode</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Can be played without a profile as Guest</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Normal Ludo gameplay</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-rose-400 shrink-0"/> Normal Ludo win does NOT directly give Coins</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Daily Missions may give Coins</li>
                  </ul>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/30">
                  <h4 className="font-black text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Gem className="w-4 h-4" /> Diamond Ludo</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0"/> 1 Human vs Computer</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0"/> Profile required</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0"/> Computer plays automatically</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0"/> Human controls own gotis</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0"/> Human win gives +10 Diamonds</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0"/> Separate Diamond system</li>
                  </ul>
                </div>
              </div>
            </InfoCard>

          </div>
        )}
      </div>
    </div>
  );
}

function GuideStep({ icon, title, label, color }: { icon: React.ReactNode, title: string, label: string, color: string }) {
  const colorMap: Record<string, string> = {
    indigo: "text-indigo-400",
    cyan: "text-cyan-400",
    yellow: "text-yellow-400",
    blue: "text-blue-400",
    fuchsia: "text-fuchsia-400",
    rose: "text-rose-400",
    amber: "text-amber-400",
  };
  
  return (
    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700 flex flex-col items-center shadow-lg">
      <div className="flex items-center gap-2 font-black mb-1">
        {React.cloneElement(icon as React.ReactElement, { className: cn("w-5 h-5", colorMap[color]) })}
        <span className={cn(colorMap[color], "uppercase tracking-wide")}>{title}</span>
      </div>
      <div className="text-slate-300 text-sm font-medium">{label}</div>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex justify-center py-1">
      <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
    </div>
  );
}

function RedeemOption({ d, v }: { d: string, v: string }) {
  return (
    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex justify-between items-center">
      <span className="text-cyan-400 font-bold flex items-center gap-1.5"><Gem className="w-4 h-4"/> {d}</span>
      <span className="text-slate-500 font-black">→</span>
      <span className="text-emerald-400 font-bold">{v}</span>
    </div>
  );
}

function InfoCard({ icon, title, color, children }: { icon: React.ReactNode, title: string, color: string, children: React.ReactNode }) {
  const colorMap: Record<string, { border: string, text: string }> = {
    cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400' },
    indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400' },
    green: { border: 'border-emerald-500/30', text: 'text-emerald-400' },
    purple: { border: 'border-purple-500/30', text: 'text-purple-400' },
    rose: { border: 'border-rose-500/30', text: 'text-rose-400' },
    yellow: { border: 'border-yellow-500/30', text: 'text-yellow-400' },
    blue: { border: 'border-blue-500/30', text: 'text-blue-400' },
    fuchsia: { border: 'border-fuchsia-500/30', text: 'text-fuchsia-400' },
    amber: { border: 'border-amber-500/30', text: 'text-amber-400' },
    emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400' },
  };
  
  const styles = colorMap[color];
  
  return (
    <section className={cn("bg-slate-800/60 p-5 sm:p-6 rounded-2xl border", styles.border)}>
      <h2 className={cn("text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-wide", styles.text)}>
        {icon} {title}
      </h2>
      <div className="text-slate-200 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
